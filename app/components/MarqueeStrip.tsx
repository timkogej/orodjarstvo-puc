import { Circle } from 'lucide-react';
import { MARQUEE_ITEMS } from '@/lib/constants';

export function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full bg-brand-bg-soft border-t border-b border-brand-bg-line py-5 overflow-hidden">
      <div className="marquee-track flex items-center gap-8 w-max">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0">
            <span className="font-mono text-[11px] tracking-[0.28em] text-brand-text-dim whitespace-nowrap">
              {item}
            </span>
            <Circle size={4} className="fill-brand-accent text-brand-accent flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
