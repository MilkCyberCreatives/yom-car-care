// src/hooks/useI18n.tsx
"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";

export type Locale = "en" | "fr";

type DictShape = typeof DICT.en;

// 1. DICTIONARY (translations)
const DICT = {
  en: {
    common: {
      products: "Products",
      about: "About Us",
      contact: "Contact",
      categories: "Categories",
      call_now: "Call Now",
      cart: "Cart",
      search_placeholder: "Search products...",
      address_line1: "538 Avenue Kipopo",
      address_line2: "Golf Malela",
      address_city: "Lubumbashi",
      email: "info@yomcarcare.com",
    },
    cats: {
      exterior: "Exterior",
      interior: "Interior",
      air: "Air Fresheners",
      detailing: "Detailing",
      accessories: "Accessories",
    },
    hero: {
      title_1: "Premium car care, trusted in",
      title_highlight: " Lubumbashi.",
      title_2: " Shine, protect, and maintain your vehicle the right way.",
      subtitle:
        "We stock professional interior and exterior care products, fragrance, detailing tools and accessories — quality you can feel, results you can see.",
      french_hint:
        "Français disponible. Livraison possible selon zone.",
    },
  },

  fr: {
    common: {
      products: "Produits",
      about: "À propos",
      contact: "Contact",
      categories: "Catégories",
      call_now: "Appeler",
      cart: "Panier",
      search_placeholder: "Rechercher des produits...",
      address_line1: "538 Avenue Kipopo",
      address_line2: "Golf Malela",
      address_city: "Lubumbashi",
      email: "info@yomcarcare.com",
    },
    cats: {
      exterior: "Extérieur",
      interior: "Intérieur",
      air: "Parfums / Désodorisants",
      detailing: "Finition & Détails",
      accessories: "Accessoires",
    },
    hero: {
      title_1: "Entretien auto haut de gamme, reconnu à",
      title_highlight: " Lubumbashi.",
      title_2: " Faites briller, protégez et gardez votre voiture impeccable.",
      subtitle:
        "Produits professionnels intérieur / extérieur, parfums, accessoires et outils de detailing — qualité visible dès la première utilisation.",
      french_hint:
        "Service disponible en français. Livraison selon la zone.",
    },
  },
} satisfies Record<Locale, any>;

// 2. Context shape
type I18nContextValue = {
  locale: Locale;
  t: DictShape;
  // helper to build locale-aware internal links
  l: (href: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

// 3. Provider component (CLIENT)
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  // guard fallback, just in case
  const safeLocale: Locale =
    locale === "fr" || locale === "en" ? locale : "en";

  const dict = DICT[safeLocale];

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale: safeLocale,
      t: dict,
      l: (href: string) => {
        // l("/products") => "/fr/products" if locale is fr
        if (safeLocale === "fr") {
          if (href.startsWith("/fr")) return href;
          return `/fr${href === "/" ? "" : href}`;
        }
        // english: strip any leading /fr
        return href.replace(/^\/fr/, "") || "/";
      },
    };
  }, [safeLocale, dict]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// 4. Hook for components
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <I18nProvider />");
  }
  return ctx;
}
