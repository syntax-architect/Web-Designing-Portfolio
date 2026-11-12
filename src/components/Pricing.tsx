import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { PLANS } from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { BorderBeam } from './magicui/border-beam';
import SpotlightCard from './reactbits/SpotlightCard';
import { SectionHeading, SectionShell } from './Section';

export function Pricing() {
  const { open } = useBooking();

  return (
    <SectionShell id="pricing" labelledBy="pricing-title" className="relative bg-soft/60">
      <SectionHeading
        id="pricing-title"
        eyebrow="Engagements"
        title={
          <>
            Simple ways to <span className="text-gradient">work together</span>.
          </>
        }
        description="Every project starts with a clear scope, realistic timeline, and direct pricing based on what you actually need."
        align="center"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3"
      >
        {PLANS.map((plan, i) => (
          <motion.article
            key={plan.id}
            variants={fadeUp}
            custom={i}
            className={`group relative transition-transform duration-500 hover:-translate-y-1.5 ${
              plan.featured ? 'lg:-my-3' : ''
            }`}
          >
            <SpotlightCard
              theme={plan.featured ? 'dark' : 'light'}
              spotlightColor={plan.featured ? '#FF6B4A' : '#147D7C'}
              intensity={plan.featured ? 0.22 : 0.12}
              spotlightSize={260}
              borderGlow={plan.featured ? 0.75 : 0.45}
              className={`!overflow-visible flex h-full flex-col rounded-3xl p-7 sm:p-8 ${
                plan.featured ? 'text-white shadow-soft lg:py-11' : 'text-ink shadow-card hover:shadow-lift'
              }`}
              style={
                (plan.featured
                  ? {
                      '--spotlight-card-surface': '#0a2e2f',
                      '--spotlight-card-border': 'rgba(255, 255, 255, 0.14)',
                    }
                  : {
                      '--spotlight-card-surface': '#ffffff',
                      '--spotlight-card-border': 'rgba(15, 61, 62, 0.1)',
                    }) as CSSProperties
              }
            >
              {plan.featured && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.2),transparent)] blur-2xl"
                  />
                  <BorderBeam
                    size={120}
                    duration={7}
                    borderWidth={1.5}
                    colorFrom="#FF6B4A"
                    colorTo="#147D7C"
                  />
                </>
              )}

            {plan.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-card">
                {plan.badge}
              </span>
            )}

            <h3
              className={`relative font-display text-xl font-bold tracking-tight ${
                plan.featured ? 'text-white' : 'text-ink'
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={`relative mt-1 text-[13px] font-medium ${
                plan.featured ? 'text-white/65' : 'text-muted'
              }`}
            >
              {plan.tagline}
            </p>

            <div className="relative mt-6 flex items-baseline gap-2">
              <span
                className={`font-display text-4xl font-bold tracking-tight ${
                  plan.featured ? 'text-white' : 'text-ink'
                }`}
              >
                {plan.price}
              </span>
            </div>
            <p
              className={`relative mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] ${
                plan.featured ? 'text-peach' : 'text-accent'
              }`}
            >
              {plan.period}
            </p>

            <ul
              className={`relative mt-7 flex-1 space-y-3 border-t pt-6 ${
                plan.featured ? 'border-white/10' : 'border-hairline'
              }`}
            >
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-sm ${
                    plan.featured ? 'text-white/85' : 'text-ink/80'
                  }`}
                >
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-accent' : 'text-teal'}`}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={open}
              whileTap={{ scale: 0.98 }}
              className={`relative mt-8 w-full rounded-full py-3.5 font-display text-sm font-semibold transition-all duration-300 ${
                plan.featured
                  ? 'bg-accent text-white shadow-card hover:bg-white hover:text-ink'
                  : 'border border-hairline bg-surface text-ink hover:border-accent hover:text-accent'
              }`}
            >
              {plan.featured ? 'Discuss Website + Growth' : 'Book a Call'}
            </motion.button>
            </SpotlightCard>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10 text-center text-[13px] font-medium text-muted"
      >
        Full source code ownership included on every build.{' '}
        <span className="text-ink">Custom quotes shared within 24 hours.</span>
      </motion.p>
    </SectionShell>
  );
}
