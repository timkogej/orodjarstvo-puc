import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Splošni pogoji poslovanja',
  description: 'Splošni pogoji poslovanja podjetja Orodjarstvo Puc d.o.o.',
  robots: { index: true, follow: true },
};

export default function SplosniPogojiPage() {
  const updated = '16. 6. 2026';

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
            Splošni pogoji poslovanja
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
          .sp-eyebrow {
            font-family: monospace; font-size: 10px;
            letter-spacing: 0.22em; text-transform: uppercase;
            color: #2E6BFF; display: block; margin-bottom: 10px;
          }
          .sp-card {
            background: #fff; border: 1px solid rgba(11,15,20,0.1);
            border-left: 3px solid #2E6BFF;
            padding: 40px 32px; border-radius: 0 2px 2px 0;
          }
          .sp-card h2 {
            font-size: 1.25rem; font-weight: 700;
            letter-spacing: -0.02em; margin: 0 0 14px; color: #0B0F14;
          }
          .sp-card p { font-size: 15px; line-height: 1.75; color: #3B4552; margin: 0 0 14px; }
          .sp-card p:last-child { margin-bottom: 0; }
        `}</style>

        <section className="sp-card">
          <span className="sp-eyebrow">Obvestilo</span>
          <h2>Vsebina je v izdelavi</h2>
          <p>
            Splošni pogoji poslovanja podjetja Orodjarstvo Puc d.o.o. so trenutno
            v izdelavi. Dokument bo na tem mestu objavljen v kratkem.
          </p>
          <p>
            Za vse informacije glede pogojev sodelovanja, ponudb in naročil nas
            v vmesnem času kontaktirajte neposredno — z veseljem vam pomagamo.
          </p>
        </section>
      </article>
    </main>
  );
}
