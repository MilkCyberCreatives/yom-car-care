# YOM Car Care

Next.js 14 storefront for YOM Car Care with bilingual routing (`/en`, `/fr`), product catalog, cart request checkout, and contact form email delivery.

## Local Development

Requirements:
- Node.js 20.x
- npm 10+

Run:

```bash
npm ci
npm run dev
```

Build check:

```bash
npm run build
```

## Environment Variables

Set these in `.env.local` for local development and in Vercel Project Settings for production.

Quick start:

```bash
cp .env.example .env.local
```

Required for email and ordering:

- `NEXT_PUBLIC_SITE_URL`
  - Example: `https://yomcarcare.com`
- `SMTP_HOST`
  - Example: `mail.yomcarcare.com`
- `SMTP_PORT`
  - Example: `465`
- `SMTP_SECURE`
  - `true` for port `465`
- `SMTP_USER`
  - Example: `no-reply@yomcarcare.com`
- `SMTP_PASS`
  - Mailbox/app password
- `CONTACT_TO`
  - Inbox receiving contact and checkout submissions
- `CONTACT_FROM`
  - Example: `YOM Car Care <no-reply@yomcarcare.com>`

Optional aliases (supported):

- `SMTP_URL` or `EMAIL_SERVER_URL`
- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASS`
- `NEXT_PUBLIC_GA_ID`

## Vercel Production Setup

1. Import the repo into Vercel as a Next.js project.
2. Add all required environment variables in:
   - `Project Settings > Environment Variables`
   - Add for `Production` and `Preview`.
3. Set custom domain:
   - `Project Settings > Domains`
   - Add `yomcarcare.com` and `www.yomcarcare.com`.
4. Ensure DNS records point to Vercel.
5. Redeploy after env changes.
6. Verify:
   - `https://your-domain/robots.txt`
   - `https://your-domain/sitemap.xml`
   - Contact form sends and arrives in `CONTACT_TO`
   - Cart checkout sends and arrives in `CONTACT_TO`

## Functional Notes

- Contact form submits to `POST /api/contact`.
- Cart order request submits to `POST /api/cart-checkout`.
- Both routes run in Node.js runtime and use SMTP.
- Cart checkout now sends an acknowledgement email when customer email is provided.

## SEO and GEO

Implemented:
- Locale-aware canonical + hreflang alternates
- Dynamic sitemap and robots
- Organization, LocalBusiness, WebSite, FAQPage, and Product JSON-LD
- DRC/Lubumbashi geo metadata

## Deployment

Vercel CLI deploy:

```bash
npx vercel --prod
```

If CLI returns token/auth error:

```bash
npx vercel login
```
