// Product data (initial set from client list) + simple image URLs.
// Images use Unsplash placeholders for now; replace with your own later.

export type Category =
  | 'exterior'
  | 'interior'
  | 'air-fresheners'
  | 'detailing'
  | 'accessories'

export type ProductData = {
  slug: string
  name: string
  category: Category
  size?: string
  img?: string
}

const U = (q: string) =>
  `https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&auto=format&fit=crop&w=1200&h=900&crop=entropy&ixlib=rb-4.0.3&img=${encodeURIComponent(
    q
  )}`

const ext: Category = 'exterior'
const int: Category = 'interior'
const air: Category = 'air-fresheners'
const det: Category = 'detailing'
const acc: Category = 'accessories'

export const products: ProductData[] = [
  // EXTERIOR
  { slug: 'shield-snow-foam-1l', name: 'Shield Snow Foam 1L', category: ext, size: '1L', img: U('snow-foam') },
  { slug: 'shield-splash-car-shampoo-500ml', name: 'Shield Splash Car Shampoo 500ml', category: ext, size: '500ml', img: U('shampoo') },
  { slug: 'shield-windscreen-wash-350ml', name: 'Shield Windscreen Wash 350ml', category: ext, size: '350ml', img: U('windscreen') },
  { slug: 'shield-miraplate-liquid-wax-500ml', name: 'Shield Miraplate Liquid Wax 500ml', category: ext, size: '500ml', img: U('wax') },
  { slug: 'shield-tyre-gloss-cleaner-400ml', name: 'Shield Tyre Gloss Cleaner 400ml', category: ext, size: '400ml', img: U('tyre-gloss') },
  { slug: 'shield-tyre-shine-silicone-500ml', name: 'Shield Tyre Shine Silicone 500ml', category: ext, size: '500ml', img: U('tyre-shine') },

  // INTERIOR
  { slug: 'shield-leather-care-400ml', name: 'Shield Leather Care 400ml', category: int, size: '400ml', img: U('leather-care') },
  { slug: 'shield-leather-cream-500ml', name: 'Shield Leather Cream 500ml', category: int, size: '500ml', img: U('leather-cream') },
  { slug: 'sheen-wipes', name: 'Sheen Wipes', category: int, img: U('wipes') },
  { slug: 'leather-care-wipes', name: 'Leather Care Wipes', category: int, img: U('wipes-leather') },
  { slug: 'sheen-natural-strawberry-200ml', name: 'Sheen Natural Strawberry 200ml', category: int, size: '200ml', img: U('strawberry') },
  { slug: 'sheen-natural-cherry-200ml', name: 'Sheen Natural Cherry 200ml', category: int, size: '200ml', img: U('cherry') },
  { slug: 'sheen-natural-nu-car-200ml', name: 'Sheen Natural Nu Car 200ml', category: int, size: '200ml', img: U('nu-car') },
  { slug: 'sheen-natural-fresh-start-200ml', name: 'Sheen Natural Fresh Start 200ml', category: int, size: '200ml', img: U('fresh') },
  { slug: 'sheen-natural-nu-car-300ml', name: 'Sheen Natural Nu Car 300ml', category: int, size: '300ml', img: U('nu-car-300') },
  { slug: 'sheen-natural-apple-300ml', name: 'Sheen Natural Apple 300ml', category: int, size: '300ml', img: U('apple') },
  { slug: 'island-coconut-300ml', name: 'Island Coconut 300ml', category: int, size: '300ml', img: U('coconut') },

  // AIR FRESHENERS
  { slug: 'monster-fresh-ocean', name: 'Monster Fresh Ocean', category: air, img: U('ocean') },
  { slug: 'monster-fresh-vanilla', name: 'Monster Fresh Vanilla', category: air, img: U('vanilla') },
  { slug: 'monster-fresh-island-fresh', name: 'Monster Fresh Island Fresh', category: air, img: U('island-fresh') },
  { slug: 'fresh-24-vanilla-pineapple-7ml', name: 'Fresh 24 7ml - Vanilla Pineapple', category: air, size: '7ml', img: U('pineapple') },
  { slug: 'fresh-24-ocean-drive-7ml', name: 'Fresh 24 7ml - Ocean Drive', category: air, size: '7ml', img: U('ocean-drive') },

  // DETAILING
  { slug: 'shield-sheen-silicone-500ml', name: 'Shield Sheen Silicone 500ml', category: det, size: '500ml', img: U('silicone') },

  // ACCESSORIES
  { slug: 'shield-standard-sponge', name: 'Shield Standard Sponge', category: acc, img: U('sponge') },
  { slug: 'shield-splash-n-dash-sponge', name: 'Shield Splash n Dash Sponge', category: acc, img: U('sponge2') },
  { slug: 'shield-foam-applicator-pads', name: 'Shield Foam Applicator Pads', category: acc, img: U('pads') },
  { slug: 'microfibre-wash-shine-mitt', name: 'MicroFibre Wash & Shine Mitt', category: acc, img: U('mitt') },
  { slug: 'microfibre-ultra-plush-wash-mitt', name: 'Microfibre Ultra Plush Wash Mitt', category: acc, img: U('mitt-plush') },
  { slug: 'microfibre-buff-shine-polishing-mitt', name: 'Microfibre Buff & Shine Polishing Mitt', category: acc, img: U('polishing-mitt') },
  { slug: 'microfibre-glass-cleaning-mitt', name: 'Microfibre Glass Cleaning Mitt', category: acc, img: U('glass-mitt') },
  { slug: 'microfibre-large-yellow-towel', name: 'Microfibre Large Yellow Towel', category: acc, img: U('towel-yellow') },
  { slug: 'microfibre-3in1-value-pack', name: 'MicroFibre 3in1 Super Value Pack', category: acc, img: U('value-pack') },
  { slug: 'microfibre-towels-40x30', name: 'MicroFibre Towels (40x30cm)', category: acc, img: U('towels') },
  { slug: 'microfibre-car-care-kit', name: 'MicroFibre Car Care Kit', category: acc, img: U('kit') },
  { slug: 'microfibre-auto-detailing-clothes', name: 'MicroFibre Auto Detailing Clothes', category: acc, img: U('cloths') },
  { slug: 'micro-all-purpose-cloths-mixed', name: 'Micro All Purpose Cloths - Mixed Colours', category: acc, img: U('mixed-colors') },
  { slug: 'microfibre-wash-n-dry-value-pack', name: 'MicroFibre Wash n Dry Value Pack', category: acc, img: U('wash-dry') },
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
