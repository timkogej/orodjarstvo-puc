'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/easing';

const STEPS = [
  {
    step: '01',
    title: 'Povpraševanje',
    description:
      'Pošljete nam tehnične risbe, 3D model ali opis projekta. Odzovemo se v roku 24 ur.',
  },
  {
    step: '02',
    title: 'Ponudba & načrtovanje',
    description:
      'Pripravimo natančno ponudbo z dogovorjenimi roki, materialom in izvedbenimi specifikacijami.',
  },
  {
    step: '03',
    title: 'Izdelava',
    description:
      'CNC obdelava, orodjarska izdelava in končna obdelava — kontrola kakovosti po vsakem koraku.',
  },
  {
    step: '04',
    title: 'Dostava & podpora',
    description:
      'Zapakirano, pregledano in dostavljeno na dogovorjeno lokacijo. Po potrebi tudi kasnejša podpora.',
  },
];

export function Process() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setLineVisible(true); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="proces"
      ref={sectionRef}
      className="relative bg-brand-light py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines-light opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto container-pad">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim-light">
              03 — DELOVNI PROCES
            </span>
          </motion.div>
          <motion.h2
            className="font-display font-extrabold tracking-tighter text-brand-bg leading-[0.98]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', letterSpacing: '-0.05em' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
          >
            Od povpraševanja
            <br />
            do <span className="text-brand-accent">gotovega izdelka.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="mt-24 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-2 left-0 right-0 h-px bg-black/10 z-0" />
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-2 left-0 h-px bg-brand-accent z-0"
            style={{
              width: lineVisible ? '100%' : '0%',
              transition: 'width 2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="relative lg:pt-16"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT,
                  delay: 0.2 + i * 0.12,
                }}
              >
                {/* Timeline dot — desktop */}
                <div className="hidden lg:flex absolute -top-[3px] left-0 items-center justify-center" style={{ width: 16, height: 16 }}>
                  <div className="absolute inset-0 bg-brand-light" />
                  <div className="relative w-3 h-3 rounded-full bg-brand-accent" />
                </div>

                {/* Eyebrow */}
                <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim-light mb-3">
                  KORAK {step.step}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold tracking-tighter text-brand-bg mb-3"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[14.5px] leading-relaxed text-[#3B4552]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
