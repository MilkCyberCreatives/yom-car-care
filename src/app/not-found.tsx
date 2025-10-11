import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container-px py-16">
      <h1 className="text-3xl font-semibold">Page Not Found</h1>
      <p className="text-white/70 mt-2">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/products" className="btn-ghost">Browse Products</Link>
      </div>
    </main>
  )
}
