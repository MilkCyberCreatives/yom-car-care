// src/data/mostPurchased.ts

export type MPItem = {
  slug: string;
  name: string;
  img: string;                // public path under /public
  price: number;              // numeric only (we format in UI)
  currency?: "USD" | "CDF";
  category: "exterior" | "interior" | "detailing" | "accessories";
  href?: string;              // supplier page
  badge?: string;
};

/**
 * Uses the 4 images you uploaded into /public/products (order kept).
 * Prices shown in USD-style just for display on the site.
 * You can tweak numbers anytime.
 */
export const mostPurchasedHome: MPItem[] = [
  {
    slug: "deotex-sany-disinfectant",
    name: "Deotex Sany — Multi-Purpose Disinfectant (Spray)",
    img: "/products/spray-disinfettante-per-ambienti-e-climatizzatori-deotex-sany-fra-ber_900x900.webp",
    price: 8,
    currency: "USD",
    category: "interior",
    href: "https://shop.fra-ber.it/en/products/spray-disinfettante-per-condizionatori-deotex-sany?variant=43743127666896",
    badge: "New",
  },
  {
    slug: "multiforce-degreaser",
    name: "Multiforce — Powerful Engine & Oil Degreaser",
    img: "/products/sgrassatore-potente-per-motori-e-olio-motore-multiforce-fra-ber_87d29aee-6f33-4eba-a33b-2057245235c6_900x900.webp",
    price: 9,
    currency: "USD",
    category: "detailing",
    href: "https://shop.fra-ber.it/en/products/sgrassatore-potente-per-motori-olio-grasso-multiforce?variant=43696420683984",
    badge: "Bestseller",
  },
  {
    slug: "pulitutto-concentrated-cleaner",
    name: "Pulitutto — Concentrated Multi-Purpose Cleaner",
    img: "/products/sgrassatore-concentrato-e-pulitore-per-interni-auto-pulitutto-fra-ber_c1f55c9d-c905-4f7b-a22d-698173fc3b51_900x900.webp",
    price: 7,
    currency: "USD",
    category: "interior",
    href: "https://shop.fra-ber.it/en/products/pulitore-interni-auto-sgrassatore-pulitutto?variant=43698175410384",
    badge: "Popular",
  },
  {
    slug: "graduated-bottle-1l",
    name: "Graduated Bottle 1L (with Sprayer)",
    img: "/products/flacone-graduato-blu-da-1-litro-con-spruzzino-di-fra-ber_900x900.webp",
    price: 3,
    currency: "USD",
    category: "accessories",
    href: "https://shop.fra-ber.it/en/products/flaconi-graduati-da-1-litro-fra-ber?variant=43680672186576",
    badge: "Pro",
  },
];
