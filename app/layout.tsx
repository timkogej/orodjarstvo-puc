import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Orodjarstvo Puc d.o.o. — CNC obdelava in orodjarstvo | Logatec',
  description: 'Natančna izdelava orodij, CNC rezkanje, struženje in brušenje kovin za industrijske naročnike. 10+ let izkušenj. Loka 14, Logatec. Pokličite 031 252 353.',
  keywords: ['CNC obdelava', 'orodjarstvo', 'CNC rezkanje', 'CNC struženje', 'brušenje', 'izdelava po načrtih', 'Logatec', 'Slovenija', 'kovinski deli', 'hitro prototipiranje'],
  authors: [{ name: 'Orodjarstvo Puc d.o.o.' }],
  openGraph: {
    title: 'Orodjarstvo Puc d.o.o. — Natančna CNC obdelava',
    description: 'Izdelujemo orodja, kovinske dele in tehnično zahtevne komponente. CNC obdelava z natančnostjo do ±0,01 mm.',
    locale: 'sl_SI',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
