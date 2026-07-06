// pages/api/community.js — member community: posts & comments
// GET  ?post=ID -> comments for a post | GET -> latest 50 posts
// POST { name, msg } -> new post | POST { name, msg, post } -> comment
// Storage: LPUSH tvg:community:posts (capped 500)
//          LPUSH tvg:community:comments:{postId} (capped 200)

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

function getSessionToken(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/(?:^|;\s*)tvg_session=([^;]+)/);
  return match ? match[1] : null;
}

function cleanText(v, max) {
  return String(v || "").replace(/\s+/g, " ").trim().slice(0, max);
}

export default async function handler(req, res) {
  // must be a signed-in member
  const token = getSessionToken(req);
  if (!token) return res.status(401).json({ error: "Not signed in." });
  let identity;
  try {
    identity = await redis(["GET", `tvg:session:${token}`]);
  } catch {
    return res.status(500).json({ error: "Something went wrong." });
  }
  if (!identity) return res.status(401).json({ error: "Session expired." });

  if (req.method === "GET") {
    try {
      const { post } = req.query || {};
      if (post) {
        const raw =
          (await redis([
            "LRANGE",
            `tvg:community:comments:${cleanText(post, 40)}`,
            "0",
            "199",
          ])) || [];
        const comments = raw
          .map((x) => {
            try {
              return JSON.parse(x);
            } catch {
              return null;
            }
          })
          .filter(Boolean)
          .reverse(); // oldest first under a post
        return res.status(200).json({ comments });
      }
      const raw = (await redis(["LRANGE", "tvg:community:posts", "0", "49"])) || [];
      const posts = raw
        .map((x) => {
          try {
            return JSON.parse(x);
          } catch {
            return null;
          }
        })
        .filter(Boolean); // newest first
      return res.status(200).json({ posts });
    } catch {
      return res.status(500).json({ error: "Something went wrong." });
    }
  }

  if (req.method === "POST") {
    const name = cleanText(req.body?.name, 40) || "A Virtuous Sister";
    const msg = cleanText(req.body?.msg, 1000);
    const postId = cleanText(req.body?.post, 40);
    if (!msg || msg.length < 2) {
      return res.status(400).json({ error: "Please write a message first." });
    }
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      msg,
      ts: Date.now(),
    };
    try {
      if (postId) {
        const key = `tvg:community:comments:${postId}`;
        await redis(["LPUSH", key, JSON.stringify(entry)]);
        await redis(["LTRIM", key, "0", "199"]);
      } else {
        await redis(["LPUSH", "tvg:community:posts", JSON.stringify(entry)]);
        await redis(["LTRIM", "tvg:community:posts", "0", "499"]);
      }
      return res.status(200).json({ ok: true, entry });
    } catch {
      return res.status(500).json({ error: "Something went wrong." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
