'use client'

import { usePathname } from 'next/navigation'
import type { Dict } from '@/i18n/types'
import { en } from '@/i18n/en'
import { fr } from '@/i18n/fr'

export function useI18n(): { t: Dict; locale: 'en' | 'fr' } {
  const pathname = usePathname() || '/'
  const locale: 'en' | 'fr' = pathname.startsWith('/fr') ? 'fr' : 'en'
  const dict: Dict = locale === 'fr' ? fr : en
  return { t: dict, locale }
}
