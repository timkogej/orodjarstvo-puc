import { type ReactNode } from 'react';

type Props = {
  label: string;
  children: ReactNode;
};

export function FormField({ label, children }: Props) {
  return (
    <div className="form-field">
      <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase mb-1 pt-1 text-brand-text-dim-light">
        {label}
      </label>
      {children}
    </div>
  );
}
