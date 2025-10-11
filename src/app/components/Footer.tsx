'use client'

import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950 text-sm">
      <div className="container-px py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold">YOM Car Care</div>
          <p className="mt-2 text-white/70">{t.common.cash_on_delivery}</p>
          <div className="mt-4 space-x-2">
            <a href="tel:+243848994045" className="btn-ghost">{t.common.phone_label}: +243 84 899 4045</a>
            <a href="mailto:info@yomcarcare.com" className="btn-ghost">{t.common.email_label}: info@yomcarcare.com</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">{t.footer.address}</h4>
          <ul className="mt-3 space-y-1 text-white/80">
            <li>{t.common.address_line1}</li>
            <li>{t.common.address_line2}</li>
            <li>{t.common.address_city}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">{t.footer.products}</h4>
          <ul className="mt-3 space-y-1">
            <li><Link className="hover:underline" href="/products/exterior">{t.cats.exterior}</Link></li>
            <li><Link className="hover:underline" href="/products/interior">{t.cats.interior}</Link></li>
            <li><Link className="hover:underline" href="/products/air-fresheners">{t.cats.air}</Link></li>
            <li><Link className="hover:underline" href="/products/detailing">{t.cats.detailing}</Link></li>
            <li><Link className="hover:underline" href="/products/accessories">{t.cats.accessories}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">{t.footer.info}</h4>
          <ul className="mt-3 space-y-1">
            <li><Link className="hover:underline" href="/faq">{t.footer.faq}</Link></li>
            <li><Link className="hover:underline" href="/contact">{t.footer.contact}</Link></li>
            <li><Link className="hover:underline" href="/legal-area">{t.footer.legal_area}</Link></li>
            <li><Link className="hover:underline" href="/privacy-policy">{t.footer.privacy}</Link></li>
            <li><Link className="hover:underline" href="/cookie-policy">{t.footer.cookie}</Link></li>
            <li><Link className="hover:underline" href="/terms">{t.footer.terms}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/60">
        © {new Date().getFullYear()} YOM Car Care. All rights reserved.
      </div>
    </footer>
  )
}
