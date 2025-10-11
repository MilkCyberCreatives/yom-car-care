const en = {
  common: {
    brand: 'YOM Car Care',
    address_line1: '538 Avenue Kipopo',
    address_line2: 'Golf Malela',
    address_city: 'Lubumbashi',
    phone_label: 'Call',
    email: 'info@yomcarcare.com',
    call_now: 'Call Now',
    browse: 'Browse',
    browse_products: 'Browse Products',
    categories: 'Categories',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    cash_on_delivery: 'Cash on Delivery',
  },
  hero: {
    title_1: 'Car care products for a ',
    title_highlight: 'showroom shine',
    title_2: ' in Lubumbashi, DRC',
    subtitle: 'Exterior, interior, detailing, accessories & air fresheners. Fast delivery across Lubumbashi with Cash on Delivery.',
    french_hint: 'French translation available • EN | FR'
  },
  footer: {
    address: 'Address',
    info: 'Info',
    faq: 'FAQ',
    legal: 'Legal Area',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
    terms: 'General Terms of Use',
    copyright_suffix: '— Lubumbashi, DRC'
  },
  cats: {
    exterior: 'Exterior',
    interior: 'Interior',
    air: 'Air Fresheners',
    detailing: 'Detailing',
    accessories: 'Accessories'
  }
} as const

export default en
export type Dict = typeof en
