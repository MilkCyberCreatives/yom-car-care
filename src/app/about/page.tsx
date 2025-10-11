import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — YOM Car Care',
  description:
    'YOM Car Care supplies premium exterior, interior, detailing, accessories and air fresheners in Lubumbashi. Cash on Delivery and fast local delivery.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main>
      {/* Top banner */}
      <section className="relative border-b border-white/10 bg-[radial-gradient(65%_120%_at_50%_-20%,_rgba(0,115,228,0.25),_transparent)]">
        <div className="container-px py-14 md:py-20">
          <p className="text-[13px] uppercase tracking-widest text-white/70">About us</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
            Premium car care products in <span className="text-[var(--brand-blue)]">Lubumbashi</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            We help drivers, detailers, and fleets keep their vehicles looking new with
            trusted brands and expert guidance. Order by phone or WhatsApp with{' '}
            <strong>Cash on Delivery</strong>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+243848994045" className="btn-primary">Call +243 84 899 4045</a>
            <Link href="/products" className="btn-ghost">Browse Products</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Products in catalog" value="50+" />
          <Stat label="Core categories" value="5" />
          <Stat label="Delivery area" value="Lubumbashi" />
          <Stat label="Payment" value="Cash on Delivery" />
        </div>
      </section>

      {/* Story */}
      <section className="container-px py-6 md:py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl md:text-2xl font-semibold">Our story</h2>
            <p className="mt-3 text-white/80">
              YOM Car Care was created to make quality car care more accessible in the DRC.
              We curate proven products for every step of the process — from pre-wash and
              shampoo, to leather care, interior detailers, air fresheners and microfiber
              accessories. Our team focuses on fast availability, reliable guidance, and
              a simple ordering experience without online payments.
            </p>
            <p className="mt-3 text-white/80">
              Whether you’re maintaining your daily driver or preparing vehicles for sale,
              we’ll help you choose the right combination for a deep clean and a lasting shine.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl md:text-2xl font-semibold">What we offer</h2>
            <ul className="mt-3 grid gap-2 text-white/80">
              <li>• Exterior: foams, shampoos, waxes, tyre care</li>
              <li>• Interior: leather care, wipes, dressings</li>
              <li>• Air Fresheners: popular scents for long-lasting freshness</li>
              <li>• Detailing: silicone, dressings, finishing products</li>
              <li>• Accessories: sponges, mitts, towels, kits and more</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/products/exterior" className="btn-ghost">Exterior</Link>
              <Link href="/products/interior" className="btn-ghost">Interior</Link>
              <Link href="/products/air-fresheners" className="btn-ghost">Air Fresheners</Link>
              <Link href="/products/detailing" className="btn-ghost">Detailing</Link>
              <Link href="/products/accessories" className="btn-ghost">Accessories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-zinc-950">
        <div className="container-px py-10 grid gap-5 md:grid-cols-3">
          <Value
            title="Quality first"
            text="We stock reputable brands and prioritize consistency over trends."
          />
          <Value
            title="Simple & local"
            text="Order by phone or WhatsApp, pay on delivery — no online payment required."
          />
          <Value
            title="Advice you can use"
            text="Tell us the goal and condition of your vehicle. We’ll recommend the right combo."
          />
        </div>
      </section>

      {/* Store info */}
      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl md:text-2xl font-semibold">Visit or contact us</h2>
            <ul className="mt-4 space-y-1 text-white/80">
              <li><strong>Address:</strong> 538 Avenue Kipopo, Golf Malela, Lubumbashi</li>
              <li><strong>Tel:</strong> +243 84 899 4045</li>
              <li><strong>Email:</strong> info@yomcarcare.com</li>
              <li><strong>Languages:</strong> English & French</li>
              <li><strong>Delivery:</strong> Lubumbashi (same/next day on most orders)</li>
            </ul>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href="tel:+243848994045" className="btn-primary">Call Now</a>
              <Link href="/products" className="btn-ghost">Browse Products</Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="YOM Car Care Location"
              src="https://www.google.com/maps?q=538%20Avenue%20Kipopo,%20Lubumbashi&output=embed"
              width="100%"
              height="360"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-14">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-semibold">Ready to refresh your car?</h3>
          <p className="text-white/80 mt-2">
            Explore the catalog or message us for a tailored recommendation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/products" className="btn-ghost">Explore Products</Link>
            <a
              className="btn-primary"
              href={`https://wa.me/243848994045?text=${encodeURIComponent(
                "Hello YOM Car Care, I'd like a recommendation for my vehicle."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ---------- tiny presentational components (kept inline to avoid extra files) ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-white/70">{label}</div>
    </div>
  )
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/80 text-sm">{text}</p>
    </div>
  )
}
