// pages/api/auth.js — course access for The Virtuous Girl
// POST { code }  -> validate access code, create session, set cookie
// POST { email } -> if member (tvg:members set), email a magic link
// GET  ?token=x  -> validate one-time login token, set cookie, redirect /course
// Sessions: tvg:session:{token} -> identity, 30-day expiry.
// Session index: tvg:sessions:{email} -> set of session tokens (for refund revocation).
// Uses raw Upstash fetch (command-in-body) per established pattern.

import nodemailer from "nodemailer";
import crypto from "crypto";

const SITE = "https://thevirtuousgirl.com";
const SESSION_DAYS = 30;

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

function newToken() {
  return crypto.randomBytes(24).toString("hex");
}

function sessionCookie(token) {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `tvg_session=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export default async function handler(req, res) {
  // ---- Magic-link landing ----
  if (req.method === "GET") {
    const { token } = req.query || {};
    if (!token) return res.redirect("/course");
    try {
      const identity = await redis(["GETDEL", `tvg:login:${token}`]);
      if (!identity) {
        return res.redirect("/course?error=expired");
      }
      const session = newToken();
      const ttl = String(SESSION_DAYS * 24 * 60 * 60);
      await redis(["SET", `tvg:session:${session}`, identity, "EX", ttl]);
      // Index sessions by email so a refund can revoke them instantly.
      // (Access-code identities like "code:X" are not indexed.)
      if (identity.includes("@")) {
        await redis(["SADD", `tvg:sessions:${identity}`, session]);
        await redis(["EXPIRE", `tvg:sessions:${identity}`, ttl]);
      }
      res.setHeader("Set-Cookie", sessionCookie(session));
      return res.redirect("/course");
    } catch {
      return res.redirect("/course?error=server");
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, email } = req.body || {};

  // ---- Access code path ----
  if (code) {
    const clean = String(code).trim().toUpperCase();
    const validCode = (process.env.COURSE_ACCESS_CODE || "").toUpperCase();
    let ok = validCode && clean === validCode;
    if (!ok) {
      try {
        ok = (await redis(["SISMEMBER", "tvg:codes", clean])) === 1;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      return res.status(401).json({ error: "That access code isn't valid." });
    }
    try {
      const session = newToken();
      await redis([
        "SET",
        `tvg:session:${session}`,
        `code:${clean}`,
        "EX",
        String(SESSION_DAYS * 24 * 60 * 60),
      ]);
      res.setHeader("Set-Cookie", sessionCookie(session));
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  }

  // ---- Email magic-link path ----
  if (email) {
    const clean = String(email).toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    try {
      const isMember = (await redis(["SISMEMBER", "tvg:members", clean])) === 1;
      // Always answer the same way, so addresses can't be fished.
      if (isMember) {
        const token = newToken();
        await redis(["SET", `tvg:login:${token}`, clean, "EX", "900"]); // 15 min
        const link = `${SITE}/api/auth?token=${token}`;
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: Number(process.env.SMTP_PORT || 465) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({
          from: `"The Virtuous Girl" <${process.env.SMTP_USER}>`,
          replyTo: "info@thevirtuousgirl.com",
          to: clean,
          subject: "Your sign-in link — The Virtuous Girl",
          text:
            "Assalamu alaikum,\n\nHere is your sign-in link for the course:\n" +
            link +
            "\n\nThis link works once and expires in 15 minutes.\n\nThe Virtuous Girl\n" +
            SITE,
          html: `
            <div style="background:#FBF6EF;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#3D2B33;">
              <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #F3D9E3;">
                <p style="text-align:center;letter-spacing:2px;font-size:11px;color:#B8923E;margin:0 0 18px;"><strong>THE VIRTUOUS GIRL</strong></p>
                <h1 style="font-family:Georgia,serif;color:#5A2438;font-size:22px;text-align:center;margin:0 0 16px;">Your sign-in link</h1>
                <p style="font-size:15px;line-height:1.6;">Assalamu alaikum — tap the button below to open your course. The link works once and expires in 15 minutes.</p>
                <p style="text-align:center;margin:26px 0;">
                  <a href="${link}" style="background:#8E3B53;color:#FBF6EF;text-decoration:none;font-weight:bold;padding:13px 28px;border-radius:999px;font-size:15px;display:inline-block;">Open my course</a>
                </p>
                <p style="font-size:12px;color:#6E5E8E;text-align:center;margin:0;">The Virtuous Girl · <a href="${SITE}" style="color:#8E3B53;">thevirtuousgirl.com</a></p>
              </div>
            </div>`,
        });
      }
      return res.status(200).json({
        ok: true,
        message:
          "If that email has course access, a sign-in link is on its way. Check your inbox (and spam folder).",
      });
    } catch {
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  }

  return res.status(400).json({ error: "Enter an access code or your email." });
}
