import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PLANS } from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
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
            Clear scope. <span className="text-gradient">Fixed quotes.</span>
          </>
        }
        description="Three ways to work with VELTRIX DIGITAL — every engagement ships with an exact milestone calendar, not vague estimates."
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
            className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 ${
              plan.featured
                ? 'border-2 border-accent bg-surface shadow-lift lg:-my-3 lg:py-11'
                : 'border border-hairline bg-surface shadow-card hover:shadow-lift'
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-card">
                {plan.badge}
              </span>
            )}

            <h3 className="font-display text-xl font-bold tracking-tight text-ink">{plan.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-muted">{plan.tagline}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-ink">
                {plan.price}
              </span>
            </div>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
              {plan.period}
            </p>

            <ul className="mt-7 flex-1 space-y-3 border-t border-hairline pt-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-accent' : 'text-teal'}`}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={open}
              className={`mt-8 w-full rounded-full py-3.5 font-display text-sm font-semibold transition-all duration-300 ${
                plan.featured
                  ? 'bg-accent text-white hover:bg-ink'
                  : 'border border-hairline bg-surface text-ink hover:border-accent hover:text-accent'
              }`}
            >
              {plan.featured ? 'Start with Signature' : 'Book a Strategy Call'}
            </button>
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
        Every plan includes owned code, engineered SEO and zero platform lock-in.{' '}
        <span className="text-ink">NDA on request.</span>
      </motion.p>
    </SectionShell>
  );
}
