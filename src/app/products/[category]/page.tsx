import Link from 'next/link'
import ProductCard from '../../components/ProductCard'
import { categories, getByCategory } from '../../data/products'
import type { Metadata } from 'next'

type Cat = typeof categories[number]

const labels: Record<Cat, string> = {
  'exterior': 'Exterior',
  'interior': 'Interior',
  'air-fresheners': 'Air Fresheners',
  'detailing': 'Detailing',
  'accessories': 'Accessories',
}

export function generateMetadata({ params }: { params: { category: Cat } }): Metadata {
  const cat = params.category
  const name = labels[cat] ?? 'Products'
  const title = `${name} — YOM Car Care`
  const description = `${name} car care products available in Lubumbashi. Cash on Delivery.`
  return { title, description, alternates: { canonical: `/products/${cat}` } }
}

export default function CategoryPage({ params }: { params: { category: Cat } }) {
  const cat = params.category
  if (!(categories as readonly string[]).includes(cat)) {
    return (
      <main className="container-px py-10">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <Link href="/products" className="btn-ghost mt-4 inline-flex">Back to Products</Link>
      </main>
    )
  }

  const items = getByCategory(cat)

  return (
    <main className="container-px py-10">
      <h1 className="text-3xl font-semibold">{labels[cat]}</h1>
      <p className="mt-2 text-white/70">{items.length} product(s) in this category.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(p => <ProductCard key={p.slug} p={p} />)}
      </div>

      <div className="mt-8">
        <Link href="/products" className="btn-ghost">All Categories</Link>
      </div>
    </main>
  )
}
