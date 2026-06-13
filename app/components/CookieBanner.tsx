'use client';

import { useEffect, useState } from 'react';
import { X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'cookie-consent';

export type ConsentValue = 'accepted' | 'rejected' | null;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;

    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }

    if (stored === 'accepted') {
      loadGA();
    }
  }, []);

  // Trigger entry animation one frame after the banner mounts
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setAnimateIn(true), 32);
    return () => clearTimeout(t);
  }, [visible]);

  const dismiss = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, value);

    if (value === 'accepted') {
      loadGA();
    }

    setAnimateOut(true);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Obvestilo o piškotkih"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: `translateX(-50%) translateY(${animateOut ? '120%' : animateIn ? '0' : '120%'})`,
        width: 'min(96vw, 720px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 18px',
        background: '#0B0F14',
        border: '1px solid #1E252F',
        borderRadius: 2,
        boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        fontFamily: 'var(--font-inter, system-ui, sans-serif)',
      }}
    >
      <Cookie
        size={18}
        style={{ color: '#2E6BFF', flexShrink: 0 }}
        aria-hidden="true"
      />

      <p
        style={{
          flex: 1,
          margin: 0,
          fontSize: 13,
          lineHeight: 1.55,
          color: '#8A94A3',
        }}
      >
        Uporabljamo analitične piškotke za izboljšavo izkušnje.{' '}
        <a
          href="/zasebnost"
          style={{ color: '#2E6BFF', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Politika zasebnosti
        </a>
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button
          onClick={() => dismiss('rejected')}
          aria-label="Zavrni analitične piškotke"
          style={{
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid #1E252F',
            borderRadius: 2,
            color: '#8A94A3',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#8A94A3';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#1E252F';
            (e.currentTarget as HTMLButtonElement).style.color = '#8A94A3';
          }}
        >
          Zavrni
        </button>

        <button
          onClick={() => dismiss('accepted')}
          aria-label="Sprejmi analitične piškotke"
          style={{
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: '#2E6BFF',
            border: '1px solid #2E6BFF',
            borderRadius: 2,
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#4D82FF';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#2E6BFF';
          }}
        >
          Sprejmi
        </button>
      </div>

      <button
        onClick={() => { setAnimateOut(true); setTimeout(() => setVisible(false), 350); }}
        aria-label="Zapri"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#8A94A3',
          cursor: 'pointer',
          padding: 4,
          flexShrink: 0,
        }}
        className="cookie-close-mobile"
      >
        <X size={16} />
      </button>

      <style>{`
        @media (max-width: 480px) {
          .cookie-close-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}

function loadGA() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || typeof window === 'undefined') return;
  if (document.getElementById('ga-script')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga-script';
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script1.async = true;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.id = 'ga-config';
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  `;
  document.head.appendChild(script2);
}
