import { motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Counter } from './Counter';
import { Magnetic } from './Magnetic';
import { EASE } from '../lib/motion';
import { useScrollTo } from './SmoothScrollProvider';
import { useBooking } from './BookingModal';

const METRICS = [
  { value: 100, suffix: '%', label: 'Core Web Vitals pass rate' },
  { value: 0.6, suffix: 's', decimals: 1, label: 'Median first contentful paint' },
  { value: 40, suffix: '+', label: 'Bespoke builds shipped' },
  { value: 3.2, suffix: '×', decimals: 1, label: 'Average organic growth' },
];

const CLIENTS = ['NIMBUS', 'AURELIA ATELIER', 'FLUXBOARD', 'MARROW', 'STERLING & CO.', 'APEX'];

/** Line-reveal headline: each line slides up from behind an overflow mask. */
function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const scrollTo = useScrollTo();
  const { open } = useBooking();

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex flex-col justify-start overflow-hidden px-6 pb-10 pt-28 md:px-10 md:pb-12 md:pt-36 lg:min-h-[100svh] lg:justify-center lg:px-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-4 py-2 shadow-card"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            VELTRIX DIGITAL — Now onboarding Q1 2027 partners
          </span>
        </motion.div>

        {/* Headline with per-line reveal */}
        <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.5rem,6.2vw,5.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
          <RevealLine delay={0.25}>Websites engineered to</RevealLine>
          <RevealLine delay={0.35}>
            <span className="text-gradient">convert, captivate,</span>
          </RevealLine>
          <RevealLine delay={0.45}>
            and rank{' '}
            <span className="relative inline-block">
              #1
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                className="absolute -bottom-1.5 left-0 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M3 9 C 35 3, 85 3, 117 7"
                  fill="none"
                  stroke="#FF6B4A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
                />
              </svg>
            </span>{' '}
            on Google.
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          <strong className="font-semibold text-ink">VELTRIX DIGITAL</strong> bridges
          high-end interactive engineering with aggressive search visibility. Built
          bespoke for ambitious founders, enterprise brands, and growing local
          businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={open}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-display text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink hover:shadow-lift sm:w-auto"
            >
              Launch Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollTo('#work')}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-hairline bg-surface px-8 py-4 font-display text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/25 hover:shadow-card sm:w-auto"
            >
              Explore Case Studies
            </button>
          </Magnetic>
        </motion.div>

        {/* Social proof cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {[
              ['EM', 'bg-deep'],
              ['CD', 'bg-accent'],
              ['JS', 'bg-teal'],
              ['PN', 'bg-peach text-ink'],
            ].map(([ini, tone]) => (
              <span
                key={ini}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-canvas font-display text-[11px] font-bold text-white shadow-card ${tone}`}
              >
                {ini}
              </span>
            ))}
          </div>
          <div>
            <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-accent" aria-hidden="true">
                  <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
                </svg>
              ))}
            </div>
            <p className="mt-1 text-[12px] font-medium text-muted">
              Rated 5.0 by <span className="font-semibold text-ink">40+ founders</span> &amp; teams
            </p>
          </div>
        </motion.div>

        {/* Credibility metrics */}
        <motion.dl
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-hairline bg-surface px-5 py-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:px-6 md:py-6"
            >
              <dd className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                <Counter to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} />
              </dd>
              <dt className="mt-2 text-[11px] font-medium uppercase leading-relaxed tracking-[0.1em] text-muted">
                {m.label}
              </dt>
            </div>
          ))}
        </motion.dl>

        {/* Social proof marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14"
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Trusted by ambitious teams
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-16 pr-16">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <span
                  key={`${client}-${i}`}
                  className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-wide text-ink/75 transition-colors duration-300 hover:text-ink"
                >
                  <TrendingUp className="h-4 w-4 text-accent/80" aria-hidden="true" />
                  {client}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.6, duration: 0.8 } }}
          className="pointer-events-none mt-10 hidden flex-col items-center gap-3 md:flex"
          aria-hidden="true"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-hairline">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-accent to-transparent"
              animate={{ y: [-16, 48] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
