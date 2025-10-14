"use client";

import type { ProductData } from "@/data/products";
import PdpCtas from "@/app/components/PdpCtas";

type Props = {
  product: ProductData;
};

function heroSrcOf(p: ProductData): string {
  const anyP = p as any;
  const fromImg: string | undefined = anyP?.img; // some items use `img`
  const fromImages: string | undefined =
    Array.isArray(anyP?.images) && anyP.images.length ? anyP.images[0] : undefined;
  return fromImg || fromImages || "";
}

export default function ProductPage({ product }: Props) {
  const hero = heroSrcOf(product);
  const gallery: string[] = Array.isArray((product as any).images)
    ? ((product as any).images as string[])
    : hero
    ? [hero]
    : [];

  const waText = encodeURIComponent(
    `Hello YOM Car Care, I'm interested in "${product.name}".`
  );

  return (
    <section className="container-px py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Image / gallery */}
        <div>
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/40">
            {hero ? (
              // Use <img> to avoid remote host config issues with next/image
              <img
                src={hero}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-white/50">
                Image coming soon
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          <p className="text-sm text-white/60 capitalize">
            {product.category.replace(/-/g, " ")}
            {product.size ? ` • ${product.size}` : ""}
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold">{product.name}</h1>

          {product.price != null && (
            <div className="mt-3 text-xl font-semibold">
              {formatPrice(product.price, product.currency || "USD")}
            </div>
          )}

          {/* Badges (if any) */}
          {(product as any)?.badges?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {((product as any).badges as unknown[]).map((b, i) => (
                <span key={`${b}-${i}`} className="text-[11px] rounded-md bg-white/10 px-2 py-1">
                  {String(b)}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 text-white/80 leading-relaxed">
            {/* Optional: Add a short static description or pull from product if available */}
            Quality car care product. Contact us for availability and delivery in Lubumbashi.
          </div>

          {/* CTAs */}
          <PdpCtas itemName={product.name} category={product.category} waText={waText} />
        </div>
      </div>
    </section>
  );
}

/* ---------- utils ---------- */

function formatPrice(value: string | number, currency = "USD") {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return String(value);
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "USD" ? 0 : 0,
      minimumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  }
}
