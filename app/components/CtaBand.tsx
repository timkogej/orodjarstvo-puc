'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_OUT } from '@/lib/easing';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function CtaBand() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: '#2E6BFF' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div
          className="font-display font-black leading-none whitespace-nowrap pr-8"
          style={{
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-0.05em',
            transform: 'translateY(8%)',
          }}
        >
          PUC
        </div>
      </div>

      <div className="relative max-w-container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-white/70" />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-white/80">
                Vaš naslednji projekt
              </span>
            </div>
            <h2
              className="font-display font-black text-white leading-[0.95]"
              style={{
                fontSize: 'clamp(2rem, 4.6vw, 3.8rem)',
                letterSpacing: '-0.045em',
              }}
            >
              Imate načrt? Imamo<br />
              stroje, ljudi in znanje.
            </h2>
            <p className="mt-6 text-white/85 text-[16px] lg:text-[17px] leading-relaxed max-w-xl">
              Ne glede na to, ali potrebujete en sam preciziran kos ali manjšo
              serijo — naša ekipa vam pomaga od ideje do dostave. Pošljite
              povpraševanje in v 24 urah dobite konkreten odgovor.
            </p>
          </motion.div>

          {/* Right CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
            className="flex flex-col gap-4 lg:items-end"
          >
            <button
              onClick={() => scrollTo('kontakt')}
              className="group inline-flex items-center gap-3 bg-white text-brand-bg px-8 py-5 font-semibold text-[15px] hover:bg-brand-bg hover:text-white transition-all duration-300"
              style={{ borderRadius: 2 }}
            >
              Pošljite povpraševanje
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <a
              href="tel:+38631252353"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] uppercase text-white/80 hover:text-white transition-colors"
            >
              ali pokličite — 031 252 353
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
