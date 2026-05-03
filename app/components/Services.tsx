'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, EASE_IN_OUT } from '@/lib/easing';
import { Cpu, Cog, Layers, Wrench, Box, Zap, type LucideIcon } from 'lucide-react';
import { ServiceCard } from './ui/ServiceCard';

type Service = { title: string; Icon: LucideIcon; description: string };

const SERVICES: Service[] = [
  {
    title: 'CNC Rezkanje',
    Icon: Cpu,
    description:
      '3-, 4- in 5-osno CNC rezkanje kovin. Obdelava prototipov, posameznih kosov in manjših serij z visoko ponovljivostjo.',
  },
  {
    title: 'CNC Struženje',
    Icon: Cog,
    description:
      'Natančno struženje okroglih in cilindričnih komponent z ozkimi tolerancami in odlično kakovostjo površine.',
  },
  {
    title: 'Brušenje',
    Icon: Layers,
    description:
      'Fino brušenje ravnih in okroglih površin za zahtevno površinsko kakovost in visoko dimenzijsko natančnost.',
  },
  {
    title: 'Orodjarstvo',
    Icon: Wrench,
    description:
      'Izdelava, servis in vzdrževanje orodij, kalupov ter priprav za serijsko proizvodnjo in industrijske aplikacije.',
  },
  {
    title: 'Izdelava po načrtih',
    Icon: Box,
    description:
      'Kovinski deli za stroje in tehnično zahtevni izdelki, izdelani natančno po tehničnih risbah in specifikacijah naročnika.',
  },
  {
    title: 'Hitro prototipiranje',
    Icon: Zap,
    description:
      'Hitra izdelava kovinskih prototipov za razvoj izdelkov. Kratki roki, zanesljiva kakovost, jasna komunikacija.',
  },
];

export function Services() {
  return (
    <section id="storitve" className="relative bg-brand-bg py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-lines-dark opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto container-pad">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
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
                02 — STORITVE
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
              Celovita orodjarska
              <br />
              in <span className="text-brand-accent">CNC</span> ponudba.
            </motion.h2>
          </div>
          <motion.p
            className="max-w-md text-[15px] leading-relaxed text-brand-text-dim"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            Od posameznih kosov po načrtih do serijske proizvodnje — vse pod eno streho. Naročniku
            omogočamo, da dobi končno rešitev, ne zgolj surov kos.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-bg-line">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={i}
              index={i}
              title={service.title}
              Icon={service.Icon}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
