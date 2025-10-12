import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products by Category | YOM Car Care',
  description: 'Browse YOM products by category.',
  alternates: {
    canonical: '/products',
    languages: { 'fr': '/fr/products' },
  },
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const list = products.filter(p => p.category === params.category);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        {params.category.replace(/-/g, ' ')}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.category}/${p.slug}`}
            className="group rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="relative w-full aspect-square">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="25vw" />
            </div>
            <div className="p-3">
              <div className="text-sm text-white/70 capitalize">{p.category.replace(/-/g, ' ')}</div>
              <div className="font-medium group-hover:underline">{p.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(products.map(p => p.category)));
  return categories.map(category => ({ category }));
}
