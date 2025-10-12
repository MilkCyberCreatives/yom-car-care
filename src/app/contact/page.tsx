import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import MapConsent from '@/components/MapConsent'
import { waLink } from '@/lib/whatsapp'

export const metadata = {
  title: 'Contact • YOM Car Care',
  description:
    'Get in touch with YOM Car Care in Lubumbashi. Call, email, or WhatsApp us. Cash on Delivery available.',
  alternates: { canonical: '/contact' },
}

const ADDRESS_LINES = [
  '538 Avenue Kipopo',
  'Golf Malela',
  'Lubumbashi, RD Congo',
]

const PHONE = '+243 84 899 4045'
const PHONE_E164 = '243848994045'
const EMAIL = 'info@yomcarcare.com'

export default function ContactPage() {
  const whatsappHref = waLink(
    "Bonjour! J'ai une question à propos de vos produits et de la livraison Cash on Delivery."
  , PHONE_E164)

  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-white/70">
        We’re here to help in English or French. Reach out by call, email or WhatsApp.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
        {/* Contact details */}
        <section className="card p-5">
          <h2 className="text-lg font-semibold">YOM Car Care</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><MapPin /></div>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-white/80">
                  {ADDRESS_LINES.map((l) => <div key={l}>{l}</div>)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5"><Phone /></div>
              <div>
                <div className="font-medium">Call</div>
                <Link href={`tel:${PHONE.replace(/\s+/g, '')}`} className="text-white underline">
                  {PHONE}
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5"><Mail /></div>
              <div>
                <div className="font-medium">Email</div>
                <Link href={`mailto:${EMAIL}`} className="text-white underline">
                  {EMAIL}
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5"><MessageCircle /></div>
              <div>
                <div className="font-medium">WhatsApp</div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/enquiry" className="btn-primary">Cash-on-Delivery Enquiry</Link>
          </div>
        </section>

        {/* Map (privacy-friendly) */}
        <section>
          <MapConsent
            title="YOM Car Care"
            query="538 Avenue Kipopo, Golf Malela, Lubumbashi"
            height={420}
          />
        </section>
      </div>
    </main>
  )
}
