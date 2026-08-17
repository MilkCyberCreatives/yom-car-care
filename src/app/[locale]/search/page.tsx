import type { Metadata } from "next";

import Page from "../../search/page";
import { localeAlternates, toLocale } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Recherche" : "Search",
    description: isFR
      ? "Recherchez les produits YOM Car Care par nom ou categorie."
      : "Search YOM Car Care products by name or category.",
    alternates: {
      canonical: `/${locale}/search`,
      languages: localeAlternates("/search"),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default Page;
