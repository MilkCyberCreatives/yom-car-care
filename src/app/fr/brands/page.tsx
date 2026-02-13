import Link from "next/link";
import type { Metadata } from "next";
import BrandBar from "@/app/components/BrandBar";

export const metadata: Metadata = {
  title: "Marques",
  description: "Decouvrez les marques partenaires de YOM Car Care.",
  alternates: { canonical: "/fr/brands" },
};

export default function FRBrandsPage() {
  return (
    <main>
      <section className="container-px py-12 md:py-16">
        <p className="text-xs uppercase tracking-widest text-white/60">Marques partenaires</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-semibold">Produits de confiance</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Nous selectionnons des marques reconnues pour offrir des resultats fiables sur tous les types de vehicules.
        </p>
      </section>

      <BrandBar className="pt-0" />

      <section className="container-px pb-14 md:pb-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold">Besoin d'un conseil produit ?</h2>
          <p className="mt-2 text-white/70">
            Contactez notre equipe pour choisir la bonne combinaison de produits.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/fr/products" className="btn-primary">
              Voir les produits
            </Link>
            <Link href="/fr/contact" className="btn-ghost">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
