import type { Metadata } from "next";

import Page from "../../../contact/success/page";
import { toLocale } from "@/lib/seo";

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Message envoye | YOM Car Care" : "Message sent | YOM Car Care",
    alternates: {
      canonical: `/${locale}/contact/success`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default Page;
