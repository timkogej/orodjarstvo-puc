'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

const CHIPS = [
  'CNC rezkanje',
  'CNC struženje',
  'Brušenje',
  'Orodjarstvo',
  'Deli za stroje',
  'Izdelava po načrtih',
  'Hitro prototipiranje',
];


function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const [desktopImgError, setDesktopImgError] = useState(false);
  const [mobileImgError, setMobileImgError] = useState(false);

  return (
    <div id="hero">
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP LAYOUT — diagonal split, lg and above only
      ───────────────────────────────────────────────────────────────── */}
      <section className="hidden lg:block relative min-h-[100svh] bg-brand-bg overflow-hidden">
        {/* DIAGONAL SPLIT BACKGROUND */}
        <div className="absolute inset-0">
          {/* Left dark area with grid */}
          <div
            className="absolute inset-0 bg-brand-bg"
            style={{ clipPath: 'polygon(0 0, 62% 0, 48% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 grid-lines-dark opacity-70" />
            <div
              className="absolute pointer-events-none"
              style={{
                left: '40%',
                top: '-10%',
                width: '700px',
                height: '700px',
                background: 'radial-gradient(circle, #2E6BFF22 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* Right image area */}
          <div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(62% 0, 100% 0, 100% 100%, 48% 100%)' }}
          >
            {desktopImgError ? (
              <div className="w-full h-full bg-brand-bg-soft flex items-center justify-center">
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim">
                  FOTO HERO — CNC OBDELAVA
                </span>
              </div>
            ) : (
              <img
                src="/images/puc-hero.jpg"
                alt="CNC obdelava kovine"
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) brightness(0.92)' }}
                onError={() => setDesktopImgError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/40 via-transparent to-transparent" />
          </div>

          {/* Diagonal accent line */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line
                x1="62"
                y1="0"
                x2="48"
                y2="100"
                stroke="#2E6BFF"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: '1px' }}
              />
            </svg>
          </div>
        </div>

        {/* Desktop content */}
        <div className="relative z-10 max-w-container mx-auto px-10 pt-[120px] pb-24 min-h-[100svh] flex flex-col justify-center">
          <div className="max-w-[58%]">
            <motion.div variants={heroContainer} initial="hidden" animate="visible">
              <motion.div variants={heroItem} className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-text-dim">
                  ORODJARSTVO · PROIZVODNJA · TRGOVINA
                </span>
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="font-display font-black tracking-tighter text-white leading-[0.98] mb-8"
                style={{ fontSize: 'clamp(2.4rem, 5.6vw, 5.2rem)', letterSpacing: '-0.05em' }}
              >
                Natančna izdelava
                <br />
                orodij in{' '}
                <span className="text-brand-accent">CNC obdelava</span>
                <br />
                kovin po meri.
              </motion.h1>

              <motion.div variants={heroItem} className="mt-8 lg:mt-10 mb-10">
                <p className="text-[16px] lg:text-[18px] leading-relaxed max-w-2xl text-brand-text-dim">
                  Izdelujemo orodja, kovinske dele za stroje in tehnično zahtevne komponente z visokim
                  poudarkom na natančnosti, zanesljivosti in dogovorjenih rokih. Sodelujemo z
                  industrijskimi naročniki po vsej Sloveniji.
                </p>
              </motion.div>

              <motion.div variants={heroItem} className="flex gap-3 mb-10">
                <button
                  onClick={() => scrollTo('kontakt')}
                  className="btn-primary btn-primary-light inline-flex items-center gap-2"
                >
                  Pošljite povpraševanje
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => scrollTo('storitve')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-brand-accent text-brand-accent text-[0.9rem] font-semibold rounded-[2px] hover:bg-brand-accent/10 transition-colors"
                >
                  Poglejte naše storitve
                </button>
              </motion.div>

              <motion.div variants={heroItem} className="flex flex-wrap gap-2">
                {CHIPS.map((chip, i) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 text-[12.5px] text-brand-text-dim border border-brand-bg-line rounded-full px-3.5 py-1.5 hover:border-brand-accent hover:text-brand-accent transition-colors cursor-default"
                  >
                    {i > 0 && <span className="opacity-30">—</span>}
                    {chip}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={heroItem}
                className="mt-16 pt-8 border-t border-brand-bg-line flex flex-wrap gap-x-2 gap-y-1"
              >
                {['Natančnost.', 'Zanesljivost.', 'Tehnična dovršenost.'].map((word, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-brand-text-dim opacity-40">·</span>}
                    <span className="font-semibold text-white text-[15px]">{word}</span>
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-10 flex items-center gap-3 pointer-events-none">
          <div className="w-px h-8 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/50">SCROLL</span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          MOBILE LAYOUT — full-bleed vertical image, below lg only
      ───────────────────────────────────────────────────────────────── */}
      <section className="lg:hidden relative min-h-[100svh] overflow-hidden bg-brand-bg">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          {mobileImgError ? (
            <div className="w-full h-full bg-brand-bg-soft flex items-center justify-center">
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim text-center px-6">
                FOTO HERO MOBILE — CNC OBDELAVA
              </span>
            </div>
          ) : (
            <img
              src="/images/puc-hero-mobile.jpg"
              alt="CNC obdelava kovine"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'contrast(1.05) brightness(0.85)' }}
              onError={() => setMobileImgError(true)}
            />
          )}
          {/* Gradient — dark at bottom where text sits, lighter at top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(11,15,20,0.3) 0%, rgba(11,15,20,0.5) 35%, rgba(11,15,20,0.92) 75%, rgba(11,15,20,1) 100%)',
            }}
          />
          {/* Grid overlay for visual continuity */}
          <div className="absolute inset-0 grid-lines-dark opacity-40" />
        </div>

        {/* Content pushed to bottom */}
        <div className="relative z-10 flex flex-col justify-end min-h-[100svh] px-6 pt-[120px] pb-16">
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div variants={heroItem} className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand-text-dim">
                ORODJARSTVO · PROIZVODNJA · TRGOVINA
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={heroItem}
              className="font-display font-black tracking-tighter text-white leading-[0.98] mb-6"
              style={{ fontSize: 'clamp(2rem, 9vw, 3.2rem)', letterSpacing: '-0.05em' }}
            >
              Natančna izdelava
              <br />
              orodij in{' '}
              <span className="text-brand-accent">CNC obdelava</span>
              <br />
              kovin po meri.
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              variants={heroItem}
              className="text-[15px] text-brand-text-dim leading-relaxed mb-6 max-w-sm"
            >
              Izdelujemo orodja, kovinske dele za stroje in tehnično zahtevne komponente z visokim
              poudarkom na natančnosti in dogovorjenih rokih.
            </motion.p>


            {/* CTAs — stacked full-width */}
            <motion.div variants={heroItem} className="flex flex-col gap-3 mb-7">
              <button
                onClick={() => scrollTo('kontakt')}
                className="btn-primary btn-primary-light inline-flex items-center justify-center gap-2 w-full"
              >
                Pošljite povpraševanje
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => scrollTo('storitve')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-accent text-brand-accent text-[0.9rem] font-semibold rounded-[2px] hover:bg-brand-accent/10 transition-colors w-full"
              >
                Poglejte naše storitve
              </button>
            </motion.div>

            {/* Chips */}
            <motion.div variants={heroItem} className="flex flex-wrap gap-1.5 mb-8">
              {CHIPS.map((chip, i) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 text-[11.5px] text-brand-text-dim border border-brand-bg-line rounded-full px-3 py-1 cursor-default"
                >
                  {i > 0 && <span className="opacity-30">—</span>}
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.div
              variants={heroItem}
              className="pt-6 border-t border-brand-bg-line flex flex-wrap gap-x-2 gap-y-1"
            >
              {['Natančnost.', 'Zanesljivost.', 'Tehnična dovršenost.'].map((word, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-brand-text-dim opacity-40">·</span>}
                  <span className="font-semibold text-white text-[14px]">{word}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-6 bottom-6 z-10 flex items-center gap-3 pointer-events-none">
          <div className="w-px h-8 bg-white/30" />
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/50">SCROLL</span>
        </div>
      </section>
    </div>
  );
}
