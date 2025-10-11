'use client'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export function gtag(...args: any[]) {
  if (typeof window === 'undefined' || !GA_ID) return
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments as any) }
  window.gtag(...args)
}

export function setConsent(granted: boolean) {
  if (!GA_ID) return
  gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  })
}

export function pageview(url: string) {
  if (!GA_ID) return
  gtag('config', GA_ID, { page_path: url, anonymize_ip: true })
}

export function event(name: string, params: Record<string, any> = {}) {
  if (!GA_ID) return
  gtag('event', name, params)
}
