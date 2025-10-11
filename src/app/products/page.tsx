import { Suspense } from 'react'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

function Fallback() {
  return <div className="container-px py-12 text-white/70">Loading products…</div>
}

export default function ProductsPage() {
  return (
    <main className="min-h-[50vh]">
      <Suspense fallback={<Fallback />}>
        <ProductsClient />
      </Suspense>
    </main>
  )
}
