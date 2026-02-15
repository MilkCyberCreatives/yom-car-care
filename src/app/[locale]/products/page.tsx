import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, firstImage, catSlug } from "@/lib/products";
import { formatProductPrice } from "@/lib/money";
import AddToCartButton from "@/app/components/AddToCartButton";
import { localeAlternates } from "@/lib/seo";

type Params = { params: { locale: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const isFR = params.locale === "fr";
  return {
    title: isFR
      ? "Produits d entretien auto | YOM Car Care"
      : "Car Care Products | YOM Car Care",
    description: isFR
      ? "Parcourez tous les produits YOM Car Care a Lubumbashi, RDC."
      : "Browse all YOM Car Care products in Lubumbashi, DRC.",
    alternates: {
      canonical: `/${params.locale}/products`,
      languages: localeAlternates("/products"),
    },
  };
}

export default function ProductsPageLocale({ params }: Params) {
  const isFR = params.locale === "fr";
  const items = getAllProducts();

  const copy = isFR
    ? {
        kicker: "NOS CHOIX",
        title: "Produits en vedette",
        emptyTitle: "Aucun produit trouve.",
        emptyDesc: "Ajoutez des images dans public/products et verifiez les donnees produit.",
      }
    : {
        kicker: "OUR PICKS",
        title: "Featured Products",
        emptyTitle: "No products found.",
        emptyDesc: "Add images to public/products and ensure your product data is set.",
      };

  return (
    <main className="container-px py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-white/60">{copy.kicker}</p>
        <h1 className="text-3xl font-bold md:text-4xl">{copy.title}</h1>
      </header>

      {items.length === 0 ? (
        <div className="py-16 text-center text-gray-600">
          <p className="text-lg font-medium">{copy.emptyTitle}</p>
          <p className="mt-1">{copy.emptyDesc}</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => {
            const img = firstImage(p);
            const categorySlug = catSlug(p.category);
            const href = `/${params.locale}/products/${categorySlug}/${p.slug}`;
            const price = formatProductPrice(p, isFR ? "fr-FR" : "en-US");

            return (
              <li
                key={p.slug}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 text-white"
              >
                <Link href={href} className="block">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                </Link>

                <div className="border-t border-white/10 bg-zinc-900 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <Link href={href} className="flex-1">
                      <h3 className="line-clamp-2 font-semibold leading-snug">{p.name}</h3>
                    </Link>

                    <AddToCartButton
                      variant="icon"
                      product={{
                        slug: p.slug,
                        categorySlug,
                        name: p.name,
                        price: typeof p.price === "number" ? p.price : undefined,
                        currency: p.currency,
                        img,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      {p.category}
                    </span>
                    {price ? (
                      <span className="text-sm font-semibold text-white/80">{price}</span>
                    ) : (
                      <span className="text-sm text-white/50">-</span>
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
