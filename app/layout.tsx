import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/siteConfig';
import { CookieBanner } from './components/CookieBanner';

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Orodjarstvo Puc d.o.o. — CNC obdelava in orodjarstvo | Logatec',
    template: '%s | Orodjarstvo Puc d.o.o.',
  },
  description: siteConfig.description,
  keywords: [
    'CNC obdelava', 'orodjarstvo', 'CNC rezkanje', 'CNC struženje',
    'brušenje kovin', 'izdelava po načrtih', 'orodjarstvo Logatec',
    'kovinski deli', 'hitro prototipiranje', 'CNC Logatec', 'orodjar Slovenija',
  ],
  authors: [{ name: 'Orodjarstvo Puc d.o.o.' }],
  creator: 'Orodjarstvo Puc d.o.o.',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: 'website',
    locale: 'sl_SI',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Orodjarstvo Puc d.o.o. — Natančna CNC obdelava in orodjarstvo',
    description:
      'Izdelujemo orodja, kovinske dele in tehnično zahtevne komponente. CNC rezkanje, struženje, brušenje. 10+ let izkušenj v Logatcu.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Orodjarstvo Puc d.o.o. — CNC obdelava kovin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orodjarstvo Puc d.o.o. — Natančna CNC obdelava',
    description:
      'Izdelujemo orodja in kovinske dele za industrijske naročnike. 10+ let izkušenj.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': siteConfig.url,
              name: 'Orodjarstvo Puc d.o.o.',
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Loka 14',
                addressLocality: 'Logatec',
                postalCode: '1370',
                addressCountry: 'SI',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.9145,
                longitude: 14.2258,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '15:00',
                },
              ],
              priceRange: '€€',
              areaServed: { '@type': 'Country', name: 'Slovenija' },
              makesOffer: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC Rezkanje' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC Struženje' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brušenje' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Orodjarstvo' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Izdelava po načrtih' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hitro prototipiranje' } },
              ],
            }),
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
