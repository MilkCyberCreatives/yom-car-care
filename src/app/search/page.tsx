import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const qRaw = (searchParams.q || '').trim()
  const q = qRaw.toLowerCase()
  const results = q
    ? products.filter(p => (p.name + ' ' + p.category).toLowerCase().includes(q))
    : []

  return (
    <main className="container-px py-10">
      <h1 className="text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-white/70">
        {qRaw ? <>Results for <strong>“{qRaw}”</strong> — {results.length} found.</> : 'Type a query in the header to search products.'}
      </p>

      {qRaw && (
        results.length ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <div className="mt-8 text-white/70">
            No results. Try keywords like <em>“leather”</em>, <em>“wax”</em>, or <em>“microfibre”</em>.
          </div>
        )
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/products/exterior" className="btn-ghost">Exterior</Link>
        <Link href="/products/interior" className="btn-ghost">Interior</Link>
        <Link href="/products/air-fresheners" className="btn-ghost">Air Fresheners</Link>
        <Link href="/products/detailing" className="btn-ghost">Detailing</Link>
        <Link href="/products/accessories" className="btn-ghost">Accessories</Link>
      </div>
    </main>
  )
}
