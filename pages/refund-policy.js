// pages/refund-policy.js — The Virtuous Girl
// Cancellation & Refund Policy. Linked from footer and near checkout buttons.
// REPLACE STRIPE_PORTAL_LINK below with your Customer Portal login link
// (Stripe Dashboard → Settings → Billing → Customer Portal → copy login link)

const STRIPE_PORTAL_LINK = "https://billing.stripe.com/p/login/REPLACE_ME";

const C = {
  bg: "#FBF6EF", card: "#ffffff", plum: "#5A2438", rose: "#8E3B53",
  gold: "#B8923E", text: "#3D2B33", muted: "#6E5E8E", border: "#F3D9E3",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: 15, color: C.rose, fontFamily: "Georgia, serif", marginBottom: "0.875rem", fontWeight: "normal" }}>{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 15, color: C.text, lineHeight: 1.85, marginBottom: "1rem", fontFamily: "Arial, Helvetica, sans-serif" }}>{children}</p>;
}

export default function RefundPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "2.5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: 11, letterSpacing: "2px", color: C.gold, marginBottom: 10, fontFamily: "Arial, sans-serif" }}><strong>THE VIRTUOUS GIRL</strong></div>
            <h1 style={{ fontSize: "clamp(22px,3.5vw,28px)", color: C.plum, fontWeight: "normal", margin: 0 }}>Cancellation &amp; Refund Policy</h1>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: "Arial, sans-serif", marginTop: 8 }}>Effective as of the date of purchase · thevirtuousgirl.com</div>
          </div>

          <Section title="Our promise to you">
            <P>We want every mother who joins The Virtuous Girl to feel confident in her decision. This policy is written plainly so there are no surprises — before or after you enroll.</P>
          </Section>

          <Section title="Lifetime enrollment (one-time purchase)">
            <P>Lifetime enrollment may be refunded within <strong>24 hours of purchase</strong>, provided that less than 20% of the course content has been accessed.</P>
            <P>After 24 hours, or once more than 20% of the content has been accessed — whichever comes first — <strong>all sales are final</strong>. The course is a digital work that cannot be returned once it has been read, and this policy protects the community for every family in it.</P>
            <P>To request a refund within the eligible window, email <a href="mailto:info@thevirtuousgirl.com" style={{ color: C.rose }}>info@thevirtuousgirl.com</a> from the email address you used at purchase.</P>
          </Section>

          <Section title="Monthly & yearly memberships">
            <P>You may cancel your membership at any time — no phone call, no questions asked. Manage or cancel your membership here:</P>
            <p style={{ textAlign: "center", margin: "1.5rem 0" }}>
              <a href={STRIPE_PORTAL_LINK} style={{ display: "inline-block", background: C.rose, color: C.bg, textDecoration: "none", fontWeight: "bold", padding: "13px 28px", borderRadius: 999, fontSize: 14, fontFamily: "Arial, sans-serif" }}>Manage my membership</a>
            </p>
            <P>Cancelling stops all future billing. Your access continues until the end of the period you have already paid for. <strong>Cancellation is not a refund</strong> — partial months and partial years are not refunded, because that access was delivered as purchased.</P>
          </Section>

          <Section title="A few important notes">
            <P>This policy is presented before purchase and agreed to at checkout. Refunds, where eligible, are returned to the original payment method and may take 5–10 business days to appear depending on your bank.</P>
          </Section>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: "Arial, sans-serif" }}>Questions? <a href="mailto:info@thevirtuousgirl.com" style={{ color: C.rose }}>info@thevirtuousgirl.com</a></div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "Arial, sans-serif", marginTop: 6 }}>The Virtuous Girl · thevirtuousgirl.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
