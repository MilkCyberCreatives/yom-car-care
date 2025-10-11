import type { Metadata } from 'next'
import ProductsFilterBar from '../components/ProductsFilterBar'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

export const metadata: Metadata = {
  title: 'Products — YOM Car Care',
  description: 'Browse exterior, interior, detailing, accessories and air fresheners. Cash on Delivery in Lubumbashi.',
  alternates: { canonical: '/products' },
}

type Search = {
  q?: string
  category?: string
  sort?: 'name_asc' | 'name_desc'
  page?: string
}

export default function ProductsIndex({ searchParams }: { searchParams: Search }) {
  // Defaults
  const q = (searchParams.q || '').trim()
  const category = (searchParams.category || '').trim()
  const sort = (searchParams.sort as Search['sort']) || 'name_asc'
  const page = Math.max(1, Number(searchParams.page || '1'))

  // Filter in the server layer for speed/SEO
  let filtered = products.slice()

  if (category) {
    filtered = filtered.filter(p => p.category === category)
  }
  if (q) {
    const needle = q.toLowerCase()
    filtered = filtered.filter(p => (p.name + ' ' + p.category).toLowerCase().includes(needle))
  }

  // Sort
  filtered.sort((a, b) => {
    const A = a.name.localeCompare(b.name)
    return sort === 'name_desc' ? -A : A
  })

  // Pagination
  const pageSize = 12
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return (
    <main className="container-px py-10">
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-2 text-white/70">
        {total} product{total === 1 ? '' : 's'} found{category ? ` in “${titleCase(category)}”` : ''}{q ? ` for “${q}”` : ''}.
      </p>

      <ProductsFilterBar
        initialQuery={q}
        initialCategory={category}
        initialSort={sort}
      />

      <ProductGrid
        items={items}
        page={page}
        totalPages={totalPages}
        q={q}
        category={category}
        sort={sort}
      />
    </main>
  )
}

function titleCase(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase())
}
