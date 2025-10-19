// Local price list merged by src/lib/products.ts
// You can edit numbers anytime; currency defaults to "USD".
// Keys support BOTH:
//  1) product slug (preferred) e.g. "shield-snow-foam-1l"
//  2) "<category>/<filename-no-ext>" for exact filename matches,
//     handy when filenames have spaces, parentheses, or symbols.

export const priceList: Record<
  string,
  { price: number; currency?: "USD" | "CDF" | string }
> = {
  /* =======================
   * INTERIOR
   * ======================= */
  // by slug
  "leather-care-wipes": { price: 6.5 },
  "sheen-wipes": { price: 5.0 },
  "shield-leather-care-400ml": { price: 7.5 },
  "shield-leather-cream-500ml": { price: 8.5 },

  "sheen-natural-cherry-200ml": { price: 3.5 },
  "sheen-natural-fresh-start-200ml": { price: 3.5 },
  "sheen-natural-strawberry-200ml": { price: 3.5 },
  "sheen-natural-nu-car-200ml": { price: 3.5 },
  "sheen-natural-nu-car-300ml": { price: 4.5 },

  // filename targets (for odd cases / spaces)
  "interior/Leather-Care-Wipes": { price: 6.5 },
  "interior/Sheen-Wipes": { price: 5.0 },
  "interior/Shield-Leather-Care-400ml": { price: 7.5 },
  "interior/Shield-Leather-Cream-500ml": { price: 8.5 },
  "interior/Sheen-Natural-Cherry-200ml": { price: 3.5 },
  "interior/Sheen-Natural-Fresh-Start-200ml": { price: 3.5 },
  "interior/Sheen-Natural-Strawberry-200ml": { price: 3.5 },
  "interior/Sheen-Natural-Nu car-200ml": { price: 3.5 }, // filename includes a space
  "interior/Sheen-Natural-Nu car-300ml": { price: 4.5 },
  "interior/shield-products-sheen-natural-200ml": { price: 3.5 },

  /* =======================
   * EXTERIOR
   * ======================= */
  "shield-miraplate-liquid-wax-500ml": { price: 12.0 },
  "shield-snow-foam-1l": { price: 10.0 },
  "shield-windscreen-wash-350ml": { price: 4.0 },
  "shield-splash-car-shampoo-500ml": { price: 8.0 },
  "shield-tyre-gloss-cleaner-400ml": { price: 7.0 },
  "shield-tyre-shine-silicone-500ml": { price: 9.0 },

  "exterior/Shield-Miraplate-Liquid-Wax-500ml": { price: 12.0 },
  "exterior/Shield-Snow-Foam-1l": { price: 10.0 },
  "exterior/Shield-Windscreen-Wash-350ml": { price: 4.0 },
  "exterior/Shield-Splash-Car-Shampoo-500ml": { price: 8.0 },
  "exterior/Shield-Tyre-Gloss-Cleaner-400ml": { price: 7.0 },
  "exterior/Shield-Tyre-Shine-Silicone-500ml": { price: 9.0 },

  /* =======================
   * DETAILING
   * ======================= */
  "shield-sheen-silicone-500ml": { price: 7.5 },
  "detailing/Shield-Sheen-Silicone-500ml": { price: 7.5 },

  /* =======================
   * AIR FRESHENERS
   * ======================= */
  "fresh-24-7ml-ocean-drive": { price: 3.0 },
  "fresh-24-7ml-vanilla-pineapple": { price: 3.0 },
  "monster-fresh-island-fresh": { price: 3.5 },
  "monster-fresh-ocean": { price: 3.5 },
  "monster-fresh-vanilla": { price: 3.5 },

  "air-fresheners/Fresh-24-7ml-Ocean-Drive": { price: 3.0 },
  "air-fresheners/Fresh-24-7ml-Vanilla-Pineapple": { price: 3.0 },
  "air-fresheners/Monster-Fresh-Island-Fresh": { price: 3.5 },
  "air-fresheners/Monster-Fresh-Ocean": { price: 3.5 },
  "air-fresheners/Monster-Fresh-Vanilla": { price: 3.5 },

  /* =======================
   * ACCESSORIES
   * ======================= */
  // slugs
  "micro-all-purpose-cloths-mixed-colours": { price: 4.0 },
  "microfibre-3in1-super-value-pack": { price: 9.0 },
  "microfibre-auto-detailing-clothes": { price: 6.0 },
  "microfibre-buff-shine-polishing-mitt": { price: 6.5 },
  "microfibre-car-care-kit": { price: 14.0 },
  "microfibre-glass-cleaning-mitt": { price: 6.0 },
  "microfibre-large-yellow-towel": { price: 5.0 },
  "microfibre-towels-40x30cm": { price: 5.5 },
  "microfibre-ultra-plush-wash-mitt": { price: 7.0 },
  "microfibre-wash-shine-mitt": { price: 6.5 },
  "microfibre-wash-n-dry-value-pack": { price: 9.5 },
  "shield-foam-applicator-pads": { price: 4.0 },
  "shield-standard-sponge": { price: 2.5 },
  "shield-splash-n-dash-sponge": { price: 3.0 },

  // filename targets
  "accessories/Micro-All-Purpose-Cloths-Mixed-Colours": { price: 4.0 },
  "accessories/MicroFibre-3in1-Super-Value-Pack": { price: 9.0 },
  "accessories/MicroFibre-Auto-Detailing-Clothes": { price: 6.0 },
  "accessories/MicroFibre-Buff-&-Shine-Polishing-Mitt": { price: 6.5 },
  "accessories/MicroFibre-Car-Care-Kit": { price: 14.0 },
  "accessories/MicroFibre-Glass-Cleaning-Mitt": { price: 6.0 },
  "accessories/MicroFibre-Large-Yellow-Towel": { price: 5.0 },
  "accessories/MicroFibre-Towels-(40x30cm)": { price: 5.5 },
  "accessories/MicroFibre-Ultra-Plush-Wash-mitt": { price: 7.0 },
  "accessories/MicroFibre-Wash-&-Shine-Mitt": { price: 6.5 },
  "accessories/MicroFibre-Wash-n-Dry-Value-Pack": { price: 9.5 },
  "accessories/Shield-Foam-Applicator-Pads": { price: 4.0 },
  "accessories/Shield-Standard-Sponge": { price: 2.5 },
  "accessories/Shield-Splash-n-Dash-Sponge": { price: 3.0 },
};

export default priceList;
