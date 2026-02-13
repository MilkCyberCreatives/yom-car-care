import type { Metadata } from "next";
import Image from "next/image";

import {
  getAllProducts,
  firstImage,
  catSlug,
  type Product,
} from "@/lib/products";
import { formatProductPrice } from "@/lib/money";
import AddToCartButton from "@/app/components/AddToCartButton";
import LocaleLink from "@/app/components/LocaleLink";

export const metadata: Metadata = {
  title: "Produits | YOM Car Care",
  description: "Parcourez tous les produits YOM Car Care.",
  alternates: { canonical: "/fr/products" },
};

export default function FRProductsPage() {
  const items: Product[] = getAllProducts();

  return (
    <main className="container-px py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-white/60">NOS CHOIX</p>
        <h1 className="text-3xl md:text-4xl font-bold">Nos Produits</h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">Aucun produit trouve.</p>
          <p className="mt-1">
            Ajoutez des images dans <code className="font-mono">public/products</code> et verifiez les donnees.
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
                <LocaleLink href={href} className="block">
                  <div className="relative bg-white aspect-[4/3]">
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                </LocaleLink>

                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <LocaleLink href={href} className="flex-1">
                      <h3 className="font-semibold leading-snug line-clamp-2">{p.name}</h3>
                    </LocaleLink>

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
                    {priceString ? (
                      <span className="text-sm font-semibold text-white/80">{priceString}</span>
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
