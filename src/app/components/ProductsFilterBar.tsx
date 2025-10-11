'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const categories = [
  { value: '', label: 'All categories' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'air-fresheners', label: 'Air Fresheners' },
  { value: 'detailing', label: 'Detailing' },
  { value: 'accessories', label: 'Accessories' },
]

export default function ProductsFilterBar({
  initialQuery,
  initialCategory,
  initialSort,
}: {
  initialQuery: string
  initialCategory: string
  initialSort: 'name_asc' | 'name_desc'
}) {
  const [q, setQ] = useState(initialQuery)
  const [cat, setCat] = useState(initialCategory)
  const [sort, setSort] = useState<'name_asc' | 'name_desc'>(initialSort)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Build URL with updated params
  const buildUrl = useMemo(() => {
    return (next: Partial<{ q: string; category: string; sort: string; page: string }>) => {
      const params = new URLSearchParams(searchParams?.toString())
      if (next.q !== undefined) params.set('q', next.q)
      if (next.category !== undefined) {
        next.category ? params.set('category', next.category) : params.delete('category')
      }
      if (next.sort !== undefined) params.set('sort', next.sort)
      // reset to page 1 if filters change
      if (next.page !== undefined) params.set('page', next.page)
      else params.delete('page')
      const qs = params.toString()
      return `${pathname}?${qs}`
    }
  }, [pathname, searchParams])

  // Submit handlers
  const apply = () => {
    router.push(buildUrl({ q: q.trim(), category: cat, sort, page: '1' }))
  }

  // Submit on Enter in search box
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (document.activeElement as HTMLElement)?.id === 'products-q') {
        apply()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [q, cat, sort])

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            id="products-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none placeholder:text-white/70"
            aria-label="Search products"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none"
            aria-label="Filter by category"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Sort + Apply */}
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'name_asc' | 'name_desc')}
            className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 outline-none"
            aria-label="Sort products"
          >
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
          </select>

          <button onClick={apply} className="btn-primary whitespace-nowrap">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
