'use client'

import { ShoppingCart, Plus, MessageCircle } from 'lucide-react'
import type { ProductData } from '@/data/products'
import { useEnquiry } from '@/components/enquiry/EnquiryProvider'
import { useCompare } from '@/components/compare/CompareProvider'
import { waLink } from '@/lib/whatsapp'

export default function AddActions({ p }: { p: ProductData }) {
  const { add: addEnquiry } = useEnquiry()
  const { add: addCompare } = useCompare()

  const msg = `Bonjour! Je suis intéressé par: ${p.name} (${p.category}). Pouvez-vous me donner plus d'infos ?`
  const href = waLink(msg) // defaults to +243 84 899 4045

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        className="btn-primary"
        onClick={() => addEnquiry(p, 1)}
        aria-label="Add to enquiry"
        title="Add to enquiry"
      >
        <ShoppingCart size={16} /> Add to Enquiry
      </button>

      <button
        className="btn-ghost"
        onClick={() => addCompare(p)}
        aria-label="Add to compare"
        title="Add to compare"
      >
        <Plus size={16} /> Compare
      </button>

      <a
        className="btn-ghost"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us about this product"
        title="WhatsApp us about this product"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  )
}
