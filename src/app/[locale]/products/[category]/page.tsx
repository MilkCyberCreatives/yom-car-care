// app/[locale]/products/[category]/page.tsx
import type { Metadata } from 'next';
import { ALL_CATEGORIES, getProductsByCategory, type Product } from '@/lib/products';

type Params = {
  locale: string;
  category: Product['category'];
};

export const dynamicParams = false;

const locales = ['en', 'fr'] as const;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    ALL_CATEGORIES.map((category) => ({ locale, category }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const title = `Products: ${params.category}`;
  const url = `https://your-domain.com/${params.locale}/products/${params.category}`;
  return {
    title,
    description: `Browse ${params.category} products.`,
    openGraph: {
      type: 'website',
      title,
      description: `Browse ${params.category} products.`,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const list = await getProductsByCategory(params.category);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {params.category} ({params.locale.toUpperCase()})
      </h1>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug} className="border rounded-lg p-4">
            <a href={`/${params.locale}/products/${p.category}/${p.slug}`} className="font-medium underline">
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
