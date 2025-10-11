export type Dict = {
  common: {
    brand: string
    address_line1: string
    address_line2: string
    address_city: string
    phone_label: string
    email_label: string
    browse_products: string
    call_now: string
    whatsapp_us: string
    cash_on_delivery: string

    // 👇 NEW: used by MainHeader nav
    products: string
    about: string
    contact: string
  }
  hero: {
    /** Fallback (single string) */
    title: string
    /** Split title used by Hero.tsx */
    title_1: string
    title_highlight: string
    title_2: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
    /** Small line under hero for language hint */
    french_hint: string
  }
  footer: {
    address: string
    products: string
    info: string
    faq: string
    contact: string
    legal_area: string
    privacy: string
    cookie: string
    terms: string
  }
  cats: {
    exterior: string
    interior: string
    air: string
    detailing: string
    accessories: string
  }
}
