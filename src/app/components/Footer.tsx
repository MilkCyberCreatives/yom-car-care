'use client'

import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950 text-white">
      <div className="container-px py-10 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">{t.common.brand}</h3>
          <p className="mt-3 text-white/70">
            Premium car care products in Lubumbashi. {t.common.cash_on_delivery} available.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">{t.footer.address}</h4>
          <ul className="mt-3 space-y-1 text-white/80">
            <li>{t.common.address_line1}</li>
            <li>{t.common.address_line2}</li>
            <li>{t.common.address_city}</li>
          </ul>
          <ul className="mt-3 space-y-1 text-white/80">
            <li>Tel. +243 84 899 4045</li>
            <li>{t.common.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">{t.common.products}</h4>
          <ul className="mt-3 space-y-2 text-white/80">
            <li><Link href="/products/exterior" className="hover:underline">{t.cats.exterior}</Link></li>
            <li><Link href="/products/interior" className="hover:underline">{t.cats.interior}</Link></li>
            <li><Link href="/products/air-fresheners" className="hover:underline">{t.cats.air}</Link></li>
            <li><Link href="/products/detailing" className="hover:underline">{t.cats.detailing}</Link></li>
            <li><Link href="/products/accessories" className="hover:underline">{t.cats.accessories}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">{t.footer.info}</h4>
          <ul className="mt-3 space-y-2 text-white/80">
            <li><Link href="/faq" className="hover:underline">{t.footer.faq}</Link></li>
            <li><Link href="/contact" className="hover:underline">{t.common.contact}</Link></li>
            <li><Link href="/legal-area" className="hover:underline">{t.footer.legal}</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">{t.footer.privacy}</Link></li>
            <li><Link href="/cookie-policy" className="hover:underline">{t.footer.cookie}</Link></li>
            <li><Link href="/terms" className="hover:underline">{t.footer.terms}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px py-4 text-xs text-white/60">
          © {new Date().getFullYear()} {t.common.brand} {t.footer.copyright_suffix}
        </div>
      </div>
    </footer>
  )
}
