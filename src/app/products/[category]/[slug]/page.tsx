import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllProducts,
  getBySlug,
  getByCategorySlug,
  firstImage,
  catSlug,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";

/* ---------------- types ---------------- */
type Params = { category: string; slug: string };

/* ---------------- SSG ---------------- */
export async function generateStaticParams() {
  // Safe & simple: our helper scans /public/products/* and builds slugs
  const all = getAllProducts();
  return all.map((p) => ({
    category: catSlug(p.category),
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = getBySlug(params.category, params.slug);
  if (!product) {
    return {
      title: "Product not found | YOM Car Care",
      description: "The product you’re looking for could not be found.",
    };
  }
  const title = `${product.name} | YOM Car Care`;
  const description =
    "Premium car care product from YOM Car Care. View details, usage and related products.";
  const image = firstImage(product);
  return {
    title,
    description,
    alternates: {
      canonical: `/products/${params.category}/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

/* ---------------- Page ---------------- */
export default function ProductPage({ params }: { params: Params }) {
  const product = getBySlug(params.category, params.slug);
  if (!product) return notFound();

  const img = firstImage(product);
  const price = formatProductPrice(product);
  const categorySlug = catSlug(product.category);

  // Suggestions: same category, excluding current; if fewer than 8, pad with others
  const sameCat = getByCategorySlug(categorySlug).filter((p) => p.slug !== product.slug);
  const rest = getAllProducts().filter(
    (p) => p.slug !== product.slug && catSlug(p.category) !== categorySlug
  );
  const suggestions = [...sameCat, ...rest].slice(0, 8);

  return (
    <main className="container-px py-8 md:py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-white/60">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products/${categorySlug}`}
          className="capitalize hover:underline"
        >
          {categorySlug.replace(/-/g, " ")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{product.name}</span>
      </nav>

      {/* Top section: image + summary */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white">
          <div className="relative aspect-[4/3]">
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8 text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90 capitalize">
              {product.category}
            </span>
          </div>

          <h1 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="mt-3">
            {price ? (
              <span className="text-xl md:text-2xl font-semibold">{price}</span>
            ) : (
              <span className="text-white/60">Contact us for pricing</span>
            )}
          </div>

          <p className="mt-4 text-white/75">
            Professional-grade car care. This product is ideal for{' '}
            <span className="lowercase">{categorySlug.replace(/-/g, " ")}</span> use.
            For best results, read the usage notes below.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn-primary"
              aria-label="Add to cart"
            >
              Add to cart
            </button>
            <Link href="/contact" className="btn-ghost">
              Ask a question
            </Link>
          </div>

          {/* Key points (placeholder content you can refine) */}
          <div className="mt-8 grid gap-3 text-sm text-white/80">
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Quality you can trust — curated by YOM Car Care.</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Carefully selected for {product.category.toLowerCase()} applications.</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Available for pickup or local delivery in Lubumbashi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
          <h2 className="text-xl font-semibold">Product details</h2>
          <div className="mt-3 space-y-4 text-white/80">
            <p>
              <strong>Usage:</strong> Apply as directed on the label. Test on a small
              area first. Avoid direct sunlight during application where possible.
            </p>
            <p>
              <strong>Storage:</strong> Keep sealed in a cool, dry place. Keep out of reach
              of children.
            </p>
            <p className="text-white/60 text-sm">
              Note: Replace this copy with the official product description when available.
            </p>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
          <h3 className="text-lg font-semibold">Specifications</h3>
          <ul className="mt-3 space-y-2 text-white/80 text-sm">
            <li className="flex justify-between">
              <span>Category</span>
              <span className="capitalize">{product.category}</span>
            </li>
            <li className="flex justify-between">
              <span>SKU</span>
              <span className="text-white/70">{product.slug}</span>
            </li>
            <li className="flex justify-between">
              <span>Price</span>
              <span>{price || "—"}</span>
            </li>
          </ul>
        </aside>
      </section>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <section className="mt-12">
          <header className="mb-4">
            <p className="text-xs tracking-[0.2em] text-white/60">YOU MAY ALSO LIKE</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Related products</h2>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {suggestions.map((p) => {
              const sImg = firstImage(p);
              const href = `/products/${catSlug(p.category)}/${p.slug}`;
              const sPrice = formatProductPrice(p);

              return (
                <li
                  key={p.slug}
                  className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
                >
                  <Link href={href} className="block">
                    <div className="relative bg-white aspect-[4/3]">
                      <Image
                        src={sImg}
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
                      {sPrice ? (
                        <span className="text-sm font-semibold text-white/80">
                          {sPrice}
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
        </section>
      )}
    </main>
  );
}
