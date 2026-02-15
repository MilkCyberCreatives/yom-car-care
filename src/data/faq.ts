import type { AppLocale } from "@/lib/seo";

export type FaqEntry = {
  question: string;
  answer: string;
};

const FAQ_EN: FaqEntry[] = [
  {
    question: "Do you accept online payment?",
    answer:
      "No. We currently process orders with cash on delivery in Lubumbashi. You can order by phone or WhatsApp.",
  },
  {
    question: "How fast is delivery in Lubumbashi?",
    answer:
      "Most orders are delivered the same day or next day depending on stock and your location in Lubumbashi.",
  },
  {
    question: "Are your products original?",
    answer:
      "Yes. We stock quality brands for exterior, interior, detailing, accessories, and air fresheners.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Open a product page and contact us by WhatsApp or phone. We confirm stock, delivery timing, and order details.",
  },
  {
    question: "Do you support French and English?",
    answer:
      "Yes. We provide customer support in both English and French for customers in the Democratic Republic of the Congo.",
  },
];

const FAQ_FR: FaqEntry[] = [
  {
    question: "Acceptez-vous les paiements en ligne ?",
    answer:
      "Non. Nous traitons les commandes avec paiement a la livraison a Lubumbashi. Vous pouvez commander par telephone ou WhatsApp.",
  },
  {
    question: "Quel est le delai de livraison a Lubumbashi ?",
    answer:
      "La plupart des commandes sont livrees le jour meme ou le lendemain selon le stock et votre zone de Lubumbashi.",
  },
  {
    question: "Les produits sont-ils originaux ?",
    answer:
      "Oui. Nous proposons des marques de qualite pour l exterieur, l interieur, le detailing, les accessoires et les desodorisants.",
  },
  {
    question: "Comment passer une commande ?",
    answer:
      "Ouvrez une fiche produit puis contactez-nous via WhatsApp ou telephone. Nous confirmons le stock, le delai de livraison et la commande.",
  },
  {
    question: "Le support est-il disponible en francais et en anglais ?",
    answer:
      "Oui. Nous accompagnons nos clients en francais et en anglais en Republique Democratique du Congo.",
  },
];

export function getFaq(locale: AppLocale): FaqEntry[] {
  return locale === "fr" ? FAQ_FR : FAQ_EN;
}
