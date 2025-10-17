import fs from "fs/promises";
import path from "path";
import Image from "next/image";

/* ---------- helpers ---------- */
function toTitle(file: string) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/* We only show top-level images inside /public/products */
async function listPublicProducts() {
  const dir = path.join(process.cwd(), "public", "products");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f))
      .map((file) => ({
        src: `/products/${file}`,
        title: toTitle(file),
      }));
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Products | YOM Car Care",
  description: "Browse products loaded from /public/products.",
};

export default async function ProductsPage() {
  const items = await listPublicProducts();

  return (
    <main className="container-px py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Products</h1>
        <p className="mt-2 text-sm text-gray-600">
          Loaded from <code className="font-mono">/public/products</code>.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <p className="text-lg font-medium">No products found.</p>
          <p className="mt-1">
            Add images to <code className="font-mono">public/products</code> (.jpg/.png/.webp/.svg).
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <li
              key={p.src}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 text-white"
            >
              {/* IMAGE AREA — white like on home cards */}
              <div className="relative bg-white aspect-[4/3]">
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />
              </div>

              {/* INFO STRIP — dark bar, same layout: title, pill, index */}
              <div className="px-5 py-4 bg-zinc-900 border-t border-white/10">
                <h3 className="font-semibold leading-snug line-clamp-2">{p.title}</h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">
                    Public
                  </span>
                  <span className="text-sm font-semibold text-white/80">#{i + 1}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
