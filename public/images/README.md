# Fotografije za spletno stran — Orodjarstvo Puc

Dodajte naslednje fotografije v ta imenik:

| Ime datoteke              | Sekcija        | Priporočene dimenzije | Opis                          |
|---------------------------|----------------|-----------------------|-------------------------------|
| `hero-1.jpg`              | Hero (pos. #1) | 800×1000              | CNC obdelava — close up       |
| `hero-2.jpg`              | Hero (pos. #2) | 800×800               | Detalj kovinskega dela        |
| `hero-3.jpg`              | Hero (pos. #3) | 800×800               | Stroj v delovanju             |
| `hero-4.jpg`              | Hero (pos. #4) | 800×1000              | Operater pri stroju           |
| `about-workshop.jpg`      | O podjetju     | 800×1000              | Širok pogled delavnice        |
| `capabilities.jpg`        | Zmogljivosti   | 1200×720              | Detalj procesa / kontrole     |

## Navodila

- Priporočen format: JPG ali WebP (Next.js samodejno konvertira v AVIF/WebP)
- Fotografije ne smejo biti premajhne (ostrnost je ključna za industrijsko estetiko)
- Ko dodate fotografije, jih ni treba drugje registrirati — komponente jih naložijo samodejno
- Dokler fotografij ni, se prikazuje sivkast placeholder z oznako

## Zamenjava placeholderjev

Zamenjajte `PlaceholderImage` z `<Image>` komponentami v naslednjih datotekah:
- `app/components/Hero.tsx` — hero-1.jpg do hero-4.jpg
- `app/components/About.tsx` — about-workshop.jpg
- `app/components/Capabilities.tsx` — capabilities.jpg
