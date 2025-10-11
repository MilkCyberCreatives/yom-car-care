'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function FeaturedProducts() {
  // Simple pick: first 8 items across the catalog (you can curate later)
  const featured = products.slice(0, 8)

  return (
    <section className="container-px py-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Products</h2>
          <p className="text-white/70 mt-1">Top picks available in Lubumbashi with Cash on Delivery.</p>
        </div>
        <Link href="/products" className="btn-ghost hidden md:inline-flex">View All</Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link href="/products" className="btn-ghost w-full justify-center">View All Products</Link>
      </div>
    </section>
  )
}
