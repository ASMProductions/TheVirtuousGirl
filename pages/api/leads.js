// POST /api/leads — stores email in Redis, then sends the Mother's Checklist.
// Redis: raw fetch with POST body format (colon-safe), per established Upstash pattern.
// Email: HostGator SMTP via nodemailer (noreply@thevirtuousgirl.com).

import nodemailer from "nodemailer";

const SITE = "https://thevirtuousgirl.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  const clean = typeof email === "string" ? email.toLowerCase().trim() : "";

  if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // 1) Store the lead
  try {
    const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SADD", "leads:mothers-checklist", clean]),
    });
    if (!r.ok) throw new Error("Redis request failed");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }

  // 2) Send the checklist email (lead is already saved; email failure is non-fatal)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The Virtuous Girl" <${process.env.SMTP_USER}>`,
      to: clean,
      subject: "Your Mother's Checklist is here",
      text:
        "Assalamu alaikum,\n\n" +
        "Thank you for requesting The Mother's Checklist — the five signs your " +
        "daughter is approaching her first period, and what to have ready before " +
        "the day comes.\n\n" +
        "Download your checklist here:\n" +
        SITE + "/mothers-checklist.pdf\n\n" +
        "We'll let you know the moment enrollment opens for our first course, " +
        "The Muslim Girl: A Guide to Puberty and Purity.\n\n" +
        "The Virtuous Girl\n" +
        SITE + "\n",
      html: `
        <div style="background:#FBF6EF;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#3D2B33;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;border:1px solid #F3D9E3;">
            <p style="text-align:center;margin:0 0 10px;"><img src="https://thevirtuousgirl.com/logo.png" width="64" height="64" alt="The Virtuous Girl" style="border-radius:50%;" /></p>
            <p style="text-align:center;letter-spacing:2px;font-size:11px;color:#B8923E;margin:0 0 18px;"><strong>THE VIRTUOUS GIRL</strong></p>
            <h1 style="font-family:Georgia,serif;color:#5A2438;font-size:24px;text-align:center;margin:0 0 16px;">Your Mother&rsquo;s Checklist is here</h1>
            <p style="font-size:15px;line-height:1.6;margin:0 0 14px;">Assalamu alaikum,</p>
            <p style="font-size:15px;line-height:1.6;margin:0 0 14px;">
              Thank you for requesting <em>The Mother&rsquo;s Checklist</em> &mdash; the five signs your
              daughter is approaching her first period, and exactly what to have ready before the day comes.
            </p>
            <p style="text-align:center;margin:26px 0;">
              <a href="${SITE}/mothers-checklist.pdf"
                 style="background:#8E3B53;color:#FBF6EF;text-decoration:none;font-weight:bold;padding:13px 28px;border-radius:999px;font-size:15px;display:inline-block;">
                Download the checklist
              </a>
            </p>
            <p style="font-size:14px;line-height:1.6;color:#6E5E8E;margin:0 0 6px;">
              We&rsquo;ll let you know the moment enrollment opens for our first course,
              <strong>The Muslim Girl: A Guide to Puberty and Purity</strong>.
            </p>
            <hr style="border:none;border-top:1px solid #F3D9E3;margin:22px 0;" />
            <p style="font-size:12px;color:#6E5E8E;text-align:center;margin:0;">
              The Virtuous Girl &middot; <a href="${SITE}" style="color:#8E3B53;">thevirtuousgirl.com</a>
            </p>
          </div>
        </div>`,
    });
  } catch (err) {
    // Lead is stored; don't fail the signup over an email hiccup.
    console.error("Checklist email failed:", err && err.message);
  }

  return res.status(200).json({ ok: true });
}
