'use client'

import { event } from '../../lib/gtag'

export default function FloatingWhatsApp() {
  const waText = encodeURIComponent(
    "Hello YOM Car Care, I'd like to place an order or ask a question."
  )

  const onClick = () => {
    event('whatsapp_click', { location: 'floating_button' })
  }

  return (
    <a
      href={`https://wa.me/243848994045?text=${waText}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center justify-center rounded-full shadow-lg
                 bg-green-500 hover:bg-green-600 text-white h-14 w-14"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M19.11 17.44c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.9 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.9 4.33.69.3 1.23.48 1.65.62.69.22 1.31.19 1.8.12.55-.08 1.65-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 3C8.83 3 3 8.82 3 16c0 2.3.62 4.46 1.7 6.32L3 29l6.82-1.79C11.62 28.39 13.74 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.64c-2.17 0-4.18-.7-5.82-1.89l-.42-.3-4.06 1.07 1.09-3.96-.33-.41A10.61 10.61 0 0 1 5.39 16c0-5.85 4.76-10.61 10.61-10.61S26.61 10.15 26.61 16 21.85 26.64 16 26.64z" />
      </svg>
    </a>
  )
}
