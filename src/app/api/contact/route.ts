import { NextResponse } from "next/server";

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
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASS,
  } = process.env;

  if (SMTP_URL || EMAIL_SERVER_URL) {
    return createTransport(SMTP_URL || EMAIL_SERVER_URL);
  }

  if (EMAIL_SERVER_HOST && EMAIL_SERVER_PORT && EMAIL_SERVER_USER && EMAIL_SERVER_PASS) {
    return createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT),
      secure: Number(EMAIL_SERVER_PORT) === 465, // TLS on 465
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASS,
      },
    });
  }

  // As a convenience, fall back to local sendmail if present on the host
  // (works on many Linux hosts; harmless if unavailable).
  return createTransport({ sendmail: true, newline: "unix", path: "/usr/sbin/sendmail" });
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
    const body = await req.json().catch(() => ({}));
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

    // Configure recipient + sender
    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM =
      process.env.CONTACT_FROM || `YOM Car Care <no-reply@yomcarcare.com>`;

    const transporter = await getTransporter();

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html: renderHtml({ name, email, phone, subject, message }),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
