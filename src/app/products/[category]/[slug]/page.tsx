import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import { products } from '@/data/products'
import PdpCtas from '../../../components/PdpCtas'
import ImageGallery from '../../../components/ImageGallery'

type Params = { category: string; slug: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  const item = products.find(p => p.slug === params.slug && p.category === params.category)
  if (!item) return { title: 'Product — YOM Car Care' }
  return {
    title: `${item.name} — YOM Car Care`,
    description: `${item.name} available in Lubumbashi. Cash on Delivery.`,
    alternates: { canonical: `/products/${item.category}/${item.slug}` },
    openGraph: {
      title: `${item.name} — YOM Car Care`,
      description: `${item.name} available in Lubumbashi. Cash on Delivery.`,
      images: (item.images?.length ? item.images : item.img ? [item.img] : undefined)?.map(u => ({
        url: u, width: 1200, height: 900, alt: item.name
      })),
    }
  }
}

export default function ProductPage({ params }: { params: Params }) {
  const item = products.find(p => p.slug === params.slug && p.category === params.category)
  if (!item) return notFound()

  const catTitle = params.category.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase())
  const waText = encodeURIComponent(`Hello YOM Car Care, I'm interested in: ${item.name}`)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    category: catTitle,
    image: item.images?.length ? item.images : (item.img ? [item.img] : undefined),
    brand: { '@type': 'Brand', name: 'YOM Car Care' },
    offers: {
      '@type': 'Offer',
      priceCurrency: item.currency || 'USD',
      price: item.price != null ? item.price : undefined,
      availability: 'https://schema.org/InStoreOnly',
      url: `https://yomcarcare.com/products/${item.category}/${item.slug}`
    }
  }

  return (
    <main className="container-px py-10">
      <Script id="jsonld-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <nav className="text-sm text-white/60">
        <Link href="/">Home</Link> <span>/</span>{' '}
        <Link href="/products">Products</Link> <span>/</span>{' '}
        <Link href={`/products/${item.category}`}>{catTitle}</Link> <span>/</span>{' '}
        <span className="text-white">{item.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <ImageGallery
          images={item.images?.length ? item.images : (item.img ? [item.img] : [])}
          alt={item.name}
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-semibold">{item.name}</h1>
          <div className="mt-2 text-white/80">
            {item.size ? <span>Size: {item.size}</span> : null}
            {item.price != null && (
              <span className="ml-3 inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-sm">
                Price: {item.currency || 'USD'} {item.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="mt-4 text-white/80">
            High-quality {catTitle.toLowerCase()} product. Cash on Delivery available in Lubumbashi.
          </p>

          <PdpCtas itemName={item.name} category={item.category} waText={waText} />

          <div className="mt-6">
            <Link href={`/products/${item.category}`} className="btn-ghost">Back to {catTitle}</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
