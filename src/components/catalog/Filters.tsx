'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { unique } from '@/lib/catalog'
import type { ProductData } from '@/data/products'

type Props = {
  products: ProductData[]
  currentCategory?: string | null
}

export default function Filters({ products, currentCategory = null }: Props) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const categories = useMemo(
    () => unique(products.map(p => p.category)),
    [products]
  )
  const sizes = useMemo(() => unique(products.map(p => p.size || '').filter(Boolean)), [products])
  const tags = useMemo(() => unique(products.flatMap(p => p.badges || [])), [products])

  function setParam(key: string, value: string | null) {
    const p = new URLSearchParams(params.toString())
    if (value && value.length) p.set(key, value)
    else p.delete(key)
    // whenever filters change, reset page=1
    p.delete('page')
    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
  }

  function get(key: string, fallback = '') {
    return params.get(key) || fallback
  }

  return (
    <aside className="rounded-xl border border-white/10 bg-zinc-900/40 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <button
          className="text-sm text-white/70 hover:text-white"
          onClick={() => router.replace(pathname, { scroll: false })}
        >
          Reset
        </button>
      </div>

      {/* Category */}
      {!currentCategory ? (
        <div className="mt-4">
          <label className="text-sm text-white/70">Category</label>
          <select
            className="input mt-1"
            value={get('cat')}
            onChange={(e) => setParam('cat', e.target.value || null)}
          >
            <option value="">All</option>
            {categories.map(c => (
              <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
            ))}
          </select>
        </div>
      ) : null}

      {/* Size */}
      <div className="mt-4">
        <label className="text-sm text-white/70">Size</label>
        <select
          className="input mt-1"
          value={get('size')}
          onChange={(e) => setParam('size', e.target.value || null)}
        >
          <option value="">Any</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Tag */}
      <div className="mt-4">
        <label className="text-sm text-white/70">Tag</label>
        <select
          className="input mt-1"
          value={get('tag')}
          onChange={(e) => setParam('tag', e.target.value || null)}
        >
          <option value="">Any</option>
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Price */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-white/70">Min price</label>
          <input
            type="number"
            min={0}
            className="input mt-1"
            placeholder="0"
            defaultValue={get('min')}
            onBlur={(e) => setParam('min', e.target.value || null)}
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Max price</label>
          <input
            type="number"
            min={0}
            className="input mt-1"
            placeholder="100"
            defaultValue={get('max')}
            onBlur={(e) => setParam('max', e.target.value || null)}
          />
        </div>
      </div>
    </aside>
  )
}
