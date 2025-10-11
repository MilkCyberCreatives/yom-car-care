'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type QA = { q: string; a: string }

const faqs: QA[] = [
  {
    q: 'Do you accept online payments?',
    a: 'No. We only accept Cash on Delivery in Lubumbashi. You can place an order by phone or WhatsApp.',
  },
  {
    q: 'How fast is delivery in Lubumbashi?',
    a: 'Usually same-day or next-day depending on stock and location. We will confirm the delivery window after you place the order.',
  },
  {
    q: 'Are the products original?',
    a: 'Yes. We supply quality brands for exterior, interior, detailing, accessories and air fresheners.',
  },
  {
    q: 'How do I place an order?',
    a: 'Open a product and tap “WhatsApp Enquiry” or call +243 84 899 4045. We will confirm availability and delivery.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="container-px py-12">
      <h2 className="text-2xl md:text-3xl font-semibold">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = open === idx
          return (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-white/80 text-sm">{item.a}</div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
