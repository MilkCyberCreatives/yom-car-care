import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedByCategory } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import { motion } from 'framer-motion';

type Props = {
  params: { category: string; slug: string };
};

export function generateStaticParams() {
  // Optionally generate at build if you later adopt static generation
  return [];
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const related = getRelatedByCategory(product.category, product.slug, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-sm mb-4 text-gray-500">
        <Link href="/">Home</Link> <span className="mx-1">/</span>
        <Link href={`/products/${product.category}`}>{product.category}</Link> <span className="mx-1">/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border bg-white">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>

          <div className="mt-4 text-2xl font-bold">R {product.price.toFixed(2)}</div>

          {product.description && (
            <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <AddToCartButton
              slug={product.slug}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
              size="lg"
            />
            <Link
              href="/cart"
              className="rounded-xl border px-5 py-3 hover:bg-gray-50"
              aria-label="Go to cart"
            >
              View cart
            </Link>
          </div>

          <ul className="mt-6 text-sm text-gray-600 space-y-1">
            <li>• Fast delivery across DRC & SA regions</li>
            <li>• Easy returns within 7 days</li>
            <li>• Secure checkout (PayFast soon)</li>
          </ul>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4">You may also like</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.category}/${p.slug}`}
                className="rounded-xl border overflow-hidden hover:shadow"
              >
                <div className="relative w-full aspect-square bg-white">
                  <Image src={p.image} alt={p.title} fill className="object-contain p-4" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                  <p className="text-[13px] text-gray-500">{p.category}</p>
                  <p className="mt-1 font-semibold text-sm">R {p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
