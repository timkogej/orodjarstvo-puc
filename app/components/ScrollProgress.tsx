'use client';

import { useState, useEffect } from 'react';
import { SCROLL_SECTIONS } from '@/lib/constants';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ScrollProgress() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SCROLL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {SCROLL_SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
            aria-label={`Pomakni se na: ${label}`}
            className="relative flex items-center justify-end gap-2 group"
          >
            {/* Label */}
            <span
              className="font-mono text-[10px] tracking-wider uppercase transition-all duration-200 whitespace-nowrap"
              style={{
                color: isActive ? '#2E6BFF' : 'rgba(255,255,255,0.7)',
                opacity: hoveredSection === id || isActive ? 1 : 0,
                transform: hoveredSection === id ? 'translateX(0)' : 'translateX(4px)',
              }}
            >
              {label}
            </span>
            {/* Dot */}
            <div
              className="rounded-full flex-shrink-0 transition-all duration-200"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? '#2E6BFF' : 'rgba(255,255,255,0.3)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
