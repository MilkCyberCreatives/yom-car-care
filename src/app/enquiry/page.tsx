"use client";

import { useMemo } from "react";
import LocaleLink from "@/app/components/LocaleLink";
// If your provider exports a hook, keep this import:
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

type AnyItem = {
  slug: string;
  name: string;
  category?: string;
  quantity?: number;
  // NOTE: the provider's type may not include these,
  // so we treat items as 'any' at runtime and read them safely:
  img?: string;
  images?: string[];
  price?: number | string;
};

export default function EnquiryPage() {
  // Cast to any to avoid type coupling breaking the build
  const { items: rawItems = [], remove, clear } = (useEnquiry?.() || {}) as {
    items?: AnyItem[];
    remove?: (slug: string) => void;
    clear?: () => void;
  };

  // Normalise items (compute thumb from img OR images[0])
  const items = useMemo(() => {
    return (rawItems as AnyItem[]).map((i) => {
      const thumb = i?.img || i?.images?.[0] || "";
      return { ...i, __thumb: thumb };
    });
  }, [rawItems]);

  const hasItems = items.length > 0;

  return (
    <main className="container-px py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] uppercase tracking-widest text-white/60">
            Enquiry
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold">
            Your enquiry list
          </h1>
          <p className="mt-2 text-white/70 max-w-2xl">
            Review your selected items and send us a WhatsApp message or use the
            contact form. We’ll confirm availability and delivery in Lubumbashi.
          </p>
        </div>

        {hasItems ? (
          <button
            type="button"
            onClick={() => clear?.()}
            className="btn-ghost"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {!hasItems ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center">
          <p className="text-white/80">Your enquiry list is empty.</p>
          <div className="mt-4 flex justify-center">
            <LocaleLink href="/products" className="btn-primary">
              Browse products
            </LocaleLink>
          </div>
        </div>
      ) : (
        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Items */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 md:p-6">
            <ul>
              {items.map((i) => (
                <li
                  key={i.slug}
                  className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40 shrink-0">
                    {/* Use <img> to avoid next/image remote host config */}
                    {i.__thumb ? (
                      <img
                        src={i.__thumb}
                        alt={i.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-white/40 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-tight line-clamp-2">
                      {i.name}
                    </div>
                    <div className="mt-1 text-sm text-white/60">
                      {i.category ? prettyCat(i.category) : "—"}
                      {typeof i.quantity === "number" && i.quantity > 0
                        ? ` • Qty ${i.quantity}`
                        : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <LocaleLink
                      href={`/products/${i.category ?? ""}/${i.slug}`}
                      className="btn-ghost"
                      aria-label="View product"
                    >
                      View
                    </LocaleLink>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => remove?.(i.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary / Actions */}
          <aside className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 md:p-6">
            <h2 className="text-lg font-semibold">Send your enquiry</h2>
            <p className="mt-2 text-white/70 text-sm">
              Send via WhatsApp or contact form. We’ll reply with stock,
              delivery window and total.
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={buildWhatsApp(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                WhatsApp Enquiry
              </a>
              <LocaleLink
                href="/contact"
                className="btn-ghost w-full justify-center"
              >
                Contact Form
              </LocaleLink>
            </div>

            <p className="mt-3 text-xs text-white/50">
              Cash on Delivery in Lubumbashi.
            </p>
          </aside>
        </section>
      )}
    </main>
  );
}

/* ---------------- helpers ---------------- */

function prettyCat(s?: string) {
  if (!s) return "";
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function buildWhatsApp(items: AnyItem[]) {
  const lines = [
    "Hello YOM Car Care, I'd like to enquire about:",
    "",
    ...items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name}${
          i.category ? ` (${prettyCat(i.category)})` : ""
        }${i.quantity ? ` x${i.quantity}` : ""}`
    ),
    "",
    "Please confirm availability and delivery in Lubumbashi.",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/243848994045?text=${text}`;
}
