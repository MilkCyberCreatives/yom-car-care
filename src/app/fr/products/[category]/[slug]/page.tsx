import ProductPage from '../../../../products/_components/ProductPage';
import { products } from '@/data/products';
import { buildProductMetadata } from '../../../../products/_lib/productMetadata';

export default function Page({ params }: { params: { category: string; slug: string } }) {
  // UI is language-agnostic in the shared component; translate strings inside if needed.
  return <ProductPage params={params} />;
}

// Reuse the same metadata logic but set alternates to point back to FR canonical
export function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const meta = buildProductMetadata(params.category, params.slug);
  return {
    ...meta,
    alternates: {
      canonical: `/fr/products/${params.category}/${params.slug}`,
      languages: { 'en': `/products/${params.category}/${params.slug}` },
    },
  };
}

// CRUCIAL: local FR static params so export produces /fr/... paths
export async function generateStaticParams() {
  return products.map(p => ({ category: p.category, slug: p.slug }));
}
