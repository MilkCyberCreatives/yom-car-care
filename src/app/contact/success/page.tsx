export const metadata = {
  title: 'Message sent • YOM Car Care',
}

export default function ContactSuccess() {
  return (
    <main className="container-px py-16 text-center">
      <h1 className="text-3xl font-semibold">Thank you!</h1>
      <p className="mt-3 text-white/70">
        Your message has been sent. Our team will get back to you shortly.
      </p>
      <a className="btn-primary inline-block mt-6" href="/">
        Back to Home
      </a>
    </main>
  )
}
