import dynamic from "next/dynamic";

const CompareTable = dynamic(() => import("@/components/compare/CompareTable"), {
  ssr: false,
});

export default function LocaleComparePage({ params }: { params: { locale?: string } }) {
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
