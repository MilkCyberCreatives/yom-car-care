import type { Metadata } from "next";

import FaqPageContent from "@/app/faq/FaqPageContent";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ YOM Car Care - Lubumbashi",
  description:
    "Questions frequentes sur la commande, la livraison et le paiement a la livraison a Lubumbashi.",
  alternates: {
    canonical: "/fr/faq",
    languages: localeAlternates("/faq"),
  },
};

export default function FRFAQPage() {
  return <FaqPageContent locale="fr" canonicalPath="/fr/faq" />;
}
