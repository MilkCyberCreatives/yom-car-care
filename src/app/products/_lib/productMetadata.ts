import type { Metadata } from 'next';
import { products } from '@/data/products';

export function buildProductMetadata(category: string, slug: string): Metadata {
  const product = products.find(p => p.category === category && p.slug === slug);
  const title = product ? `${product.name} | YOM Car Care` : 'Product | YOM Car Care';
  const description = product?.description ?? 'Explore YOM Car Care products.';
  const images = product?.image ? [product.image] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: 'product',
    },
    alternates: {
      canonical: `/products/${category}/${slug}`,
      languages: {
        'fr': `/fr/products/${category}/${slug}`,
      },
    },
  };
}
