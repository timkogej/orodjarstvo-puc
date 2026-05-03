'use client';

import { Logo } from './ui/Logo';
import { NAV_LINKS, CONTACT_INFO } from '@/lib/constants';

function scrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-bg border-t border-brand-bg-line pt-20 pb-10">
      <div className="max-w-container mx-auto container-pad">
        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 lg:gap-20">
          {/* Column 1 — Brand */}
          <div>
            <Logo />
            <p className="mt-5 text-[14px] leading-relaxed max-w-sm text-brand-text-dim">
              Natančna izdelava orodij in CNC obdelava kovin za industrijske naročnike. Natančnost.
              Zanesljivost. Tehnična dovršenost.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-brand-text-dim mb-5">
              NAVIGACIJA
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[14px] text-brand-text-dim hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-brand-text-dim mb-5">
              KONTAKT
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-[14px] text-brand-text-dim hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneTel}`}
                  className="text-[14px] text-brand-text-dim hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-brand-text-dim hover:text-white transition-colors"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
              <li className="text-[14px] text-brand-text-dim">{CONTACT_INFO.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-brand-bg-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-mono text-[11px] text-brand-text-dim">
            © {year} Orodjarstvo Puc d.o.o. · Vse pravice pridržane
          </span>
          <div className="flex items-center gap-4 font-mono text-[11px] text-brand-text-dim">
            <button className="hover:text-white transition-colors cursor-default">
              Pravno obvestilo
            </button>
            <span className="opacity-30">·</span>
            <button className="hover:text-white transition-colors cursor-default">
              Zasebnost
            </button>
            <span className="opacity-30">·</span>
            <span className="opacity-50">Izdelava: Jedro Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
