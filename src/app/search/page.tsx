// src/app/search/page.tsx
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

function Fallback() {
  return <div className="container-px py-12 text-white/70">Loading search…</div>
}

export default function SearchPage() {
  return (
    <main className="min-h-[50vh]">
      <Suspense fallback={<Fallback />}>
        {/* Client component does the actual useSearchParams reading */}
        <SearchClient />
      </Suspense>
    </main>
  )
}

// ----- client chunk -----
'use client'
import { useSearchParams } from 'next/navigation'
import { searchProducts } from '@/lib/search'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'

function SearchClient() {
  const sp = useSearchParams()
  const q = (sp.get('q') || '').trim()

  const { results } = q ? searchProducts(q) : { results: [] as any[] }

  return (
    <div className="container-px py-10">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="text-white/70 mt-1">Query: “{q || '—'}”</p>

      {!q ? (
        <p className="mt-6 text-white/70">Type in the search bar to find products.</p>
      ) : results.length === 0 ? (
        <p className="mt-6 text-white/70">No results. Try a different term.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map(r => (
            <ProductCard key={r.item.slug} p={r.item} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link className="btn-ghost" href="/products">Browse all products</Link>
      </div>
    </div>
  )
}
