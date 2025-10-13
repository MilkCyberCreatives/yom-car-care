// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'YOM Car Care',
  description: 'Premium car care products.',
  openGraph: {
    type: 'website', // ✅ valid; do NOT use "product"
    title: 'YOM Car Care',
    description: 'Premium car care products.',
    url: 'https://your-domain.com',
  },
};

export default function RootLayout({
  params,
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
