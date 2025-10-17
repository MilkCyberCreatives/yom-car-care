// src/lib/products.ts
import {
  allProducts as _allProducts,
  products as _products,
  categories as _CATEGORIES,
  firstImage as _firstImage,
  getByCategory as _getByCategory,
  type ProductData,
} from "@/data/products";

/** Canonical product type to import from this module */
export type Product = ProductData;

/** Public categories constant */
export const ALL_CATEGORIES = _CATEGORIES;

/** Return the master list (prefers allProducts if present) */
export function getAllProducts(): Product[] {
  return Array.isArray(_allProducts) && _allProducts.length ? _allProducts : _products;
}

/** Get products by category */
export function getProductsByCategory(category: Product["category"]): Product[] {
  if (typeof _getByCategory === "function") return _getByCategory(category) as Product[];
  return getAllProducts().filter((p) => p.category === category);
}

/** Get one product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/**
 * Get one product.
 * Overloads:
 *  - getProduct(slug)
 *  - getProduct(category, slug)  // category is ignored for lookup but kept for backwards-compat
 */
export function getProduct(slug: string): Product | undefined;
export function getProduct(category: Product["category"], slug: string): Product | undefined;
export function getProduct(a: any, b?: any): Product | undefined {
  const slug = typeof b === "string" ? b : a;
  return getProductBySlug(slug);
}

/** Slug list (for SSG params) */
export function getSlugs(): string[] {
  return getAllProducts().map((p) => p.slug).filter(Boolean);
}

/** Small related-items helper */
export function getRelatedByCategory(
  category: Product["category"],
  excludeSlug?: string,
  limit = 8
): Product[] {
  const list = getProductsByCategory(category).filter((p) => p.slug !== excludeSlug);
  return list.slice(0, limit);
}

/** Thumbnail resolver with fallback */
export function firstImage(p: Product): string {
  if (typeof _firstImage === "function") return _firstImage(p);
  return p.images?.[0] ?? p.img ?? "/products/placeholder.jpg";
}

/** Counts per category */
export function countByCategory(): Record<Product["category"], number> {
  const counts = Object.fromEntries(_CATEGORIES.map((c) => [c, 0])) as Record<Product["category"], number>;
  for (const p of getAllProducts()) counts[p.category]++;
  return counts;
}

/** Category slug utilities */
export function toCategorySlug(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
export function fromCategorySlug(slug: string) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}
