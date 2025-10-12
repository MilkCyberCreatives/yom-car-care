'use client';

import React from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: { category: string; slug: string };
};

export default function ProductPage({ params }: Props) {
  const product = products.find(
    (p) => p.category === params.category && p.slug === params.slug
  );

  if (!product) return notFound();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">{product.name}</h1>
          <p className="text-white/80 mb-6">{product.description}</p>

          {product.features?.length ? (
            <ul className="space-y-2 mb-8">
              {product.features.map((f: string) => (
                <li key={f} className="text-white/80">• {f}</li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center gap-3">
            {product.price ? (
              <span className="text-xl font-semibold">
                {typeof product.price === 'number' ? `R${product.price.toFixed(2)}` : product.price}
              </span>
            ) : null}
            {/* Add to cart or enquiry button could go here */}
          </div>
        </div>
      </div>
    </main>
  );
}
