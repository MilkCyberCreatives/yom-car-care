'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ProductData } from '../data/products'

export default function ProductCard({ p }: { p: ProductData }) {
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
            priority={false}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/50 text-sm">
            Image coming soon
          </div>
        )}
      </div>

      <h3 className="mt-3 font-semibold leading-snug">{p.name}</h3>
      {p.size ? <p className="text-white/60 text-sm">{p.size}</p> : null}

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
