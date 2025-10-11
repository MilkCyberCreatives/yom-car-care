import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact • YOM Car Care',
  description: 'Get in touch with YOM Car Care in Lubumbashi.',
}

export default function ContactPage() {
  return (
    <main className="container-px py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Contact us</h1>
      <p className="mt-2 text-white/70">
        We usually reply within the same day. You can also call +243 84 899 4045 or email info@yomcarcare.com.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
          <ContactForm />
        </div>

        <aside className="md:col-span-2 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
          <h2 className="font-semibold">Our location</h2>
          <p className="mt-2 text-white/80">
            538 Avenue Kipopo, Golf Malela, Lubumbashi, DR Congo
          </p>
          <div className="mt-4 space-y-2">
            <a className="btn-ghost w-full justify-center" href="tel:+243848994045">Call: +243 84 899 4045</a>
            <a className="btn-ghost w-full justify-center" href="mailto:info@yomcarcare.com">Email: info@yomcarcare.com</a>
          </div>
        </aside>
      </div>
    </main>
  )
}
