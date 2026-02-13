import type { Metadata } from "next";
import CartPage from "../../cart/page";

type Params = { params: { locale: string } };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const isFR = params.locale === "fr";
  return {
    title: isFR ? "Panier | YOM Car Care" : "Your Cart | YOM Car Care",
    description: isFR
      ? "Revoyez les articles de votre panier et envoyez votre demande de commande."
      : "Review items in your cart and submit your order request.",
  };
}

export default CartPage;
