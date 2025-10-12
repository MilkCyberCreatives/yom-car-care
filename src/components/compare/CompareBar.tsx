'use client'
import { X } from 'lucide-react'
import { useCompare } from './CompareProvider'
import CompareTable from './CompareTable'

export default function CompareBar() {
  const { items, clear, open, setOpen } = useCompare()
  if (items.length === 0) return null

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-zinc-900/90 px-4 py-2 shadow-2xl backdrop-blur">
          <span className="text-sm">{items.length} selected for compare</span>
          <button className="btn-ghost h-8 px-3" onClick={() => setOpen(true)}>Open</button>
          <button className="btn-ghost h-8 px-3" onClick={clear}><X size={16} /></button>
        </div>
      </div>

      {open ? <CompareTable onClose={() => setOpen(false)} /> : null}
    </>
  )
}
