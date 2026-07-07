// pages/api/stripe-webhook.js — grants AND revokes course access for The Virtuous Girl
// checkout.session.completed -> SADD tvg:members {email}
// charge.refunded / customer.subscription.deleted
//   -> SREM tvg:members {email} + destroy all active TVG sessions for that email
// SEPARATE SYSTEM — TVG keys only. Cannot touch MLF or IL access.
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

async function revokeAccess(email) {
  const clean = email.toLowerCase().trim();
  // 1. Remove membership — no new magic links can be issued
  await redis(["SREM", "tvg:members", clean]);
  // 2. Kill every active session — existing 30-day logins stop working immediately
  try {
    const tokens = await redis(["SMEMBERS", `tvg:sessions:${clean}`]);
    if (Array.isArray(tokens)) {
      for (const t of tokens) {
        await redis(["DEL", `tvg:session:${t}`]);
      }
    }
    await redis(["DEL", `tvg:sessions:${clean}`]);
  } catch (err) {
    console.error("Session revocation error:", err.message);
  }
  console.log("TVG access revoked:", clean);
}

async function emailFromCustomer(customerId) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.email || null;
  } catch (err) {
    console.error("Could not retrieve customer:", err.message);
    return null;
  }
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
    // ---- GRANTS ----
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

    // ---- REVOCATIONS ----
    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      let email = charge.billing_details?.email || charge.receipt_email;
      if (!email && charge.customer) email = await emailFromCustomer(charge.customer);
      if (email) await revokeAccess(email);
    }
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const email = await emailFromCustomer(sub.customer);
      if (email) await revokeAccess(email);
    }
  } catch (err) {
    console.error("Webhook handling error:", err.message);
    return res.status(500).json({ error: "Webhook handler failed" });
  }

  return res.status(200).json({ received: true });
}
