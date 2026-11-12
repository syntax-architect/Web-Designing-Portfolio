import { motion } from 'motion/react';
import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { PROCESS } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

/**
 * The 4-step engineering protocol on a vertical rail, staged on the
 * deep-teal dark band. GSAP ScrollTrigger scrubs the rail fill as you
 * scroll; step nodes ignite in coral when the fill passes them.
 */
export function Process() {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>('[data-step-node]').forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 68%',
          once: true,
          onEnter: () => node.classList.add('is-lit'),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell
      id="process"
      labelledBy="process-title"
      className="relative overflow-hidden bg-deep text-white"
    >
      {/* Ambient coral glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10rem] h-[420px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.12),transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] left-[-12rem] h-[420px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(20,125,124,0.25),transparent)] blur-3xl"
      />

      <div className="relative">
        <SectionHeading
          id="process-title"
          dark
          eyebrow="How We Work"
          title={
            <>
              From first call to <span className="text-gradient">live launch</span>.
            </>
          }
          description="A straightforward four-step workflow so you always know what is being built and when it ships."
        />

        <div ref={rootRef} className="mt-12 md:mt-16">
          <ol ref={listRef} className="relative ml-2 space-y-8 md:ml-6 md:space-y-12">
            {/* Rail */}
            <div aria-hidden="true" className="absolute bottom-6 left-0 top-2 w-px bg-white/15">
              <div
                ref={railRef}
                className="h-full w-px origin-top bg-gradient-to-b from-accent via-peach to-white/70"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            {PROCESS.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.06 }}
                className="relative pl-8 md:pl-14"
              >
                {/* Node */}
                <span
                  data-step-node
                  aria-hidden="true"
                  className="step-node absolute -left-[8px] top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 border-white/25 bg-deep transition-all duration-500"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-white/30 transition-colors duration-500" />
                </span>

                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] md:flex md:items-baseline md:gap-8 md:px-6 md:py-5">
                  <span className="shrink-0 font-mono text-sm font-medium text-accent">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                      {step.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
