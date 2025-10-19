import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitize(s: string) {
  return s.replace(/[\r\n\t]/g, " ").trim();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    const name = sanitize(String(data.name || ""));
    const email = sanitize(String(data.email || ""));
    const phone = sanitize(String(data.phone || ""));
    const subject = sanitize(String(data.subject || "Website enquiry"));
    const message = String(data.message || "").trim();
    const hp = String(data.hp || ""); // honeypot

    if (hp) {
      // Bot caught—pretend success
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // SMTP transporter (uses your own mailbox — no 3rd party)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,              // e.g. mail.yomcarcare.com
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false", // true for 465
      auth: {
        user: process.env.SMTP_USER,            // full mailbox, e.g. info@yomcarcare.com
        pass: process.env.SMTP_PASS,            // mailbox password / app password
      },
    });

    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM =
      process.env.CONTACT_FROM || `Website <no-reply@yomcarcare.com>`;

    const html = `
      <table style="font-family:system-ui,Arial,sans-serif;font-size:14px;line-height:1.6;color:#111;width:100%;max-width:640px">
        <tr><td><h2 style="margin:0 0 12px">New website enquiry</h2></td></tr>
        <tr><td><strong>Name:</strong> ${name}</td></tr>
        <tr><td><strong>Email:</strong> ${email}</td></tr>
        <tr><td><strong>Phone:</strong> ${phone || "-"}</td></tr>
        <tr><td><strong>Subject:</strong> ${subject}</td></tr>
        <tr><td style="padding-top:8px"><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      to: TO,
      from: FROM,
      replyTo: email || TO,
      subject: `[YOM Car Care] ${subject}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT_API_ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
