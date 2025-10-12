// src/components/ProductCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Plus } from 'lucide-react'
import type { ProductData } from '@/data/products'
import { useCompare } from '@/components/compare/CompareProvider'
import { useEnquiry } from '@/components/enquiry/EnquiryProvider'

function formatPrice(price?: number | null, curr?: string) {
  if (price == null) return null
  return `${curr || 'USD'} ${price.toFixed(2)}`
}

export default function ProductCard({ p }: { p: ProductData }) {
  const price = formatPrice(p.price, p.currency)
  const { add: addCompare } = useCompare()
  const { add: addEnquiry } = useEnquiry()

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition p-4">
      <Link href={`/products/${p.category}/${p.slug}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
          {p.img ? (
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-white/40">No image</div>
          )}
        </div>
        <h3 className="mt-3 font-medium leading-tight">{p.name}</h3>
        {p.size ? <p className="text-white/60 text-sm mt-1">{p.size}</p> : null}
      </Link>

      <div className="mt-3 flex items-center justify-between">
        {price ? <div className="font-semibold">{price}</div> : <span className="text-white/60 text-sm">Contact for price</span>}
        <div className="flex gap-2">
          <button className="btn-ghost h-8 px-3" onClick={() => addCompare(p)} title="Add to compare">
            <Plus size={16} />
          </button>
          <button className="btn-primary h-8 px-3" onClick={() => addEnquiry(p, 1)} title="Add to enquiry">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
