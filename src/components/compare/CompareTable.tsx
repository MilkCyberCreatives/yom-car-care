'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useCompare } from './CompareProvider'

export default function CompareTable() {
  const { items, remove, clear } = useCompare()

  if (items.length === 0) {
    return <p className="text-white/70">No items yet. Add products to compare from any product card.</p>
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-white/80">
          Comparing {items.length} item{items.length !== 1 ? 's' : ''}
        </div>
        <button className="btn-ghost h-9 px-3" onClick={clear}>
          Clear all
        </button>
      </div>

      <table className="min-w-[720px] w-full border-collapse">
        <thead>
          <tr className="text-left text-white/70">
            <th className="p-2 border-b border-white/10">Product</th>
            {items.map(p => (
              <th key={p.slug} className="p-2 border-b border-white/10 align-bottom">
                <div className="flex items-center justify-between gap-2">
                  <Link href={`/products/${p.category}/${p.slug}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                  <button className="btn-ghost h-8 w-8 p-0" onClick={() => remove(p.slug)} aria-label="Remove">
                    <X size={16} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Image row */}
          <tr>
            <td className="p-2 text-white/70">Image</td>
            {items.map(p => (
              <td key={p.slug} className="p-2">
                <div className="relative h-28 w-full max-w-[180px] overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
                  {p.img ? (
                    <Image src={p.img} alt={p.name} fill className="object-cover" sizes="180px" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-white/40">No image</div>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Category */}
          <tr className="border-t border-white/10">
            <td className="p-2 text-white/70">Category</td>
            {items.map(p => (
              <td key={p.slug} className="p-2 capitalize">{p.category.replace(/-/g, ' ')}</td>
            ))}
          </tr>

          {/* Size */}
          <tr className="border-t border-white/10">
            <td className="p-2 text-white/70">Size</td>
            {items.map(p => (
              <td key={p.slug} className="p-2">{p.size || '—'}</td>
            ))}
          </tr>

          {/* Price */}
          <tr className="border-t border-white/10">
            <td className="p-2 text-white/70">Price</td>
            {items.map(p => (
              <td key={p.slug} className="p-2">
                {p.price != null ? `${p.currency || 'USD'} ${p.price.toFixed(2)}` : 'Contact for price'}
              </td>
            ))}
          </tr>

          {/* Badges / tags */}
          <tr className="border-t border-white/10">
            <td className="p-2 text-white/70">Tags</td>
            {items.map(p => (
              <td key={p.slug} className="p-2">
                {(p.badges || []).length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.badges!.map(t => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : '—'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
