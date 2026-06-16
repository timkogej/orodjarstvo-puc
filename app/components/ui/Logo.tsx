type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export function Logo({ size = 'md' }: Props) {
  const imgSize = size === 'sm' ? 28 : size === 'lg' ? 54 : 38;

  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/orodjarstvo-puc-logo.png"
        alt="Orodjarstvo Puc logotip"
        width={imgSize}
        height={imgSize}
        style={{ objectFit: 'contain', width: imgSize, height: imgSize }}
      />
      <div className="leading-tight">
        <div
          className="font-display font-bold text-white tracking-tight"
          style={{ fontSize: 14, letterSpacing: '-0.02em' }}
        >
          Orodjarstvo Puc
        </div>
        <div
          className="font-mono uppercase text-white"
          style={{ fontSize: 9, letterSpacing: '0.22em', opacity: 0.6 }}
        >
          d.o.o.
        </div>
      </div>
    </div>
  );
}
