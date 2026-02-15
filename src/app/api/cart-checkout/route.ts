import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

type CheckoutItem = {
  slug: string;
  categorySlug: string;
  name: string;
  qty: number;
  price?: number;
  currency?: string;
  img?: string;
};

function sanitize(value: string) {
  return value.replace(/[\r\n\t]/g, " ").trim();
}

function isEmail(value: string) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function getTransporter() {
  const { createTransport } = await import("nodemailer");

  const {
    SMTP_URL,
    EMAIL_SERVER_URL,
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
  const normalizedSmtpPass =
    SMTP_PASS && SMTP_PASS !== "YOUR_MAILBOX_PASSWORD" ? SMTP_PASS : "";
  const pass = normalizedSmtpPass || EMAIL_SERVER_PASS;
  const secure =
    typeof SMTP_SECURE === "string"
      ? SMTP_SECURE.toLowerCase() === "true"
      : port === 465;

  if (!pass) {
    throw new Error("Missing SMTP password. Set SMTP_PASS (or EMAIL_SERVER_PASS).");
  }

  return createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function renderHtmlOrder({
  name,
  phone,
  email,
  notes,
  cart,
}: {
  name: string;
  phone: string;
  email: string;
  notes: string;
  cart: CheckoutItem[];
}) {
  const rows = cart
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 8px; border-bottom:1px solid #eee;">
          <div><strong>${item.name}</strong></div>
          <div style="font-size:12px;color:#666;">
            /products/${item.categorySlug}/${item.slug}
          </div>
        </td>
        <td style="padding:6px 8px; border-bottom:1px solid #eee; text-align:center;">
          ${item.qty}
        </td>
        <td style="padding:6px 8px; border-bottom:1px solid #eee; text-align:right;">
          ${
            typeof item.price === "number"
              ? `${item.currency || "USD"} ${item.price.toLocaleString()}`
              : "-"
          }
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5;">
    <h2 style="margin:0 0 12px;">New Cart Submission</h2>

    <h3 style="margin:16px 0 8px;font-size:15px;">Buyer Info</h3>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:14px;">
      <tr>
        <td style="padding:6px 8px;background:#f6f6f6;width:140px;">Name</td>
        <td style="padding:6px 8px;">${name}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px;background:#f6f6f6;">Phone</td>
        <td style="padding:6px 8px;">${phone}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px;background:#f6f6f6;">Email</td>
        <td style="padding:6px 8px;">${email || "(not provided)"}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px;background:#f6f6f6;">Notes</td>
        <td style="padding:6px 8px;white-space:pre-wrap;">${notes || "(none)"}</td>
      </tr>
    </table>

    <h3 style="margin:24px 0 8px;font-size:15px;">Cart Items</h3>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:14px;">
      <thead>
        <tr style="background:#f6f6f6;">
          <th style="padding:6px 8px;text-align:left;">Product</th>
          <th style="padding:6px 8px;text-align:center;">Qty</th>
          <th style="padding:6px 8px;text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <p style="font-size:12px;color:#777;margin-top:16px;">
      Sent automatically from yomcarcare.com cart checkout.
    </p>
  </div>`;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = checkRateLimit({
      key: `checkout:${ip}`,
      limit: 6,
      windowMs: 10 * 60 * 1000,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many checkout attempts. Please wait and try again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const hp = sanitize(String(body.hp || ""));
    if (hp) {
      return NextResponse.json({ ok: true, message: "Thanks." });
    }

    const name = sanitize(String(body.name || ""));
    const phone = sanitize(String(body.phone || ""));
    const email = sanitize(String(body.email || ""));
    const notes = sanitize(String(body.notes || ""));
    const inputCart = Array.isArray(body.cart) ? body.cart : [];
    if (inputCart.length > 100) {
      return NextResponse.json(
        { ok: false, error: "Cart is too large." },
        { status: 400 }
      );
    }

    const cart: CheckoutItem[] = inputCart
      .map((item: any) => ({
        slug: sanitize(String(item.slug || "")),
        categorySlug: sanitize(String(item.categorySlug || "")),
        name: sanitize(String(item.name || "")),
        qty: Number(item.qty || 0),
        price: typeof item.price === "number" ? item.price : undefined,
        currency: sanitize(String(item.currency || "USD")),
        img: sanitize(String(item.img || "")),
      }))
      .filter(
        (item: CheckoutItem) =>
          item.slug && item.categorySlug && item.name && item.qty > 0
      );

    if (!name || !phone || cart.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, phone, cart)." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const html = renderHtmlOrder({ name, phone, email, notes, cart });
    const transporter = await getTransporter();

    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM = process.env.CONTACT_FROM || "YOM Car Care <no-reply@yomcarcare.com>";

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject: `[Cart Checkout] New order request from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${notes}\nItems: ${cart
        .map(
          (item) =>
            `${item.qty} x ${item.name} (/products/${item.categorySlug}/${item.slug})`
        )
        .join("; ")}`,
      html,
    });

    if (email) {
      try {
        await transporter.sendMail({
          from: FROM,
          to: email,
          subject: "We received your order request - YOM Car Care",
          text:
            "Hello,\n\nWe received your order request and will contact you shortly.\n\n" +
            "Bonjour,\n\nNous avons bien recu votre demande et nous vous contacterons rapidement.\n\n" +
            "YOM Car Care",
        });
      } catch (ackErr) {
        console.error("Checkout acknowledgement email failed:", ackErr);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Order request sent successfully.",
    });
  } catch (err: any) {
    console.error("cart-checkout error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to send cart to admin." },
      { status: 500 }
    );
  }
}
