// scripts/daily-post.js — posts one item from the pool into the community feed.
// Runs in GitHub Actions. Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
// Rotates by day-of-year so the pool cycles without repeats until exhausted.

const fs = require("fs");
const path = require("path");

async function redis(cmd) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Redis request failed: ${r.status} ${text}`);
  }
  return (await r.json()).result;
}

async function main() {
  const pool = JSON.parse(
    fs.readFileSync(path.join(__dirname, "posts-pool.json"), "utf8")
  );
  const posts = pool.posts || [];
  if (posts.length === 0) throw new Error("Empty posts pool");

  // Counter-based rotation: every run posts the NEXT item in the pool,
  // so repeated or manual runs can never duplicate a post.
  const counter = await redis(["INCR", "tvg:community:pool-index"]);
  const msg = posts[(counter - 1) % posts.length];

  const entry = {
    id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: pool.name || "The Virtuous Girl",
    msg,
    ts: Date.now(),
    auto: true,
  };

  await redis(["LPUSH", "tvg:community:posts", JSON.stringify(entry)]);
  await redis(["LTRIM", "tvg:community:posts", "0", "499"]);
  console.log("Posted:", msg.slice(0, 80) + (msg.length > 80 ? "…" : ""));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
