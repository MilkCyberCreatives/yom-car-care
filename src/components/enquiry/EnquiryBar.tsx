'use client'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { useEnquiry } from './EnquiryProvider'

export default function EnquiryBar() {
  const { count } = useEnquiry()
  if (count === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Link
        href="/enquiry"
        className="relative flex items-center gap-2 rounded-2xl border border-white/15 bg-[var(--brand-blue)] px-4 py-2 font-medium shadow-2xl hover:brightness-110"
      >
        <MessageSquare size={18} />
        Enquiry ({count})
      </Link>
    </div>
  )
}
