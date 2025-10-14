import LocaleLink from "@/app/components/LocaleLink";
import { products, type ProductData } from "@/data/products";

export const dynamic = "force-static";

type Params = { params: { category: string } };

function thumbOf(p: ProductData): string {
  // Defensive read so it compiles even if ProductData doesn't declare `img`
  const anyP = p as any;
  const img: string | undefined = anyP?.img;
  const firstFromImages: string | undefined =
    Array.isArray(anyP?.images) && anyP.images.length ? anyP.images[0] : undefined;
  return img || firstFromImages || "";
}

function prettyCat(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatPrice(price: number | string, currency?: string) {
  const n = typeof price === "string" ? Number(price) : price;
  if (!isFinite(n)) return String(price);
  const cur = (currency || "USD").toUpperCase();
  return cur === "USD"
    ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : `${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${cur}`;
}

export default function CategoryPage({ params }: Params) {
  const cat = params.category; // "exterior", "air-fresheners", etc.
  const list = products.filter((p) => p.category === cat);

  return (
    <main className="container-px py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] uppercase tracking-widest text-white/60">Products</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold">{prettyCat(cat)}</h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            Browse our {prettyCat(cat)} selection. Cash on Delivery in Lubumbashi.
          </p>
        </div>

        <LocaleLink href="/products" className="btn-ghost">
          All products
        </LocaleLink>
      </div>

      {list.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
          <p className="text-white/80">No products found in this category.</p>
          <div className="mt-4">
            <LocaleLink href="/products" className="btn-primary">
              Browse catalog
            </LocaleLink>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => {
            const href = `/products/${p.category}/${p.slug}`;
            const thumb = thumbOf(p);

            return (
              <LocaleLink
                key={p.slug}
                href={href}
                className="group rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition overflow-hidden"
              >
                <div className="relative w-full aspect-square">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-white/40 text-sm">
                      Image coming soon
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="text-sm text-white/70 capitalize">
                    {p.category.replace(/-/g, " ")}
                  </div>
                  <div className="mt-1 font-medium leading-snug line-clamp-2">{p.name}</div>
                  {p.price !== undefined && p.price !== null ? (
                    <div className="mt-1 text-white/90 text-sm">
                      {formatPrice(p.price, (p as any)?.currency)}
                    </div>
                  ) : null}
                </div>
              </LocaleLink>
            );
          })}
        </div>
      )}
    </main>
  );
}
