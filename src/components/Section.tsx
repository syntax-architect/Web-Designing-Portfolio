import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
  /** Use on deep-teal sections. */
  dark?: boolean;
}

/** Shared section header: eyebrow, display title, optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className={`mt-5 font-display text-4xl font-bold leading-[1.06] tracking-tight md:text-5xl lg:text-6xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={`mt-6 text-base leading-relaxed md:text-lg ${
            dark ? 'text-white/60' : 'text-muted'
          }`}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}

/** Consistent vertical rhythm + scroll-margin for anchor navigation. */
export function SectionShell({ children, className = '', id, labelledBy }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-14 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px]">{children}</div>
    </section>
  );
}
