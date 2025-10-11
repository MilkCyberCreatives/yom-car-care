import ContactForm from '../components/ContactForm'

export const metadata = {
  title: 'Contact — YOM Car Care',
  description: 'Contact YOM Car Care in Lubumbashi for product enquiries and orders. Cash on Delivery.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage(){
  return (
    <main className="container-px py-10">
      <h1 className="text-3xl font-semibold">Contact</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe
            title="YOM Car Care Location"
            src="https://www.google.com/maps?q=538%20Avenue%20Kipopo,%20Lubumbashi&output=embed"
            width="100%"
            height="380"
            loading="lazy"
          />
        </div>

        {/* Details + Form */}
        <div>
          <ul className="space-y-1 text-white/80">
            <li><strong>Address:</strong> 538 Avenue Kipopo, Golf Malela, Lubumbashi</li>
            <li><strong>Tel:</strong> +243 84 899 4045</li>
            <li><strong>Email:</strong> info@yomcarcare.com</li>
            <li><strong>Languages:</strong> English & French</li>
          </ul>

          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
