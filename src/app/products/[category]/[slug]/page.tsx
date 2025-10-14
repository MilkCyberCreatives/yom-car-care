import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/app/products/_components/ProductPage";
import { products, type ProductData } from "@/data/products";

type Params = { category: string; slug: string };

function findProduct({ category, slug }: Params): ProductData | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const product = findProduct(params);
  if (!product) return {};

  const title = `${product.name} • YOM Car Care`;
  const desc = `Buy ${product.name} in Lubumbashi. Cash on Delivery.`;
  const canonical = `/products/${product.category}/${product.slug}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        fr: `/fr${canonical}`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName: "YOM Car Care",
      // Use a supported type
      type: "website",
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const product = findProduct(params);
  if (!product) notFound();

  return <ProductPage product={product} />;
}
