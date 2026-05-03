import { type LucideIcon } from 'lucide-react';

type Props = {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

export function ContactRow({ Icon, label, value, href }: Props) {
  const inner = (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center justify-center border border-black/15 text-brand-accent flex-shrink-0"
        style={{ width: 44, height: 44 }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand-text-dim-light mb-1">
          {label}
        </div>
        <div className="font-display font-semibold text-[16px] tracking-tight text-brand-bg">
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity" target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
