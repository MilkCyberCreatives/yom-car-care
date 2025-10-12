import { Suspense } from 'react'
import SearchClient from './SearchClient'

export const metadata = {
  title: 'Search • YOM Car Care',
  description: 'Find car care products: exterior, interior, detailing and accessories.',
  alternates: { canonical: '/search' },
}

export default function SearchPage() {
  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Search</h1>
      <p className="mt-2 text-white/70">
        Search by product name, category, size, or tag.
      </p>

      {/* Suspense is required because SearchClient uses useSearchParams */}
      <Suspense fallback={<div className="mt-6 text-white/60">Loading…</div>}>
        <SearchClient />
      </Suspense>
    </main>
  )
}
