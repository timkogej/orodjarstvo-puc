type Props = { theme?: 'dark' | 'light' };

export function Logo({ theme = 'dark' }: Props) {
  const textColor = theme === 'dark' ? 'text-white' : 'text-brand-bg';
  return (
    <div className="flex items-center gap-2.5">
      <div className={`leading-tight ${textColor}`}>
        <div className="font-display font-bold text-[15px] tracking-tight">Orodjarstvo Puc</div>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-60">d.o.o.</div>
      </div>
    </div>
  );
}
