'use client';

import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';

type Props = {
  index: number;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export function ServiceCard({ index, title, description, Icon }: Props) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      className="group relative flex flex-col p-8 lg:p-10 min-h-[320px] bg-brand-bg border border-transparent overflow-hidden cursor-default"
      style={{ transition: 'border-color 0.3s, background 0.3s' }}
      whileHover={{
        borderColor: 'rgba(46,107,255,0.5)',
        background: 'linear-gradient(180deg, rgba(46,107,255,0.04) 0%, #0B0F14 100%)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: index * 0.08 }}
    >
      {/* Watermark number */}
      <motion.div
        className="absolute top-4 right-4 font-display font-extrabold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(5rem, 8vw, 7rem)',
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          transition: 'color 0.5s, transform 0.5s',
        }}
        whileHover={{ color: 'rgba(46,107,255,0.22)' }}
      >
        {num}
      </motion.div>

      {/* Top row */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div
          className="flex items-center justify-center border border-brand-bg-line text-brand-accent"
          style={{ width: 44, height: 44 }}
        >
          <Icon size={18} />
        </div>
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-text-dim">
          / {num}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold tracking-tight text-white mb-3 relative z-10"
        style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-[14.5px] leading-relaxed text-brand-text-dim flex-1 relative z-10">
        {description}
      </p>

      {/* Arrow button */}
      <motion.div
        className="mt-8 flex items-center justify-center bg-brand-accent relative z-10"
        style={{ width: 40, height: 40, transition: 'transform 0.3s' }}
        whileHover={{ x: 4, y: -4 }}
      >
        <ArrowUpRight size={16} color="white" />
      </motion.div>
    </motion.div>
  );
}
