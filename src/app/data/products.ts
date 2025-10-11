export type Category =
  | 'exterior'
  | 'interior'
  | 'air-fresheners'
  | 'detailing'
  | 'accessories'

export type Badge = 'new' | 'popular' | 'bestseller'

export type ProductData = {
  slug: string
  name: string
  category: Category
  size?: string
  img?: string
  images?: string[]
  price?: number
  currency?: 'USD' | 'CDF' | string
  badges?: Badge[]
}

const U = (q: string) =>
  `https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&auto=format&fit=crop&w=1200&h=900&crop=entropy&ixlib=rb-4.0.3&img=${encodeURIComponent(q)}`
const U2 = (q: string) =>
  `https://images.unsplash.com/photo-1542365887-1f7475d0d34a?q=80&auto=format&fit=crop&w=1200&h=900&crop=entropy&ixlib=rb-4.0.3&img=${encodeURIComponent(q)}`

const ext: Category = 'exterior'
const int: Category = 'interior'
const air: Category = 'air-fresheners'
const det: Category = 'detailing'
const acc: Category = 'accessories'

export const products: ProductData[] = [
  {
    slug: 'shield-snow-foam-1l',
    name: 'Shield Snow Foam 1L',
    category: ext,
    size: '1L',
    img: U('snow-foam'),
    images: [U('snow-foam'), U2('prewash'), U('foam-lance')],
    price: 9.5, currency: 'USD', badges: ['bestseller']
  },
  {
    slug: 'shield-splash-car-shampoo-500ml',
    name: 'Shield Splash Car Shampoo 500ml',
    category: ext,
    size: '500ml',
    img: U('shampoo'),
    images: [U('shampoo'), U2('wash'), U('rinse')],
    price: 6.9, currency: 'USD', badges: ['popular']
  },
  { slug: 'shield-windscreen-wash-350ml', name: 'Shield Windscreen Wash 350ml', category: ext, size: '350ml', img: U('windscreen'), price: 4.5, currency: 'USD' },
  { slug: 'shield-miraplate-liquid-wax-500ml', name: 'Shield Miraplate Liquid Wax 500ml', category: ext, size: '500ml', img: U('wax'), price: 8.9, currency: 'USD', badges: ['new'] },
  { slug: 'shield-tyre-gloss-cleaner-400ml', name: 'Shield Tyre Gloss Cleaner 400ml', category: ext, size: '400ml', img: U('tyre-gloss'), price: 6.4, currency: 'USD' },
  { slug: 'shield-tyre-shine-silicone-500ml', name: 'Shield Tyre Shine Silicone 500ml', category: ext, size: '500ml', img: U('tyre-shine'), price: 7.2, currency: 'USD' },

  // INTERIOR
  { slug: 'shield-leather-care-400ml', name: 'Shield Leather Care 400ml', category: int, size: '400ml', img: U('leather-care'), price: 7.8, currency: 'USD' },
  { slug: 'shield-leather-cream-500ml', name: 'Shield Leather Cream 500ml', category: int, size: '500ml', img: U('leather-cream'), price: 9.2, currency: 'USD', badges: ['popular'] },
  { slug: 'sheen-wipes', name: 'Sheen Wipes', category: int, img: U('wipes'), price: 3.5, currency: 'USD' },
  { slug: 'leather-care-wipes', name: 'Leather Care Wipes', category: int, img: U('wipes-leather'), price: 3.9, currency: 'USD' },
  { slug: 'sheen-natural-strawberry-200ml', name: 'Sheen Natural Strawberry 200ml', category: int, size: '200ml', img: U('strawberry'), price: 2.9, currency: 'USD' },
  { slug: 'sheen-natural-cherry-200ml', name: 'Sheen Natural Cherry 200ml', category: int, size: '200ml', img: U('cherry'), price: 2.9, currency: 'USD' },
  { slug: 'sheen-natural-nu-car-200ml', name: 'Sheen Natural Nu Car 200ml', category: int, size: '200ml', img: U('nu-car'), price: 2.9, currency: 'USD' },
  { slug: 'sheen-natural-fresh-start-200ml', name: 'Sheen Natural Fresh Start 200ml', category: int, size: '200ml', img: U('fresh'), price: 2.9, currency: 'USD' },
  { slug: 'sheen-natural-nu-car-300ml', name: 'Sheen Natural Nu Car 300ml', category: int, size: '300ml', img: U('nu-car-300'), price: 3.6, currency: 'USD' },
  { slug: 'sheen-natural-apple-300ml', name: 'Sheen Natural Apple 300ml', category: int, size: '300ml', img: U('apple'), price: 3.6, currency: 'USD' },
  { slug: 'island-coconut-300ml', name: 'Island Coconut 300ml', category: int, size: '300ml', img: U('coconut'), price: 3.6, currency: 'USD' },

  // AIR FRESHENERS
  { slug: 'monster-fresh-ocean', name: 'Monster Fresh Ocean', category: air, img: U('ocean'), price: 2.5, currency: 'USD' },
  { slug: 'monster-fresh-vanilla', name: 'Monster Fresh Vanilla', category: air, img: U('vanilla'), price: 2.5, currency: 'USD' },
  { slug: 'monster-fresh-island-fresh', name: 'Monster Fresh Island Fresh', category: air, img: U('island-fresh'), price: 2.5, currency: 'USD' },
  { slug: 'fresh-24-vanilla-pineapple-7ml', name: 'Fresh 24 7ml - Vanilla Pineapple', category: air, size: '7ml', img: U('pineapple'), price: 1.8, currency: 'USD' },
  { slug: 'fresh-24-ocean-drive-7ml', name: 'Fresh 24 7ml - Ocean Drive', category: air, size: '7ml', img: U('ocean-drive'), price: 1.8, currency: 'USD' },

  // DETAILING
  { slug: 'shield-sheen-silicone-500ml', name: 'Shield Sheen Silicone 500ml', category: det, size: '500ml', img: U('silicone'), price: 6.9, currency: 'USD' },

  // ACCESSORIES
  { slug: 'shield-standard-sponge', name: 'Shield Standard Sponge', category: acc, img: U('sponge'), price: 1.2, currency: 'USD' },
  { slug: 'shield-splash-n-dash-sponge', name: 'Shield Splash n Dash Sponge', category: acc, img: U('sponge2'), price: 1.4, currency: 'USD' },
  { slug: 'shield-foam-applicator-pads', name: 'Shield Foam Applicator Pads', category: acc, img: U('pads'), price: 2.0, currency: 'USD' },
  { slug: 'microfibre-wash-shine-mitt', name: 'MicroFibre Wash & Shine Mitt', category: acc, img: U('mitt'), price: 3.8, currency: 'USD' },
  { slug: 'microfibre-ultra-plush-wash-mitt', name: 'Microfibre Ultra Plush Wash Mitt', category: acc, img: U('mitt-plush'), price: 4.5, currency: 'USD' },
  { slug: 'microfibre-buff-shine-polishing-mitt', name: 'Microfibre Buff & Shine Polishing Mitt', category: acc, img: U('polishing-mitt'), price: 4.2, currency: 'USD' },
  { slug: 'microfibre-glass-cleaning-mitt', name: 'Microfibre Glass Cleaning Mitt', category: acc, img: U('glass-mitt'), price: 3.2, currency: 'USD' },
  { slug: 'microfibre-large-yellow-towel', name: 'Microfibre Large Yellow Towel', category: acc, img: U('towel-yellow'), price: 2.9, currency: 'USD' },
  { slug: 'microfibre-3in1-value-pack', name: 'MicroFibre 3in1 Super Value Pack', category: acc, img: U('value-pack'), price: 6.9, currency: 'USD', badges: ['bestseller'] },
  { slug: 'microfibre-towels-40x30', name: 'MicroFibre Towels (40x30cm)', category: acc, img: U('towels'), price: 2.2, currency: 'USD' },
  { slug: 'microfibre-car-care-kit', name: 'MicroFibre Car Care Kit', category: acc, img: U('kit'), price: 8.5, currency: 'USD' },
  { slug: 'microfibre-auto-detailing-clothes', name: 'MicroFibre Auto Detailing Clothes', category: acc, img: U('cloths'), price: 3.4, currency: 'USD' },
  { slug: 'micro-all-purpose-cloths-mixed', name: 'Micro All Purpose Cloths - Mixed Colours', category: acc, img: U('mixed-colors'), price: 2.1, currency: 'USD' },
  { slug: 'microfibre-wash-n-dry-value-pack', name: 'MicroFibre Wash n Dry Value Pack', category: acc, img: U('wash-dry'), price: 6.2, currency: 'USD' },
]

export const categories = ['exterior','interior','air-fresheners','detailing','accessories'] as const

export function getByCategory(cat: Category) {
  return products.filter(p => p.category === cat)
}

export function countByCategory() {
  const map: Record<Category, number> = {
    exterior: 0, interior: 0, 'air-fresheners': 0, detailing: 0, accessories: 0
  }
  for (const p of products) map[p.category]++
  return map
}
