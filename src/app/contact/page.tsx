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

        {/* Details + Quick form */}
        <div>
          <ul className="space-y-1 text-white/80">
            <li><strong>Address:</strong> 538 Avenue Kipopo, Golf Malela, Lubumbashi</li>
            <li><strong>Tel:</strong> +243 84 899 4045</li>
            <li><strong>Email:</strong> info@yomcarcare.com</li>
          </ul>

          <form className="mt-6 space-y-3" action="mailto:info@yomcarcare.com" method="post" encType="text/plain">
            <input required name="name" placeholder="Your name" className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none" />
            <input required name="email" type="email" placeholder="Your email" className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none" />
            <textarea required name="message" placeholder="Your message" rows={5} className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none" />
            <button className="btn-primary" type="submit">Send</button>
          </form>

          <p className="text-xs text-white/50 mt-2">
            Tip: You can also reach us on WhatsApp: +243 84 899 4045
          </p>
        </div>
      </div>
    </main>
  )
}
