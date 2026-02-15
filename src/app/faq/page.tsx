import type { Metadata } from "next";

import FaqPageContent from "@/app/faq/FaqPageContent";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "YOM Car Care FAQ - Lubumbashi",
  description:
    "Frequently asked questions about ordering, delivery, and cash-on-delivery in Lubumbashi.",
  alternates: {
    canonical: "/en/faq",
    languages: localeAlternates("/faq"),
  },
};

export default function FAQPage() {
  return <FaqPageContent locale="en" canonicalPath="/en/faq" />;
}
