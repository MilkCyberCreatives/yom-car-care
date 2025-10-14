"use client";

import { useMemo } from "react";
import type { ProductData, Badge, Category } from "@/data/products";
import ProductCard from "@/app/components/ProductCard";
import { useSearchParams } from "next/navigation";

/**
 * Explicit props contract so JSX knows this component takes `items`.
 */
export type ProductsClientProps = { items: ProductData[] };

export default function ProductsClient({ items }: ProductsClientProps) {
  const search = useSearchParams();

  const q = (search?.get("q") || "").trim().toLowerCase();
  const catParam = (search?.get("category") || "") as Category | "";
  const sizeParam = search?.get("size") || "";

  const tagParam = (search?.get("tag") || "").toLowerCase();
  const allowedBadges: Badge[] = ["new", "popular", "bestseller"];
  const tag: Badge | undefined = allowedBadges.includes(tagParam as Badge)
    ? (tagParam as Badge)
    : undefined;

  const minNum = search?.get("min") ? Number(search!.get("min")) : null;
  const maxNum = search?.get("max") ? Number(search!.get("max")) : null;

  const filtered = useMemo(() => {
    const list = Array.isArray(items) ? items : [];

    return list.filter((p) => {
      if (catParam && p.category !== catParam) return false;
      if (sizeParam && p.size && p.size !== sizeParam) return false;
      if (tag && !(p.badges || []).includes(tag)) return false;

      const price = typeof p.price === "number" ? p.price : NaN;
      if (minNum != null && !Number.isNaN(price) && price < minNum) return false;
      if (maxNum != null && !Number.isNaN(price) && price > maxNum) return false;

      if (q) {
        const hay = `${p.name} ${p.category} ${p.slug}`
          .toLowerCase()
          .replace(/\s+/g, " ");
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, q, catParam, sizeParam, tag, minNum, maxNum]);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
      {!filtered.length && (
        <div className="col-span-full text-white/70">
          No products match your filters.
        </div>
      )}
    </div>
  );
}
