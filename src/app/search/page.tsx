import { Suspense } from 'react'
import SearchClient from './SearchClient'

export const dynamic = 'force-dynamic'

function Fallback() {
  return <div className="container-px py-12 text-white/70">Loading search…</div>
}

export default function SearchPage() {
  return (
    <main className="min-h-[50vh]">
      <Suspense fallback={<Fallback />}>
        <SearchClient />
      </Suspense>
    </main>
  )
}
