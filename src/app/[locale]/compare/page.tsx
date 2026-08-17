import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { localeAlternates, toLocale } from "@/lib/seo";

const CompareTable = dynamic(() => import("@/components/compare/CompareTable"), {
  ssr: false,
});

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Comparer les produits" : "Compare Products",
    description: isFR
      ? "Comparez les produits YOM Car Care que vous avez selectionnes."
      : "Compare the YOM Car Care products you have selected.",
    alternates: {
      canonical: `/${locale}/compare`,
      languages: localeAlternates("/compare"),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LocaleComparePage({ params }: PageProps) {
  const isFR = params?.locale === "fr";

  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">
        {isFR ? "Comparer les produits" : "Compare Products"}
      </h1>
      <p className="mt-2 text-white/70">
        {isFR
          ? "Ajoutez des articles a comparer depuis les cartes produit."
          : "Add items to compare from any product card, then review them here."}
      </p>

      <div className="mt-6 card p-4 overflow-x-auto">
        <CompareTable />
      </div>
    </main>
  );
}
