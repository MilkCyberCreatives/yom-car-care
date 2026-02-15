import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

import {
  getAllProducts,
  getProductsByCategory,
  firstImage,
  catSlug,
  CATEGORY_SLUGS,
  type Product,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";
import AddToCartButton from "@/app/components/AddToCartButton";
import { localeAlternates } from "@/lib/seo";

type Params = { category: string };

const toLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

export async function generateStaticParams() {
  // We'll generate pages for each folder in /public/products.
  const base = path.join(process.cwd(), "public", "products");

  let folderSlugs: string[] = [];
  try {
    const entries = await fs.readdir(base, { withFileTypes: true });
    folderSlugs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name.toLowerCase());
  } catch {
    // ignore read errors; fallback to known categories
  }

  const cats = folderSlugs.length ? folderSlugs : Array.from(CATEGORY_SLUGS);

  return cats.map((c) => ({ category: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const label = toLabel(params.category);
  return {
    title: `${label} | YOM Car Care`,
    description: `Browse ${label} car care products in Lubumbashi, DRC.`,
    alternates: {
      canonical: `/en/products/${params.category}`,
      languages: localeAlternates(`/products/${params.category}`),
    },
  };
}

export default function CategoryPage({ params }: { params: Params }) {
  const label = toLabel(params.category);
  const items: Product[] = getProductsByCategory(params.category);

  return (
    <main className="container-px py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-white/60">CATEGORY</p>
        <h1 className="text-3xl md:text-4xl font-bold">{label}</h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">No products found.</p>
          <p className="mt-1">
            Put images in{" "}
            <code className="font-mono">/public/products/{params.category}</code
            >.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p) => {
            const img = firstImage(p);
            const categorySlug = catSlug(p.category);
            const href = `/products/${categorySlug}/${p.slug}`;
            const priceString = formatProductPrice(p);

            return (
              <li
                key={p.slug}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
              >
                <Link href={href} className="block">
                  <div className="relative bg-white aspect-[4/3]">
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                </Link>

                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Link href={href} className="flex-1">
                      <h3 className="font-semibold leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                    </Link>

                    <AddToCartButton
                      variant="icon"
                      product={{
                        slug: p.slug,
                        categorySlug,
                        name: p.name,
                        price:
                          typeof p.price === "number" ? p.price : undefined,
                        currency: p.currency,
                        img,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      {p.category}
                    </span>
                    {priceString ? (
                      <span className="text-sm font-semibold text-white/80">
                        {priceString}
                      </span>
                    ) : (
                      <span className="text-sm text-white/50">—</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
