"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { formatMoney } from "@/lib/money";

type CartItem = {
  slug: string;
  categorySlug: string;
  name: string;
  qty: number;
  price?: number;
  currency?: string;
  img?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------- cart persistence helpers ---------- */

  // read cart from localStorage
  const loadCart = useCallback(() => {
    try {
      const raw = window.localStorage.getItem("yom-cart");
      if (!raw) {
        setCart([]);
        return;
      }
      const parsed: CartItem[] = JSON.parse(raw);
      setCart(parsed);
    } catch {
      setCart([]);
    }
  }, []);

  // write cart to localStorage + notify header badge
  const saveCart = useCallback((next: CartItem[]) => {
    setCart(next);
    try {
      window.localStorage.setItem("yom-cart", JSON.stringify(next));
    } catch {
      /* ignore storage errors */
    }
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: next }));
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  /* ---------- cart actions ---------- */

  function incQty(index: number) {
    const next = [...cart];
    next[index] = { ...next[index], qty: next[index].qty + 1 };
    saveCart(next);
  }

  function decQty(index: number) {
    const next = [...cart];
    const current = next[index];
    if (!current) return;
    const newQty = current.qty - 1;
    if (newQty <= 0) {
      // remove item
      next.splice(index, 1);
    } else {
      next[index] = { ...current, qty: newQty };
    }
    saveCart(next);
  }

  function removeItem(index: number) {
    const next = [...cart];
    next.splice(index, 1);
    saveCart(next);
  }

  /* ---------- totals ---------- */

  const currency = cart[0]?.currency || "USD";
  const subtotal = cart.reduce((sum, item) => {
    if (typeof item.price === "number" && item.qty) {
      return sum + item.price * item.qty;
    }
    return sum;
  }, 0);

  /* ---------- checkout submit ---------- */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.length) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          notes,
          cart,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send.");
      }

      setStatus("sent");
      setName("");
      setPhone("");
      setEmail("");
      setNotes("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  }

  /* ---------- UI ---------- */

  return (
    <main className="container-px py-10 text-white">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
        <p className="text-white/60 text-sm mt-2">
          Review your selection. You can update quantities, remove items, and
          then send us your order request. We’ll confirm availability & delivery
          with you directly.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 text-center text-white/70">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items list */}
          <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-xl font-semibold mb-4">Items</h2>

            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li
                  key={`${item.slug}-${idx}`}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 border-b border-white/10 pb-4"
                >
                  {/* image */}
                  <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-xs text-zinc-500">
                        No image
                      </div>
                    )}
                  </div>

                  {/* details + controls */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="font-medium leading-snug">
                          {item.name}
                        </div>

                        <div className="text-xs text-white/60 break-all">
                          /products/{item.categorySlug}/{item.slug}
                        </div>

                        {/* qty controls */}
                        <div className="mt-3 flex items-center gap-3 text-sm">
                          <div className="inline-flex items-center rounded-lg border border-white/10 bg-zinc-800/70">
                            <button
                              type="button"
                              className="px-2 py-1 text-white/80 hover:bg-white/10 rounded-l-lg"
                              onClick={() => decQty(idx)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 text-white/90 tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              className="px-2 py-1 text-white/80 hover:bg-white/10 rounded-r-lg"
                              onClick={() => incQty(idx)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                            onClick={() => removeItem(idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* line total */}
                      <div className="text-right text-sm font-medium text-white/90 min-w-[4rem]">
                        {typeof item.price === "number" ? (
                          <span>
                            {formatMoney(
                              item.price * item.qty,
                              item.currency || "USD"
                            )}
                          </span>
                        ) : (
                          <span className="text-white/50">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* subtotal */}
            <div className="mt-6 flex items-center justify-between text-sm text-white/80">
              <span>Subtotal</span>
              <span className="font-semibold text-white">
                {formatMoney(subtotal, currency)}
              </span>
            </div>
          </section>

          {/* Checkout form */}
          <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-xl font-semibold mb-2">
              Send Request / Checkout
            </h2>
            <p className="text-white/60 text-sm mb-4">
              We’ll receive your order with your contact details and reach out
              to confirm payment & delivery.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Your Name *
                </label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="optional"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Notes / Delivery instructions
                </label>
                <textarea
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[80px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Example: I need fast delivery in Lubumbashi"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary justify-center text-center"
                disabled={status === "sending" || cart.length === 0}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                  ? "Sent!"
                  : "Submit Order Request"}
              </button>

              {status === "error" ? (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              ) : null}
              {status === "sent" ? (
                <p className="text-emerald-400 text-sm">
                  Thank you. We’ve received your request and will contact you.
                </p>
              ) : null}
            </form>

            <div className="mt-6 text-[11px] leading-relaxed text-white/40">
              By submitting you agree to be contacted by YOM Car Care to confirm
              stock, pricing, and delivery options.
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
