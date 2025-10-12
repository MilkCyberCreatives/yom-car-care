'use client'
import { useState } from 'react'
import { MapPin, Shield } from 'lucide-react'

type Props = {
  title?: string
  query?: string // e.g. '538 Avenue Kipopo, Lubumbashi'
  height?: number
}

/**
 * Privacy-friendly “click to load” Google Maps <iframe>.
 * No third-party requests until the user consents.
 */
export default function MapConsent({
  title = 'YOM Car Care',
  query = '538 Avenue Kipopo, Golf Malela, Lubumbashi',
  height = 360,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  const q = encodeURIComponent(query)
  const embedSrc = `https://www.google.com/maps?q=${q}&output=embed`

  return (
    <div className="card overflow-hidden">
      {!loaded ? (
        <div
          className="relative grid place-items-center p-6"
          style={{ height }}
        >
          {/* Placeholder surface (use /public/map-placeholder.jpg if you have it) */}
          <div className="absolute inset-0 bg-[url('/map-placeholder.jpg')] bg-cover bg-center opacity-40" />
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/40">
              <MapPin />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-white/70">{query}</p>
            <button className="btn-primary mt-4" onClick={() => setLoaded(true)}>
              Load Map
            </button>
            <p className="mt-2 flex items-center justify-center gap-2 text-xs text-white/60">
              <Shield size={14} /> We only load Google Maps after you click.
            </p>
          </div>
        </div>
      ) : (
        <iframe
          title={`${title} map`}
          src={embedSrc}
          width="100%"
          height={height}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      )}
    </div>
  )
}
