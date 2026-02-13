import { Suspense } from "react";
import SearchClient from "../../search/SearchClient";

export const metadata = {
  title: "Recherche | YOM Car Care",
  description: "Trouvez des produits d'entretien auto.",
  alternates: { canonical: "/fr/search" },
};

export default function FRSearchPage() {
  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Recherche</h1>
      <p className="mt-2 text-white/70">Recherchez par nom, categorie, taille ou tag.</p>

      <Suspense fallback={<div className="mt-6 text-white/60">Chargement...</div>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
