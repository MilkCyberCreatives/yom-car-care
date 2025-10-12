import { notFound } from 'next/navigation'
import Script from 'next/script'
import { products } from '@/data/products'
import ProductsClient from '@/app/products/ProductsClient'

type Params = { category: string }

// Prebuild each category route
export async function generateStaticParams() {
  const cats = Array.from(new Set(products.map(p => p.category)))
  return cats.map(category => ({ category }))
}

export function generateMetadata({ params }: { params: Params }) {
  const label = humanize(params.category)
  return {
    title: `Products – ${label}`,
    description: `Browse ${label} products from YOM Car Care in Lubumbashi.`,
    alternates: {
      canonical: `/products/${params.category}`,
    },
  }
}

export default function CategoryPage({ params }: { params: Params }) {
  const list = products.filter(p => p.category === params.category)
  if (list.length === 0) return notFound()

  const title = humanize(params.category)

  // JSON-LD for the category ItemList
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yomcarcare.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${title} • YOM Car Care`,
    itemListElement: list.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/products/${p.category}/${p.slug}`,
      name: p.name,
    })),
  }

  return (
    <main className="container-px py-10">
      <Script
        id="cat-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-end justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <div className="text-sm text-white/70">
          {list.length} item{list.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* 
        Optional enhancement enabled:
        This reuses the same client component used on /products and
        passes currentCategory so the Category filter is hidden & locked.
      */}
      <div className="mt-6">
        <ProductsClient items={list} currentCategory={params.category} />
      </div>
    </main>
  )
}

/* utils */
function humanize(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
}
