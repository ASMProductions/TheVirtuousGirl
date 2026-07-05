import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  async function joinList(e) {
    if (e) e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (!r.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Head>
        <title>The Virtuous Girl — Raising Women of Virtue</title>
        <meta
          name="description"
          content="A course platform for Muslim mothers raising daughters — from girlhood to womanhood. Course One: The Muslim Girl, A Guide to Puberty and Purity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=fraunces:600,700|nunito-sans:400,600,700"
          rel="stylesheet"
        />
      </Head>

      <div className="page">
        {/* ===== Header ===== */}
        <header className="header">
          <div className="wordmark">
            <span className="wordmark-main">The Virtuous Girl</span>
            <span className="wordmark-arabic">تربية نساء الفضيلة</span>
          </div>
          <a className="signin" href="/course">
            Member sign-in
          </a>
        </header>

        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">From girlhood to womanhood</p>
            <h1>
              She is going to grow up.
              <br />
              Help her do it with grace.
            </h1>
            <p className="lede">
              The Virtuous Girl is a home for mothers raising daughters — courses
              that prepare a girl for her body, her home, her character, and her
              faith, taught with the warmth of a big sister and the grounding of
              Islamic teaching.
            </p>
            <a className="button" href="#checklist">
              Get the free Mother&rsquo;s Checklist
            </a>
          </div>
          <div className="hero-art">
            <img
              src="/cover.png"
              alt="Book cover: The Muslim Girl — A Guide to Puberty and Purity, by Fatima Ezzahra Muhammad"
            />
          </div>
        </section>

        <div className="divider" aria-hidden="true">
          <span className="rule" />
          <span className="star">✦</span>
          <span className="rule" />
        </div>

        {/* ===== Course One ===== */}
        <section className="course">
          <p className="eyebrow">Course One — opening soon</p>
          <h2>The Muslim Girl: A Guide to Puberty and Purity</h2>
          <p className="byline">by Fatima Ezzahra Muhammad</p>
          <p className="course-copy">
            A gentle, fully illustrated course for girls ages 8 and up — before
            the questions get harder to ask. Across twelve chapters, your
            daughter learns what is happening to her body, how to care for
            herself with safe and natural products, how purity and prayer work
            during her cycle, and how to step into this season with confidence
            instead of shame. Every chapter ends with a short review and a
            &ldquo;Talk to Mama&rdquo; question that brings the conversation
            back to you.
          </p>
          <p className="course-copy">
            She reads it like a storybook. You get the daughter who was prepared
            &mdash; and the conversations you were hoping to have. And this is
            only the beginning: enrollment covers every course we add &mdash;
            from first hygiene through the kitchen, character, and the journey
            to womanhood.
          </p>
          {process.env.NEXT_PUBLIC_STRIPE_LINK_MONTHLY &&
          process.env.NEXT_PUBLIC_STRIPE_LINK_ANNUAL &&
          process.env.NEXT_PUBLIC_STRIPE_LINK_LIFETIME ? (
            <div className="pricing">
              <div className="plan">
                <p className="plan-name">Monthly</p>
                <p className="plan-price">
                  <strong>$9</strong>/month
                </p>
                <p className="plan-copy">
                  Every course, every chapter, as the library grows. Cancel
                  anytime.
                </p>
                <a
                  className="button"
                  href={process.env.NEXT_PUBLIC_STRIPE_LINK_MONTHLY}
                >
                  Enroll monthly
                </a>
              </div>
              <div className="plan">
                <p className="plan-name">Annual</p>
                <p className="plan-price">
                  <strong>$97</strong>/year
                </p>
                <p className="plan-copy">
                  One payment a year, full access to everything. The sensible
                  choice.
                </p>
                <a
                  className="button"
                  href={process.env.NEXT_PUBLIC_STRIPE_LINK_ANNUAL}
                >
                  Enroll yearly
                </a>
              </div>
              <div className="plan featured">
                <p className="plan-name">Lifetime</p>
                <p className="plan-price">
                  <strong>$197</strong> once
                </p>
                <p className="plan-copy">
                  One payment. Every course, forever &mdash; for your whole
                  family.
                </p>
                <a
                  className="button"
                  href={process.env.NEXT_PUBLIC_STRIPE_LINK_LIFETIME}
                >
                  Get lifetime access
                </a>
              </div>
            </div>
          ) : (
            <p className="price">Enrollment opens soon.</p>
          )}
        </section>

        <div className="divider" aria-hidden="true">
          <span className="rule" />
          <span className="star">✦</span>
          <span className="rule" />
        </div>

        {/* ===== Lead magnet ===== */}
        <section className="capture" id="checklist">
          <h2>Is she closer than you think?</h2>
          <p className="capture-copy">
            Get <em>The Mother&rsquo;s Checklist</em> — the five signs your
            daughter is approaching her first period, and exactly what to have
            ready before the day comes. Free, and we&rsquo;ll let you know the
            moment enrollment opens.
          </p>

          {status === "done" ? (
            <p className="thanks">
              You&rsquo;re on the list. Watch your inbox for the checklist.
            </p>
          ) : (
            <form className="form" onSubmit={joinList}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button
                className="button"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send me the checklist"}
              </button>
            </form>
          )}
          {status === "error" && <p className="error">{message}</p>}
        </section>

        {/* ===== Footer ===== */}
        <footer className="footer">
          <p>
            The Virtuous Girl · Raising women of virtue, from girlhood to
            womanhood
          </p>
          <p className="footer-small">
            <a href="/course">Member sign-in</a>
          </p>
          <p className="footer-small">
            © {new Date().getFullYear()} ASM Productions LLC. All rights
            reserved.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html,
        body {
          background: #fbf6ef;
          color: #3d2b33;
          font-family: "Nunito Sans", sans-serif;
          font-size: 17px;
          line-height: 1.65;
        }
        img {
          max-width: 100%;
          display: block;
        }
        a {
          color: inherit;
        }
        :focus-visible {
          outline: 3px solid #b8923e;
          outline-offset: 2px;
        }
      `}</style>

      <style jsx>{`
        .page {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .header {
          padding: 22px 0 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .signin {
          font-weight: 700;
          font-size: 0.92rem;
          color: #8e3b53;
          text-decoration: none;
          border: 2px solid #8e3b53;
          border-radius: 999px;
          padding: 9px 20px;
          white-space: nowrap;
        }
        .signin:hover {
          background: #8e3b53;
          color: #fbf6ef;
        }
        .wordmark-main {
          font-family: "Fraunces", serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #8e3b53;
          display: block;
        }
        .wordmark-arabic {
          display: block;
          font-size: 0.85rem;
          color: #6e5e8e;
          margin-top: 2px;
        }

        /* Hero */
        .hero {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 48px 0 56px;
        }
        .hero-text {
          flex: 1.2;
        }
        .hero-art {
          flex: 0.8;
        }
        .hero-art img {
          border-radius: 10px;
          box-shadow: 0 18px 40px rgba(142, 59, 83, 0.18);
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.78rem;
          font-weight: 700;
          color: #b8923e;
          margin-bottom: 14px;
        }
        h1 {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: clamp(2rem, 4.4vw, 3rem);
          line-height: 1.15;
          color: #5a2438;
          margin-bottom: 18px;
        }
        .lede {
          font-size: 1.06rem;
          max-width: 34em;
          margin-bottom: 28px;
        }

        /* Button */
        .button {
          display: inline-block;
          background: #8e3b53;
          color: #fbf6ef;
          font-weight: 700;
          text-decoration: none;
          border: none;
          border-radius: 999px;
          padding: 14px 30px;
          font-size: 1rem;
          cursor: pointer;
          font-family: "Nunito Sans", sans-serif;
        }
        .button:hover {
          background: #7a3247;
        }
        .button:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
        }
        .rule {
          flex: 1;
          height: 1px;
          background: #e3cdd6;
        }
        .star {
          color: #b8923e;
          font-size: 1.1rem;
        }

        /* Course section */
        .course {
          padding: 56px 0;
          text-align: center;
        }
        h2 {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          color: #5a2438;
          margin-bottom: 8px;
        }
        .byline {
          color: #6e5e8e;
          font-weight: 600;
          margin-bottom: 22px;
        }
        .course-copy {
          max-width: 44em;
          margin: 0 auto 18px;
        
        }
        .price {
          margin-top: 10px;
          color: #8e3b53;
          font-size: 1.05rem;
        }
        .pricing {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 26px;
        }
        .plan {
          background: #fff;
          border: 1px solid #f3d9e3;
          border-radius: 16px;
          padding: 26px 28px;
          width: 300px;
          text-align: center;
        }
        .plan.featured {
          border: 2px solid #b8923e;
        }
        .plan-name {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.75rem;
          font-weight: 700;
          color: #b8923e;
          margin-bottom: 8px;
        }
        .plan-price {
          font-family: "Fraunces", serif;
          font-size: 1.3rem;
          color: #5a2438;
          margin-bottom: 8px;
        }
        .plan-price strong {
          font-size: 2rem;
        }
        .plan-copy {
          font-size: 0.95rem;
          margin-bottom: 18px;
        }

        /* Capture */
        .capture {
          padding: 56px 0 64px;
          text-align: center;
        }
        .capture-copy {
          max-width: 38em;
          margin: 14px auto 28px;
        }
        .form {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        input[type="email"] {
          font-family: "Nunito Sans", sans-serif;
          font-size: 1rem;
          padding: 13px 18px;
          border-radius: 999px;
          border: 2px solid #e3cdd6;
          background: #fff;
          color: #3d2b33;
          min-width: 280px;
        }
        input[type="email"]:focus {
          border-color: #8e3b53;
          outline: none;
        }
        .thanks {
          font-weight: 700;
          color: #5a7a4a;
          font-size: 1.05rem;
        }
        .error {
          margin-top: 12px;
          color: #a33a3a;
          font-weight: 600;
        }

        /* Footer */
        .footer {
          border-top: 1px solid #e3cdd6;
          padding: 28px 0 40px;
          text-align: center;
          color: #6e5e8e;
        }
        .footer-small {
          font-size: 0.85rem;
          margin-top: 6px;
        }

        /* Mobile */
        @media (max-width: 760px) {
          .hero {
            flex-direction: column-reverse;
            gap: 32px;
            padding: 28px 0 40px;
            text-align: center;
          }
          .hero-art {
            max-width: 280px;
          }
          .course-copy {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
