import { NextResponse } from 'next/server'

/**
 * Serverless email via Resend (optional):
 * - If RESEND_API_KEY is unset, we return 503 and the client falls back to mailto/WhatsApp.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const subject = String(body.subject || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_TO = process.env.CONTACT_TO || 'info@yomcarcare.com'
    const CONTACT_FROM = process.env.CONTACT_FROM || 'website@yomcarcare.com'

    // If no email provider configured, instruct client to fallback
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Email not configured', fallback: true },
        { status: 503 }
      )
    }

    // Lazy import server-side only
    const { Resend } = await import('resend')
    const resend = new Resend(RESEND_API_KEY)

    const html = `
      <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.5;color:#111">
        <h2 style="margin:0 0 8px">New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;border:1px solid #eee">${escapeHtml(
          message
        )}</pre>
      </div>
    `

    const response = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject: subject || `New enquiry from ${name}`,
      html,
      reply_to: email,
    })

    if ((response as any).error) {
      return NextResponse.json(
        { ok: false, error: 'Email provider error' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 })
  }
}

// tiny helper
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
