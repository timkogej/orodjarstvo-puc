'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/easing';
import { StatItem } from './ui/StatItem';

const STATS = [
  { value: 10, suffix: '+', label: 'Let izkušenj' },
  { value: 500, suffix: '+', label: 'Realiziranih projektov' },
  { value: 0.01, suffix: 'mm', prefix: '±', label: 'Natančnost tolerance', decimals: 2 },
  { value: 100, suffix: '%', label: 'Zanesljivost rokov' },
];

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="o-podjetju"
      ref={sectionRef}
      className="relative bg-brand-light py-24 lg:py-36"
    >
      <div className="absolute inset-0 grid-lines-light opacity-70 pointer-events-none" />
      <div className="relative z-10 max-w-container mx-auto container-pad">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-24 items-start">
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim-light">
                01 — O PODJETJU
              </span>
            </motion.div>

            {/* H2 */}
            <motion.h2
              className="font-display font-extrabold tracking-tighter text-brand-bg leading-[0.98]"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', letterSpacing: '-0.05em' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
            >
              Generacije izkušenj.
              <br />
              <span className="text-brand-accent">Sodobna</span> tehnologija.
            </motion.h2>

            {/* Image */}
            <motion.div
              className="mt-10 max-w-sm relative overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_IN_OUT, delay: 0.2 }}
            >
              <div className="aspect-[4/5] w-full">
                <img
                  src="/images/puc-image-2.jpg"
                  alt="Delavnica Orodjarstvo Puc, Logatec"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 bg-brand-bg px-3 py-2">
                <span className="font-mono text-[10px] uppercase text-white tracking-[0.18em]">
                  DELAVNICA · LOGATEC
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div>
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <p className="text-[16px] lg:text-[17px] leading-relaxed text-[#3B4552]">
                V <span className="font-semibold text-brand-bg">Orodjarstvu Puc</span> združujemo
                tradicijo natančne slovenske obrti s sodobno CNC tehnologijo. Specializirani smo za
                zahtevnejše tehnične izzive, kjer šteje vsaka stotinka milimetra.
              </p>
              <p className="text-[16px] lg:text-[17px] leading-relaxed text-[#3B4552]">
                Sodelujemo z industrijskimi naročniki iz različnih panog — od strojne in kovinske
                industrije do specialnih aplikacij po načrtih. Vsak projekt obravnavamo individualno
                — od kosovne izdelave do manjših in srednjih serij.
              </p>
              <p className="text-[16px] lg:text-[17px] leading-relaxed text-[#3B4552]">
                Naš cilj ni samo izdelati kos. Naš cilj je biti partner, na katerega se naročnik
                lahko zanese — rok za rokom.
              </p>
            </motion.div>

            {/* Stats grid */}
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 * i }}
                >
                  <StatItem
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    label={stat.label}
                    decimals={stat.decimals}
                    start={inView}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
