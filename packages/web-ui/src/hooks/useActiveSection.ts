import { useState, useEffect } from 'react';

const SECTIONS = ['about', 'experience', 'projects'] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('about');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
