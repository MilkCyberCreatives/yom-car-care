'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, Loader2 } from 'lucide-react'
import { useEnquiry } from '@/components/enquiry/EnquiryProvider'

export default function EnquiryPage() {
  const { items, setQty, remove, clear } = useEnquiry()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit() {
    setBusy(true); setError(null)
    try {
      const html = `
        <h2>New Cash-on-Delivery Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Notes:</strong> ${escapeHtml(notes)}</p>
        <h3>Items</h3>
        <ul>
          ${items.map(i => `<li>${i.qty} × ${i.name} (${i.category})</li>`).join('')}
        </ul>
      `
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, subject: 'Cash-on-Delivery Enquiry', html
        })
      })
      if (!res.ok) throw new Error('Failed to send')
      setDone(true)
      clear()
    } catch (e: any) {
      setError(e.message || 'Failed to send')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <main className="container-px py-10">
        <h1 className="text-2xl md:text-3xl font-semibold">Enquiry sent</h1>
        <p className="mt-4 text-white/80">
          Thank you. We will contact you on <strong>{phone || email}</strong> to confirm Cash on Delivery.
        </p>
        <Link href="/products" className="btn-primary mt-6 inline-block">Back to products</Link>
      </main>
    )
  }

  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Your Enquiry</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_380px]">
        {/* Items */}
        <section className="rounded-xl border border-white/10 bg-zinc-900/40 p-4">
          {items.length === 0 ? (
            <p className="text-white/70">
              No items yet. <Link href="/products" className="text-white underline">Browse products</Link>
            </p>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map(i => (
                <li key={i.slug} className="flex items-center gap-3 py-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
                    {i.img ? <Image src={i.img} alt={i.name} fill className="object-cover" /> : null}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium leading-tight">{i.name}</div>
                    <div className="text-sm text-white/60 capitalize">{i.category.replace('-', ' ')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost h-8 w-8 p-0" onClick={() => setQty(i.slug, Math.max(1, (i.qty || 1) - 1))}><Minus size={16} /></button>
                    <div className="w-8 text-center">{i.qty}</div>
                    <button className="btn-ghost h-8 w-8 p-0" onClick={() => setQty(i.slug, (i.qty || 1) + 1)}><Plus size={16} /></button>
                  </div>
                  <button className="btn-ghost h-8 w-8 p-0" onClick={() => remove(i.slug)}><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Form */}
        <section className="rounded-xl border border-white/10 bg-zinc-900/40 p-4">
          <h2 className="font-semibold">Contact details</h2>
          <div className="mt-3 grid gap-3">
            <input className="input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            <input className="input" placeholder="Phone (WhatsApp)" value={phone} onChange={e => setPhone(e.target.value)} />
            <input className="input" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
            <textarea className="input min-h-28" placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

          <button
            className="btn-primary mt-4 inline-flex items-center gap-2 disabled:opacity-60"
            disabled={busy || items.length === 0 || (!phone && !email) || !name}
            onClick={submit}
          >
            {busy ? <Loader2 className="animate-spin" size={16} /> : null}
            Send enquiry
          </button>

          <p className="mt-3 text-xs text-white/60">
            We never charge online. Payment is **Cash on Delivery** in Lubumbashi.
          </p>
        </section>
      </div>
    </main>
  )
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m] as string))
}
