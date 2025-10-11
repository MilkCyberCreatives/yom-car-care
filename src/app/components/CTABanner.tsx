import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="container-px py-12">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Need help choosing products?
        </h3>
        <p className="text-white/80 mt-2">
          Talk to our team and get the right combo for exterior, interior, and detailing.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="tel:+243848994045" className="btn-primary">Call +243 84 899 4045</a>
          <Link href="/products" className="btn-ghost">Browse All Products</Link>
        </div>
      </div>
    </section>
  )
}
