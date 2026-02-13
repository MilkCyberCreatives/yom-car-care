import Link from "next/link";
import type { Metadata } from "next";

import BrandBar from "@/app/components/BrandBar";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

type PageProps = {
  params: { locale?: string };
};

function localeValue(raw?: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = localeValue(params?.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Marques" : "Brands",
    description: isFR
      ? "Découvrez les marques partenaires de YOM Car Care."
      : "Discover YOM Car Care partner brands.",
    alternates: {
      canonical: `/${locale}/brands`,
      languages: {
        en: "/en/brands",
        fr: "/fr/brands",
      },
    },
  };
}

export default function BrandsPage({ params }: PageProps) {
  const locale = localeValue(params?.locale);
  const isFR = locale === "fr";
  const productsHref = `/${locale}/products`;
  const contactHref = `/${locale}/contact`;

  return (
    <main>
      <section className="container-px py-12 md:py-16">
        <p className="text-xs uppercase tracking-widest text-white/60">
          {isFR ? "Marques partenaires" : "Partner Brands"}
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-semibold">
          {isFR ? "Produits de confiance" : "Trusted product brands"}
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          {isFR
            ? "Nous sélectionnons des marques reconnues pour offrir des résultats fiables sur tous les types de véhicules."
            : "We curate recognized brands to deliver reliable results across all vehicle types."}
        </p>
      </section>

      <BrandBar className="pt-0" />

      <section className="container-px pb-14 md:pb-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold">
            {isFR ? "Besoin d'un conseil produit ?" : "Need product guidance?"}
          </h2>
          <p className="mt-2 text-white/70">
            {isFR
              ? "Contactez notre équipe pour choisir la bonne combinaison de produits."
              : "Reach out to our team to choose the right product combination."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={productsHref} className="btn-primary">
              {isFR ? "Voir les produits" : "Browse Products"}
            </Link>
            <Link href={contactHref} className="btn-ghost">
              {isFR ? "Nous contacter" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
