import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '@/lib/search'

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const qRaw = (searchParams.q || '').trim()
  const q = qRaw.toLowerCase()

  // Boost cosmetic categories for Congo audience if desired
  const { results, expanded } = q
    ? searchProducts(q, {
        categoryBoost: {
          'exterior': 1.5,
          'interior': 1.0,
          'air-fresheners': 1.2,
          'detailing': 0.8,
          'accessories': 0.4,
        },
      })
    : { results: [], expanded: [] }

  return (
    <main className="container-px py-10">
      <h1 className="text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-white/70">
        {qRaw
          ? <>Results for <strong>“{qRaw}”</strong> — {results.length} found.</>
          : 'Type a query in the header to search products (EN or FR).'}
      </p>

      {qRaw && expanded.length > 0 && (
        <p className="mt-2 text-xs text-white/60">
          Including synonyms: {expanded.slice(0, 8).map((t, i) => <span key={t}>{i ? ', ' : ''}{t}</span>)}
        </p>
      )}

      {qRaw && (
        results.length ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map(r => (
              <div key={r.item.slug} className="relative">
                <ProductCard p={r.item} />
                {r.reasons.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {r.reasons.slice(0, 3).map(k => (
                      <span key={k} className="rounded bg-black/60 px-2 py-0.5 text-[11px] border border-white/10">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 text-white/70">
            No results. Try keywords like <em>“leather / cuir”</em>, <em>“wax / cire”</em>, <em>“pneu / tyre”</em>.
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
