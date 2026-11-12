import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (null when reduced motion is preferred). */
export function useLenis() {
  return useContext(LenisContext);
}

/** Programmatic scrolling that respects the smooth-scroll engine. */
export function useScrollTo() {
  const lenis = useLenis();
  return (target: string | number) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: typeof target === 'string' ? -76 : 0,
        duration: 1.35,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }
    if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };
}

/**
 * Wraps the app and drives Lenis from the shared gsap.ticker frame loop so
 * GSAP animations and smooth scrolling never fight each other, while every
 * Lenis scroll event keeps ScrollTrigger perfectly in sync.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // honour the OS preference with native scrolling
    }

    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    instance.on('scroll', () => ScrollTrigger.update());

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // Webfonts shift layout metrics — re-measure ScrollTrigger once loaded.
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
