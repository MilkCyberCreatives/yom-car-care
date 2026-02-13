// src/app/components/Benefits.tsx
"use client";

import { ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function Benefits() {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const title = isFR ? "Pourquoi choisir YOM Car Care ?" : "Why Choose YOM Car Care?";
  const subtitle = isFR
    ? "Produits fiables, livraison rapide et vrai support — en français ou en anglais."
    : "Reliable products, fast delivery, and real support — in English or French.";

  const FEATURES = [
    {
      icon: ShieldCheck,
      title: isFR ? "Qualité & Authenticité" : "Quality & Authenticity",
      desc: isFR
        ? "Uniquement des produits fiables, approuvés par les fabricants, adaptés aux conditions du Congo."
        : "Only trusted, manufacturer-approved products for Congo conditions.",
    },
    {
      icon: Truck,
      title: isFR ? "Paiement à la livraison" : "Cash on Delivery",
      desc: isFR
        ? "Commandez en ligne, payez à la porte à Lubumbashi. Simple et sûr."
        : "Order online, pay at your door in Lubumbashi. Simple & safe.",
    },
    {
      icon: Sparkles,
      title: isFR ? "Conseils d’experts" : "Expert Guidance",
      desc: isFR
        ? "Choisissez la bonne solution extérieur, intérieur et detailing à chaque fois."
        : "Get the right exterior, interior and detailing solution every time.",
    },
  ];

  return (
    <section className="container-px py-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-white/70">{subtitle}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-5">
            <f.icon className="text-[var(--brand-blue)]" />
            <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
