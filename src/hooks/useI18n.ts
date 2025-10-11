'use client'

import { usePathname } from 'next/navigation'
import en from '@/i18n/en'
import fr from '@/i18n/fr'

type Dict = typeof en

export function useI18n(): { t: Dict; locale: 'en' | 'fr' } {
  const pathname = usePathname() || '/'
  const locale: 'en' | 'fr' = pathname.startsWith('/fr') ? 'fr' : 'en'
  const dict = locale === 'fr' ? (fr as Dict) : en
  return { t: dict, locale }
}
