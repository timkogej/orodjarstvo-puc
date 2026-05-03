'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  name?: string;
};

export function CustomSelect({ options, value, onChange, placeholder = 'Izberite...', name }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={wrapRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        className="w-full flex items-center justify-between bg-transparent py-3 text-[15px] text-left text-brand-bg"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={selected ? '' : 'text-brand-text-dim-light'}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="text-brand-accent"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute left-0 right-0 top-full mt-2 z-30 bg-white border border-brand-bg-line shadow-xl"
            style={{ borderRadius: 2 }}
            role="listbox"
          >
            <ul className="max-h-72 overflow-y-auto py-1">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-[14px] text-left transition-colors ${
                        isSelected
                          ? 'bg-brand-accent/8 text-brand-accent font-semibold'
                          : 'text-brand-bg hover:bg-brand-light/60'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={16} className="text-brand-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
