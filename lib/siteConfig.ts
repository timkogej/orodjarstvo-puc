export const siteConfig = {
  name: 'Orodjarstvo Puc d.o.o.',
  shortName: 'Orodjarstvo Puc',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orodjarstvo-puc.si',
  description:
    'Natančna izdelava orodij, CNC rezkanje, struženje in brušenje kovin za industrijske naročnike. 10+ let izkušenj. Loka 14, Logatec.',
  locale: 'sl_SI',
  phone: '+38631252353',
  phoneDisplay: '031 252 353',
  email: 'orodjarstvo.puc@gmail.com',
  address: {
    street: 'Loka 14',
    city: 'Logatec',
    postalCode: '1370',
    country: 'SI',
  },
} as const;
