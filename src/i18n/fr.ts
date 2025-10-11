const fr = {
  common: {
    brand: 'YOM Car Care',
    address_line1: '538 Avenue Kipopo',
    address_line2: 'Golf Malela',
    address_city: 'Lubumbashi',
    phone_label: 'Appeler',
    email: 'info@yomcarcare.com',
    call_now: 'Appeler maintenant',
    browse: 'Parcourir',
    browse_products: 'Parcourir les produits',
    categories: 'Catégories',
    products: 'Produits',
    about: 'À propos',
    contact: 'Contact',
    cash_on_delivery: 'Paiement à la livraison',
  },
  hero: {
    title_1: 'Des produits d’entretien auto pour une ',
    title_highlight: 'brillance de showroom',
    title_2: ' à Lubumbashi, RDC',
    subtitle: 'Extérieur, intérieur, detailing, accessoires & désodorisants. Livraison rapide à Lubumbashi avec paiement à la livraison.',
    french_hint: 'Traduction française disponible • EN | FR'
  },
  footer: {
    address: 'Adresse',
    info: 'Infos',
    faq: 'FAQ',
    legal: 'Espace légal',
    privacy: 'Politique de confidentialité',
    cookie: 'Politique de cookies',
    terms: "Conditions générales d'utilisation",
    copyright_suffix: '— Lubumbashi, RDC'
  },
  cats: {
    exterior: 'Extérieur',
    interior: 'Intérieur',
    air: 'Désodorisants',
    detailing: 'Detailing',
    accessories: 'Accessoires'
  }
} as const

export default fr
export type DictFr = typeof fr
