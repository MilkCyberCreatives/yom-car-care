'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { state, setQty, remove, clear, subtotal, count } = useCart();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {state.items.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/products" className="mt-4 inline-block rounded-xl bg-black text-white px-4 py-2">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_340px]">
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3">Product</th>
                  <th className="text-left px-4 py-3">Price</th>
                  <th className="text-left px-4 py-3">Quantity</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {state.items.map((i) => (
                  <tr key={i.slug} className="border-t">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded border overflow-hidden bg-white">
                          <Image src={i.image} alt={i.title} fill className="object-contain" />
                        </div>
                        <div>
                          <div className="font-medium">{i.title}</div>
                          <div className="text-xs text-gray-500">{i.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">R {i.price.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2">
                        <button
                          className="w-7 h-7 rounded border hover:bg-gray-50"
                          onClick={() => setQty(i.slug, i.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{i.quantity}</span>
                        <button
                          className="w-7 h-7 rounded border hover:bg-gray-50"
                          onClick={() => setQty(i.slug, i.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold">R {(i.price * i.quantity).toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <button className="text-gray-500 hover:text-black" onClick={() => remove(i.slug)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.aside
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl border p-5 h-fit sticky top-24"
          >
            <h2 className="font-semibold mb-3">Order Summary</h2>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>R {subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Shipping & taxes calculated at checkout.</p>

            <Link href="/checkout" className="mt-4 block w-full text-center rounded-xl bg-black text-white py-2">
              Proceed to checkout
            </Link>

            <button onClick={clear} className="mt-3 w-full text-center rounded-xl border py-2 hover:bg-gray-50">
              Clear cart
            </button>
          </motion.aside>
        </div>
      )}
    </main>
  );
}
