import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Politika zasebnosti',
  description: 'Politika zasebnosti in varstvo osebnih podatkov za spletno stran Orodjarstvo Puc d.o.o.',
  robots: { index: true, follow: true },
};

export default function ZasebnostPage() {
  const updated = '10. 6. 2026';

  return (
    <main
      style={{
        background: '#F4F1EC',
        minHeight: '100vh',
        fontFamily: 'var(--font-inter, system-ui, sans-serif)',
      }}
    >
      {/* Header */}
      <div style={{ background: '#0B0F14', padding: '80px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 20,
          }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#2E6BFF' }} />
            <span style={{
              fontFamily: 'monospace', fontSize: 11,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}>
              Pravni dokumenti
            </span>
          </div>
          <h1 style={{
            color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800, letterSpacing: '-0.035em',
            lineHeight: 1, margin: '0 0 16px',
          }}>
            Politika zasebnosti
          </h1>
          <p style={{ color: '#8A94A3', fontSize: 13, fontFamily: 'monospace', margin: 0 }}>
            Zadnja posodobitev: {updated}
          </p>
        </div>
      </div>

      {/* Back link */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 24px 0' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: '#2E6BFF', textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          ← Nazaj na glavno stran
        </a>
      </div>

      {/* Content */}
      <article style={{
        maxWidth: 760, margin: '0 auto',
        padding: '40px 24px 80px',
        color: '#0B0F14',
      }}>
        <style>{`
          .pz-section { margin-bottom: 48px; }
          .pz-h2 {
            font-size: 1.15rem; font-weight: 700;
            letter-spacing: -0.02em; margin: 0 0 16px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(11,15,20,0.12);
            color: #0B0F14;
          }
          .pz-eyebrow {
            font-family: monospace; font-size: 10px;
            letter-spacing: 0.22em; text-transform: uppercase;
            color: #2E6BFF; display: block; margin-bottom: 6px;
          }
          .pz-p { font-size: 15px; line-height: 1.75; color: #3B4552; margin: 0 0 14px; }
          .pz-ul { padding-left: 20px; margin: 0 0 14px; }
          .pz-ul li { font-size: 15px; line-height: 1.75; color: #3B4552; margin-bottom: 6px; }
          .pz-contact {
            background: #fff; border: 1px solid rgba(11,15,20,0.1);
            border-left: 3px solid #2E6BFF;
            padding: 20px 24px; border-radius: 0 2px 2px 0; margin-top: 16px;
          }
          .pz-contact p { margin: 4px 0; font-size: 14px; color: #3B4552; }
          .pz-contact strong { color: #0B0F14; }
          .pz-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
          .pz-table th {
            text-align: left; padding: 10px 14px;
            background: #0B0F14; color: #fff;
            font-size: 10px; letter-spacing: 0.16em;
            text-transform: uppercase; font-family: monospace;
          }
          .pz-table td { padding: 10px 14px; border-bottom: 1px solid rgba(11,15,20,0.08); color: #3B4552; vertical-align: top; }
          .pz-table tr:last-child td { border-bottom: none; }
          .pz-table tr:nth-child(even) td { background: rgba(11,15,20,0.02); }
        `}</style>

        {/* 1 */}
        <section className="pz-section">
          <span className="pz-eyebrow">01</span>
          <h2 className="pz-h2">Upravljavec osebnih podatkov</h2>
          <p className="pz-p">
            Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:
          </p>
          <div className="pz-contact">
            <p><strong>Orodjarstvo Puc d.o.o.</strong></p>
            <p>Loka 14, 1370 Logatec, Slovenija</p>
            <p>E-pošta: <a href={`mailto:${siteConfig.email}`} style={{ color: '#2E6BFF' }}>{siteConfig.email}</a></p>
            <p>Telefon: <a href={`tel:${siteConfig.phone}`} style={{ color: '#2E6BFF' }}>{siteConfig.phoneDisplay}</a></p>
          </div>
        </section>

        {/* 2 */}
        <section className="pz-section">
          <span className="pz-eyebrow">02</span>
          <h2 className="pz-h2">Katere osebne podatke zbiramo</h2>
          <p className="pz-p">
            Zbiramo le podatke, ki nam jih posredujete sami prek obrazca za povpraševanje:
          </p>
          <ul className="pz-ul">
            <li>Ime in priimek</li>
            <li>Naziv podjetja (neobvezno)</li>
            <li>Elektronski naslov</li>
            <li>Telefonska številka (neobvezno)</li>
            <li>Vsebina sporočila / opis projekta</li>
            <li>Priložene datoteke (tehnične risbe, skice, fotografije — neobvezno)</li>
          </ul>
          <p className="pz-p">
            Če se strinjate z analitičnimi piškotki, Google Analytics 4 zbira anonimne podatke
            o obisku strani (tip naprave, država, čas obiska). Vaš IP naslov je anonimiziran
            in se ne shranjuje v berljivi obliki.
          </p>
        </section>

        {/* 3 */}
        <section className="pz-section">
          <span className="pz-eyebrow">03</span>
          <h2 className="pz-h2">Namen in pravna podlaga obdelave</h2>
          <table className="pz-table">
            <thead>
              <tr>
                <th>Namen</th>
                <th>Pravna podlaga</th>
                <th>Rok hrambe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Odgovor na povpraševanje / pripravo ponudbe</td>
                <td>Pogodba oz. predpogodbeni ukrepi (čl. 6(1)(b) GDPR)</td>
                <td>Do zaključka postopka + 2 leti</td>
              </tr>
              <tr>
                <td>Analitika obiskov strani (GA4)</td>
                <td>Privolitev (čl. 6(1)(a) GDPR)</td>
                <td>26 mesecev (Google Analytics privzeto)</td>
              </tr>
              <tr>
                <td>Zagotavljanje varnosti in delovanja strani</td>
                <td>Zakoniti interes (čl. 6(1)(f) GDPR)</td>
                <td>Do 30 dni (strežniški logi)</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4 */}
        <section className="pz-section">
          <span className="pz-eyebrow">04</span>
          <h2 className="pz-h2">Prejemniki podatkov</h2>
          <p className="pz-p">Vaše podatke delimo izključno s temi ponudniki storitev:</p>
          <table className="pz-table">
            <thead>
              <tr>
                <th>Ponudnik</th>
                <th>Namen</th>
                <th>Lokacija</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Resend Inc.</strong></td>
                <td>Dostava email sporočil (povpraševanja)</td>
                <td>ZDA (SCCs)</td>
              </tr>
              <tr>
                <td><strong>Vercel Inc.</strong></td>
                <td>Gostovanje spletne strani</td>
                <td>ZDA / EU (SCCs)</td>
              </tr>
              <tr>
                <td><strong>Google LLC</strong></td>
                <td>Analitika obiskov (GA4) — samo ob privolitvi</td>
                <td>ZDA / EU (SCCs)</td>
              </tr>
            </tbody>
          </table>
          <p className="pz-p" style={{ fontSize: 13 }}>
            SCCs = Standardne pogodbene klavzule EU. Vaših podatkov ne prodajamo in jih
            ne posredujemo tretjim osebam za tržne namene.
          </p>
        </section>

        {/* 5 */}
        <section className="pz-section">
          <span className="pz-eyebrow">05</span>
          <h2 className="pz-h2">Piškotki</h2>
          <p className="pz-p">
            Ta stran uporablja dve vrsti piškotkov:
          </p>
          <ul className="pz-ul">
            <li>
              <strong>Nujno potrebni:</strong> shranjujemo vašo odločitev o privolitvi
              (localStorage). Ti ne zahtevajo soglasja.
            </li>
            <li>
              <strong>Analitični (neobvezni):</strong> Google Analytics 4 piškotki
              se naložijo samo, če kliknete &ldquo;Sprejmi&rdquo; v obvestilu o piškotkih.
              Svojo odločitev lahko kadar koli spremenite z brisanjem
              podatkov brskalnika (Nastavitve → Zasebnost → Počisti podatke).
            </li>
          </ul>
        </section>

        {/* 6 */}
        <section className="pz-section">
          <span className="pz-eyebrow">06</span>
          <h2 className="pz-h2">Vaše pravice</h2>
          <p className="pz-p">V skladu z GDPR imate naslednje pravice:</p>
          <ul className="pz-ul">
            <li><strong>Pravica do dostopa</strong> — zahtevate lahko kopijo svojih podatkov</li>
            <li><strong>Pravica do popravka</strong> — zahtevate lahko popravek netočnih podatkov</li>
            <li><strong>Pravica do izbrisa</strong> — zahtevate lahko izbris svojih podatkov</li>
            <li><strong>Pravica do ugovora</strong> — ugovarjate lahko obdelavi na podlagi zakonitega interesa</li>
            <li><strong>Pravica do umika privolitve</strong> — analitično privolitev kadar koli umaknete</li>
            <li><strong>Pravica do pritožbe</strong> — pritožite se lahko pri Informacijskem pooblaščencu RS</li>
          </ul>
          <p className="pz-p">
            Za uveljavljanje pravic nas kontaktirajte na{' '}
            <a href={`mailto:${siteConfig.email}`} style={{ color: '#2E6BFF' }}>
              {siteConfig.email}
            </a>.
            Na zahtevo odgovorimo v roku 30 dni.
          </p>
        </section>

        {/* 7 */}
        <section className="pz-section">
          <span className="pz-eyebrow">07</span>
          <h2 className="pz-h2">Informacijski pooblaščenec RS</h2>
          <p className="pz-p">
            Če menite, da vaše podatke obdelujemo v nasprotju z veljavno zakonodajo,
            imate pravico do pritožbe pri nadzornem organu:
          </p>
          <div className="pz-contact">
            <p><strong>Informacijski pooblaščenec Republike Slovenije</strong></p>
            <p>Dunajska cesta 22, 1000 Ljubljana</p>
            <p>
              <a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer"
                style={{ color: '#2E6BFF' }}>
                www.ip-rs.si
              </a>
            </p>
          </div>
        </section>

        {/* 8 */}
        <section className="pz-section">
          <span className="pz-eyebrow">08</span>
          <h2 className="pz-h2">Spremembe politike zasebnosti</h2>
          <p className="pz-p">
            To politiko zasebnosti lahko kadar koli posodobimo. Datum zadnje posodobitve
            je naveden na vrhu dokumenta. Priporočamo, da jo občasno pregledate.
          </p>
        </section>

      </article>
    </main>
  );
}
