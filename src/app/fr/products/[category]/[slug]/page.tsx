import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/app/products/_components/ProductPage";
import { products, type ProductData } from "@/data/products";

type Params = { category: string; slug: string };

function findProduct({ category, slug }: Params): ProductData | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export async function generateStaticParams() {
  // same params set as EN, folder provides the /fr path segment
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const product = findProduct(params);
  if (!product) return {};

  const title = `${product.name} • YOM Car Care`;
  const desc = `Achetez ${product.name} à Lubumbashi. Paiement à la livraison.`;
  const canonical = `/fr/products/${product.category}/${product.slug}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical,
      languages: {
        fr: canonical,
        en: canonical.replace(/^\/fr/, ""),
      },
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName: "YOM Car Care",
      type: "product",
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const product = findProduct(params);
  if (!product) notFound();

  // Shared UI is language-agnostic; translate inside component as needed
  return <ProductPage product={product} />;
}
