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

    products: string
    about: string
    contact: string
    categories: string
    browse: string              // ⬅️ added short label
  }
  hero: {
    title: string
    title_1: string
    title_highlight: string
    title_2: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
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
