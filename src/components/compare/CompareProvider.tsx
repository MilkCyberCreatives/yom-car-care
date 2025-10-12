'use client'
import { createContext, useContext, useMemo, useState } from 'react'
import type { ProductData } from '@/data/products'

type Ctx = {
  items: ProductData[]
  add: (p: ProductData) => void
  remove: (slug: string) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const CompareCtx = createContext<Ctx | null>(null)

/** Safe no-op fallback so the app never crashes if someone uses the hook outside the provider */
const noopCtx: Ctx = {
  items: [],
  add: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useCompare.add() called outside <CompareProvider>. Wrap your tree with the provider.')
    }
  },
  remove: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useCompare.remove() called outside <CompareProvider>. Wrap your tree with the provider.')
    }
  },
  clear: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useCompare.clear() called outside <CompareProvider>. Wrap your tree with the provider.')
    }
  },
  open: false,
  setOpen: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useCompare.setOpen() called outside <CompareProvider>. Wrap your tree with the provider.')
    }
  },
}

export function useCompare() {
  const v = useContext(CompareCtx)
  return v ?? noopCtx
}

export default function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductData[]>([])
  const [open, setOpen] = useState(false)

  const api: Ctx = useMemo(
    () => ({
      items,
      open,
      setOpen,
      add: p => {
        setItems(prev => {
          if (prev.find(x => x.slug === p.slug)) return prev
          const next = [...prev, p].slice(-3) // keep last 3
          return next
        })
        setOpen(true)
      },
      remove: slug => setItems(prev => prev.filter(x => x.slug !== slug)),
      clear: () => setItems([]),
    }),
    [items, open]
  )

  return <CompareCtx.Provider value={api}>{children}</CompareCtx.Provider>
}
