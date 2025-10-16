// src/data/products.ts

// ---------- Types ----------
export type Category =
  | "exterior"
  | "interior"
  | "air-fresheners"
  | "detailing"
  | "accessories";

export type Badge = "new" | "popular" | "bestseller";

export type ProductData = {
  slug: string;
  name: string;
  category: Category;
  size?: string;
  /** Legacy single image field some components still use */
  img?: string;
  /** Preferred (first image is the thumb) */
  images?: string[];
  /** Some places treat price as a number, others as display text; allow both */
  price?: number | string;
  currency?: "USD" | "CDF" | string;
  /** Use an array for UI badges */
  badges?: Badge[];
};

// ---------- Category aliases ----------
const ext: Category = "exterior";
const int: Category = "interior";
const air: Category = "air-fresheners";
const det: Category = "detailing";
const acc: Category = "accessories";

// ---------- Helpers ----------
/**
 * Build image paths from /public/products.
 * If you only have one image per product, just ensure `/public/products/<slug>.jpg` exists.
 * Add more extensions if needed (e.g., .png or .webp).
 */
function imgs(slug: string, extra: string[] = []): string[] {
  const base = `/products/${slug}.jpg`;
  return [base, ...extra];
}

/** Prefer this to pick a thumbnail everywhere */
export function firstImage(p: ProductData): string {
  return p.images?.[0] ?? p.img ?? "/products/placeholder.jpg";
}

// ---------- Data (seed with local /public/products images) ----------
export const products: ProductData[] = [
  // ===== EXTERIOR =====
  {
    slug: "shield-snow-foam-1l",
    name: "Shield Snow Foam 1L",
    category: ext,
    size: "1L",
    images: imgs("shield-snow-foam-1l"),
    price: 9.5,
    currency: "USD",
    badges: ["bestseller"],
  },
  {
    slug: "shield-splash-car-shampoo-500ml",
    name: "Shield Splash Car Shampoo 500ml",
    category: ext,
    size: "500ml",
    images: imgs("shield-splash-car-shampoo-500ml"),
    price: 6.9,
    currency: "USD",
    badges: ["popular"],
  },
  {
    slug: "shield-quick-detailer-500ml",
    name: "Shield Quick Detailer 500ml",
    category: ext,
    size: "500ml",
    images: imgs("shield-quick-detailer-500ml"),
    price: 7.5,
    currency: "USD",
  },

  // ===== INTERIOR =====
  {
    slug: "shield-leather-care-400ml",
    name: "Shield Leather Care 400ml",
    category: int,
    size: "400ml",
    images: imgs("shield-leather-care-400ml"),
    price: 7.8,
    currency: "USD",
  },
  {
    slug: "interior-cleaner-500ml",
    name: "Interior Cleaner 500ml",
    category: int,
    size: "500ml",
    images: imgs("interior-cleaner-500ml"),
    price: 6.2,
    currency: "USD",
  },

  // ===== AIR FRESHENERS =====
  {
    slug: "monster-fresh-ocean",
    name: "Monster Fresh Ocean",
    category: air,
    images: imgs("monster-fresh-ocean"),
    price: 2.5,
    currency: "USD",
  },
  {
    slug: "monster-fresh-vanilla",
    name: "Monster Fresh Vanilla",
    category: air,
    images: imgs("monster-fresh-vanilla"),
    price: 2.5,
    currency: "USD",
  },

  // ===== DETAILING =====
  {
    slug: "shield-sheen-silicone-500ml",
    name: "Shield Sheen Silicone 500ml",
    category: det,
    size: "500ml",
    images: imgs("shield-sheen-silicone-500ml"),
    price: 6.9,
    currency: "USD",
  },
  {
    slug: "clay-bar-kit",
    name: "Clay Bar Kit",
    category: det,
    images: imgs("clay-bar-kit"),
    price: 12.0,
    currency: "USD",
  },

  // ===== ACCESSORIES =====
  {
    slug: "shield-standard-sponge",
    name: "Shield Standard Sponge",
    category: acc,
    images: imgs("shield-standard-sponge"),
    price: 1.2,
    currency: "USD",
  },
  {
    slug: "microfiber-towel-pack",
    name: "Microfiber Towel Pack",
    category: acc,
    images: imgs("microfiber-towel-pack"),
    price: 4.5,
    currency: "USD",
  },

  // 👉 Add/rename items freely — just place matching images in /public/products/
];

// ---------- Category utilities ----------
export const categories = [
  "exterior",
  "interior",
  "air-fresheners",
  "detailing",
  "accessories",
] as const;

export function getByCategory(cat: Category) {
  return products.filter((p) => p.category === cat);
}

export function countByCategory() {
  const map: Record<Category, number> = {
    exterior: 0,
    interior: 0,
    "air-fresheners": 0,
    detailing: 0,
    accessories: 0,
  };
  for (const p of products) map[p.category]++;
  return map;
}

// ---------- Home sections & master list ----------
/**
 * You can hand-pick these or leave as slices for now.
 * They’re kept as arrays because other parts of the app already expect them.
 */
export const featuredHome: ProductData[] = products.slice(0, 4);
export const mostPurchased: ProductData[] = products.slice(4, 8);

/** Flat list used by category pages and elsewhere */
export const allProducts: ProductData[] = products;
