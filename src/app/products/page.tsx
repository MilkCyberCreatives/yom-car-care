// src/app/products/page.tsx
import CategoriesTabs from "@/components/CategoriesTabs";
import ProductGridDark from "@/components/ProductGridDark";
import { allProducts } from "@/data/products";

export default function ProductsIndexPage() {
  const items = allProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    images: p.images,
    img: p.img,
  }));

  return (
    <div className="space-y-8">
      <CategoriesTabs />

      <header className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-neutral-500">
          Loaded from <code className="text-neutral-400">/public/products</code>.
        </p>
      </header>

      <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
        <ProductGridDark
          items={items}
          makeHref={(p) => (p.slug ? `/products/item/${p.slug}` : "#")}
        />
      </section>
    </div>
  );
}
