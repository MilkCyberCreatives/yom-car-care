import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure Node runtime
export const dynamic = "force-dynamic"; // Avoid edge pre-bundling

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

/**
 * We NEVER reference "resend" in a static or dynamic import so Webpack won't try
 * to resolve it at build time. Instead we use eval('require') at runtime only
 * if RESEND_API_KEY is present.
 */
function loadResendSafely():
  | { Resend: new (key: string) => { emails: { send: (args: any) => Promise<{ error?: unknown }> } } }
  | null {
  try {
    // eslint-disable-next-line no-eval
    const req: NodeRequire = (eval("require") as unknown) as NodeRequire;
    // If the package is not installed, this will throw at runtime (not build)
    // and we will just fallback.
    // @ts-ignore - types not available unless the pkg is installed
    const mod = req("resend");
    return mod || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM = process.env.CONTACT_FROM || "Website <no-reply@yomcarcare.com>";
    const KEY = process.env.RESEND_API_KEY;

    // If no API key, instruct client to fallback to mailto:
    if (!KEY) {
      return NextResponse.json({ ok: false, fallback: true });
    }

    // Try to load resend only at runtime
    const mod = loadResendSafely();
    if (!mod) {
      return NextResponse.json({
        ok: false,
        fallback: true,
        error: "Email provider not available on runtime",
      });
    }

    // Create client
    // @ts-ignore - types only present when package is installed
    const resend = new mod.Resend(KEY);

    const subject =
      body.subject?.trim() || `New enquiry from ${body.name?.trim() || "Website"}`;

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
      // Only set reply_to if it's a sane email
      reply_to:
        body.email && /\S+@\S+\.\S+/.test(body.email) ? body.email : undefined,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, fallback: true, error: String(error) },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, fallback: true, error: (err as Error)?.message || "Unknown error" },
      { status: 200 }
    );
  }
}
