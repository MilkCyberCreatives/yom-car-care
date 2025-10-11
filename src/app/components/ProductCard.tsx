'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ProductData } from '../data/products'

function formatPrice(p?: number, ccy?: string) {
  if (p == null) return null
  const val = p.toFixed(2)
  return `${ccy || 'USD'} ${val}`
}

export default function ProductCard({ p }: { p: ProductData }) {
  const price = formatPrice(p.price, p.currency)

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
        {p.img ? (
          <Image
            src={p.img}
            alt={p.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/50 text-sm">
            Image coming soon
          </div>
        )}

        {/* Badge(s) */}
        {p.badges?.length ? (
          <div className="absolute top-2 left-2 flex gap-1">
            {p.badges.slice(0,2).map(b => (
              <span key={b} className="rounded-md bg-[var(--brand-blue)]/90 px-2 py-0.5 text-[11px] font-medium">
                {b === 'bestseller' ? 'Best Seller' : b === 'popular' ? 'Popular' : 'New'}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <h3 className="mt-3 font-semibold leading-snug">{p.name}</h3>
      <div className="mt-1 flex items-center gap-2">
        {p.size ? <p className="text-white/60 text-sm">{p.size}</p> : null}
        {price ? <span className="text-white/80 text-sm">• {price}</span> : null}
      </div>

      <div className="mt-3">
        <Link
          href={`/products/${p.category}/${p.slug}`}
          className="btn-ghost text-sm px-3 py-2"
          aria-label={`View details for ${p.name}`}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
