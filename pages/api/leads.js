// POST /api/leads  — stores email in Redis set leads:mothers-checklist
// Uses raw fetch with POST body format (colon-safe), per established Upstash pattern.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  const clean = typeof email === "string" ? email.toLowerCase().trim() : "";

  if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SADD", "leads:mothers-checklist", clean]),
    });

    if (!r.ok) {
      throw new Error("Redis request failed");
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
}
