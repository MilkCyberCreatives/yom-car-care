import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, firstImage } from "@/lib/products";
import { formatProductPrice } from "@/lib/money";

export const metadata: Metadata = {
  title: "Products | YOM Car Care",
  description: "Browse all YOM Car Care products.",
};

export default function ProductsPageLocale() {
  const items = getAllProducts();

  return (
    <main className="container-px py-10">
      <header className="mb-6">
        <p className="text-xs tracking-[0.2em] text-white/60">OUR PICKS</p>
        <h1 className="text-3xl md:text-4xl font-bold">Featured Products</h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">No products found.</p>
          <p className="mt-1">
            Add images to <code className="font-mono">public/products</code> and ensure your data is set.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p) => {
            const img = firstImage(p);
            const href = `/products/${p.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}/${p.slug}`;
            const price = formatProductPrice(p); // <-- USD here

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
                      <span className="text-sm font-semibold text-white/80">{price}</span>
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
