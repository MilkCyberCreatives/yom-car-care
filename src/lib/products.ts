// src/lib/products.ts
import {
  allProducts as _allProducts,
  products as _products,
  categories as _CATEGORIES,
  type ProductData,
  firstImage as _firstImage,
  getByCategory as _getByCategory,
} from "@/data/products";

// Re-export the canonical product type that pages can import from here.
export type Product = ProductData;

// Categories constant some pages expect
export const ALL_CATEGORIES = _CATEGORIES;

/** Safe getter for the full product list */
export function getAllProducts(): Product[] {
  // Prefer allProducts if present, otherwise fall back to products
  return Array.isArray(_allProducts) && _allProducts.length ? _allProducts : _products;
}

/** Get one product by slug */
export function getProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/** Get products by typed category */
export function getProductsByCategory(category: Product["category"]): Product[] {
  // Use data-layer helper if available; otherwise filter locally
  if (typeof _getByCategory === "function") return _getByCategory(category) as Product[];
  return getAllProducts().filter((p) => p.category === category);
}

/** Return just the slugs (useful for SSG params) */
export function getSlugs(): string[] {
  return getAllProducts().map((p) => p.slug).filter(Boolean);
}

/** Thumbnail resolver with a safe fallback */
export function firstImage(p: Product): string {
  if (typeof _firstImage === "function") return _firstImage(p);
  return p.images?.[0] ?? p.img ?? "/products/placeholder.jpg";
}

/** Basic count per category */
export function countByCategory(): Record<Product["category"], number> {
  const counts = Object.fromEntries(_CATEGORIES.map((c) => [c, 0])) as Record<Product["category"], number>;
  for (const p of getAllProducts()) counts[p.category]++;
  return counts;
}

/** Slug helpers (mirror what your pages use) */
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
