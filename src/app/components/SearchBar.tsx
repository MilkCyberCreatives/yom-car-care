'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ className = '' }: { className?: string }) {
  const router = useRouter()
  const [q, setQ] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search products"
        placeholder="Search products…"
        className="w-full md:w-80 rounded-xl bg-white/15 text-white placeholder:text-white/70
                   border border-white/20 focus:border-white/40 outline-none py-2.5 pl-10 pr-3"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 text-white"
      >
        <Search size={18} />
      </button>
    </form>
  )
}
