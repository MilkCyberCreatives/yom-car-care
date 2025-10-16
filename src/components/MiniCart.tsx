'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniCart() {
  const { state, close, items, subtotal, count, remove, setQty } = useMini();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          {/* Drawer */}
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 h-dvh w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <header className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Your Cart</h3>
              <button onClick={close} aria-label="Close cart" className="rounded-full p-2 hover:bg-gray-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              ) : (
                items.map((i) => (
                  <div key={i.slug} className="flex gap-3">
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border">
                      <Image src={i.image} alt={i.title} fill className="object-contain bg-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{i.title}</p>
                          <p className="text-xs text-gray-500">{i.category}</p>
                        </div>
                        <button className="text-xs text-gray-500 hover:text-black" onClick={() => remove(i.slug)}>
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-7 h-7 rounded border hover:bg-gray-50"
                            onClick={() => setQty(i.slug, i.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">{i.quantity}</span>
                          <button
                            className="w-7 h-7 rounded border hover:bg-gray-50"
                            onClick={() => setQty(i.slug, i.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold">R {(i.price * i.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <footer className="p-4 border-t">
              <div className="flex items-center justify-between mb-3 text-sm">
                <span>Items</span>
                <span>{count}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>R {subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  className="text-center rounded-xl border border-gray-300 py-2 hover:bg-gray-50"
                  onClick={close}
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  className="text-center rounded-xl bg-black text-white py-2 hover:opacity-90"
                  onClick={close}
                >
                  Checkout
                </Link>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Hook to expose derived values without re-creating logic inline */
function useMini() {
  const cart = useCart();
  return {
    state: cart.state,
    close: cart.close,
    items: cart.state.items,
    subtotal: cart.subtotal,
    count: cart.count,
    remove: cart.remove,
    setQty: cart.setQty,
  };
}
