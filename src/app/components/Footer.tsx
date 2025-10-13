"use client";

import Link from "@/components/LocaleLink"; // ✅ locale-aware internal links
import { Phone, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950 text-sm">
      <div className="container-px py-10 grid gap-10 md:grid-cols-4">
        {/* Brand & contacts */}
        <div>
          <div className="text-lg font-semibold">YOM Car Care</div>
          <p className="mt-2 text-white/70">{t.common.cash_on_delivery}</p>

          {/* Buttons row: stacked on mobile, inline from md+ */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <a
              href={`tel:${t.common.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
              aria-label={`Call ${t.common.phone}`}
              title={`Call ${t.common.phone}`}
            >
              <Phone size={16} />
              <span className="font-medium">
                {t.common.phone_label}: {t.common.phone}
              </span>
            </a>

            <a
              href={`mailto:${t.common.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
              aria-label={`Email ${t.common.email}`}
              title={`Email ${t.common.email}`}
            >
              <Mail size={16} />
              <span className="font-medium">
                {t.common.email_label}: {t.common.email}
              </span>
            </a>
          </div>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-semibold">{t.footer.address}</h4>
          <ul className="mt-3 space-y-1 text-white/80">
            <li>{t.common.address_line1}</li>
            <li>{t.common.address_line2}</li>
            <li>{t.common.address_city}</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold">{t.footer.products}</h4>
          <ul className="mt-3 space-y-1">
            <li>
              <Link className="hover:underline" href="/products/exterior">
                {t.cats.exterior}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/interior">
                {t.cats.interior}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/air-fresheners">
                {t.cats.air}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/detailing">
                {t.cats.detailing}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/products/accessories">
                {t.cats.accessories}
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold">{t.footer.info}</h4>
          <ul className="mt-3 space-y-1">
            <li>
              <Link className="hover:underline" href="/faq">
                {t.footer.faq}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact">
                {t.footer.contact}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/legal-area">
                {t.footer.legal_area}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/privacy-policy">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/cookie-policy">
                {t.footer.cookie}
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/terms">
                {t.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-white/70">
        <div className="container-px flex flex-col items-center gap-1 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} YOM Car Care. All rights reserved.</span>
          <span>
            Designed &amp; developed by{" "}
            <a
              href="https://milkcybercreatives.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 hover:decoration-white"
            >
              Milk Cyber Creatives
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
