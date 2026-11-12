import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, BadgeCheck, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { TESTIMONIALS } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

const AUTOPLAY_MS = 6500;

export function Testimonials() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 1]);
  const reduced = useReducedMotion();

  const go = useCallback((next: number, direction: number) => {
    setIndex([(next + TESTIMONIALS.length) % TESTIMONIALS.length, direction]);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, go, reduced]);

  const t = TESTIMONIALS[index];

  return (
    <SectionShell id="testimonials" labelledBy="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        eyebrow="Trust & Social Proof"
        title={
          <>
            Clients who <span className="text-gradient">measured it</span>.
          </>
        }
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Carousel */}
        <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 shadow-card md:p-12">
          <div className="flex gap-1" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
            ))}
          </div>

          <div className="relative mt-6 min-h-[200px] md:min-h-[180px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 56, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -56, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-lg leading-relaxed text-ink md:text-xl">“{t.quote}”</p>
                <footer className="mt-6 flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep font-display text-sm font-bold text-peach">
                    {t.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                      {t.name}
                      <BadgeCheck className="h-4 w-4 text-accent" aria-label="Verified client" />
                    </p>
                    <p className="text-[12px] font-medium text-muted">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Autoplay progress + controls */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial from ${item.name}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className="group relative h-1.5 overflow-hidden rounded-full bg-stone-200 transition-all duration-300"
                  style={{ width: i === index ? 32 : 10 }}
                >
                  {i === index && !reduced && (
                    <motion.span
                      key={`bar-${index}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {i === index && reduced && <span className="absolute inset-0 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Result strip */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-tintline bg-gradient-to-br from-tint via-surface to-soft p-8 shadow-card"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Latest verified result
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={t.metric}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
              >
                {t.metric}
              </motion.p>
            </AnimatePresence>
            <p className="mt-4 text-sm text-muted">
              Reported by {t.name}, {t.company} — one of {TESTIMONIALS.length} VELTRIX DIGITAL
              case studies you can audit in the Work section.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              ['24h', 'Reply time'],
              ['100%', 'On-time launches'],
              ['0', 'Lock-in contracts'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-hairline bg-surface px-4 py-6 text-center shadow-card"
              >
                <p className="font-display text-2xl font-bold text-ink">{value}</p>
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
