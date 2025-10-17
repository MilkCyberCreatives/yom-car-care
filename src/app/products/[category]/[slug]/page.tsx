// src/app/products/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProduct,
  getRelatedByCategory,
  firstImage,
  type Product,
} from "@/lib/products";

/* -------------------- Types -------------------- */
type Params = {
  category: string;
  slug: string;
};

/* -------------------- SSG -------------------- */
export async function generateStaticParams() {
  const all = getAllProducts();
  return all.map((p) => ({
    category: p.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // Supports both signatures: getProduct(slug) and getProduct(category, slug)
  const product = getProduct(params.slug) || getProduct(params.category as any, params.slug);

  const title = product ? product.name : "Product";
  const description =
    product?.description ?? "Product details and specifications.";
  const images =
    (product?.images && product.images.length > 0
      ? product.images
      : ["/products/placeholder.jpg"]) as string[];

  const url = `https://your-domain.com/products/${params.category}/${params.slug}`;

  return {
    title: `${title} | YOM Car Care`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images,          // strings are valid for OG images
      type: "website", // <-- fix: "product" is not a valid union; use "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/* -------------------- Page -------------------- */
export default function ProductDetailPage({ params }: { params: Params }) {
  const product =
    getProduct(params.slug) || getProduct(params.category as any, params.slug);

  if (!product) return notFound();

  const hero = firstImage(product);

  // Basic related items (same category)
  const related = getRelatedByCategory(product.category, product.slug, 8);

  return (
    <main className="container-px py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/">Home</Link> <span className="mx-1">/</span>
        <Link
          href={`/products/${product.category
            .replace(/[^a-z0-9]+/gi, "-")
            .toLowerCase()}`}
        >
          {product.category}
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Main content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Image panel (white background, like listing cards) */}
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
          <div className="relative aspect-[4/3] bg-white">
            <Image
              src={hero}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-black/10 px-2.5 py-1 text-xs">
              {product.category}
            </span>
            {product.brand ? (
              <span className="inline-flex items-center rounded-lg bg-black/10 px-2.5 py-1 text-xs">
                Brand: {product.brand}
              </span>
            ) : null}
            {product.sku ? (
              <span className="inline-flex items-center rounded-lg bg-black/10 px-2.5 py-1 text-xs">
                SKU: {product.sku}
              </span>
            ) : null}
          </div>

          {product.description ? (
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              High-quality car-care product supplied by YOM Car Care.
            </p>
          )}

          {/* Price row (kept simple for now) */}
          <div className="pt-2">
            <span className="text-2xl font-semibold">
              {typeof product.price === "number"
                ? `R${product.price.toFixed(2)}`
                : product.price ?? ""}
            </span>
          </div>

          {/* CTA buttons (placeholder actions for now) */}
          <div className="flex gap-3 pt-2">
            <button className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50">
              Add to cart
            </button>
            <button className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50">
              Enquire
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {related.map((rp) => (
              <li
                key={rp.slug}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
              >
                <div className="relative bg-white aspect-[4/3]">
                  <Image
                    src={firstImage(rp)}
                    alt={rp.name}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>
                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <h3 className="font-semibold leading-snug line-clamp-2">
                    {rp.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      Public
                    </span>
                    <Link
                      href={`/products/${rp.category
                        .replace(/[^a-z0-9]+/gi, "-")
                        .toLowerCase()}/${rp.slug}`}
                      className="text-sm font-semibold underline"
                    >
                      view
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
