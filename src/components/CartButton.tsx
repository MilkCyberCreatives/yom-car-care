'use client';

import { useCart } from '@/lib/cart-context';
import { motion } from 'framer-motion';

export default function CartButton() {
  const { toggle, count } = useCart();

  return (
    <button
      onClick={toggle}
      className="relative inline-flex items-center justify-center rounded-full w-10 h-10 bg-white border border-gray-200 shadow hover:shadow-md"
      aria-label="Open cart"
    >
      {/* Cart icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="pointer-events-none">
        <path d="M6 6h15l-1.5 9h-12L6 6Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>

      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-black text-white text-[11px] leading-5 text-center"
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}
