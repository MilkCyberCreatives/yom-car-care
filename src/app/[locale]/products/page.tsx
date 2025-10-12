// app/[locale]/products/page.tsx
import type { Metadata } from 'next';
import { ALL_CATEGORIES } from '@/lib/products';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse all categories',
  openGraph: { type: 'website', title: 'All Products', description: 'Browse all categories' },
};

export default function ProductsIndex({ params }: { params: { locale: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <ul className="list-disc pl-6">
        {ALL_CATEGORIES.map((c) => (
          <li key={c}>
            <a className="underline" href={`/${params.locale}/products/${c}`}>
              {c}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
