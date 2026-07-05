// pages/course/certificate.js — printable completion certificate
import { useState } from "react";
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

export default function Certificate() {
  const [name, setName] = useState("");
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>My Certificate — The Virtuous Girl</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=fraunces:600,700|nunito-sans:400,600,700"
          rel="stylesheet"
        />
      </Head>

      <div className="page">
        <div className="tools no-print">
          <Link href="/course" className="back">← All chapters</Link>
          <div className="name-entry">
            <label htmlFor="girlname">Her name:</label>
            <input
              id="girlname"
              type="text"
              placeholder="Type her name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
            />
            <button className="button" onClick={() => window.print()}>
              Print my certificate
            </button>
          </div>
        </div>

        <div className="cert">
          <p className="brand">THE VIRTUOUS GIRL</p>
          <div className="divider" aria-hidden="true">
            <span className="rule" /><span className="star">✦</span><span className="rule" />
          </div>
          <h1>Certificate of Completion</h1>
          <p className="present">This certifies, with joy, that</p>
          <p className="name">{name || "________________"}</p>
          <p className="body">
            has completed all {course.modules.length} chapters of
          </p>
          <p className="course-title">{course.title}</p>
          <p className="course-title-ar">{course.titleAr}</p>
          <p className="body">
            and is prepared — in body, in knowledge, and in deen —
            for her beautiful journey into womanhood.
          </p>
          <p className="declare">I am strong. I am beautiful. I am healthy.</p>
          <div className="divider" aria-hidden="true">
            <span className="rule" /><span className="star">✦</span><span className="rule" />
          </div>
          <div className="foot">
            <span>{today}</span>
            <span>by {course.author}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          background: #fbf6ef; color: #3d2b33;
          font-family: "Nunito Sans", sans-serif; font-size: 17px; line-height: 1.65;
        }
        a { color: inherit; }
        @media print {
          .no-print { display: none !important; }
          html, body { background: #fff; }
        }
      `}</style>
      <style jsx>{`
        .page { max-width: 820px; margin: 0 auto; padding: 24px; }
        .tools {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 14px; margin-bottom: 24px;
        }
        .back { font-weight: 700; color: #8e3b53; text-decoration: none; }
        .name-entry { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        label { font-weight: 700; color: #5a2438; }
        input {
          font-family: "Nunito Sans", sans-serif; font-size: 1rem;
          padding: 10px 16px; border-radius: 999px; border: 2px solid #e3cdd6;
          background: #fff; color: #3d2b33;
        }
        input:focus { border-color: #8e3b53; outline: none; }
        .button {
          background: #8e3b53; color: #fbf6ef; font-weight: 700; border: none;
          border-radius: 999px; padding: 11px 22px; font-size: 0.95rem; cursor: pointer;
          font-family: "Nunito Sans", sans-serif;
        }
        .button:hover { background: #7a3247; }
        /* certificate */
        .cert {
          background: #fffdf9; border: 3px double #b8923e; border-radius: 8px;
          padding: 56px 48px; text-align: center;
        }
        .brand { letter-spacing: 0.22em; font-size: 0.75rem; font-weight: 700; color: #b8923e; }
        h1 {
          font-family: "Fraunces", serif; font-weight: 700; font-size: 2.1rem;
          color: #5a2438; margin: 10px 0 4px;
        }
        .present { color: #6e5e8e; }
        .name {
          font-family: "Fraunces", serif; font-size: 2rem; color: #8e3b53;
          margin: 16px 0; border-bottom: 2px solid #f3d9e3; display: inline-block;
          padding: 0 24px 6px; min-width: 300px;
        }
        .body { max-width: 34em; margin: 6px auto; }
        .course-title {
          font-family: "Fraunces", serif; font-size: 1.25rem; color: #5a2438;
          font-weight: 600; margin-top: 6px;
        }
        .course-title-ar { color: #6e5e8e; margin-bottom: 6px; }
        .declare {
          font-family: "Fraunces", serif; font-style: italic; font-size: 1.15rem;
          color: #b8923e; margin: 18px 0 4px;
        }
        .divider { display: flex; align-items: center; gap: 16px; padding: 14px 0; }
        .rule { flex: 1; height: 1px; background: #e3cdd6; }
        .star { color: #b8923e; }
        .foot {
          display: flex; justify-content: space-between; color: #6e5e8e;
          font-size: 0.9rem; margin-top: 8px;
        }
        @media (max-width: 560px) {
          .cert { padding: 36px 20px; }
          .name { min-width: 0; }
        }
      `}</style>
    </>
  );
}
