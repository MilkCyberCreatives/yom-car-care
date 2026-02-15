import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/app/components/AddToCartButton";
import JsonLd from "@/app/components/JsonLd";
import {
  catSlug,
  firstImage,
  getAllProducts,
  getProduct,
  getProductsByCategory,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";
import { localeAlternates, productJsonLd, toLocale } from "@/lib/seo";

type Params = { locale: string; category: string; slug: string };

const LOCALES: Array<"en" | "fr"> = ["en", "fr"];

export async function generateStaticParams() {
  const all = getAllProducts();
  return LOCALES.flatMap((locale) =>
    all.map((product) => ({
      locale,
      category: catSlug(product.category),
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";
  const product = getProduct(params.category, params.slug);

  const title = product ? `${product.name} | YOM Car Care` : "Product | YOM Car Care";
  const description = product
    ? isFR
      ? `Achetez ${product.name} a Lubumbashi avec paiement a la livraison chez YOM Car Care.`
      : `Buy ${product.name} in Lubumbashi with cash-on-delivery from YOM Car Care.`
    : isFR
      ? "Decouvrez les produits premium YOM Car Care a Lubumbashi, RDC."
      : "Explore premium YOM Car Care products in Lubumbashi, DRC.";
  const image = product ? firstImage(product) : "/products/placeholder.jpg";
  const path = `/products/${params.category}/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: localeAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      type: "website",
      images: [{ url: image }],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  if (params.locale !== "en" && params.locale !== "fr") return notFound();

  const locale = params.locale;
  const isFR = locale === "fr";
  const product = getProduct(params.category, params.slug);
  if (!product) return notFound();

  const copy = isFR
    ? {
        contact: "Poser une question",
        contactPricing: "Contactez-nous pour le prix",
        curated: "Selection YOM Car Care pour la qualite et le rapport valeur-prix.",
        ideal: `Ideal pour les usages ${product.category.toLowerCase()}.`,
        delivery: "Disponible en retrait ou en livraison locale a Lubumbashi.",
        details: "Details du produit",
        usage:
          "Utilisation: appliquez selon les instructions du produit. Testez d abord sur une petite zone et evitez le soleil direct.",
        storage:
          "Stockage: conserver ferme dans un endroit sec et frais, hors de portee des enfants.",
        specs: "Specifications",
        category: "Categorie",
        sku: "SKU",
        price: "Prix",
        relatedKicker: "VOUS AIMEREZ AUSSI",
        relatedTitle: "Produits similaires",
      }
    : {
        contact: "Ask a question",
        contactPricing: "Contact us for pricing",
        curated: "Curated by YOM Car Care for quality and value.",
        ideal: `Ideal for ${product.category.toLowerCase()} applications.`,
        delivery: "Available for pickup or local delivery in Lubumbashi.",
        details: "Product details",
        usage:
          "Usage: apply as directed on the packaging. Test on a small area first and avoid direct sunlight when possible.",
        storage:
          "Storage: keep sealed in a cool, dry place and out of reach of children.",
        specs: "Specifications",
        category: "Category",
        sku: "SKU",
        price: "Price",
        relatedKicker: "YOU MAY ALSO LIKE",
        relatedTitle: "Related products",
      };

  const image = firstImage(product);
  const price = formatProductPrice(product);
  const categorySlug = catSlug(product.category);
  const path = `/${locale}/products/${categorySlug}/${product.slug}`;

  const sameCategory = getProductsByCategory(categorySlug).filter(
    (entry) => entry.slug !== product.slug
  );
  const crossCategory = getAllProducts().filter(
    (entry) => entry.slug !== product.slug && catSlug(entry.category) !== categorySlug
  );
  const suggestions = [...sameCategory, ...crossCategory].slice(0, 8);

  return (
    <main className="container-px py-8 md:py-10">
      <JsonLd
        id={`product-jsonld-${locale}`}
        data={productJsonLd({ product, locale, path })}
      />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white">
          <div className="relative aspect-[4/3]">
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8 text-white">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90 capitalize">
              {product.category}
            </span>
          </div>

          <h1 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>

          <div className="mt-3">
            {price ? (
              <span className="text-xl md:text-2xl font-semibold">{price}</span>
            ) : (
              <span className="text-white/60">{copy.contactPricing}</span>
            )}
          </div>

          <p className="mt-4 text-white/75">
            Professional-grade car care for{" "}
            <span className="lowercase">{categorySlug.replace(/-/g, " ")}</span> use.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToCartButton
              variant="primary"
              product={{
                slug: product.slug,
                categorySlug,
                name: product.name,
                price: typeof product.price === "number" ? product.price : undefined,
                currency: product.currency,
                img: image,
              }}
            />
            <Link href={`/${locale}/contact`} className="btn-ghost">
              {copy.contact}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-white/80">
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>{copy.curated}</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>{copy.ideal}</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
              <p>{copy.delivery}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
          <h2 className="text-xl font-semibold">{copy.details}</h2>
          <div className="mt-3 space-y-4 text-white/80">
            <p>{copy.usage}</p>
            <p>{copy.storage}</p>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
          <h3 className="text-lg font-semibold">{copy.specs}</h3>
          <ul className="mt-3 space-y-2 text-white/80 text-sm">
            <li className="flex justify-between">
              <span>{copy.category}</span>
              <span className="capitalize">{product.category}</span>
            </li>
            <li className="flex justify-between">
              <span>{copy.sku}</span>
              <span className="text-white/70">{product.slug}</span>
            </li>
            <li className="flex justify-between">
              <span>{copy.price}</span>
              <span>{price || "-"}</span>
            </li>
          </ul>
        </aside>
      </section>

      {suggestions.length > 0 && (
        <section className="mt-12">
          <header className="mb-4">
            <p className="text-xs tracking-[0.2em] text-white/60">{copy.relatedKicker}</p>
            <h2 className="text-2xl md:text-3xl font-semibold">{copy.relatedTitle}</h2>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {suggestions.map((entry) => {
              const suggestionImage = firstImage(entry);
              const href = `/${locale}/products/${catSlug(entry.category)}/${entry.slug}`;
              const suggestionPrice = formatProductPrice(entry);

              return (
                <li
                  key={entry.slug}
                  className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
                >
                  <Link href={href} className="block">
                    <div className="relative bg-white aspect-[4/3]">
                      <Image
                        src={suggestionImage}
                        alt={entry.name}
                        fill
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      />
                    </div>
                  </Link>

                  <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <Link href={href} className="flex-1">
                        <h3 className="font-semibold leading-snug line-clamp-2">{entry.name}</h3>
                      </Link>

                      <AddToCartButton
                        variant="icon"
                        product={{
                          slug: entry.slug,
                          categorySlug: catSlug(entry.category),
                          name: entry.name,
                          price: typeof entry.price === "number" ? entry.price : undefined,
                          currency: entry.currency,
                          img: suggestionImage,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                        {entry.category}
                      </span>
                      {suggestionPrice ? (
                        <span className="text-sm font-semibold text-white/80">{suggestionPrice}</span>
                      ) : (
                        <span className="text-sm text-white/50">-</span>
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
