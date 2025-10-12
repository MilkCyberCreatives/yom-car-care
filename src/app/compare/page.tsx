import dynamic from 'next/dynamic'

/**
 * CompareTable uses client state/context. Load it on the client only to keep
 * the route a server component and avoid static-generation bailouts.
 */
const CompareTable = dynamic(() => import('@/components/compare/CompareTable'), {
  ssr: false,
})

export const metadata = {
  title: 'Compare Products',
  description:
    'Compare car care products side by side and pick the best for your needs. Cash on Delivery in Lubumbashi.',
  alternates: { canonical: '/compare' },
}

export default function ComparePage() {
  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Compare Products</h1>
      <p className="mt-2 text-white/70">
        Add items to compare from any product card, then review them here.
      </p>

      <div className="mt-6 card p-4 overflow-x-auto">
        <CompareTable />
      </div>
    </main>
  )
}
