import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/app/components/Hero";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import JsonLd from "@/app/components/JsonLd";
import { featuredHome } from "@/data/featured";
import { getFaq } from "@/data/faq";
import {
  faqJsonLd,
  localeAlternates,
  toLocale,
  webPageJsonLd,
} from "@/lib/seo";

const Benefits = dynamic(() => import("@/app/components/Benefits"));
const BrandBar = dynamic(() => import("@/app/components/BrandBar"));
const CTABanner = dynamic(() => import("@/app/components/CTABanner"));
const MostPurchased = dynamic(() => import("@/app/components/MostPurchased"));
const FAQ = dynamic(() => import("@/app/components/FAQ"));
const FloatingWhatsApp = dynamic(() => import("@/app/components/FloatingWhatsApp"));

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  const title = isFR
    ? "Produits d entretien auto a Lubumbashi"
    : "Car Care Products in Lubumbashi";
  const description = isFR
    ? "Produits premium d entretien auto a Lubumbashi, RDC. Paiement a la livraison et support en francais et anglais."
    : "Premium car care products in Lubumbashi, DRC. Cash on delivery with English and French support.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: localeAlternates("/"),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      type: "website",
    },
  };
}

export default function HomePage({ params }: PageProps) {
  if (params.locale !== "en" && params.locale !== "fr") {
    notFound();
  }

  const locale = params.locale;
  const isFR = locale === "fr";
  const title = isFR
    ? "YOM Car Care - Produits d entretien auto a Lubumbashi"
    : "YOM Car Care - Car Care Products in Lubumbashi";
  const description = isFR
    ? "Produits premium, conseils experts et paiement a la livraison a Lubumbashi."
    : "Premium products, expert guidance, and cash on delivery in Lubumbashi.";

  return (
    <>
      <JsonLd
        id={`home-webpage-jsonld-${locale}`}
        data={webPageJsonLd({
          locale,
          path: `/${locale}`,
          title,
          description,
        })}
      />
      <JsonLd id={`home-faq-jsonld-${locale}`} data={faqJsonLd(locale, getFaq(locale))} />

      <Hero />
      <FeaturedProducts products={featuredHome} viewAllHref="/products" />
      <Benefits />
      <BrandBar />
      <CTABanner />
      <MostPurchased />
      <FAQ />
      <FloatingWhatsApp />
    </>
  );
}
