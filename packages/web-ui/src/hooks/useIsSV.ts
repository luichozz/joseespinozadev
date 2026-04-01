import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsSV(): boolean {
  const [isSV, setIsSV] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsSV(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isSV;
}
