'use client';

import { useCountUp } from '@/lib/hooks';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  delay?: number;
  start: boolean;
};

export function StatItem({ value, suffix = '', prefix = '', label, decimals = 0, start }: Props) {
  const count = useCountUp(value, 1800, start);
  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString('sl-SI');

  return (
    <div className="border-t border-black/15 pt-5">
      <div
        className="font-display font-bold leading-none text-brand-bg"
        style={{ fontSize: 'clamp(2.2rem, 3.4vw, 3rem)' }}
      >
        {prefix}{formatted}{suffix}
      </div>
      <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-text-dim-light mt-2">
        {label}
      </div>
    </div>
  );
}
