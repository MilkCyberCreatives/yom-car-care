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
  /** Optional: used by product detail + metadata */
  description?: string;
};

// ---------- Category aliases ----------
const ext: Category = "exterior";
const int: Category = "interior";
const air: Category = "air-fresheners";
const det: Category = "detailing";
const acc: Category = "accessories";

// ---------- Helper ----------
function imgs(slug: string, extra: string[] = []): string[] {
  const base = `/products/${slug}.jpg`;
  return [base, ...extra];
}

/** Prefer this to pick a thumbnail everywhere */
export function firstImage(p: ProductData): string {
  return p.images?.[0] ?? p.img ?? "/products/placeholder.jpg";
}

// ---------- Product Data ----------
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
    description:
      "A thick foaming pre-wash formula that safely removes dirt and grime before contact washing.",
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
    description:
      "High-suds shampoo designed for a spotless, streak-free shine on all paint finishes.",
  },
  {
    slug: "shield-quick-detailer-500ml",
    name: "Shield Quick Detailer 500ml",
    category: ext,
    size: "500ml",
    images: imgs("shield-quick-detailer-500ml"),
    price: 7.5,
    currency: "USD",
    description:
      "Instant gloss booster and dust remover for maintaining your vehicle between washes.",
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
    description:
      "Nourishes, protects, and restores genuine and synthetic leather surfaces.",
  },
  {
    slug: "interior-cleaner-500ml",
    name: "Interior Cleaner 500ml",
    category: int,
    size: "500ml",
    images: imgs("interior-cleaner-500ml"),
    price: 6.2,
    currency: "USD",
    description:
      "Safe, all-purpose cleaner for dashboards, consoles, vinyl, and fabric.",
  },

  // ===== AIR FRESHENERS =====
  {
    slug: "monster-fresh-ocean",
    name: "Monster Fresh Ocean",
    category: air,
    images: imgs("monster-fresh-ocean"),
    price: 2.5,
    currency: "USD",
    description:
      "Invigorating ocean fragrance that keeps your car interior smelling fresh for weeks.",
  },
  {
    slug: "monster-fresh-vanilla",
    name: "Monster Fresh Vanilla",
    category: air,
    images: imgs("monster-fresh-vanilla"),
    price: 2.5,
    currency: "USD",
    description:
      "Classic vanilla aroma with a long-lasting scent profile suitable for any vehicle.",
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
    description:
      "Professional-grade silicone dressing that leaves plastics and trims with a deep gloss finish.",
  },
  {
    slug: "clay-bar-kit",
    name: "Clay Bar Kit",
    category: det,
    images: imgs("clay-bar-kit"),
    price: 12.0,
    currency: "USD",
    description:
      "Removes embedded contaminants from paintwork to restore a smooth, mirror-like surface.",
  },

  // ===== ACCESSORIES =====
  {
    slug: "shield-standard-sponge",
    name: "Shield Standard Sponge",
    category: acc,
    images: imgs("shield-standard-sponge"),
    price: 1.2,
    currency: "USD",
    description:
      "Durable, multi-use sponge ideal for washing bodywork and wheels.",
  },
  {
    slug: "microfiber-towel-pack",
    name: "Microfiber Towel Pack",
    category: acc,
    images: imgs("microfiber-towel-pack"),
    price: 4.5,
    currency: "USD",
    description:
      "Set of ultra-soft microfiber towels for drying, buffing, and interior cleaning.",
  },
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
export const featuredHome: ProductData[] = products.slice(0, 4);
export const mostPurchased: ProductData[] = products.slice(4, 8);

/** Flat list used by category pages and elsewhere */
export const allProducts: ProductData[] = products;
