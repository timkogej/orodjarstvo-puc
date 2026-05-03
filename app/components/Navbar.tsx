'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './ui/Logo';
import { NAV_LINKS } from '@/lib/constants';

function scrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10"
        style={{
          height: 72,
          background: scrolled ? 'rgba(11,15,20,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 500ms ease, backdrop-filter 500ms ease, border-color 500ms ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="cursor-pointer"
          aria-label="Nazaj na vrh"
        >
          <Logo />
        </button>

        {/* Nav links — desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative text-[14px] font-medium cursor-pointer group"
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  opacity: isActive ? 1 : undefined,
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[2px] bg-brand-accent"
                  style={{
                    width: isActive ? '100%' : '0%',
                    transition: 'width 0.3s ease',
                  }}
                />
                <span
                  className="absolute -bottom-0.5 left-0 h-[2px] bg-brand-accent opacity-0 group-hover:opacity-100 group-hover:w-full"
                  style={{ width: '0%', transition: 'width 0.3s ease, opacity 0.2s' }}
                />
              </button>
            );
          })}
        </div>

        {/* CTA — desktop */}
        <button
          onClick={() => scrollTo('#kontakt')}
          className="hidden lg:inline-flex btn-primary btn-primary-light items-center gap-2"
        >
          Pošljite povpraševanje
          <ArrowRight size={15} />
        </button>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Zapri meni' : 'Odpri meni'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-bg flex flex-col pt-[72px] px-6">
          <div className="flex flex-col gap-2 mt-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
                className="text-left text-[22px] font-display font-bold text-white py-3 border-b border-brand-bg-line hover:text-brand-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { scrollTo('#kontakt'); setMenuOpen(false); }}
            className="btn-primary btn-primary-light mt-8 self-start"
          >
            Pošljite povpraševanje
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </>
  );
}
