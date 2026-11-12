import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '../lib/data';
import { EASE, fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { SectionHeading, SectionShell } from './Section';

function FaqItem({
  index,
  open,
  onToggle,
}: {
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const faq = FAQS[index];
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-surface transition-all duration-300 ${
        open ? 'border-tintline shadow-card' : 'border-hairline shadow-card hover:border-tintline'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold tracking-tight text-ink md:text-lg">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? 'border-accent bg-accent text-white' : 'border-hairline text-muted'
          }`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { open } = useBooking();

  return (
    <SectionShell id="faq" labelledBy="faq-title" className="relative bg-soft/60">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title={
              <>
                Common questions, <span className="text-gradient">direct answers</span>.
              </>
            }
            description="Quick answers on how Agnish and Ayush split the work, timelines, and code ownership."
          />

          <div className="mt-8 rounded-2xl border border-hairline bg-surface p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Not sure where to start?
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/85">
              Tell us whether you need code, marketing, or both — we will outline the exact steps on a
              15-minute intro call.
            </p>
            <button
              type="button"
              onClick={open}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-3"
        >
          {FAQS.map((_, i) => (
            <motion.div key={FAQS[i].q} variants={fadeUp} custom={i}>
              <FaqItem
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
