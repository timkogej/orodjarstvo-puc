type Props = { label: string; aspect?: string; className?: string };

export function PlaceholderImage({ label, aspect = 'aspect-square', className = '' }: Props) {
  return (
    <div
      className={`relative w-full ${aspect} flex items-center justify-center bg-gradient-to-br from-brand-bg-soft to-brand-bg-line border border-brand-bg-line ${className}`}
    >
      <div className="text-center px-4">
        <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-brand-text-dim mb-2">
          FOTO PLACEHOLDER
        </div>
        <div className="font-display text-sm font-semibold text-white/70">{label}</div>
      </div>
    </div>
  );
}
