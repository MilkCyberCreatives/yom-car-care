'use client'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useCompare } from './CompareProvider'

export default function CompareTable({ onClose }: { onClose: () => void }) {
  const { items, remove, clear } = useCompare()
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-950 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Compare products</h3>
          <div className="flex items-center gap-2">
            <button className="btn-ghost h-8 px-3" onClick={clear}>Clear</button>
            <button className="btn-ghost h-8 px-3" onClick={onClose}><X size={16} /></button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-white/70">
              <tr>
                <th className="w-40 p-2">Product</th>
                {items.map(p => (
                  <th key={p.slug} className="p-2 align-bottom">
                    <div className="flex items-center gap-2">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
                        {p.img ? <Image src={p.img} alt={p.name} fill className="object-cover" /> : null}
                      </div>
                      <div>
                        <div className="font-medium leading-tight">{p.name}</div>
                        <button className="text-xs text-white/60 hover:underline" onClick={() => remove(p.slug)}>Remove</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="p-2 text-white/70">Category</td>
                {items.map(p => <td key={p.slug} className="p-2 capitalize">{p.category.replace('-', ' ')}</td>)}
              </tr>
              <tr>
                <td className="p-2 text-white/70">Size</td>
                {items.map(p => <td key={p.slug} className="p-2">{p.size || '-'}</td>)}
              </tr>
              <tr>
                <td className="p-2 text-white/70">Price</td>
                {items.map(p => <td key={p.slug} className="p-2">{p.price != null ? `${p.currency || 'USD'} ${p.price.toFixed(2)}` : '-'}</td>)}
              </tr>
              <tr>
                <td className="p-2 text-white/70">Tags</td>
                {items.map(p => <td key={p.slug} className="p-2">{p.badges?.join(', ') || '-'}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right">
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
