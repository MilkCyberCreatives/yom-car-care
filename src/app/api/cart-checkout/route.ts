import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* ---------- helpers ---------- */

function sanitize(s: string) {
  return s.replace(/[\r\n\t]/g, " ").trim();
}

function isEmail(s: string) {
  if (!s) return true; // email is optional on checkout form
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// same logic you used in contact route
async function getTransporter() {
  const { createTransport } = await import("nodemailer");

  const {
    SMTP_URL,
    EMAIL_SERVER_URL,
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASS,
  } = process.env;

  if (SMTP_URL || EMAIL_SERVER_URL) {
    return createTransport(SMTP_URL || EMAIL_SERVER_URL);
  }

  if (
    EMAIL_SERVER_HOST &&
    EMAIL_SERVER_PORT &&
    EMAIL_SERVER_USER &&
    EMAIL_SERVER_PASS
  ) {
    return createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT),
      secure: Number(EMAIL_SERVER_PORT) === 465,
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASS,
      },
    });
  }

  // fallback to system sendmail
  return createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail",
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
  cart: Array<{
    slug: string;
    categorySlug: string;
    name: string;
    qty: number;
    price?: number;
    currency?: string;
    img?: string;
  }>;
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
              : "—"
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
      Sent automatically from yom-car-care.com cart checkout.
    </p>
  </div>`;
}

/* ---------- POST /api/cart-checkout ---------- */

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = sanitize(String(body.name || ""));
    const phone = sanitize(String(body.phone || ""));
    const email = sanitize(String(body.email || ""));
    const notes = sanitize(String(body.notes || ""));
    const cart = Array.isArray(body.cart) ? body.cart : [];

    // Basic validation
    if (!name || !phone || cart.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing required fields (name, phone, cart).",
        },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // build email
    const html = renderHtmlOrder({ name, phone, email, notes, cart });

    const TO = process.env.CONTACT_TO || "info@yomcarcare.com";
    const FROM =
      process.env.CONTACT_FROM ||
      `YOM Car Care <no-reply@yomcarcare.com>`;

    const transporter = await getTransporter();

    await transporter.sendMail({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject: `[Cart Checkout] New order request from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${notes}\nItems: ${cart
        .map(
          (i: any) =>
            `${i.qty} x ${i.name} (/products/${i.categorySlug}/${i.slug})`
        )
        .join("; ")}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("cart-checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send cart to admin." },
      { status: 500 }
    );
  }
}
