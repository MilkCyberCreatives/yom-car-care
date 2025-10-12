'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ProductData } from '@/data/products'

export type EnquiryItem = ProductData & { qty: number }

type Ctx = {
  items: EnquiryItem[]
  add: (p: ProductData, qty?: number) => void
  remove: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
  count: number
}

const KEY = 'yom-enquiry'
const EnquiryCtx = createContext<Ctx | null>(null)

const noop: Ctx = {
  items: [],
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
  count: 0,
}

export function useEnquiry() {
  return useContext(EnquiryCtx) ?? noop
}

export default function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([])

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])
  // persist
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const api: Ctx = useMemo(() => ({
    items,
    count: items.reduce((n, it) => n + (it.qty || 1), 0),
    add: (p, q = 1) => {
      setItems(prev => {
        const found = prev.find(x => x.slug === p.slug)
        if (found) return prev.map(x => x.slug === p.slug ? { ...x, qty: x.qty + q } : x)
        return [...prev, { ...p, qty: q }]
      })
    },
    remove: (slug) => setItems(prev => prev.filter(x => x.slug !== slug)),
    setQty: (slug, qty) => setItems(prev => prev.map(x => x.slug === slug ? { ...x, qty: Math.max(1, qty) } : x)),
    clear: () => setItems([]),
  }), [items])

  return <EnquiryCtx.Provider value={api}>{children}</EnquiryCtx.Provider>
}
