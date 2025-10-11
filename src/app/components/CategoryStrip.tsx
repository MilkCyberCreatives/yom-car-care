'use client'

import Link from 'next/link'
import { Sparkles, SprayCan, Flower2, Wrench, Car } from 'lucide-react'

const items = [
  { href: '/products/exterior', label: 'Exterior', Icon: Car },
  { href: '/products/interior', label: 'Interior', Icon: Sparkles },
  { href: '/products/air-fresheners', label: 'Air Fresheners', Icon: Flower2 },
  { href: '/products/detailing', label: 'Detailing', Icon: SprayCan },
  { href: '/products/accessories', label: 'Accessories', Icon: Wrench },
]

export default function CategoryStrip() {
  return (
    <section className="border-t border-white/10 bg-zinc-950">
      <div className="container-px py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-white/10 hover:border-white/20 bg-zinc-900/30 hover:bg-zinc-900/50 transition p-4 flex items-center gap-3"
          >
            <span className="grid place-items-center rounded-lg bg-[var(--brand-blue)]/20 p-2">
              <Icon size={20} className="text-[var(--brand-blue)]" />
            </span>
            <span className="font-medium text-white/90 group-hover:text-white">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
