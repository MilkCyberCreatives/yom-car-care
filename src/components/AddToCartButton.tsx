'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { motion } from 'framer-motion';

type Props = {
  slug: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  quantity?: number; // default 1
  size?: 'sm' | 'md' | 'lg';
};

export default function AddToCartButton({
  slug,
  title,
  price,
  image,
  category,
  quantity = 1,
  size = 'md',
}: Props) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);

  const padding = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2';

  const onAdd = () => {
    add({ slug, title, price, image, category }, quantity);
    setAdded(true);
    // brief checkmark animation then open minicart
    setTimeout(() => {
      open();
      setTimeout(() => setAdded(false), 800);
    }, 150);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`rounded-xl bg-black text-white ${padding} font-medium shadow hover:shadow-lg transition`}
      onClick={onAdd}
      aria-label="Add to cart"
    >
      {added ? '✓ Added' : 'Add to cart'}
    </motion.button>
  );
}
