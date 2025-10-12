import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="container-px py-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--brand-blue)] px-6 py-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Cash on Delivery in Lubumbashi</h2>
          <p className="mt-2 opacity-90">
            Order online and pay at your door. Call or WhatsApp if you need help choosing the right product.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/products" className="btn-ghost bg-white/10 hover:bg-white/20">Browse Products</Link>
            <a href="tel:+243848994045" className="btn-ghost">Call +243 84 899 4045</a>
            <a href="https://wa.me/243848994045" target="_blank" className="btn-primary">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </section>
  )
}
