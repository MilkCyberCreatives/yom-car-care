export type Category = 'exterior' | 'interior' | 'air-fresheners' | 'detailing' | 'accessories';
export type Badge = 'new' | 'popular' | 'bestseller';

export type ProductData = {
  slug: string;
  name: string;
  category: Category;
  size?: string;
  img?: string;        // keep for legacy usage
  images?: string[];   // preferred
  price?: number | string;  // ✅ allow both
  currency?: 'USD' | 'CDF' | string;
  badges?: Badge[];    // ✅ array (not single "badge")
};
