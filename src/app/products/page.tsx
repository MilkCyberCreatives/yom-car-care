import { Suspense } from 'react'
import { products } from '@/data/products'
import ProductsClient from './ProductsClient'

export const metadata = {
  title: 'Products • YOM Car Care',
  description: 'Browse all car care products: exterior, interior, detailing and accessories.',
}

export default function ProductsPage() {
  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">All Products</h1>
      <Suspense fallback={<div className="mt-6 text-white/60">Loading…</div>}>
        <div className="mt-6">
          <ProductsClient items={products} />
        </div>
      </Suspense>
    </main>
  )
}
