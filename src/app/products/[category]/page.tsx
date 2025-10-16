import Image from "next/image";
import { Metadata } from "next";
import { allProducts, categories as categoriesConst, firstImage } from "@/data/products";
import { toSlug, fromSlug } from "@/lib/slug";

/* ---------- Types & helpers ---------- */
type Params = { category: string };

type RawProduct = {
  slug?: string;
  name?: string;
  title?: string;
  category: string;
  images?: string[];
  img?: string;
};

function normalize(list: any[]): RawProduct[] {
  return list as RawProduct[];
}

function filterByCategorySlug(list: RawProduct[], catSlug: string) {
  return list.filter((p) => toSlug(p.category) === catSlug);
}

/* ---------- SSG ---------- */
export async function generateStaticParams() {
  const cats = Array.from(new Set(normalize(allProducts).map((p) => p.category)));
  return cats.map((c) => ({ category: toSlug(c) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const label = fromSlug(params.category);
  return {
    title: `${label} | YOM Car Care`,
    description: `Browse ${label} products loaded from /public/products.`,
  };
}

/* ---------- Page ---------- */
export default function CategoryPage({ params }: { params: Params }) {
  const items = filterByCategorySlug(normalize(allProducts), params.category);
  const label = fromSlug(params.category);

  return (
    <main className="container-px py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{label}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Loaded from <code className="font-mono">/public/products</code>.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">No products found.</p>
          <p className="mt-1">
            Ensure images exist in <code className="font-mono">public/products</code> and items are assigned to the “{label}” category.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => {
            const name = p.name || p.title || "Product";
            const src =
              p.images?.[0] ||
              p.img ||
              firstImage?.(p as any) ||
              (p.slug ? `/products/${p.slug}.jpg` : "/products/placeholder.jpg");

            return (
              <li
                key={(p.slug ?? name) + i}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
              >
                {/* IMAGE AREA — same as Products page */}
                <div className="relative bg-white aspect-[4/3]">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>

                {/* INFO STRIP — same classes as Products page */}
                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <h3 className="font-semibold leading-snug line-clamp-2">{name}</h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                      Public
                    </span>
                    <span className="text-sm font-semibold text-white/80">#{i + 1}</span>
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
