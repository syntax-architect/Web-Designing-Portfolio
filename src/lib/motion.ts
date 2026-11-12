/**
 * Shared Framer Motion variants and viewport presets.
 * One easing family across the whole site keeps motion cohesive.
 */
import type { Variants } from 'motion/react';

/** Signature expo-out curve used site-wide. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, margin: '-6% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay: i * 0.08 },
  }),
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

export const springTap = { scale: 0.98 };
