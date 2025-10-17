import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import type { Metadata } from "next";
import { allProducts, categories as categoriesConst } from "@/data/products";
import { toSlug, fromSlug } from "@/lib/slug";

/* ---------- helpers ---------- */
type Params = { category: string };

type Raw = {
  slug?: string;
  name?: string;
  title?: string;
  category: string;
  images?: string[];
  img?: string;
};

function normalize(list: any[]): Raw[] {
  return list as Raw[];
}
function filterByCategorySlug(list: Raw[], catSlug: string) {
  return list.filter((p) => toSlug(p.category) === catSlug);
}
function norm(s: string) {
  return s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-");
}

/** Scan the real files that exist in /public/products */
async function scanPublicFiles(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "products");
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f));
  } catch {
    return [];
  }
}

/** Pick the best matching filename for this product based on slug or name */
function pickFile(files: string[], p: Raw): string | undefined {
  const by = norm(p.slug || p.name || p.title || "");
  if (!by) return undefined;

  // 1) exact slug start
  let hit = files.find((f) => norm(f).startsWith(by));
  if (hit) return hit;

  // 2) contains slug token
  hit = files.find((f) => norm(f).includes(by));
  if (hit) return hit;

  // 3) try from name/title tokens
  const tokens = by.split("-").filter(Boolean);
  hit = files.find((f) => {
    const nf = norm(f);
    return tokens.length >= 2 ? tokens.every((t) => nf.includes(t)) : tokens.some((t) => nf.includes(t));
  });
  return hit;
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
export default async function CategoryPage({ params }: { params: Params }) {
  const items = filterByCategorySlug(normalize(allProducts), params.category);
  const label = fromSlug(params.category);

  // Real files present in /public/products
  const files = await scanPublicFiles();

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
            Ensure images exist in <code className="font-mono">public/products</code> and items are assigned to “{label}”.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => {
            // 1) use explicit data image if present
            const dataImg = p.images?.[0] || p.img;

            // 2) otherwise pick the real file that best matches this product
            const matched = pickFile(files, p);
            const src = dataImg || (matched ? `/products/${matched}` : "/products/placeholder.jpg");
            const title = p.name || p.title || "Product";

            return (
              <li
                key={(p.slug ?? title) + i}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
              >
                {/* IMAGE AREA — white like on products index */}
                <div className="relative bg-white aspect-[4/3]">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>

                {/* INFO STRIP */}
                <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                  <h3 className="font-semibold leading-snug line-clamp-2">{title}</h3>
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
