/**
 * Shared Framer Motion variants and viewport presets.
 * One easing family across the whole site keeps motion cohesive.
 */
import type { Variants } from 'motion/react';

/** Signature expo-out curve used site-wide. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, margin: '-12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.09 },
  }),
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};
