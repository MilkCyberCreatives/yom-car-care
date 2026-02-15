import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Make sure this runs in the Node runtime (not edge) for SMTP.
export const runtime = "nodejs";

// ---- Helpers ----
function sanitize(s: string) {
  return s.replace(/[\r\n\t]/g, " ").trim();
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Build a nodemailer transporter from environment variables.
// Supports either a single SMTP_URL or discrete host/port/user/pass.
async function getTransporter() {
  const { createTransport } = await import("nodemailer");

  const {
    SMTP_URL,
    EMAIL_SERVER_URL, // alias
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASS,
  } = process.env;

  if (SMTP_URL || EMAIL_SERVER_URL) {
    return createTransport(SMTP_URL || EMAIL_SERVER_URL);
  }

  const host = SMTP_HOST || EMAIL_SERVER_HOST || "mail.yomcarcare.com";
  const port = Number(SMTP_PORT || EMAIL_SERVER_PORT || 465);
  const user = SMTP_USER || EMAIL_SERVER_USER || "info@yomcarcare.com";
  const pass = SMTP_PASS || EMAIL_SERVER_PASS;
  const secure =
    typeof SMTP_SECURE === "string"
      ? SMTP_SECURE.toLowerCase() === "true"
      : port === 465;

  if (!pass || pass === "YOUR_MAILBOX_PASSWORD") {
    throw new Error("Missing SMTP password. Set SMTP_PASS (or EMAIL_SERVER_PASS) to your mailbox password.");
  }

  return createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function renderHtml({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.5;">
    <h2 style="margin:0 0 12px;">New contact form submission</h2>
    <table style="border-collapse: collapse; width:100%; max-width:600px;">
      <tr><td style="padding:6px 8px; background:#f6f6f6; width:140px;">Name</td><td style="padding:6px 8px;">${name}</td></tr>
      <tr><td style="padding:6px 8px; background:#f6f6f6;">Email</td><td style="padding:6px 8px;">${email}</td></tr>
      ${phone ? `<tr><td style="padding:6px 8px; background:#f6f6f6;">Phone</td><td style="padding:6px 8px;">${phone}</td></tr>` : ""}
      <tr><td style="padding:6px 8px; background:#f6f6f6;">Subject</td><td style="padding:6px 8px;">${subject}</td></tr>
    </table>
    <div style="margin-top:16px; padding:12px; background:#fafafa; border:1px solid #eee; white-space:pre-wrap;">
      ${message}
    </div>
  </div>`;
}

// ---- Route handler ----
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit({
      key: `contact:${ip}`,
      limit: 8,
      windowMs: 10 * 60 * 1000,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait and try again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const hp = sanitize(String(body.hp ?? ""));
    if (hp) {
      // Honeypot field should stay empty for real users.
      return NextResponse.json({ ok: true, message: "Thanks." });
    }

    const name = sanitize(String(body.name ?? ""));
    const email = sanitize(String(body.email ?? ""));
    const phone = sanitize(String(body.phone ?? ""));
    const subject = sanitize(String(body.subject ?? "Website enquiry"));
    const message = sanitize(String(body.message ?? ""));

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, email, message)." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }
    if (message.length > 5000 || subject.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    // Configure recipient + sender
    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM = process.env.CONTACT_FROM || `YOM Car Care <info@yomcarcare.com>`;

    const transporter = await getTransporter();

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html: renderHtml({ name, email, phone, subject, message }),
    });

    // Auto-acknowledgement to sender
    try {
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: "We received your message - YOM Car Care",
        text:
          "Hello,\n\nWe have received your message and will get back to you shortly.\n\n" +
          "Bonjour,\n\nNous avons bien recu votre message et nous vous repondrons rapidement.\n\n" +
          "YOM Car Care",
        html: `
          <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;">
            <p>Hello,</p>
            <p>We have received your message and will get back to you shortly.</p>
            <p>Bonjour,</p>
            <p>Nous avons bien recu votre message et nous vous repondrons rapidement.</p>
            <p>YOM Car Care</p>
          </div>
        `,
      });
    } catch (ackErr) {
      console.error("Contact API acknowledgement email failed:", ackErr);
    }

    return NextResponse.json({
      ok: true,
      message: "We received your email and will reply shortly. / Nous avons bien recu votre email et nous vous repondrons rapidement.",
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
