'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'         // ✅ fixed import
import { products } from '@/data/products'

// tiny client-side search (case-insensitive on name/category/size)
function runSearch(q: string) {
  const term = q.trim().toLowerCase()
  if (!term) return []
  return products.filter(p => {
    const hay = [p.name, p.category, p.size || '', (p.badges || []).join(' ')].join(' ').toLowerCase()
    return hay.includes(term)
  })
}

export default function SearchClient() {
  const params = useSearchParams()
  const q = params.get('q') || ''
  const results = useMemo(() => runSearch(q), [q])

  return (
    <section className="mt-6">
      {/* Summary + refine */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-white/80">
          {q ? (
            <>
              {results.length} result{results.length !== 1 ? 's' : ''} for <span className="font-semibold">'{q}'</span>
            </>
          ) : (
            <>Type a search above.</>
          )}
        </div>
        <Link href="/products" className="btn-ghost">Browse all</Link>
      </div>

      {/* Grid */}
      {q ? (
        results.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <p className="mt-6 text-white/70">
            No products matched. Try a different keyword or{' '}
            <Link href="/products" className="underline">browse all products</Link>.
          </p>
        )
      ) : null}
    </section>
  )
}
