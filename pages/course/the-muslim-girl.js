// pages/course/the-muslim-girl.js — Course One: chapter list & progress
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import course from "../../data/course";

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

export default function CourseOne() {
  const [done, setDone] = useState({});

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : { done: {} }))
      .then((d) => setDone(d.done || {}))
      .catch(() => {});
  }, []);

  const completed = course.modules.filter((m) => done[m.slug]).length;
  const allDone = completed === course.modules.length;

  return (
    <>
      <Head>
        <title>{`${course.title} — The Virtuous Girl`}</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/logo.png" />
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

        <img className="pagelogo" src="/logo.png" alt="The Virtuous Girl logo" />
        <div className="logo-row">
          <img className="logo" src="/logo.png" alt="The Virtuous Girl logo" />
        </div>
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
        .header { padding: 22px 0 8px; }
        .back { font-weight: 700; color: #8e3b53; text-decoration: none; }
        .logo-row { text-align: center; margin-top: 6px; }
        .logo { width: 56px; height: 56px; border-radius: 50%; }
        .pagelogo {
          display: block;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin: 10px auto 0;
        }
        .eyebrow {
          text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.75rem;
          font-weight: 700; color: #b8923e; text-align: center; margin-top: 14px;
        }
        h1 {
          font-family: "Fraunces", serif; font-weight: 600;
          font-size: clamp(1.6rem, 4vw, 2.1rem); color: #5a2438;
          margin: 8px 0 4px; text-align: center;
        }
        .byline { color: #6e5e8e; text-align: center; margin-bottom: 10px; }
        .progress-line { text-align: center; color: #b8923e; font-weight: 700; margin-bottom: 8px; }
        .cert-invite { text-align: center; color: #5a7a4a; font-weight: 700; margin-bottom: 8px; }
        .cert-invite :global(a) { color: #8e3b53; }
        .modules { list-style: none; margin-top: 20px; }
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
      `}</style>
    </>
  );
}
