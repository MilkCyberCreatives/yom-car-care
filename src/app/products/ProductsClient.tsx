'use client'

import { useSearchParams } from 'next/navigation'
import ProductCard from '../components/ProductCard'
import { products } from '@/data/products'

function sortProducts(list: typeof products, mode?: string) {
  if (mode === 'price-asc') return [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
  if (mode === 'price-desc') return [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
  return list
}

export default function ProductsClient() {
  const sp = useSearchParams()
  const sort = sp.get('sort') || undefined
  const q = (sp.get('q') || '').toLowerCase().trim()

  let list = products
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q))
  list = sortProducts(list, sort)

  return (
    <div className="container-px py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <div className="text-sm text-white/70">
          {list.length} item{list.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map(p => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  )
}
