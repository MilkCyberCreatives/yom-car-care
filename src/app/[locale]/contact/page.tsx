import type { Metadata } from "next";

import Page from "../../contact/page";
import { localeAlternates, toLocale } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Contact YOM Car Care" : "Contact YOM Car Care",
    description: isFR
      ? "Contactez YOM Car Care a Lubumbashi par telephone, WhatsApp ou formulaire."
      : "Contact YOM Car Care in Lubumbashi by phone, WhatsApp, or contact form.",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: localeAlternates("/contact"),
    },
  };
}

export default Page;
