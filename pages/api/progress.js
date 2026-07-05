// pages/api/progress.js — chapter completion for The Virtuous Girl
// GET  -> { done: { slug: true, ... } }
// POST { slug } -> mark chapter complete
// Identity comes from the tvg_session cookie; progress lives in
// tvg:progress:{identity} as a Redis hash.

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
  const data = await r.json();
  return data.result;
}

function getSessionToken(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/(?:^|;\s*)tvg_session=([^;]+)/);
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  const token = getSessionToken(req);
  if (!token) return res.status(401).json({ error: "Not signed in." });

  let identity;
  try {
    identity = await redis(["GET", `tvg:session:${token}`]);
  } catch {
    return res.status(500).json({ error: "Something went wrong." });
  }
  if (!identity) return res.status(401).json({ error: "Session expired." });

  const key = `tvg:progress:${identity}`;

  if (req.method === "GET") {
    try {
      const flat = (await redis(["HGETALL", key])) || [];
      const done = {};
      for (let i = 0; i < flat.length; i += 2) done[flat[i]] = true;
      return res.status(200).json({ done });
    } catch {
      return res.status(500).json({ error: "Something went wrong." });
    }
  }

  if (req.method === "POST") {
    const { slug } = req.body || {};
    if (!slug || typeof slug !== "string" || slug.length > 40) {
      return res.status(400).json({ error: "Bad request." });
    }
    try {
      await redis(["HSET", key, slug, "1"]);
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(500).json({ error: "Something went wrong." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
