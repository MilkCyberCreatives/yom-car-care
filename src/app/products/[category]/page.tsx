import { notFound } from 'next/navigation'
import ProductCard from '../../components/ProductCard'
import { products } from '@/data/products'

type Params = { category: string }

export async function generateStaticParams() {
  const cats = Array.from(new Set(products.map(p => p.category)))
  return cats.map(category => ({ category }))
}

export function generateMetadata({ params }: { params: Params }) {
  const label = params.category.replace(/-/g, ' ')
  return {
    title: `Products – ${label}`,
    description: `Browse ${label} products from YOM Car Care in Lubumbashi.`,
  }
}

export default function CategoryPage({ params }: { params: Params }) {
  const list = products.filter(p => p.category === params.category)
  if (list.length === 0) return notFound()

  const title = params.category.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase())

  return (
    <main className="container-px py-10">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <div className="text-sm text-white/70">{list.length} item{list.length !== 1 ? 's' : ''}</div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map(p => <ProductCard key={p.slug} p={p} />)}
      </div>
    </main>
  )
}
