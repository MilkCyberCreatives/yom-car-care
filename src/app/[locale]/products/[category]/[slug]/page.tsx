// app/[locale]/products/[category]/[slug]/page.tsx
import type { Metadata } from 'next';
import { getAllProducts, getProduct, type Product } from '@/lib/products';

type Params = {
  locale: string;
  category: Product['category'];
  slug: string;
};

export const dynamicParams = false; // make sure only generated params build

const locales = ['en', 'fr'] as const;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return locales.flatMap((locale) =>
    products.map((p) => ({
      locale,
      category: p.category,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await getProduct(params.category, params.slug);

  // If a product is missing, you can return a notFound() page instead.
  const title = product ? product.name : 'Product';
  const description = product?.description ?? 'Product details';
  const url = `https://your-domain.com/${params.locale}/products/${params.category}/${params.slug}`;
  const images = product?.images?.length ? product.images : ['/og-default.jpg'];

  return {
    title,
    description,
    openGraph: {
      type: 'website', // ✅ valid
      title,
      description,
      url,
      images: images.map((url) => ({ url })),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await getProduct(params.category, params.slug);
  if (!product) {
    // You can import notFound from next/navigation if desired
    return <div>Product not found.</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images ?? [],
    description: product.description ?? '',
    sku: product.sku ?? '',
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    offers: product.price
      ? {
          '@type': 'Offer',
          priceCurrency: product.currency ?? 'USD',
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: `https://your-domain.com/${params.locale}/products/${params.category}/${params.slug}`,
        }
      : undefined,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {params.locale.toUpperCase()} · {params.category}
      </p>

      {product.images?.[0] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.images[0]} alt={product.name} className="w-full max-w-xl mb-6" />
      )}

      <p className="mb-4">{product.description ?? 'No description provided.'}</p>
      {product.price != null && (
        <p className="font-medium">
          {product.currency ?? 'USD'} {product.price}
        </p>
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
