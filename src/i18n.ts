// src/i18n.ts

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Master dictionaries.
 * Add every string in the app here.
 * Keep keys organized so it's easy.
 */
const en = {
  common: {
    search_placeholder: "Search products...",
    products: "Products",
    about: "About Us",
    contact: "Contact",
    categories: "Categories",
    call_now: "Call Now",
    browse: "Browse",
    cart: "Cart",
    checkout: "Checkout",
    qty: "Qty",
    remove: "Remove",
    subtotal: "Subtotal",
    your_cart: "Your Cart",
    send_request_checkout: "Send Request / Checkout",
    name_label: "Your Name *",
    phone_label: "Phone / WhatsApp *",
    email_label: "Email",
    notes_label: "Notes / Delivery instructions",
    submit_order: "Submit Order Request",
    sending: "Sending...",
    sent: "Sent!",
    delivery_disclaimer:
      "We’ll receive your order with your contact details and reach out to confirm payment & delivery.",
    legal_checkout_notice:
      "By submitting you agree to be contacted by YOM Car Care to confirm stock, pricing, and delivery options.",
    cart_empty: "Your cart is empty.",
    cart_subtitle:
      "Review your selection. You can update quantities, remove items, and then send us your order request. We’ll confirm availability & delivery with you directly.",
    address_line1: "538 Avenue Kipopo",
    address_line2: "Golf Malela",
    address_city: "Lubumbashi",
  },
  cats: {
    exterior: "Exterior",
    interior: "Interior",
    detailing: "Detailing",
    accessories: "Accessories",
    air: "Air Fresheners",
  },
  home: {
    our_picks: "Our picks",
    featured_products: "Featured Products",
    view_all: "View All",
    best_sellers: "Best sellers: to try now!",
    most_purchased: "Most Purchased",
  },
  product: {
    add_to_cart: "Add to cart",
    category_badge: "Category",
    price_missing: "—",
    details_heading: "Product Details",
    recommend_heading: "You may also like",
  },
  contact: {
    hero_title: "We’re here to help",
    hero_tagline:
      "Need a recommendation for exterior, interior or detailing? Message us and we’ll point you to the right product.",
    contact_details: "Contact Details",
    phone: "Phone",
    email: "Email",
    address: "Address",
    open_in_maps: "Open in Maps",
    whatsapp_us: "WhatsApp",
    business_hours: "Business Hours",
    send_message: "Send us a message",
    send_success: "Thanks. We'll get back to you.",
    send_error: "Failed to send message.",
    form_topic_label: "Topic (optional)",
    form_message_label: "How can we help?",
    form_submit: "Send Message",
  },
};

const fr = {
  common: {
    search_placeholder: "Rechercher des produits…",
    products: "Produits",
    about: "À propos",
    contact: "Contact",
    categories: "Catégories",
    call_now: "Appeler",
    browse: "Parcourir",
    cart: "Panier",
    checkout: "Validation",
    qty: "Qté",
    remove: "Supprimer",
    subtotal: "Sous-total",
    your_cart: "Votre Panier",
    send_request_checkout: "Envoyer la demande / Commander",
    name_label: "Votre nom *",
    phone_label: "Téléphone / WhatsApp *",
    email_label: "E-mail",
    notes_label: "Notes / Instructions de livraison",
    submit_order: "Envoyer la demande",
    sending: "Envoi…",
    sent: "Envoyé !",
    delivery_disclaimer:
      "Nous recevons votre commande avec vos coordonnées et nous vous contacterons pour confirmer le paiement et la livraison.",
    legal_checkout_notice:
      "En soumettant vous acceptez d’être contacté par YOM Car Care pour confirmer le stock, les prix et les options de livraison.",
    cart_empty: "Votre panier est vide.",
    cart_subtitle:
      "Vérifiez votre sélection. Vous pouvez modifier les quantités, supprimer des articles, puis envoyer votre demande. Nous confirmerons la disponibilité et la livraison avec vous.",
    address_line1: "538 Avenue Kipopo",
    address_line2: "Golf Malela",
    address_city: "Lubumbashi",
  },
  cats: {
    exterior: "Extérieur",
    interior: "Intérieur",
    detailing: "Détailling",
    accessories: "Accessoires",
    air: "Désodorisants",
  },
  home: {
    our_picks: "Nos sélections",
    featured_products: "Produits phares",
    view_all: "Tout voir",
    best_sellers: "Meilleures ventes à essayer !",
    most_purchased: "Les plus achetés",
  },
  product: {
    add_to_cart: "Ajouter au panier",
    category_badge: "Catégorie",
    price_missing: "—",
    details_heading: "Détails du produit",
    recommend_heading: "Vous pourriez aussi aimer",
  },
  contact: {
    hero_title: "Nous sommes là pour vous aider",
    hero_tagline:
      "Besoin d’une recommandation pour l’extérieur, l’intérieur ou le detailing ? Écrivez-nous et nous vous orienterons vers le bon produit.",
    contact_details: "Détails de contact",
    phone: "Téléphone",
    email: "E-mail",
    address: "Adresse",
    open_in_maps: "Ouvrir dans Maps",
    whatsapp_us: "WhatsApp",
    business_hours: "Heures d’ouverture",
    send_message: "Envoyez-nous un message",
    send_success: "Merci. Nous reviendrons vers vous.",
    send_error: "Échec de l’envoi.",
    form_topic_label: "Sujet (optionnel)",
    form_message_label: "Comment pouvons-nous vous aider ?",
    form_submit: "Envoyer",
  },
};

// dictionary lookup
const DICTS: Record<Locale, typeof en> = {
  en,
  fr,
};

export function getDictionary(locale: string) {
  if (locale === "fr") return DICTS.fr;
  return DICTS.en;
}
