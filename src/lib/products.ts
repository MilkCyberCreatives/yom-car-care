import { ProductData } from '@/data/products';

export type Product = {
  slug: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

function uniqBy<T, K extends keyof any>(arr: T[], key: (t: T) => K) {
  const map = new Map<K, T>();
  for (const item of arr) map.set(key(item), item);
  return Array.from(map.values());
}

export function allProducts(): Product[] {
  // Your data file exposes arrays like: featuredHome, mostPurchased.
  // Merge them safely. If you have more arrays in future, add them here.
  const pools = [
    ...(ProductData.featuredHome ?? []),
    ...(ProductData.mostPurchased ?? []),
  ] as Product[];

  return uniqBy(pools, (p) => p.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts().find((p) => p.slug === slug);
}

export function getRelatedByCategory(category: string, excludeSlug: string, limit = 4): Product[] {
  return allProducts()
    .filter(p => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit);
}
