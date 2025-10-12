import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

export default function FeaturedProducts() {
  // Pick the first 8 as “featured” (adjust as needed)
  const featured = products.slice(0, 8)

  return (
    <section className="container-px py-10">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <p className="text-white/70">
            Top picks available in Lubumbashi with Cash on Delivery.
          </p>
        </div>
        <Link href="/products" className="btn-ghost">View All</Link>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  )
}
