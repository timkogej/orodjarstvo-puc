'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/easing';
import { Target, Gauge, Shield, Award, type LucideIcon } from 'lucide-react';

type Feature = { Icon: LucideIcon; title: string; description: string };

const FEATURES: Feature[] = [
  {
    Icon: Target,
    title: 'Visoka natančnost',
    description: 'Delamo v ozkih tolerancah ±0,01 mm. Vsak kos gre skozi kontrolo kakovosti.',
  },
  {
    Icon: Gauge,
    title: 'Hiter odziv',
    description:
      'Na povpraševanje odgovorimo v 24 urah. Ponudbo izdelamo običajno v 2–3 dneh.',
  },
  {
    Icon: Shield,
    title: 'Zanesljivost rokov',
    description: 'Realne roke dogovorimo vnaprej in jih spoštujemo. Brez presenečenj.',
  },
  {
    Icon: Award,
    title: 'Izkušeni operaterji',
    description:
      'Delo opravljajo izkušeni strokovnjaki z dolgoletno prakso v orodjarstvu.',
  },
];

export function Capabilities() {
  return (
    <section
      id="zmogljivosti"
      className="relative bg-brand-bg py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines-dark opacity-50 pointer-events-none" />
      {/* Accent blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-10%',
          bottom: '-30%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, #2E6BFF33 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-container mx-auto container-pad">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-24 items-start">
          {/* Left column */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim">
                04 — ZAKAJ ORODJARSTVO PUC
              </span>
            </motion.div>

            <motion.h2
              className="font-display font-extrabold tracking-tighter text-white leading-[0.98]"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', letterSpacing: '-0.05em' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
            >
              Kakovost, ki se
              <br />
              vidi in <span className="text-brand-accent">meri.</span>
            </motion.h2>

            <motion.p
              className="mt-8 max-w-lg text-[15px] leading-relaxed text-brand-text-dim"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
            >
              Razumemo, da industrijski naročnik ne išče samo kosa — išče partnerja, ki razume
              dogovorjene roke, tehnične zahteve in cene. Pri Pucu dobite vse to na enem mestu.
            </motion.p>

            {/* Image */}
            <motion.div
              className="mt-12 relative overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE_IN_OUT, delay: 0.15 }}
            >
              <div className="aspect-[5/3] w-full">
                <img
                  src="/images/puc-image-3.jpg"
                  alt="Proces in kontrola kakovosti, Orodjarstvo Puc"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Crosshair overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.5 }}
              >
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#2E6BFF" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#2E6BFF" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              <div className="absolute top-2 left-2 font-mono text-[10px] uppercase text-white/80">
                + PROCES · KONTROLA
              </div>
            </motion.div>
          </div>

          {/* Right column — feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-bg-line">
            {FEATURES.map(({ Icon, title, description }, i) => (
              <motion.div
                key={i}
                className="flex flex-col p-8 lg:p-10 bg-brand-bg min-h-[260px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT,
                  delay: 0.15 + i * 0.1,
                }}
              >
                <div
                  className="flex items-center justify-center border border-brand-bg-line text-brand-accent mb-8"
                  style={{ width: 44, height: 44 }}
                >
                  <Icon size={18} />
                </div>
                <h3
                  className="font-display font-bold tracking-tighter text-white mb-3"
                  style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}
                >
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed text-brand-text-dim">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
