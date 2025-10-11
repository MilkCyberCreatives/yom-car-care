import { MetadataRoute } from 'next'
import { products } from '@/data/products'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yomcarcare.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', 'about', 'contact', 'products', 'faq',
    'privacy-policy', 'cookie-policy', 'legal-area', 'terms'
  ].map(p => ({
    url: `${BASE}/${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.6,
  }))

  const cats = Array.from(new Set(products.map(p => p.category))).map(c => ({
    url: `${BASE}/products/${c}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const items = products.map(p => ({
    url: `${BASE}/products/${p.category}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...cats, ...items]
}
