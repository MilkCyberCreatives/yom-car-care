"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

function prettySlug(value: string) {
  return decodeURIComponent(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function pageMeta(rest: string[], isFR: boolean, t: ReturnType<typeof useI18n>["t"]) {
  if (rest.length === 0) return null;

  const root = rest[0] || "";
  const fallbackTitle = prettySlug(root);

  const labels: Record<string, string> = {
    about: t.common.about,
    brands: t.common.brands,
    products: t.common.products,
    contact: t.common.contact,
    cart: isFR ? "Panier" : "Cart",
    compare: isFR ? "Comparer" : "Compare",
    enquiry: isFR ? "Demande" : "Enquiry",
    faq: "FAQ",
    search: isFR ? "Recherche" : "Search",
    terms: isFR ? "Conditions" : "Terms",
    "privacy-policy": isFR ? "Politique de confidentialite" : "Privacy Policy",
    "cookie-policy": isFR ? "Politique des cookies" : "Cookie Policy",
    "legal-area": isFR ? "Espace legal" : "Legal Area",
  };

  const categoryLabels: Record<string, string> = {
    exterior: t.cats.exterior,
    interior: t.cats.interior,
    "air-fresheners": t.cats.air,
    detailing: t.cats.detailing,
    accessories: t.cats.accessories,
  };

  let title = labels[root] || fallbackTitle;
  if (root === "products" && rest.length >= 2) {
    title = categoryLabels[rest[1]] || prettySlug(rest[1]);
  }
  if (root === "products" && rest.length >= 3) {
    title = prettySlug(rest[2]);
  }
  if (root === "contact" && rest[1] === "success") {
    title = isFR ? "Message envoye" : "Message sent";
  }

  const descriptions: Record<string, string> = {
    about: isFR
      ? "Decouvrez notre histoire, nos valeurs et nos engagements a Lubumbashi."
      : "Discover our story, values, and commitment in Lubumbashi.",
    brands: isFR
      ? "Retrouvez les marques selectionnees pour des resultats fiables."
      : "Explore trusted brands selected for consistent results.",
    products: isFR
      ? "Parcourez les produits adaptes a chaque besoin d entretien automobile."
      : "Browse products tailored for every car care need.",
    contact: isFR
      ? "Contactez notre equipe et recevez une reponse rapide."
      : "Contact our team and get a fast response.",
    cart: isFR
      ? "Verifiez vos articles et finalisez votre demande."
      : "Review your items and complete your request.",
    compare: isFR
      ? "Comparez les options pour choisir le bon produit."
      : "Compare options to choose the right product.",
    enquiry: isFR
      ? "Revoyez votre liste et envoyez votre demande."
      : "Review your list and submit your enquiry.",
    faq: isFR
      ? "Consultez les reponses aux questions les plus frequentes."
      : "Find answers to frequently asked questions.",
    search: isFR
      ? "Consultez les resultats correspondant a votre recherche."
      : "View results that match your search.",
    terms: isFR ? "Consultez nos conditions d utilisation." : "Review our terms of use.",
    "privacy-policy": isFR
      ? "Consultez notre politique de confidentialite."
      : "Review our privacy policy.",
    "cookie-policy": isFR
      ? "Consultez notre politique des cookies."
      : "Review our cookie policy.",
    "legal-area": isFR ? "Consultez nos informations legales." : "Review our legal information.",
  };

  let description = descriptions[root] || (isFR
    ? "Consultez cette section de YOM Car Care."
    : "Explore this section of YOM Car Care.");
  if (root === "products" && rest.length >= 2) {
    description = isFR
      ? `Decouvrez notre selection ${title} avec paiement a la livraison.`
      : `Discover our ${title} selection with cash-on-delivery convenience.`;
  }
  if (root === "products" && rest.length >= 3) {
    description = isFR
      ? "Consultez les details du produit et envoyez votre demande."
      : "View product details and send your request.";
  }
  if (root === "contact" && rest[1] === "success") {
    description = isFR
      ? "Nous avons bien recu votre message et reviendrons vers vous rapidement."
      : "We received your message and will get back to you shortly.";
  }

  return {
    kicker: title.toUpperCase(),
    title,
    description,
  };
}

export default function PageMasthead() {
  const pathname = usePathname() || "/en";
  const { locale, t } = useI18n();
  const isFR = locale === "fr";

  const parts = pathname.split("/").filter(Boolean);
  const [maybeLocale, ...restRaw] = parts;
  const rest = maybeLocale === "en" || maybeLocale === "fr" ? restRaw : parts;
  const meta = pageMeta(rest, isFR, t);

  if (!meta) return null;

  return (
    <section className="relative border-b border-white/10 bg-[radial-gradient(65%_120%_at_50%_-20%,_rgba(0,115,228,0.25),_transparent)]">
      <div className="container-px py-12 md:py-16">
        <p className="text-[13px] uppercase tracking-widest text-white/70">{meta.kicker}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-5xl">{meta.title}</h1>
        <p className="mt-4 max-w-2xl text-white/70">{meta.description}</p>
      </div>
    </section>
  );
}
