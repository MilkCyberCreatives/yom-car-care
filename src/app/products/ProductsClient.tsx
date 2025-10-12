'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Filters from '@/components/catalog/Filters'
import { sortProducts, type SortKey } from '@/lib/catalog'
import type { ProductData } from '@/data/products'

const PAGE_SIZE = 12

export default function ProductsClient({
  items,
  currentCategory = null,
}: {
  items: ProductData[]
  currentCategory?: string | null
}) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const sort = (params.get('sort') as SortKey) || 'name-asc'
  const page = Math.max(1, parseInt(params.get('page') || '1', 10))

  // Apply filters
  const filtered = useMemo(() => {
    const cat = currentCategory || params.get('cat') || ''
    const size = params.get('size') || ''
    const tag = params.get('tag') || ''
    const min = params.get('min') ? Number(params.get('min')) : null
    const max = params.get('max') ? Number(params.get('max')) : null

    return items.filter(p => {
      if (cat && p.category !== cat) return false
      if (size && p.size !== size) return false
      if (tag && !(p.badges || []).includes(tag)) return false
      if (min != null && (p.price ?? Infinity) < min) return false
      if (max != null && (p.price ?? 0) > max) return false
      return true
    })
  }, [items, params, currentCategory])

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(params.toString())
    p.set(key, value)
    if (key !== 'page') p.set('page', '1') // reset to first page on new sort/filter
    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
  }

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <Filters products={items} currentCategory={currentCategory} />

      <section>
        {/* Sort + count */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-white/80">
            {sorted.length} item{sorted.length !== 1 ? 's' : ''} found
          </div>
          <div>
            <label className="mr-2 text-sm text-white/70">Sort</label>
            <select
              className="input"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pageItems.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>

        {/* Pagination */}
        {totalPages > 1 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1
              const active = n === page
              const p = new URLSearchParams(params.toString())
              p.set('page', String(n))
              return (
                <button
                  key={n}
                  className={`rounded-lg border px-3 py-1.5 ${
                    active
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60'
                  }`}
                  onClick={() =>
                    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
                  }
                >
                  {n}
                </button>
              )
            })}
          </div>
        ) : null}
      </section>
    </div>
  )
}
