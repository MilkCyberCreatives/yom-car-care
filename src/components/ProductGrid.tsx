// src/components/ProductGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export type BasicProduct = {
  id?: string | number;
  slug?: string;
  title: string;
  category: string;
  price?: number | string;
  image: string; // path under /public/products/*
  badge?: string;
};

export default function ProductGrid({ products }: { products: BasicProduct[] }) {
  if (!products?.length) {
    return (
      <div className="grid place-items-center py-20 text-center">
        <p className="text-lg text-gray-500">No products yet in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <Card key={p.slug || p.id || p.title} p={p} />
      ))}
    </div>
  );
}

function Card({ p }: { p: BasicProduct }) {
  return (
    <div className="relative group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition">
      {/* Top-right badge */}
      {p.badge ? (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-black/85 px-3 py-1 text-xs font-semibold text-white">
          {p.badge}
        </div>
      ) : null}

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-contain p-4 group-hover:scale-[1.03] transition"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold">{p.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{p.category}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold">
            {typeof p.price === "number" ? `R${p.price.toFixed(2)}` : p.price ?? "—"}
          </span>

          <Link
            href={p.slug ? `/products/item/${p.slug}` : "#"}
            className="rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            aria-label={`View ${p.title}`}
          >
            view
          </Link>
        </div>
      </div>
    </div>
  );
}
