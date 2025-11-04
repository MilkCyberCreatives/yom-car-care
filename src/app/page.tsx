// src/app/page.tsx
import Hero from "./components/Hero";
// CategoryStrip is rendered inside <Hero />
import FeaturedProducts from "./components/FeaturedProducts";
import Benefits from "./components/Benefits";
import BrandBar from "./components/BrandBar";
import CTABanner from "./components/CTABanner";
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MostPurchased from "./components/MostPurchased";
import { featuredHome } from "@/data/featured";
import Footer from "./components/Footer";

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

      {/* Featured grid, fed by featuredHome list */}
      <FeaturedProducts
        heading="Featured Products"
        products={featuredHome}
        viewAllHref="/products"
      />

      <Benefits />
      <BrandBar />
      <CTABanner />
      <MostPurchased />
      <FAQ />

      {/* Floating WhatsApp action button */}
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
