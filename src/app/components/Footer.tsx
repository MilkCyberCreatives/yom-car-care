// src/app/components/Footer.tsx
import Image from "next/image";
import LocaleLink from "@/app/components/LocaleLink";

/**
 * Footer (with logo + inline actions)
 * - Brand uses /logo.svg
 * - Call & Email actions on a single horizontal line (wraps gracefully on very narrow screens)
 * - Locale-aware internal links with <LocaleLink />
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + inline actions */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="YOM Car Care"
                width={140}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </div>

            {/* Inline actions: call + email */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="tel:+243848994045"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                aria-label="Call +243 84 899 4045"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>+243 84 899 4045</span>
              </a>

              <a
                href="mailto:info@yomcarcare.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                aria-label="Email info@yomcarcare.com"
              >
                <MailIcon className="h-4 w-4" />
                <span className="truncate">info@yomcarcare.com</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="text-lg font-semibold">Address</div>
            <address className="mt-3 not-italic leading-7 text-white/80">
              538 Avenue Kipopo
              <br />
              Golf Malela
              <br />
              Lubumbashi
            </address>
          </div>

          {/* Products */}
          <nav aria-label="Products" className="lg:pl-6">
            <div className="text-lg font-semibold">Products</div>
            <ul className="mt-3 space-y-2 text-white/80">
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/products/exterior">
                  Exterior
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/products/interior">
                  Interior
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/products/air-fresheners">
                  Air Fresheners
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/products/detailing">
                  Detailing
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/products/accessories">
                  Accessories
                </LocaleLink>
              </li>
            </ul>
          </nav>

          {/* Info */}
          <nav aria-label="Information" className="lg:pl-6">
            <div className="text-lg font-semibold">Info</div>
            <ul className="mt-3 space-y-2 text-white/80">
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/terms#faq">
                  FAQ
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/contact">
                  Contact
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/legal-area">
                  Legal Area
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/privacy-policy">
                  Privacy Policy
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/cookie-policy">
                  Cookie Policy
                </LocaleLink>
              </li>
              <li>
                <LocaleLink className="hover:text-white hover:underline" href="/terms">
                  General Terms of Use
                </LocaleLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row">
          <div>© {year} YOM Car Care. All rights reserved.</div>
          <div className="text-center">
            Designed &amp; developed by{" "}
            <a
              href="https://milkcybercreatives.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white hover:underline"
            >
              Milk Cyber Creatives
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Icons (pure SVG, no deps) ---------------- */

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3.75A1.5 1.5 0 0 1 3.75 2.25h2.25c.621 0 1.155.417 1.31 1.02l.86 3.439a1.35 1.35 0 0 1-.341 1.29l-1.45 1.45a15 15 0 0 0 6.292 6.292l1.45-1.45a1.35 1.35 0 0 1 1.29-.341l3.44.86c.602.155 1.02.689 1.02 1.31v2.25a1.5 1.5 0 0 1-1.5 1.5h-.75C9.372 20.25 3.75 14.628 3.75 7.5v-.75z"
      />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 13l9-5.5M4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6Z" />
    </svg>
  );
}
