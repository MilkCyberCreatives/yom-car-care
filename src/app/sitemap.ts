import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yomcarcare.com'
const NOW = new Date().toISOString()

// Core routes we want indexed
const STATIC_ROUTES = [
  '/',
  '/about',
  '/products',
  '/contact',
  '/faq',
  '/legal-area',
  '/privacy-policy',
  '/cookie-policy',
  '/terms',
  '/compare',
  '/enquiry',
]

// French mirrors (we use re-export pages)
const STATIC_ROUTES_FR = STATIC_ROUTES.map((p) => `/fr${p === '/' ? '' : p}`)

export default function sitemap(): MetadataRoute.Sitemap {
  // Unique categories from data
  const categories = Array.from(new Set(products.map((p) => p.category)))

  // Category URLs
  const catUrls = categories.flatMap((cat) => ([
    {
      url: `${SITE}/products/${cat}`,
      lastModified: NOW,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE}/products/${cat}`,
          fr: `${SITE}/fr/products/${cat}`,
        },
      },
    },
    {
      url: `${SITE}/fr/products/${cat}`,
      lastModified: NOW,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE}/products/${cat}`,
          fr: `${SITE}/fr/products/${cat}`,
        },
      },
    },
  ]))

  // Product URLs
  const productUrls = products.flatMap((p) => ([
    {
      url: `${SITE}/products/${p.category}/${p.slug}`,
      lastModified: NOW,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE}/products/${p.category}/${p.slug}`,
          fr: `${SITE}/fr/products/${p.category}/${p.slug}`,
        },
      },
    },
    {
      url: `${SITE}/fr/products/${p.category}/${p.slug}`,
      lastModified: NOW,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE}/products/${p.category}/${p.slug}`,
          fr: `${SITE}/fr/products/${p.category}/${p.slug}`,
        },
      },
    },
  ]))

  // Static pages (EN + FR) with alternates
  const staticUrls = [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: NOW,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.6,
      alternates: {
        languages: {
          en: `${SITE}${path}`,
          fr: `${SITE}/fr${path === '/' ? '' : path}`,
        },
      },
    })),
    ...STATIC_ROUTES_FR.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: NOW,
      changeFrequency: 'monthly' as const,
      priority: path === '/fr' ? 1 : 0.6,
      alternates: {
        languages: {
          en: `${SITE}${path.replace(/^\/fr/, '') || '/'}`,
          fr: `${SITE}${path}`,
        },
      },
    })),
  ]

  return [
    ...staticUrls,
    ...catUrls,
    ...productUrls,
  ]
}
