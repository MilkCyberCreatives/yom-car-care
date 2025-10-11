'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'

export default function TopBar() {
  const pathname = usePathname() || '/'
  const { t } = useI18n()

  return (
    <div className="w-full header-glass">
      <div className="container-px flex items-center justify-between py-2 text-[13px]">
        {/* Left: contact info */}
        <div className="hidden md:flex items-center gap-4 text-white/70">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} />
            {t.common.address_line1}, {t.common.address_line2}, {t.common.address_city}
          </span>
          <a href="tel:+243848994045" className="inline-flex items-center gap-1 hover:text-white">
            <Phone size={14} /> +243 84 899 4045
          </a>
          <a
            href={`mailto:${t.common.email}`}
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Mail size={14} /> {t.common.email}
          </a>
        </div>

        <div className="flex-1 md:flex-none" />

        {/* Right: language toggle */}
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <Link
            href={pathname.replace(/^\/fr/, '') || '/'}
            locale="en"
            className="hover:underline aria-[current=true]:font-semibold"
            aria-current={pathname.startsWith('/fr') ? undefined : 'true'}
          >
            EN
          </Link>
          <span aria-hidden>•</span>
          <Link
            href={pathname.startsWith('/fr') ? pathname : `/fr${pathname}`}
            locale="fr"
            className="hover:underline"
            aria-current={pathname.startsWith('/fr') ? 'true' : undefined}
          >
            FR
          </Link>
        </div>
      </div>
    </div>
  )
}
