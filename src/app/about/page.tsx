import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "YOM Car Care — premium car care products in Lubumbashi. Authentic brands, cash on delivery, and friendly guidance.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container-px py-16 md:py-20 relative">
          <div className="max-w-3xl">
            <p className="uppercase tracking-wide text-white/70 text-xs mb-2">
              About YOM Car Care
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Premium car care for a
              <span className="text-white/90"> showroom shine</span>
              <span className="block text-white/80 text-2xl md:text-3xl mt-2 font-semibold">
                in Lubumbashi
              </span>
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">
              We bring trusted, manufacturer-approved products for Congo
              conditions—backed by simple cash on delivery and friendly advice.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link href="/products" className="btn-primary">
                Browse Products
              </Link>
              <a href="tel:+243848994045" className="btn-ghost">
                +243 84 899 4045
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / trust */}
      <section className="container-px py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { k: "100% Genuine", v: "Manufacturer-approved" },
            { k: "Cash on Delivery", v: "Pay at your door" },
            { k: "Local Support", v: "Fast answers on WhatsApp" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-white/10 bg-zinc-900 text-white p-5"
            >
              <div className="text-lg font-semibold">{s.k}</div>
              <div className="text-white/70 text-sm mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container-px py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white aspect-[4/3]">
            <Image
              src="/logo.svg"
              alt="YOM Car Care"
              fill
              className="object-contain p-8"
              sizes="(min-width:768px) 50vw, 100vw"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Our story</h2>
            <p className="mt-3 text-zinc-600">
              YOM Car Care started with a simple goal: make world-class car
              care accessible in Lubumbashi. We curate products that work in
              local conditions and keep things simple—clear guidance, fair
              pricing, and delivery you can trust.
            </p>
            <p className="mt-3 text-zinc-600">
              Whether you’re refreshing interiors, protecting paintwork, or
              detailing professionally, we’ll point you to the right solution.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold">What we value</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              t: "Quality & Authenticity",
              d: "We only stock trusted brands and official imports.",
            },
            {
              t: "Honest Guidance",
              d: "Clear recommendations for exterior, interior & detailing.",
            },
            {
              t: "Fast Local Service",
              d: "Order by phone or WhatsApp. Cash on delivery in Lubumbashi.",
            },
          ].map((v) => (
            <div
              key={v.t}
              className="rounded-2xl border border-white/10 bg-zinc-900 text-white p-6"
            >
              <div className="text-lg font-semibold">{v.t}</div>
              <div className="text-white/70 mt-2">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands strip (uses your public logos) */}
      <section className="container-px py-8 md:py-12">
        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <p className="text-white/80 text-sm mb-4">Brands we carry</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {["/logo.svg", "/logo1.svg", "/logo2.svg", "/logo.svg", "/logo1.svg", "/logo2.svg"].map(
              (src, i) => (
                <div
                  key={i}
                  className="relative h-10 md:h-12 grayscale hover:grayscale-0 transition"
                >
                  <Image
                    src={src}
                    alt="Brand"
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Visit / Contact */}
      <section className="container-px py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
            <h3 className="text-xl font-semibold">Visit us</h3>
            <p className="text-white/70 mt-2">
              538 Avenue Kipopo, Golf Malela, Lubumbashi
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="btn-primary"
                href="https://www.google.com/maps/search/?api=1&query=538+Avenue+Kipopo,+Golf+Malela,+Lubumbashi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps
              </a>
              <a className="btn-ghost" href="tel:+243848994045">
                Call us
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
            <h3 className="text-xl font-semibold">Need help choosing?</h3>
            <p className="text-white/70 mt-2">
              Tell us what you’re working on—exterior, interior, or detailing—
              and we’ll recommend the right product and process.
            </p>
            <div className="mt-4">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px py-12 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Ready to refresh your car?</h3>
            <p className="text-white/70 mt-1">
              Browse our catalog or message us on WhatsApp for quick guidance.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
            <a
              href="https://wa.me/243848994045"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
