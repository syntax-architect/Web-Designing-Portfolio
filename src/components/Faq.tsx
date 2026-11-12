import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '../lib/data';
import { EASE, fadeUp, stagger, viewportOnce } from '../lib/motion';
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

  return (
    <SectionShell id="faq" labelledBy="faq-title" className="relative bg-soft/60">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title={
              <>
                Asked every time.{' '}
                <span className="text-gradient">Answered upfront.</span>
              </>
            }
            description="Everything founders usually want to know before the first call — transparent, no sales fog."
          />
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
