// lib/products.ts
export * from "@/app/data/products";

export type Product = {
  slug: string;
  category: 'exterior' | 'interior' | 'air-fresheners' | 'detailing' | 'accessories';
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: string[];
  sku?: string;
  brand?: string;
};

const PRODUCTS: Product[] = [
  // ↓ Add/replace with your real products
  { slug: 'shield-snow-foam-1l', category: 'exterior', name: 'Shield Snow Foam 1L', price: 12.99, currency: 'USD', images: ['/images/snow-foam.jpg'], brand: 'Shield', sku: 'SNOW-FOAM-1L' },
  { slug: 'shield-splash-car-shampoo-500ml', category: 'exterior', name: 'Splash Car Shampoo 500ml', price: 8.99, currency: 'USD', images: ['/images/shampoo.jpg'], brand: 'Shield', sku: 'SPLASH-500' },
  // ... add the rest shown in your logs
];

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductsByCategory(category: Product['category']): Promise<Product[]> {
  return PRODUCTS.filter(p => p.category === category);
}

export async function getProduct(category: Product['category'], slug: string): Promise<Product | null> {
  return PRODUCTS.find(p => p.category === category && p.slug === slug) ?? null;
}

export const ALL_CATEGORIES: Product['category'][] = [
  'exterior',
  'interior',
  'air-fresheners',
  'detailing',
  'accessories',
];
