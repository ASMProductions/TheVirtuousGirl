// pages/course/index.js — course home: unlock screen or chapter list
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import course from "../../data/course";
import catalog from "../../data/catalog";

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
      const identity = await redisGet(`tvg:session:${match[1]}`);
      authed = Boolean(identity);
    } catch {
      authed = false;
    }
  }
  return { props: { authed } };
}

export default function CourseHome({ authed }) {
  const [mode, setMode] = useState("code"); // code | email
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState({});

  useEffect(() => {
    if (!authed) return;
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : { done: {} }))
      .then((d) => setDone(d.done || {}))
      .catch(() => {});
  }, [authed]);

  async function unlock(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const body = mode === "code" ? { code: value } : { email: value };
      const r = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      if (mode === "code") {
        window.location.reload();
      } else {
        setStatus("sent");
        setMessage(data.message || "Check your inbox for your sign-in link.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const completed = course.modules.filter((m) => done[m.slug]).length;
  const allDone = completed === course.modules.length;

  return (
    <>
      <Head>
        <title>The Course — The Virtuous Girl</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=fraunces:600,700|nunito-sans:400,600,700"
          rel="stylesheet"
        />
      </Head>

      <div className="page">
        <header className="header">
          <Link href="/" className="home-link">The Virtuous Girl</Link>
        </header>

        {!authed ? (
          <section className="gate">
            <h1>{course.title}</h1>
            <p className="byline">by {course.author}</p>
            <p className="gate-copy">
              This course is for enrolled families. Sign in with your access
              code, or with the email you enrolled with.
            </p>
            <div className="tabs">
              <button
                className={mode === "code" ? "tab active" : "tab"}
                onClick={() => { setMode("code"); setValue(""); setStatus("idle"); setMessage(""); }}
              >
                I have a code
              </button>
              <button
                className={mode === "email" ? "tab active" : "tab"}
                onClick={() => { setMode("email"); setValue(""); setStatus("idle"); setMessage(""); }}
              >
                Sign in by email
              </button>
            </div>
            {status === "sent" ? (
              <p className="sent">{message}</p>
            ) : (
              <form className="form" onSubmit={unlock}>
                <input
                  type={mode === "email" ? "email" : "text"}
                  required
                  placeholder={mode === "code" ? "Access code" : "Your email address"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-label={mode === "code" ? "Access code" : "Email address"}
                />
                <button className="button" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "One moment…" : "Open the course"}
                </button>
              </form>
            )}
            {status === "error" && <p className="error">{message}</p>}
          </section>
        ) : (
          <section className="dash">
            <p className="eyebrow">Course One</p>
            <h1>{course.title}</h1>
            <p className="byline">by {course.author}</p>
            <p className="progress-line">
              {completed} of {course.modules.length} chapters complete
            </p>
            {allDone && (
              <p className="cert-invite">
                Masha&rsquo;Allah — every chapter is done!{" "}
                <Link href="/course/certificate">Claim your certificate →</Link>
              </p>
            )}
            <ol className="modules">
              {course.modules.map((m) => (
                <li key={m.slug} className={done[m.slug] ? "mod done" : "mod"}>
                  <Link href={`/course/${m.slug}`} className="mod-link">
                    <span className="mod-check" aria-hidden="true">
                      {done[m.slug] ? "✓" : m.num}
                    </span>
                    <span className="mod-titles">
                      <span className="mod-title">{m.title}</span>
                      <span className="mod-title-ar">{m.titleAr}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <p className="eyebrow">Coming to the Library</p>
            <h2 className="lib-head">
              Every course below is included in your enrollment
            </h2>
            <div className="lib">
              {catalog.map((c) => (
                <div key={c.title} className="lib-card">
                  <p className="lib-soon">Coming soon</p>
                  <p className="lib-title">{c.title}</p>
                  <p className="lib-title-ar">{c.titleAr}</p>
                  <p className="lib-blurb">{c.blurb}</p>
                </div>
              ))}
            </div>

            <p className="eyebrow">Resource Library</p>
            <div className="lib">
              <div className="lib-card">
                <p className="lib-soon">Coming soon</p>
                <p className="lib-title">The Resource Library</p>
                <p className="lib-title-ar">مكتبة الموارد</p>
                <p className="lib-blurb">
                  Printables, du&rsquo;a cards, cycle trackers, conversation
                  guides for mothers, and reference material for every course
                  &mdash; all in one place.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          background: #fbf6ef; color: #3d2b33;
          font-family: "Nunito Sans", sans-serif; font-size: 17px; line-height: 1.65;
        }
        a { color: inherit; }
        :focus-visible { outline: 3px solid #b8923e; outline-offset: 2px; }
      `}</style>
      <style jsx>{`
        .page { max-width: 760px; margin: 0 auto; padding: 0 24px 80px; }
        .header { padding: 26px 0 10px; text-align: center; }
        .home-link {
          font-family: "Fraunces", serif; font-weight: 700; font-size: 1.2rem;
          color: #8e3b53; text-decoration: none;
        }
        h1 {
          font-family: "Fraunces", serif; font-weight: 600;
          font-size: clamp(1.6rem, 4vw, 2.2rem); color: #5a2438;
          margin: 10px 0 6px; text-align: center;
        }
        .byline { color: #6e5e8e; text-align: center; margin-bottom: 18px; }
        .eyebrow {
          text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.75rem;
          font-weight: 700; color: #b8923e; text-align: center; margin-top: 26px;
        }
        /* Gate */
        .gate { text-align: center; padding-top: 30px; }
        .gate-copy { max-width: 30em; margin: 0 auto 22px; }
        .tabs { display: flex; gap: 8px; justify-content: center; margin-bottom: 18px; }
        .tab {
          font-family: "Nunito Sans", sans-serif; font-size: 0.92rem; font-weight: 700;
          background: transparent; border: 2px solid #e3cdd6; color: #6e5e8e;
          border-radius: 999px; padding: 8px 18px; cursor: pointer;
        }
        .tab.active { background: #f3d9e3; border-color: #8e3b53; color: #5a2438; }
        .form { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        input {
          font-family: "Nunito Sans", sans-serif; font-size: 1rem;
          padding: 13px 18px; border-radius: 999px; border: 2px solid #e3cdd6;
          background: #fff; color: #3d2b33; min-width: 260px;
        }
        input:focus { border-color: #8e3b53; outline: none; }
        .button {
          background: #8e3b53; color: #fbf6ef; font-weight: 700; border: none;
          border-radius: 999px; padding: 13px 26px; font-size: 1rem; cursor: pointer;
          font-family: "Nunito Sans", sans-serif;
        }
        .button:hover { background: #7a3247; }
        .button:disabled { opacity: 0.6; cursor: wait; }
        .sent { color: #5a7a4a; font-weight: 700; max-width: 30em; margin: 0 auto; }
        .error { margin-top: 12px; color: #a33a3a; font-weight: 600; }
        /* Dashboard */
        .progress-line { text-align: center; color: #b8923e; font-weight: 700; margin-bottom: 8px; }
        .cert-invite { text-align: center; color: #5a7a4a; font-weight: 700; margin-bottom: 8px; }
        .cert-invite :global(a) { color: #8e3b53; }
        .modules { list-style: none; margin-top: 22px; }
        .mod { margin-bottom: 10px; }
        .mod-link {
          display: flex; align-items: center; gap: 16px; text-decoration: none;
          background: #fff; border: 1px solid #f3d9e3; border-radius: 14px;
          padding: 14px 18px;
        }
        .mod-link:hover { border-color: #8e3b53; }
        .mod-check {
          flex: 0 0 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #f3d9e3; color: #5a2438; font-weight: 700;
        }
        .mod.done .mod-check { background: #dcebd3; color: #40632f; }
        .mod-titles { display: flex; flex-direction: column; }
        .mod-title { font-weight: 700; color: #5a2438; }
        .mod-title-ar { font-size: 0.9rem; color: #6e5e8e; }
        /* library */
        .lib-head {
          font-family: "Fraunces", serif; font-weight: 600; font-size: 1.15rem;
          color: #5a2438; text-align: center; margin-bottom: 16px;
        }
        .lib {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px; margin-bottom: 10px;
        }
        .lib-card {
          background: #fff; border: 1px dashed #d9b9c6; border-radius: 14px;
          padding: 18px; opacity: 0.92;
        }
        .lib-soon {
          text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.68rem;
          font-weight: 700; color: #b8923e; margin-bottom: 6px;
        }
        .lib-title { font-weight: 700; color: #5a2438; }
        .lib-title-ar { font-size: 0.9rem; color: #6e5e8e; margin-bottom: 6px; }
        .lib-blurb { font-size: 0.9rem; color: #3d2b33; }
      `}</style>
    </>
  );
}
