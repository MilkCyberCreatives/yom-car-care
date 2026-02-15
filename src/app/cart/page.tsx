"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { useI18n } from "@/hooks/useI18n";

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
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const copy = isFR
    ? {
        title: "Votre panier",
        subtitle:
          "Verifiez vos articles, ajustez les quantites, puis envoyez votre demande de commande.",
        empty: "Votre panier est vide.",
        items: "Articles",
        noImage: "Pas d image",
        decQty: "Diminuer la quantite",
        incQty: "Augmenter la quantite",
        remove: "Supprimer",
        subtotal: "Sous-total",
        checkoutTitle: "Envoyer la demande",
        checkoutDesc:
          "Nous recevons votre panier et vous recontactons pour confirmer paiement et livraison.",
        nameLabel: "Nom complet *",
        phoneLabel: "Telephone / WhatsApp *",
        emailLabel: "Email",
        notesLabel: "Notes / Instructions de livraison",
        optional: "optionnel",
        notesPlaceholder: "Exemple: livraison rapide a Lubumbashi",
        sending: "Envoi...",
        sent: "Envoye !",
        submit: "Envoyer la demande de commande",
        sentNote: "Merci. Votre demande a ete recue et nous vous contacterons.",
        terms:
          "En envoyant ce formulaire, vous acceptez d etre contacte par YOM Car Care pour confirmer le stock, le prix et la livraison.",
      }
    : {
        title: "Your Cart",
        subtitle:
          "Review your selection, update quantities, then send your order request and we will confirm delivery details.",
        empty: "Your cart is empty.",
        items: "Items",
        noImage: "No image",
        decQty: "Decrease quantity",
        incQty: "Increase quantity",
        remove: "Remove",
        subtotal: "Subtotal",
        checkoutTitle: "Send Request / Checkout",
        checkoutDesc:
          "We receive your order request and contact you to confirm payment and delivery.",
        nameLabel: "Your Name *",
        phoneLabel: "Phone / WhatsApp *",
        emailLabel: "Email",
        notesLabel: "Notes / Delivery instructions",
        optional: "optional",
        notesPlaceholder: "Example: I need fast delivery in Lubumbashi",
        sending: "Sending...",
        sent: "Sent!",
        submit: "Submit Order Request",
        sentNote: "Thank you. We have received your request and will contact you.",
        terms:
          "By submitting you agree to be contacted by YOM Car Care to confirm stock, pricing, and delivery options.",
      };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const saveCart = useCallback((next: CartItem[]) => {
    setCart(next);
    try {
      window.localStorage.setItem("yom-cart", JSON.stringify(next));
    } catch {
      // ignore storage write errors
    }
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: next }));
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

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

  const currency = cart[0]?.currency || "USD";
  const subtotal = cart.reduce((sum, item) => {
    if (typeof item.price === "number" && item.qty) {
      return sum + item.price * item.qty;
    }
    return sum;
  }, 0);

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
          hp,
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
      saveCart([]);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong.");
    }
  }

  return (
    <main className="container-px py-10 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">{copy.title}</h1>
        <p className="mt-2 text-sm text-white/60">{copy.subtitle}</p>
      </header>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 text-center text-white/70">
          {copy.empty}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">{copy.items}</h2>

            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li
                  key={`${item.slug}-${idx}`}
                  className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white">
                    {item.img ? (
                      <Image src={item.img} alt={item.name} fill className="object-contain p-2" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-zinc-500">
                        {copy.noImage}
                      </div>
                    )}
                  </div>

                  <div className="w-full flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="font-medium leading-snug">{item.name}</div>
                        <div className="break-all text-xs text-white/60">
                          /products/{item.categorySlug}/{item.slug}
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-sm">
                          <div className="inline-flex items-center rounded-lg border border-white/10 bg-zinc-800/70">
                            <button
                              type="button"
                              className="rounded-l-lg px-2 py-1 text-white/80 hover:bg-white/10"
                              onClick={() => decQty(idx)}
                              aria-label={copy.decQty}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 tabular-nums text-white/90">{item.qty}</span>
                            <button
                              type="button"
                              className="rounded-r-lg px-2 py-1 text-white/80 hover:bg-white/10"
                              onClick={() => incQty(idx)}
                              aria-label={copy.incQty}
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
                            <span>{copy.remove}</span>
                          </button>
                        </div>
                      </div>

                      <div className="min-w-[4rem] text-right text-sm font-medium text-white/90">
                        {typeof item.price === "number" ? (
                          <span>{formatMoney(item.price * item.qty, item.currency || "USD")}</span>
                        ) : (
                          <span className="text-white/50">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between text-sm text-white/80">
              <span>{copy.subtotal}</span>
              <span className="font-semibold text-white">{formatMoney(subtotal, currency)}</span>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="mb-2 text-xl font-semibold">{copy.checkoutTitle}</h2>
            <p className="mb-4 text-sm text-white/60">{copy.checkoutDesc}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />
              <div>
                <label className="mb-1 block text-sm text-white/70">{copy.nameLabel}</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-white/70">{copy.phoneLabel}</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-white/70">{copy.emailLabel}</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.optional}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-white/70">{copy.notesLabel}</label>
                <textarea
                  className="min-h-[80px] w-full rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={copy.notesPlaceholder}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center text-center"
                disabled={status === "sending" || cart.length === 0}
              >
                {status === "sending" ? copy.sending : status === "sent" ? copy.sent : copy.submit}
              </button>

              {status === "error" ? <p className="text-sm text-red-400">{errorMsg}</p> : null}
              {status === "sent" ? <p className="text-sm text-emerald-400">{copy.sentNote}</p> : null}
            </form>

            <div className="mt-6 text-[11px] leading-relaxed text-white/40">{copy.terms}</div>
          </section>
        </div>
      )}
    </main>
  );
}
