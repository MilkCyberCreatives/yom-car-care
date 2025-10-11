'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type State = 'idle' | 'submitting' | 'error'

export default function ContactForm() {
  const router = useRouter()
  const [state, setState] = useState<State>('idle')
  const [err, setErr] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr('')
    setState('submitting')

    const fd = new FormData(e.currentTarget)
    const name = (fd.get('name') as string || '').trim()
    const email = (fd.get('email') as string || '').trim()
    const phone = (fd.get('phone') as string || '').trim()
    const subject = (fd.get('subject') as string || '').trim()
    const message = (fd.get('message') as string || '').trim()

    // simple validation
    if (!name || !email || !message) {
      setErr('Name, email and message are required.')
      setState('error')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr('Please provide a valid email.')
      setState('error')
      return
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message }),
    })

    if (!res.ok) {
      const t = await res.text()
      setErr(t || 'Something went wrong. Please try again.')
      setState('error')
      return
    }

    router.push('/contact/success')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {err ? <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-200">{err}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Your name *" className="input" required />
        <input name="email" type="email" placeholder="Your email *" className="input" required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input name="phone" placeholder="Phone (optional)" className="input" />
        <input name="subject" placeholder="Subject (optional)" className="input" />
      </div>

      <textarea name="message" placeholder="Your message *" rows={6} className="input" required />

      <button
        type="submit"
        className="btn-primary"
        disabled={state === 'submitting'}
        aria-busy={state === 'submitting'}
      >
        {state === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
