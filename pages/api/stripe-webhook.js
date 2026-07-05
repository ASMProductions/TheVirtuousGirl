// pages/api/stripe-webhook.js — grants/revokes course access
// checkout.session.completed  -> SADD tvg:members {email}
// customer.subscription.deleted -> SREM tvg:members {email}
// Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function redis(cmd) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("Redis request failed");
  return (await r.json()).result;
}

function rawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let event;
  try {
    const buf = await rawBody(req);
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = (
        session.customer_details?.email ||
        session.customer_email ||
        ""
      )
        .toLowerCase()
        .trim();
      if (email) {
        await redis(["SADD", "tvg:members", email]);
        console.log("Access granted:", email);
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      if (sub.customer) {
        const customer = await stripe.customers.retrieve(sub.customer);
        const email = (customer.email || "").toLowerCase().trim();
        if (email) {
          await redis(["SREM", "tvg:members", email]);
          console.log("Access revoked (subscription ended):", email);
        }
      }
    }
  } catch (err) {
    console.error("Webhook handling error:", err.message);
    return res.status(500).json({ error: "Webhook handler failed" });
  }

  return res.status(200).json({ received: true });
}
