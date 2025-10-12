import ProductPage from '../../_components/ProductPage';
import { products } from '@/data/products';
import { buildProductMetadata } from '../../_lib/productMetadata';

export default function Page({ params }: { params: { category: string; slug: string } }) {
  return <ProductPage params={params} />;
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  return buildProductMetadata(params.category, params.slug);
}

export async function generateStaticParams() {
  return products.map(p => ({ category: p.category, slug: p.slug }));
}
