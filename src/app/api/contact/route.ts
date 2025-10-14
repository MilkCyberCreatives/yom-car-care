import { NextResponse } from "next/server";

/**
 * Contact API
 * - If RESEND_API_KEY is missing, we return { fallback: true } so the client opens a mailto:
 * - If the key is present, we dynamically import `resend` and send the email.
 *   (Dynamic import avoids compile-time dependency errors.)
 */

export const runtime = "nodejs"; // ensure Node runtime (not edge)

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const hasKey = !!process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM =
      process.env.CONTACT_FROM || "Website <no-reply@yomcarcare.com>";

    // If no API key, tell the client to fallback to mailto:
    if (!hasKey) {
      return NextResponse.json({ ok: false, fallback: true });
    }

    // Dynamically import only when we actually have a key
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject =
      body.subject?.trim() ||
      `New enquiry from ${body.name?.trim() || "Website"}`;

    const text = [
      `Name: ${body.name || "-"}`,
      `Email: ${body.email || "-"}`,
      `Phone: ${body.phone || "-"}`,
      "",
      "Message:",
      body.message || "-",
      "",
      "----",
      "Sent from yomcarcare.com",
    ].join("\n");

    const { error } = await resend.emails.send({
      to: TO,
      from: FROM,
      subject,
      text,
      reply_to: body.email && /\S+@\S+\.\S+/.test(body.email) ? body.email : undefined,
    });

    if (error) {
      // If sending fails for any reason, tell the client to fallback
      return NextResponse.json(
        { ok: false, fallback: true, error: String(error) },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // network/parse errors -> fallback to mailto on the client
    return NextResponse.json(
      { ok: false, fallback: true, error: (err as Error)?.message || "Unknown error" },
      { status: 200 }
    );
  }
}
