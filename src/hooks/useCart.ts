"use client";

import { create } from "zustand";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  img: string;
  href: string;
  qty: number;
};

type CartState = {
  items: CartLine[];

  addItem: (item: Omit<CartLine, "qty">) => void;
  removeItem: (slug: string) => void;
  inc: (slug: string) => void;
  dec: (slug: string) => void;
  clear: () => void;

  // computed values
  totalCount: number;
  totalPrice: number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.slug === item.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === item.slug ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { ...item, qty: 1 },
        ],
      };
    }),

  removeItem: (slug) =>
    set((state) => ({
      items: state.items.filter((i) => i.slug !== slug),
    })),

  inc: (slug) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.slug === slug ? { ...i, qty: i.qty + 1 } : i
      ),
    })),

  dec: (slug) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.slug === slug ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        )
        // optional: if qty somehow hits 0 we drop it
        .filter((i) => i.qty > 0),
    })),

  clear: () => set({ items: [] }),

  // --- computed getters (live each read) ---
  get totalCount() {
    return get().items.reduce((sum, i) => sum + i.qty, 0);
  },

  get totalPrice() {
    return get().items.reduce((sum, i) => sum + i.qty * i.price, 0);
  },
}));
