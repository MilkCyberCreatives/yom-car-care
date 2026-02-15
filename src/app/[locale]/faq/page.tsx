import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FaqPageContent from "@/app/faq/FaqPageContent";
import { localeAlternates, toLocale } from "@/lib/seo";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "FAQ YOM Car Care - Lubumbashi" : "YOM Car Care FAQ - Lubumbashi",
    description: isFR
      ? "Questions frequentes sur la commande, la livraison et le paiement a la livraison a Lubumbashi."
      : "Frequently asked questions about ordering, delivery, and cash-on-delivery in Lubumbashi.",
    alternates: {
      canonical: `/${locale}/faq`,
      languages: localeAlternates("/faq"),
    },
  };
}

export default function LocaleFaqPage({ params }: PageProps) {
  if (params.locale !== "en" && params.locale !== "fr") {
    notFound();
  }

  return <FaqPageContent locale={params.locale} canonicalPath={`/${params.locale}/faq`} />;
}
