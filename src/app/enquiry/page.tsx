"use client";

import { useMemo } from "react";
import LocaleLink from "@/app/components/LocaleLink";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { useI18n } from "@/hooks/useI18n";

type AnyItem = {
  slug: string;
  name: string;
  category?: string;
  quantity?: number;
  img?: string;
  images?: string[];
  price?: number | string;
};

export default function EnquiryPage() {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const copy = {
    title: isFR ? "Votre liste de demande" : "Your enquiry list",
    eyebrow: isFR ? "Demande" : "Enquiry",
    subtitle: isFR
      ? "Revisez vos articles puis envoyez-nous un message WhatsApp ou utilisez le formulaire de contact."
      : "Review your selected items and send us a WhatsApp message or use the contact form.",
    clearAll: isFR ? "Tout effacer" : "Clear all",
    empty: isFR ? "Votre liste de demande est vide." : "Your enquiry list is empty.",
    browseProducts: isFR ? "Voir les produits" : "Browse products",
    noImage: isFR ? "Pas d'image" : "No image",
    qty: isFR ? "Qt" : "Qty",
    view: isFR ? "Voir" : "View",
    remove: isFR ? "Supprimer" : "Remove",
    sendHeading: isFR ? "Envoyer votre demande" : "Send your enquiry",
    sendBody: isFR
      ? "Envoyez via WhatsApp ou formulaire. Nous repondons avec stock, delai et total."
      : "Send via WhatsApp or contact form. We'll reply with stock, delivery window and total.",
    whatsappEnquiry: isFR ? "Demande WhatsApp" : "WhatsApp Enquiry",
    contactForm: isFR ? "Formulaire de contact" : "Contact Form",
    cod: isFR ? "Paiement a la livraison a Lubumbashi." : "Cash on Delivery in Lubumbashi.",
  };

  const { items: rawItems = [], remove, clear } = (useEnquiry?.() || {}) as {
    items?: AnyItem[];
    remove?: (slug: string) => void;
    clear?: () => void;
  };

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
          <p className="text-[13px] uppercase tracking-widest text-white/60">{copy.eyebrow}</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold">{copy.title}</h1>
          <p className="mt-2 text-white/70 max-w-2xl">{copy.subtitle}</p>
        </div>

        {hasItems ? (
          <button type="button" onClick={() => clear?.()} className="btn-ghost">
            {copy.clearAll}
          </button>
        ) : null}
      </div>

      {!hasItems ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center">
          <p className="text-white/80">{copy.empty}</p>
          <div className="mt-4 flex justify-center">
            <LocaleLink href="/products" className="btn-primary">
              {copy.browseProducts}
            </LocaleLink>
          </div>
        </div>
      ) : (
        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 md:p-6">
            <ul>
              {items.map((i) => (
                <li
                  key={i.slug}
                  className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40 shrink-0">
                    {i.__thumb ? (
                      <img src={i.__thumb} alt={i.name} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-white/40 text-xs">
                        {copy.noImage}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-tight line-clamp-2">{i.name}</div>
                    <div className="mt-1 text-sm text-white/60">
                      {i.category ? prettyCat(i.category) : "-"}
                      {typeof i.quantity === "number" && i.quantity > 0 ? ` • ${copy.qty} ${i.quantity}` : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <LocaleLink
                      href={`/products/${i.category ?? ""}/${i.slug}`}
                      className="btn-ghost"
                      aria-label={isFR ? "Voir le produit" : "View product"}
                    >
                      {copy.view}
                    </LocaleLink>
                    <button type="button" className="btn-ghost" onClick={() => remove?.(i.slug)}>
                      {copy.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 md:p-6">
            <h2 className="text-lg font-semibold">{copy.sendHeading}</h2>
            <p className="mt-2 text-white/70 text-sm">{copy.sendBody}</p>

            <div className="mt-4 space-y-2">
              <a
                href={buildWhatsApp(items, isFR)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                {copy.whatsappEnquiry}
              </a>
              <LocaleLink href="/contact" className="btn-ghost w-full justify-center">
                {copy.contactForm}
              </LocaleLink>
            </div>

            <p className="mt-3 text-xs text-white/50">{copy.cod}</p>
          </aside>
        </section>
      )}
    </main>
  );
}

function prettyCat(s?: string) {
  if (!s) return "";
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function buildWhatsApp(items: AnyItem[], isFR: boolean) {
  const intro = isFR
    ? "Bonjour YOM Car Care, je souhaite demander des informations sur :"
    : "Hello YOM Car Care, I'd like to enquire about:";
  const outro = isFR
    ? "Merci de confirmer la disponibilite et la livraison a Lubumbashi."
    : "Please confirm availability and delivery in Lubumbashi.";

  const lines = [
    intro,
    "",
    ...items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name}${i.category ? ` (${prettyCat(i.category)})` : ""}${i.quantity ? ` x${i.quantity}` : ""}`
    ),
    "",
    outro,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/243848994045?text=${text}`;
}
