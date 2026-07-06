// pages/course/community.js — The Sisterhood: member community
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

async function redisGet(key) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["GET", key]),
  });
  if (!r.ok) return null;
  const data = await r.json();
  return data.result;
}

export async function getServerSideProps({ req }) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/(?:^|;\s*)tvg_session=([^;]+)/);
  let authed = false;
  if (match) {
    try {
      authed = Boolean(await redisGet(`tvg:session:${match[1]}`));
    } catch {
      authed = false;
    }
  }
  if (!authed) {
    return { redirect: { destination: "/course", permanent: false } };
  }
  return { props: {} };
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function Comments({ postId }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await fetch(`/api/community?post=${encodeURIComponent(postId)}`);
    if (r.ok) {
      const d = await r.json();
      setComments(d.comments || []);
    }
  }

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && comments === null) await load();
  }

  async function send(e) {
    e.preventDefault();
    if (busy || !msg.trim()) return;
    setBusy(true);
    try {
      const r = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, msg, post: postId }),
      });
      if (r.ok) {
        setMsg("");
        await load();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="cwrap">
      <button className="clink" onClick={toggle}>
        {open ? "Hide comments" : "Comments"}
      </button>
      {open && (
        <div className="cbox">
          {comments === null ? (
            <p className="cmuted">Loading…</p>
          ) : comments.length === 0 ? (
            <p className="cmuted">Be the first to reply with kindness.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <p className="cname">
                  {c.name} <span className="cwhen">· {timeAgo(c.ts)}</span>
                </p>
                <p className="cmsg">{c.msg}</p>
              </div>
            ))
          )}
          <form className="cform" onSubmit={send}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Write a kind reply…"
              value={msg}
              maxLength={1000}
              required
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className="button small" type="submit" disabled={busy}>
              {busy ? "…" : "Reply"}
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        .cwrap { margin-top: 10px; }
        .clink {
          background: none; border: none; cursor: pointer;
          font-family: "Nunito Sans", sans-serif; font-weight: 700;
          font-size: 0.85rem; color: #8e3b53; padding: 0;
        }
        .cbox {
          border-top: 1px solid #f3d9e3; margin-top: 10px; padding-top: 10px;
        }
        .cmuted { color: #6e5e8e; font-size: 0.9rem; margin-bottom: 8px; }
        .comment { margin-bottom: 10px; }
        .cname { font-weight: 700; font-size: 0.88rem; color: #5a2438; }
        .cwhen { font-weight: 400; color: #6e5e8e; }
        .cmsg { font-size: 0.95rem; }
        .cform { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .cform input {
          font-family: "Nunito Sans", sans-serif; font-size: 0.9rem;
          padding: 9px 14px; border-radius: 999px; border: 2px solid #e3cdd6;
          background: #fff; color: #3d2b33; flex: 1; min-width: 140px;
        }
        .cform input:focus { border-color: #8e3b53; outline: none; }
        .button.small {
          background: #8e3b53; color: #fbf6ef; font-weight: 700; border: none;
          border-radius: 999px; padding: 9px 18px; font-size: 0.88rem; cursor: pointer;
          font-family: "Nunito Sans", sans-serif;
        }
        .button.small:disabled { opacity: 0.6; }
      `}</style>
    </div>
  );
}

export default function Community() {
  const [posts, setPosts] = useState(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const r = await fetch("/api/community");
    if (r.ok) {
      const d = await r.json();
      setPosts(d.posts || []);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function share(e) {
    e.preventDefault();
    if (busy || !msg.trim()) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, msg }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || "Something went wrong.");
        return;
      }
      setMsg("");
      await load();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Head>
        <title>The Sisterhood — The Virtuous Girl</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=fraunces:600,700|nunito-sans:400,600,700"
          rel="stylesheet"
        />
      </Head>

      <div className="page">
        <header className="header">
          <Link href="/course" className="back">← The Library</Link>
        </header>

        <div className="logo-row">
          <img className="logo" src="/logo.png" alt="The Virtuous Girl logo" />
        </div>
        <p className="eyebrow">The Sisterhood</p>
        <h1>Our Community</h1>
        <p className="lede">
          A gentle place for mothers and daughters to share, ask, and encourage
          one another. Kind words only — no personal contact information, and
          nothing you wouldn&rsquo;t say in front of your grandmother.
        </p>

        <form className="postform" onSubmit={share}>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Share something with the sisterhood…"
            value={msg}
            maxLength={1000}
            required
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Sharing…" : "Share"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="feed">
          {posts === null ? (
            <p className="muted">Loading the conversation…</p>
          ) : posts.length === 0 ? (
            <p className="muted">
              The room is quiet — be the first to say salaam.
            </p>
          ) : (
            posts.map((p) => (
              <div key={p.id} className="post">
                <p className="pname">
                  {p.name} <span className="pwhen">· {timeAgo(p.ts)}</span>
                </p>
                <p className="pmsg">{p.msg}</p>
                <Comments postId={p.id} />
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          background: #fbf6ef; color: #3d2b33;
          font-family: "Nunito Sans", sans-serif; font-size: 17px; line-height: 1.65;
        }
        a { color: inherit; }
        img { max-width: 100%; }
        :focus-visible { outline: 3px solid #b8923e; outline-offset: 2px; }
      `}</style>
      <style jsx>{`
        .page { max-width: 680px; margin: 0 auto; padding: 0 24px 80px; }
        .header { padding: 22px 0 8px; }
        .back { font-weight: 700; color: #8e3b53; text-decoration: none; }
        .logo-row { text-align: center; margin-top: 6px; }
        .logo { width: 84px; height: 84px; border-radius: 50%; }
        .eyebrow {
          text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.75rem;
          font-weight: 700; color: #b8923e; text-align: center; margin-top: 14px;
        }
        h1 {
          font-family: "Fraunces", serif; font-weight: 600;
          font-size: clamp(1.6rem, 4vw, 2.1rem); color: #5a2438;
          margin: 8px 0 8px; text-align: center;
        }
        .lede { text-align: center; color: #6e5e8e; font-size: 0.95rem; margin-bottom: 22px; }
        .postform { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
        .postform input, .postform textarea {
          font-family: "Nunito Sans", sans-serif; font-size: 1rem;
          padding: 12px 16px; border-radius: 14px; border: 2px solid #e3cdd6;
          background: #fff; color: #3d2b33; resize: vertical;
        }
        .postform input:focus, .postform textarea:focus { border-color: #8e3b53; outline: none; }
        .button {
          align-self: flex-end;
          background: #8e3b53; color: #fbf6ef; font-weight: 700; border: none;
          border-radius: 999px; padding: 12px 26px; font-size: 0.95rem; cursor: pointer;
          font-family: "Nunito Sans", sans-serif;
        }
        .button:hover { background: #7a3247; }
        .button:disabled { opacity: 0.6; }
        .error { color: #a33a3a; font-weight: 600; }
        .muted { color: #6e5e8e; text-align: center; }
        .post {
          background: #fff; border: 1px solid #f3d9e3; border-radius: 16px;
          padding: 18px; margin-bottom: 14px;
        }
        .pname { font-weight: 700; color: #5a2438; }
        .pwhen { font-weight: 400; color: #6e5e8e; font-size: 0.85rem; }
        .pmsg { margin-top: 4px; white-space: pre-wrap; }
      `}</style>
    </>
  );
}
