// pages/course/[slug].js — a single chapter of the course
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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

export async function getServerSideProps({ req, params }) {
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
  const idx = course.modules.findIndex((m) => m.slug === params.slug);
  if (idx === -1) return { notFound: true };
  return { props: { idx } };
}

export default function Chapter({ idx }) {
  const router = useRouter();
  const mod = course.modules[idx];
  const prev = idx > 0 ? course.modules[idx - 1] : null;
  const next = idx < course.modules.length - 1 ? course.modules[idx + 1] : null;

  const [lang, setLang] = useState("en");
  const [answers, setAnswers] = useState({});
  const [reading, setReading] = useState(false);
  const [marked, setMarked] = useState(false);
  const utterRef = useRef(null);

  // stop speech when leaving the page or switching language
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang, idx]);

  function toggleReadAloud() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
      return;
    }
    const text = (lang === "en" ? mod.en : mod.ar).join(" ");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "en" ? "en-US" : "ar-SA";
    u.rate = 0.95;
    u.onend = () => setReading(false);
    u.onerror = () => setReading(false);
    utterRef.current = u;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setReading(true);
  }

  function answer(qi, oi) {
    if (answers[qi] !== undefined) return; // one answer per question
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }

  const allAnswered = mod.quiz.every((_, qi) => answers[qi] !== undefined);

  async function completeAndGo(dest) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: mod.slug }),
      });
      setMarked(true);
    } catch {
      /* progress save is best-effort */
    }
    router.push(dest);
  }

  const paragraphs = lang === "en" ? mod.en : mod.ar;

  return (
    <>
      <Head>
        <title>{`${mod.title} — The Virtuous Girl`}</title>
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
          <Link href="/course/the-muslim-girl" className="back">← All chapters</Link>
          <div className="controls">
            <button
              className={lang === "en" ? "toggle active" : "toggle"}
              onClick={() => setLang("en")}
            >
              English
            </button>
            <button
              className={lang === "ar" ? "toggle active" : "toggle"}
              onClick={() => setLang("ar")}
            >
              العربية
            </button>
            <button className="toggle listen" onClick={toggleReadAloud}>
              {reading ? "◼ Stop" : "▶ Read to me"}
            </button>
          </div>
        </header>

        <p className="eyebrow">
          Chapter {mod.num} of {course.modules.length}
        </p>
        <h1>{lang === "en" ? mod.title : mod.titleAr}</h1>

        <div className="art">
          <img src={mod.image} alt={mod.title} />
        </div>

        <div className={lang === "ar" ? "text rtl" : "text"} dir={lang === "ar" ? "rtl" : "ltr"}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="divider" aria-hidden="true">
          <span className="rule" /><span className="star">✦</span><span className="rule" />
        </div>

        {/* ---- Quiz ---- */}
        <section className="quiz">
          <h2>Did you catch it?</h2>
          <p className="quiz-note">
            There&rsquo;s no grade here — just a little review, with love.
          </p>
          {mod.quiz.map((q, qi) => (
            <div key={qi} className="q">
              <p className="q-text">{q.q}</p>
              <div className="opts">
                {q.options.map((opt, oi) => {
                  const picked = answers[qi] === oi;
                  const answered = answers[qi] !== undefined;
                  const isCorrect = oi === q.correct;
                  let cls = "opt";
                  if (answered && picked && isCorrect) cls += " right";
                  if (answered && picked && !isCorrect) cls += " gentle";
                  if (answered && !picked && isCorrect) cls += " reveal";
                  return (
                    <button
                      key={oi}
                      className={cls}
                      onClick={() => answer(qi, oi)}
                      disabled={answered}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answers[qi] !== undefined && (
                <p className="feedback">
                  {answers[qi] === q.correct
                    ? q.feedback
                    : `Good try, habibti — the answer is: "${q.options[q.correct]}". ${q.feedback}`}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* ---- Talk to Mama ---- */}
        <section className="mama">
          <h2>💗 Talk to Mama</h2>
          <p className="mama-en">{mod.talkToMama}</p>
          <p className="mama-ar" dir="rtl">{mod.talkToMamaAr}</p>
        </section>

        {/* ---- Navigation ---- */}
        <div className="nav">
          {prev ? (
            <Link href={`/course/${prev.slug}`} className="nav-btn secondary">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <button
              className="nav-btn primary"
              onClick={() => completeAndGo(`/course/${next.slug}`)}
              disabled={!allAnswered}
              title={allAnswered ? "" : "Answer the review questions first"}
            >
              {allAnswered ? `Finish & continue → ${next.title}` : "Answer the review to continue"}
            </button>
          ) : (
            <button
              className="nav-btn primary"
              onClick={() => completeAndGo("/course/certificate")}
              disabled={!allAnswered}
            >
              {allAnswered ? "Finish the course → My certificate" : "Answer the review to finish"}
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          background: #fbf6ef; color: #3d2b33;
          font-family: "Nunito Sans", sans-serif; font-size: 17px; line-height: 1.7;
        }
        img { max-width: 100%; display: block; }
        a { color: inherit; }
        :focus-visible { outline: 3px solid #b8923e; outline-offset: 2px; }
      `}</style>
      <style jsx>{`
        .page { max-width: 720px; margin: 0 auto; padding: 0 24px 80px; }
        .header {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 10px; padding: 22px 0 8px;
        }
        .back { font-weight: 700; color: #8e3b53; text-decoration: none; }
        .controls { display: flex; gap: 8px; }
        .toggle {
          font-family: "Nunito Sans", sans-serif; font-size: 0.85rem; font-weight: 700;
          background: transparent; border: 2px solid #e3cdd6; color: #6e5e8e;
          border-radius: 999px; padding: 6px 14px; cursor: pointer;
        }
        .toggle.active { background: #f3d9e3; border-color: #8e3b53; color: #5a2438; }
        .toggle.listen { border-color: #b8923e; color: #8a6c2a; }
        .eyebrow {
          text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.75rem;
          font-weight: 700; color: #b8923e; margin-top: 16px;
        }
        h1 {
          font-family: "Fraunces", serif; font-weight: 600;
          font-size: clamp(1.5rem, 4vw, 2.1rem); color: #5a2438; margin: 6px 0 18px;
        }
        h2 {
          font-family: "Fraunces", serif; font-weight: 600; font-size: 1.3rem;
          color: #5a2438; margin-bottom: 8px;
        }
        .art img { border-radius: 14px; box-shadow: 0 14px 32px rgba(142, 59, 83, 0.15); }
        .text { margin-top: 22px; }
        .text p { margin-bottom: 14px; }
        .text.rtl { font-size: 1.12rem; }
        .divider { display: flex; align-items: center; gap: 16px; padding: 20px 0; }
        .rule { flex: 1; height: 1px; background: #e3cdd6; }
        .star { color: #b8923e; }
        /* quiz */
        .quiz-note { color: #6e5e8e; margin-bottom: 14px; }
        .q { margin-bottom: 20px; }
        .q-text { font-weight: 700; margin-bottom: 8px; }
        .opts { display: flex; flex-direction: column; gap: 8px; }
        .opt {
          text-align: left; font-family: "Nunito Sans", sans-serif; font-size: 0.98rem;
          background: #fff; border: 2px solid #e3cdd6; color: #3d2b33;
          border-radius: 12px; padding: 11px 16px; cursor: pointer;
        }
        .opt:hover:enabled { border-color: #8e3b53; }
        .opt:disabled { cursor: default; opacity: 0.92; }
        .opt.right { border-color: #6d9d54; background: #eef6e8; }
        .opt.gentle { border-color: #d8b23e; background: #fbf3dc; }
        .opt.reveal { border-color: #6d9d54; }
        .feedback { margin-top: 8px; color: #40632f; font-weight: 600; }
        /* mama */
        .mama {
          background: #fff; border: 1px solid #f3d9e3; border-radius: 16px;
          padding: 22px; margin-top: 30px;
        }
        .mama-en { font-weight: 600; margin-bottom: 8px; }
        .mama-ar { color: #6e5e8e; font-size: 1.05rem; }
        /* nav */
        .nav {
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px; margin-top: 34px; flex-wrap: wrap;
        }
        .nav-btn {
          font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 0.98rem;
          border-radius: 999px; padding: 13px 22px; cursor: pointer; text-decoration: none;
          border: 2px solid #8e3b53;
        }
        .nav-btn.primary { background: #8e3b53; color: #fbf6ef; }
        .nav-btn.primary:hover:enabled { background: #7a3247; }
        .nav-btn.primary:disabled { opacity: 0.55; cursor: not-allowed; }
        .nav-btn.secondary { background: transparent; color: #8e3b53; }
        @media (max-width: 560px) {
          .nav { flex-direction: column-reverse; align-items: stretch; }
          .nav-btn { text-align: center; }
        }
      `}</style>
    </>
  );
}
