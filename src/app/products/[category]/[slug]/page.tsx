import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import AddActions from '@/components/product/AddActions'

type Params = { category: string; slug: string }

export async function generateStaticParams() {
  return products.map(p => ({ category: p.category, slug: p.slug }))
}

export function generateMetadata({ params }: { params: Params }) {
  const p = products.find(x => x.slug === params.slug && x.category === params.category)
  if (!p) return {}
  const title = `${p.name} • YOM Car Care`
  const description =
    p.description ||
    `${p.name} — ${humanize(params.category)} product available in Lubumbashi with Cash on Delivery.`
  const url = `/products/${p.category}/${p.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: p.img ? [{ url: p.img, alt: p.name }] : undefined,
    },
  }
}

export default function ProductPage({ params }: { params: Params }) {
  const p = products.find(x => x.slug === params.slug && x.category === params.category)
  if (!p) return notFound()

  const related = products
    .filter(x => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4)

  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yomcarcare.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description:
      p.description ||
      `${p.name} — ${humanize(params.category)} product available in Lubumbashi with Cash on Delivery.`,
    image: p.img ? [p.img] : undefined,
    category: humanize(p.category),
    sku: p.slug,
    brand: { '@type': 'Brand', name: 'YOM Car Care' },
    offers:
      p.price != null
        ? {
            '@type': 'Offer',
            priceCurrency: p.currency || 'USD',
            price: p.price,
            availability: 'https://schema.org/InStock',
            url: `${BASE}/products/${p.category}/${p.slug}`,
          }
        : undefined,
  }

  return (
    <main className="container-px py-8">
      {/* JSON-LD */}
      <Script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div className="card p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
            {p.img ? (
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-white/40">No image</div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{p.name}</h1>
          <p className="mt-1 text-white/70 capitalize">{humanize(p.category)}</p>

          {p.size ? <p className="mt-2 text-white/80">Size: {p.size}</p> : null}

          <div className="mt-4">
            {p.price != null ? (
              <div className="text-xl font-semibold">
                {(p.currency || 'USD') + ' ' + p.price.toFixed(2)}
              </div>
            ) : (
              <div className="text-white/70">Contact for price</div>
            )}
          </div>

          <AddActions p={p} />

          {p.description ? (
            <div className="prose prose-invert mt-6 max-w-none">
              <p>{p.description}</p>
            </div>
          ) : null}

          {/* Quick meta */}
          <ul className="mt-6 grid gap-2 text-sm text-white/70">
            <li>
              <span className="text-white">Availability:</span> Lubumbashi • Cash on Delivery
            </li>
            <li>
              <span className="text-white">Contact:</span>{' '}
              <Link className="underline" href="tel:+243848994045">
                +243 84 899 4045
              </Link>{' '}
              • <Link className="underline" href="mailto:info@yomcarcare.com">info@yomcarcare.com</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Related */}
      {related.length ? (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Related Products</h2>
            <Link href={`/products/${p.category}`} className="btn-ghost">
              View all in {humanize(p.category)}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map(r => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

/* utils */
function humanize(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase())
}
