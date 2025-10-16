// src/components/ProductGridDark.tsx
"use client";

import ProductCardDark, { DarkCardProduct } from "./ProductCardDark";

export default function ProductGridDark({
  items,
  makeHref,
}: {
  items: DarkCardProduct[];
  /** Provide a function to build the card link; return "#" to disable */
  makeHref?: (p: DarkCardProduct) => string;
}) {
  if (!items?.length) {
    return (
      <div className="grid place-items-center py-20 text-center text-neutral-300">
        No products yet in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <ProductCardDark
          key={p.slug || p.name || i}
          p={p}
          index={i + 1}
          href={makeHref ? makeHref(p) : "#"}
        />
      ))}
    </div>
  );
}
