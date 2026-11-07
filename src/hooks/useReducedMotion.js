/**
 * useReducedMotion - Returns true when the user prefers reduced motion.
 * Use this at the top of useGSAP blocks to either skip animations entirely
 * or set the end-state instantly via gsap.set() instead of gsap.from/to.
 */
import { useState, useEffect } from 'react';

export default function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
