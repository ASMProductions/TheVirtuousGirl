// pages/api/sequence/send-emails.js
// TVG The Virtuous Girl - Email sequence sender
// Triggered by GitHub Action 3x weekly (Mon/Wed/Fri) at 2am UTC

import nodemailer from "nodemailer";

const SITE = "https://thevirtuousgirl.com";
const FUNNEL_KEY = "mothers-checklist";

// Email sequence (7 emails)
const emailSequence = [
  {
    step: 1,
    subject: "Your Mother's Checklist is here — and you are already doing the work",
    day: 0,
    body: `Assalamu alaikum, Sister,

Your Mother's Checklist is ready. Download it now.

You asked for it. That means you have already made the choice: to prepare your daughter with knowledge instead of fear, with dignity instead of shame.

That is the entire journey right there.

The checklist is practical. Five signs. What to have ready. What to say when you are not sure how. But more than that — it is permission. Permission to have this conversation. Permission to claim your role as the one who teaches her, not the culture.

Your silence is not protection. Your knowledge is.

Download the checklist. Read it. Know that every mother who has done this was nervous. That is not a sign you are unprepared. That is a sign you care.

You have this, sister.

In your corner,
Fatima Ezzahra
The Virtuous Girl`,
  },
  {
    step: 2,
    subject: "What I wish someone had told me",
    dayRange: [2, 4],
    body: `My own mother did not have this conversation with me.

Not because she did not love me. Because nobody had taught her how.

When my daughter came to me confused and scared, asking questions I did not know how to answer, I felt like I had failed her. Like I had let her down.

What I learned — and what transformed everything — is that my silence was the message. It was teaching her: your body is not safe to talk about. Your questions are not welcome. This is shameful.

I decided different for my daughter.

I prepared. I read. I talked to her before it happened, not after. And the look on her face — the relief, the safety, the fact that she felt held by me — that changed everything.

She asked me questions because she knew she could. She trusted me because I had shown her: "This is normal. You are normal. I am here for you."

That is the journey. And it starts with you deciding to break the cycle.

Your daughter is waiting to see if you can handle this with grace. If you are comfortable with her body changing. If it is safe to ask you questions.

The checklist gives you the words. The course gives you the framework for all of it.

But first: you have to decide. And you already have.

With blessing and wisdom,
Sister Fatima Ezzahra`,
  },
  {
    step: 3,
    subject: "What hundreds of mothers are discovering together",
    dayRange: [5, 6],
    body: `This is what mothers have been telling us:

"I read the checklist with my daughter. She asked so many questions. Real ones. Like she finally felt safe enough to ask."

"For the first time, she's not scared. She's curious. She's asking me, not Google."

"My mom never talked to me about this. I'm breaking that cycle for my daughter. And it feels like healing."

"She felt so seen. Like this was a normal part of growing up and I was here for her."

Do you see what is happening? When a mother shows up prepared — with knowledge, with ease, with the understanding that this is sacred and normal — her daughter gets permission to become a woman without shame.

Not all of us had that. Some of us grew up in silence. Some of us are the first generation doing this differently for our daughters.

But you can. You are. Right now.

The Mother's Checklist is the first step. It gives you the words, the timing, the confidence.

And if you want to go deeper — to understand the emotional journey, the spiritual foundation, the arc from girlhood through womanhood — you are not walking that alone either.

You are joining a sisterhood of mothers. The Virtuous Girl community. Where mothers ask the questions nobody else is talking about. Where we share what works. Where we remember: you are not the first to walk this path, and you are not walking it alone.`,
  },
  {
    step: 4,
    subject: "\"What if I say the wrong thing?\"",
    dayRange: [7, 9],
    body: `This is what keeps mothers awake.

"What if I embarrass her?"

"What if she thinks this is weird?"

"What if I mess this up?"

Here is what The Muslim Girl teaches: she does not need perfect words. She needs to know you care enough to try. That you see her becoming a woman as something sacred and beautiful, not something shameful or forbidden.

That is it.

The course teaches you how to have these conversations not perfectly, but genuinely. How to answer her questions without shame. How to frame her body as a blessing — because Islamically, it is. How to help her understand: your body is good. Your questions are welcome. You can trust me.

Here is what happens when a mother does this with intention:

Her daughter grows up comfortable in her own body. She grows up knowing she can ask hard questions and get honest answers. She grows up with a mother she trusts — not a mother she has to hide from.

That is the gift you are giving her.

You are not going to mess it up, sister. You are already doing the work.

The conversations from The Muslim Girl show you exactly how it sounds — what a mother says, what a daughter asks, how a mother responds with both honesty and love. You are not inventing this. You are inheriting it.`,
  },
  {
    step: 5,
    subject: "Your daughter at sixteen",
    dayRange: [10, 11],
    body: `Picture your daughter at sixteen.

A friend is pressuring her to do something she does not want to do. Most girls her age freeze. They feel ashamed. They do not speak up.

But your daughter?

She knows her body is hers. She knows how to say no. She knows you are in her corner, no questions asked.

She speaks up. She stands firm. She is safe in herself.

That girl did not arrive by accident. She arrived because a mother started now — who prepared her at nine or ten or eleven with knowledge instead of fear. Who had the hard conversations when she was curious instead of confused. Who said: "Your body is good. Your questions matter. You can trust me."

From her first period through her teen years, through navigating friendship drama and relationship boundaries and preparing for womanhood, that foundation is everything.

The Virtuous Girl course is built to help you be that mother.

Twelve modules. From first period through her teens. Every question answered. Every stage explained. The spiritual foundation. The practical guidance. The conversations that open her heart instead of closing it.

That future is not hypothetical. That is what is waiting.`,
  },
  {
    step: 6,
    subject: "You do not have to do this alone — The Sisterhood",
    dayRange: [12, 13],
    body: `One of the most powerful parts of The Virtuous Girl is The Sisterhood.

It is a private community. Mothers and daughters. Mothers raising daughters. Women who are doing this work.

Where you can ask the questions nobody else is talking about. Where you can share what is working. Where you can see that you are not alone in this.

A mother asked: "How do I talk about periods without shame? How do I make it normal for her?"

Another shared: "Here is what I said to my daughter, and here is what she asked me back."

A third posted: "My daughter read the first module and asked me something I didn't expect. How did you all handle this?"

And every mother lifted her up. Shared their own stories. Reminded her: You are doing the work. You are showing up. That is everything.

That community exists inside the course. Not as an add-on. As the heart of it.

Because this journey — raising a virtuous girl, preparing her for womanhood with dignity and knowledge — is not meant to be walked alone.

You are part of something bigger than yourself. A lineage of mothers. A sisterhood.

It starts when you enroll. It deepens from there.`,
  },
  {
    step: 7,
    subject: "She is ready when you are",
    dayRange: [14, 16],
    body: `Your daughter is watching.

She is watching to see if this is something you are comfortable with. If you can handle it with grace. If it is safe to ask you questions about her body, her changes, her becoming.

The work you do now — preparing yourself with knowledge, with the checklist, with the course, with the Sisterhood — that is not for you.

That is for her.

The checklist is free. You have it. You can start there.

But when you are ready to walk the full path — to have the framework, the community, the wisdom of mothers who came before you — the course is waiting.

One payment. Everything inside. Forever.

For your daughter. For yourself. For the lineage you are building.

She is ready. The Sisterhood is ready. The knowledge is here.

The only question left is: are you?

With love and clarity,
Sister Fatima Ezzahra
The Virtuous Girl`,
  },
];

