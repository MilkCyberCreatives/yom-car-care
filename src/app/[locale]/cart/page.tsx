import type { Metadata } from "next";
import CartPage from "../../cart/page";
import { localeAlternates, toLocale } from "@/lib/seo";

type Params = { params: { locale: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale(params.locale);
  const isFR = locale === "fr";

  return {
    title: isFR ? "Panier | YOM Car Care" : "Your Cart | YOM Car Care",
    description: isFR
      ? "Revoyez les articles de votre panier et envoyez votre demande de commande."
      : "Review items in your cart and submit your order request.",
    alternates: {
      canonical: `/${locale}/cart`,
      languages: localeAlternates("/cart"),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default CartPage;
