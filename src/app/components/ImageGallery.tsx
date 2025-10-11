'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0)
  const safe = images.length ? images : ['']
  const current = safe[Math.min(idx, safe.length - 1)] || ''

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
        {current ? (
          <Image
            src={current}
            alt={alt}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white/50">Image coming soon</div>
        )}
      </div>

      {/* Thumbnails */}
      {safe.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {safe.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border transition
                ${i === idx ? 'border-[var(--brand-blue)]' : 'border-white/10 hover:border-white/20'}`}
              aria-label={`Product image ${i + 1}`}
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
