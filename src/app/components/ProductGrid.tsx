'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import type { ProductData } from '../data/products'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ProductGrid({
  items,
  page,
  totalPages,
  q,
  category,
  sort,
}: {
  items: ProductData[]
  page: number
  totalPages: number
  q: string
  category: string
  sort: 'name_asc' | 'name_desc'
}) {
  return (
    <>
      {/* Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} q={q} category={category} sort={sort} />
    </>
  )
}

function Pagination({
  page,
  totalPages,
  q,
  category,
  sort,
}: {
  page: number
  totalPages: number
  q: string
  category: string
  sort: 'name_asc' | 'name_desc'
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setPage = (p: number) => {
    const sp = new URLSearchParams(params?.toString())
    sp.set('page', String(p))
    if (q !== undefined) sp.set('q', q)
    if (category) sp.set('category', category); else sp.delete('category')
    sp.set('sort', sort)
    router.push(`${pathname}?${sp.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalPages <= 1) return null

  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        disabled={prevDisabled}
        onClick={() => setPage(page - 1)}
        className={`btn-ghost px-4 py-2 ${prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Previous page"
      >
        Prev
      </button>

      <span className="text-white/70 text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={nextDisabled}
        onClick={() => setPage(page + 1)}
        className={`btn-ghost px-4 py-2 ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  )
}
