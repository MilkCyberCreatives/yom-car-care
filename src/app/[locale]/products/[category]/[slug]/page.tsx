// app/[locale]/products/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  firstImage,
  catSlug,
  type Product,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";
import AddToCartButton from "@/app/components/AddToCartButton";

type Params = { locale: string; category: string; slug: string };

// We'll statically generate for both locales.
const LOCALES = ["en", "fr"];

export async function generateStaticParams() {
  const all = getAllProducts();
  return LOCALES.flatMap((loc) =>
    all.map((p) => ({
      locale: loc,
      category: catSlug(p.category),
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = getProduct(params.category, params.slug);

  const title = product
    ? `${product.name} | YOM Car Care`
    : "Product | YOM Car Care";
  const desc = product
    ? `Explore ${product.name} — premium ${product.category.toLowerCase()} care from YOM Car Care.`
    : "Explore premium car care products from YOM Car Care.";
  const ogImg = product ? firstImage(product) : "/products/placeholder.jpg";

  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${params.locale}/products/${params.category}/${params.slug}`,
    },
    openGraph: {
      title,
      description: desc,
      images: [{ url: ogImg }],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProduct(params.category, params.slug);
  if (!product) return notFound();

  const img = firstImage(product);
  const price = formatProductPrice(product);
  const categorySlug = catSlug(product.category);

  // Suggestions
  const sameCat = getProductsByCategory(categorySlug).filter(
    (p) => p.slug !== product.slug
  );
  const others = getAllProducts().filter(
    (p) => p.slug !== product.slug && catSlug(p.category) !== categorySlug
  );
  const suggestions = [...sameCat, ...others].slice(0, 8);

  return (
    <main className="container-px py-8 md:py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-white/60">
        <Link
          href={`/${params.locale}/products`}
          className="hover:underline"
        >
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${params.locale}/products/${categorySlug}`}
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
            Professional-grade car care for{" "}
            <span className="lowercase">
              {categorySlug.replace(/-/g, " ")}
            </span>{" "}
            use. Replace this paragraph with the official product description
            when available.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToCartButton
              variant="primary"
              product={{
                slug: product.slug,
                categorySlug,
                name: product.name,
                price:
                  typeof product.price === "number"
                    ? product.price
                    : undefined,
                currency: product.currency,
                img,
              }}
            />
            <Link
              href={`/${params.locale}/contact`}
              className="btn-ghost"
            >
              Ask a question
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-white/80">
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Curated by YOM Car Care — quality and value.</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Ideal for {product.category.toLowerCase()} applications.</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>Available for pickup or local delivery.</p>
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
              <strong>Usage:</strong> Apply as directed on the packaging. Test
              on a small area first. Avoid direct sunlight where possible.
            </p>
            <p>
              <strong>Storage:</strong> Keep sealed in a cool, dry place. Keep
              out of reach of children.
            </p>
            <p className="text-white/60 text-sm">
              Note: Replace this copy with official details when available.
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
            <p className="text-xs tracking-[0.2em] text-white/60">
              YOU MAY ALSO LIKE
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Related products
            </h2>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {suggestions.map((p) => {
              const sImg = firstImage(p);
              const href = `/${params.locale}/products/${catSlug(
                p.category
              )}/${p.slug}`;
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

                      <AddToCartButton
                        variant="icon"
                        product={{
                          slug: p.slug,
                          categorySlug: catSlug(p.category),
                          name: p.name,
                          price:
                            typeof p.price === "number"
                              ? p.price
                              : undefined,
                          currency: p.currency,
                          img: sImg,
                        }}
                      />
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
