import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import BlurText from './reactbits/BlurText';

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
        className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className={`mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:mt-5 md:text-5xl lg:text-6xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {description ? (
        <BlurText
          text={description}
          animateBy="words"
          direction="bottom"
          delay={20}
          stepDuration={0.28}
          blur={5}
          distance={10}
          threshold={0.15}
          className={`mt-4 gap-x-[0.28em] text-sm leading-relaxed sm:text-base md:mt-6 md:text-lg ${
            align === 'center' ? 'justify-center' : ''
          } ${dark ? 'text-white/65' : 'text-muted'}`}
        />
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
      className={`scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16 md:scroll-mt-24 md:px-10 md:py-24 lg:px-14 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px]">{children}</div>
    </section>
  );
}
