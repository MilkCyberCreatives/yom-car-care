import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

import {
  getAllProducts,
  firstImage,
  catSlug,
  CATEGORY_SLUGS,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";

/* ---------------- types & utils ---------------- */
type Params = { category: string };

const toLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

async function scanCategoryFolder(categorySlug: string) {
  const dir = path.join(process.cwd(), "public", "products", categorySlug);
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f))
      .map((f) => ({
        src: `/products/${categorySlug}/${f}`,
        name: f.replace(/\.[^.]+$/, ""),
      }));
  } catch {
    return [];
  }
}

/* ---------------- SSG ---------------- */
// Safe: read category folders (no dependency on data loaders)
export async function generateStaticParams() {
  const base = path.join(process.cwd(), "public", "products");
  let folderSlugs: string[] = [];
  try {
    const entries = await fs.readdir(base, { withFileTypes: true });
    folderSlugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    // ignore
  }
  const slugs = folderSlugs.length ? folderSlugs : Array.from(CATEGORY_SLUGS);
  return slugs.map((c) => ({ category: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const label = toLabel(params.category);
  return {
    title: `${label} | YOM Car Care`,
    description: `Browse ${label} products.`,
    alternates: { canonical: `/products/${params.category}` },
  };
}

/* ---------------- Page ---------------- */
export default async function CategoryPage({ params }: { params: Params }) {
  const label = toLabel(params.category);

  // Primary: items from the helper (now scans /public/products/*)
  const items = getAllProducts().filter(
    (p) => catSlug(p.category) === params.category
  );

  // Fallback: raw files in /public/products/<category> (should rarely be needed now)
  const fallback = items.length === 0 ? await scanCategoryFolder(params.category) : [];

  return (
    <main className="container-px py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-white/60">CATEGORY</p>
        <h1 className="text-3xl md:text-4xl font-bold">{label}</h1>
      </header>

      {items.length === 0 && fallback.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">No products found.</p>
          <p className="mt-1">
            Put images in{" "}
            <code className="font-mono">/public/products/{params.category}</code>.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* Structured items */}
          {items.map((p) => {
            const img = firstImage(p);
            const href = `/products/${catSlug(p.category)}/${p.slug}`;
            const price = formatProductPrice(p);

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

                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="shrink-0 grid place-items-center rounded-full border border-white/10 bg-zinc-800/70 p-2 hover:bg-zinc-800 transition"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <path d="M6 6l-1-2H3" />
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="18" cy="20" r="1.5" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      {p.category}
                    </span>
                    {price ? (
                      <span className="text-sm font-semibold text-white/80">
                        {price}
                      </span>
                    ) : (
                      <span className="text-sm text-white/50">—</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}

          {/* Fallback (rare) */}
          {items.length === 0 &&
            fallback.map((f, i) => (
              <li
                key={f.src + i}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
              >
                <div className="relative bg-white aspect-[4/3]">
                  <Image
                    src={f.src}
                    alt={f.name}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>

                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <h3 className="flex-1 font-semibold leading-snug line-clamp-2">
                      {f.name}
                    </h3>
                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="shrink-0 grid place-items-center rounded-full border border-white/10 bg-zinc-800/70 p-2 hover:bg-zinc-800 transition"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <path d="M6 6l-1-2H3" />
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="18" cy="20" r="1.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      {label}
                    </span>
                    <span className="text-sm text-white/50">—</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </main>
  );
}
