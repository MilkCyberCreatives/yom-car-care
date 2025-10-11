import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { products, type ProductData } from '@/data/products'
import ProductCard from '../../../components/ProductCard'

type Params = { category: string; slug: string }

export async function generateStaticParams() {
  return products.map(p => ({ category: p.category, slug: p.slug }))
}

export function generateMetadata({ params }: { params: Params }) {
  const p = products.find(x => x.slug === params.slug && x.category === params.category)
  if (!p) return {}
  return {
    title: `${p.name} • YOM Car Care`,
    description: `${p.name}${p.size ? ` — ${p.size}` : ''} • Available in Lubumbashi. Cash on Delivery.`,
  }
}

export const dynamicParams = false

export default function ProductDetailPage({ params }: { params: Params }) {
  const p = products.find(x => x.slug === params.slug && x.category === params.category)
  if (!p) return notFound()

  const gallery = p.images?.length ? p.images : (p.img ? [p.img] : [])
  const related = products.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 4)

  // Product JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: gallery.length ? gallery : undefined,
    description: p.description || `${p.name}${p.size ? ` — ${p.size}` : ''}`,
    sku: p.sku || p.slug,
    brand: { '@type': 'Brand', name: 'YOM Car Care' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: p.currency || 'USD',
      price: p.price ?? 0,
      seller: { '@type': 'Organization', name: 'YOM Car Care' },
      url: `https://yomcarcare.com/products/${p.category}/${p.slug}`,
    },
  }

  return (
    <main className="container-px py-10">
      {/* JSON-LD */}
      <Script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Title & CTAs */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{p.name}</h1>
          {p.size ? <p className="text-white/60 mt-1">{p.size}</p> : null}
        </div>
        <div className="flex gap-2 mt-2">
          <a href="tel:+243848994045" className="btn-ghost">Call</a>
          <a href="mailto:info@yomcarcare.com" className="btn-ghost">Email</a>
          <a
            className="btn-primary"
            href={`https://wa.me/243848994045?text=${encodeURIComponent(`Hi YOM, I'm interested in ${p.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Gallery + details */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          {gallery.length ? (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40">
                <Image
                  src={gallery[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {gallery.length > 1 ? (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.slice(1, 5).map((g, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
                      <Image src={g} alt={`${p.name} ${i + 2}`} fill sizes="25vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-xl border border-white/10 bg-zinc-900/40 text-white/50">
              Image coming soon
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
          <h2 className="font-semibold text-lg">Product details</h2>
          <ul className="mt-3 space-y-2 text-white/80">
            <li><strong>Category:</strong> <span className="capitalize">{p.category.replace('-', ' ')}</span></li>
            {p.size ? <li><strong>Size:</strong> {p.size}</li> : null}
            {p.badges?.length ? <li><strong>Tags:</strong> {p.badges.join(', ')}</li> : null}
          </ul>

          {p.price != null ? (
            <div className="mt-5 text-xl font-semibold">
              {p.currency || 'USD'} {p.price.toFixed(2)}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="tel:+243848994045" className="btn-ghost">Call to Order</a>
            <a href="mailto:info@yomcarcare.com" className="btn-ghost">Email Us</a>
            <a
              className="btn-primary"
              href={`https://wa.me/243848994045?text=${encodeURIComponent(`Hi YOM, I'm interested in ${p.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Order
            </a>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            * Cash on Delivery in Lubumbashi. No online payments.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length ? (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Related products</h3>
            <Link href={`/products/${p.category}`} className="text-sm hover:underline">View all</Link>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map(r => <ProductCard key={r.slug} p={r as ProductData} />)}
          </div>
        </section>
      ) : null}
    </main>
  )
}
