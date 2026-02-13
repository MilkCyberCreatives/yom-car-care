// src/app/[locale]/page.tsx
import Hero from "@/app/components/Hero";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import Benefits from "@/app/components/Benefits";
import BrandBar from "@/app/components/BrandBar";
import CTABanner from "@/app/components/CTABanner";
import FAQ from "@/app/components/FAQ";
import FloatingWhatsApp from "@/app/components/FloatingWhatsApp";
import MostPurchased from "@/app/components/MostPurchased";
import { featuredHome } from "@/data/featured";

export const metadata = {
  title: "YOM Car Care — Car Care Products in Lubumbashi (Cash on Delivery)",
  description:
    "Discover exterior, interior, detailing, accessories, and air fresheners. Cash on Delivery in Lubumbashi. English/French support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "YOM Car Care — Car Care Products in Lubumbashi",
    description:
      "Exterior, interior, detailing, and accessories with Cash on Delivery. English/French support.",
    url: "/",
    siteName: "YOM Car Care",
  },
};

export default function HomePage() {
  return (
    <>
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
