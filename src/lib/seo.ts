import type { Product } from "@/lib/products";

export type AppLocale = "en" | "fr";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://yomcarcare.com";
export const SITE_NAME = "YOM Car Care";
export const SITE_DEFAULT_LOCALE: AppLocale = "en";
export const SUPPORTED_LOCALES: AppLocale[] = ["en", "fr"];
export const CORE_KEYWORDS = [
  "car care Lubumbashi",
  "car detailing DRC",
  "auto products Congo",
  "YOM Car Care",
  "cash on delivery Lubumbashi",
  "auto detailing products Lubumbashi",
  "car wash products DRC",
] as const;
export const INDIRECT_BUSINESS_KEYWORDS = [
  "car wash business supplies Congo",
  "detailing studio supplies Lubumbashi",
  "garage cleaning products DRC",
  "auto workshop consumables Congo",
  "fleet maintenance cleaning products",
  "car dealership preparation products",
  "motorbike cleaning products Lubumbashi",
  "transport company vehicle care supplies",
] as const;
export const ALL_SEO_KEYWORDS = [
  ...CORE_KEYWORDS,
  ...INDIRECT_BUSINESS_KEYWORDS,
] as const;

export const BUSINESS = {
  name: SITE_NAME,
  phone: "+243848994045",
  phoneDisplay: "+243 84 899 4045",
  email: "info@yomcarcare.com",
  address: {
    streetAddress: "538 Avenue Kipopo, Golf Malela",
    addressLocality: "Lubumbashi",
    addressRegion: "Haut-Katanga",
    postalCode: "7019",
    addressCountry: "CD",
  },
  geo: {
    latitude: -11.6647,
    longitude: 27.4794,
  },
  currency: ["USD", "CDF"],
  areaServed: ["Lubumbashi", "Haut-Katanga", "Democratic Republic of the Congo"],
  sameAs: [
    "https://wa.me/243848994045",
  ],
} as const;

export function toLocale(value?: string): AppLocale {
  return value === "fr" ? "fr" : "en";
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

function normalizePath(path = "/"): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function localePath(locale: AppLocale, path = "/"): string {
  const suffix = normalizePath(path);
  return `/${locale}${suffix}`;
}

export function localeAlternates(path = "/"): Record<string, string> {
  const en = absoluteUrl(localePath("en", path));
  const fr = absoluteUrl(localePath("fr", path));
  return {
    en,
    fr,
    "x-default": en,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        availableLanguage: ["en", "fr"],
        areaServed: "CD",
      },
    ],
    sameAs: BUSINESS.sameAs,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoPartsStore", "Store", "LocalBusiness"],
    "@id": `${SITE_URL}#localbusiness`,
    name: BUSINESS.name,
    image: [absoluteUrl("/logo.svg")],
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    paymentAccepted: "Cash",
    areaServed: BUSINESS.areaServed,
    currenciesAccepted: BUSINESS.currency.join(", "),
    availableLanguage: ["en", "fr"],
    priceRange: "$$",
    keywords: ALL_SEO_KEYWORDS.join(", "),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    keywords: ALL_SEO_KEYWORDS.join(", "),
    inLanguage: ["en", "fr"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/en/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd(params: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: params.locale,
    name: params.title,
    description: params.description,
    url: absoluteUrl(params.path),
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: {
      "@id": `${SITE_URL}#localbusiness`,
    },
  };
}

export function faqJsonLd(
  locale: AppLocale,
  entries: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function productJsonLd(params: {
  product: Product;
  locale: AppLocale;
  path: string;
}) {
  const { product, path } = params;
  const image = product.images?.length ? product.images : [product.img || "/products/placeholder.jpg"];
  const descriptionEn = `Buy ${product.name} in Lubumbashi with cash-on-delivery from YOM Car Care.`;
  const descriptionFr = `Achetez ${product.name} a Lubumbashi avec paiement a la livraison chez YOM Car Care.`;

  const price =
    typeof product.price === "number" && Number.isFinite(product.price)
      ? product.price
      : undefined;
  const currency = product.currency || "USD";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.slug,
    category: product.category,
    image: image.map((item) => absoluteUrl(item)),
    description: params.locale === "fr" ? descriptionFr : descriptionEn,
    brand: {
      "@type": "Brand",
      name: "YOM Car Care",
    },
    url: absoluteUrl(path),
    ...(price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: currency,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            url: absoluteUrl(path),
            seller: {
              "@id": `${SITE_URL}#localbusiness`,
            },
            areaServed: "CD",
          },
        }
      : {}),
  };
}
