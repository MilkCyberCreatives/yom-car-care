'use client';

import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react';

export type CartItem = {
  slug: string;
  title: string;
  price: number;
  image: string; // public path e.g. /products/xxx.jpg
  category?: string;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  items: CartItem[];
};

type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'ADD'; payload: Omit<CartItem, 'quantity'>; quantity?: number }
  | { type: 'REMOVE'; slug: string }
  | { type: 'SET_QTY'; slug: string; quantity: number }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: CartState;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD': {
      const qty = Math.max(1, action.quantity ?? 1);
      const idx = state.items.findIndex(i => i.slug === action.payload.slug);
      let items = [...state.items];
      if (idx >= 0) {
        items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
      } else {
        items.push({ ...action.payload, quantity: qty });
      }
      return { ...state, items };
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter(i => i.slug !== action.slug) };
    }
    case 'SET_QTY': {
      const items = state.items.map(i =>
        i.slug === action.slug ? { ...i, quantity: Math.max(1, action.quantity) } : i
      );
      return { ...state, items };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = 'yom_cart_v1';

function loadInitialState(): CartState {
  if (typeof window === 'undefined') return { isOpen: false, items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isOpen: false, items: [] };
    const parsed = JSON.parse(raw);
    return { isOpen: false, items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { isOpen: false, items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined as any, loadInitialState);

  // persist
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    }
  }, [state.items]);

  const open = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), []);
  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), []);
  const add = useCallback((item: Omit<CartItem, 'quantity'>, quantity?: number) => {
    dispatch({ type: 'ADD', payload: item, quantity });
  }, []);
  const remove = useCallback((slug: string) => dispatch({ type: 'REMOVE', slug }), []);
  const setQty = useCallback((slug: string, quantity: number) => {
    dispatch({ type: 'SET_QTY', slug, quantity });
  }, []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );
  const count = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({ state, open, close, toggle, add, remove, setQty, clear, subtotal, count }),
    [state, open, close, toggle, add, remove, setQty, clear, subtotal, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