export default async function handler(req, res) {
  // Verify the request is from GitHub Action (check authorization token)
  const authToken = req.headers.authorization?.split(" ")[1];
  if (authToken !== process.env.SEQUENCE_AUTH_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Get all subscribers from Redis set
    const redisRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SMEMBERS", `sequence:${FUNNEL_KEY}:pending`]),
    });

    if (!redisRes.ok) {
      return res.status(500).json({ error: "Redis fetch failed" });
    }

    const redisData = await redisRes.json();
    const subscribers = redisData.result || [];

    let sent = 0;
    let errors = [];

    // 2. For each subscriber, check eligibility and send
    for (const email of subscribers) {
      try {
        // Get subscriber data
        const dataRes = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "GET",
            `sequence:${FUNNEL_KEY}:data:${email}`,
          ]),
        });

        const dataResult = await dataRes.json();
        let subscriberData = dataResult.result
          ? JSON.parse(dataResult.result)
          : {
              email,
              signup_timestamp: Math.floor(Date.now() / 1000),
              current_step: 0,
              sent_emails: [],
            };

        // Calculate days elapsed
        const now = Math.floor(Date.now() / 1000);
        const daysElapsed = Math.floor(
          (now - subscriberData.signup_timestamp) / 86400
        );

        // Find which email to send
        let emailToSend = null;
        for (const emailDef of emailSequence) {
          if (subscriberData.sent_emails.includes(emailDef.step)) {
            continue; // Already sent
          }

          // Check day eligibility
          if (emailDef.dayRange) {
            if (
              daysElapsed >= emailDef.dayRange[0] &&
              daysElapsed <= emailDef.dayRange[1]
            ) {
              emailToSend = emailDef;
              break;
            }
          } else if (emailDef.day === 0 && daysElapsed === 0) {
            emailToSend = emailDef;
            break;
          }
        }

        // Send email if eligible
        if (emailToSend) {
          await sendEmail(email, emailToSend);
          subscriberData.current_step = emailToSend.step;
          subscriberData.sent_emails.push(emailToSend.step);

          // Update Redis
          await fetch(process.env.UPSTASH_REDIS_REST_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              "SET",
              `sequence:${FUNNEL_KEY}:data:${email}`,
              JSON.stringify(subscriberData),
            ]),
          });

          sent++;
        }
      } catch (err) {
        errors.push({ email, error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Sequence send error:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function sendEmail(to, emailDef) {
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
    to,
    subject: emailDef.subject,
    text: emailDef.body,
    html: `
      <div style="background:#FBF6EF;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#3D2B33;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:32px;border:1px solid #F3D9E3;">
          <h2 style="font-family:Georgia,serif;color:#5A2438;font-size:20px;margin:0 0 16px;">${emailDef.subject}</h2>
          <p style="font-size:15px;line-height:1.6;color:#3D2B33;margin:0 0 14px;white-space:pre-line;">${emailDef.body}</p>
          <hr style="border:none;border-top:1px solid #F3D9E3;margin:24px 0;" />
          <p style="font-size:12px;color:#6E5E8E;text-align:center;margin:0;">
            The Virtuous Girl &middot; <a href="${SITE}" style="color:#8E3B53;">thevirtuousgirl.com</a>
          </p>
        </div>
      </div>`,
  });
}
