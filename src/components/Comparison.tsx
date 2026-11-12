import { motion } from 'motion/react';
import { Check, Minus, X } from 'lucide-react';
import { COMPARISON_ROWS } from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

/** Row marker with per-column tone. */
function CellMark({ text, column }: { text: string; column: 0 | 1 | 2 }) {
  const Mark = column === 0 ? Check : column === 2 ? X : Minus;
  const tone = column === 0 ? 'text-live' : column === 2 ? 'text-coral-deep' : 'text-muted/60';
  return (
    <span className="inline-flex items-start gap-2">
      <Mark className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tone}`} aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

export function Comparison() {
  return (
    <SectionShell id="compare" labelledBy="compare-title" className="relative bg-soft/60">
      <SectionHeading
        id="compare-title"
        eyebrow="The Honest Matrix"
        title={
          <>
            VELTRIX DIGITAL vs. <span className="text-gradient">everyone else</span>.
          </>
        }
        description="A side-by-side comparison against the two alternatives most businesses settle for."
        align="center"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 overflow-x-auto rounded-3xl shadow-card [data-lenis-prevent]"
      >
        <motion.table
          variants={fadeUp}
          className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-3xl border border-hairline bg-surface text-left"
        >
          <caption className="sr-only">
            Comparison of VELTRIX DIGITAL, traditional agencies and template builders
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[24%] px-6 py-6" />
              <th scope="col" className="relative bg-tint/70 px-6 py-6">
                <span className="mb-2 inline-flex rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  Recommended
                </span>
                <span className="block font-display text-lg font-bold text-ink">
                  VELTRIX DIGITAL
                </span>
                <span className="mt-1 block text-[11px] font-medium text-muted">
                  Bespoke engineering studio
                </span>
              </th>
              <th scope="col" className="px-6 py-6">
                <span className="font-display text-base font-semibold text-ink/75">
                  Traditional Agency
                </span>
                <span className="mt-1 block text-[11px] font-medium text-muted">
                  Layers of overhead
                </span>
              </th>
              <th scope="col" className="px-6 py-6">
                <span className="font-display text-base font-semibold text-ink/75">
                  Template Builders
                </span>
                <span className="mt-1 block text-[11px] font-medium text-muted">
                  DIY subscriptions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map(([feature, veltrix, agency, template], i) => (
              <motion.tr key={feature} variants={fadeUp} custom={i} className="group">
                <th
                  scope="row"
                  className="border-t border-hairline px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
                >
                  {feature}
                </th>
                <td className="border-t border-tintline bg-tint/50 px-6 py-5 text-sm font-medium text-ink">
                  {i === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-teal"
                    />
                  )}
                  <CellMark text={veltrix} column={0} />
                </td>
                <td className="border-t border-hairline px-6 py-5 text-sm text-muted">
                  <CellMark text={agency} column={1} />
                </td>
                <td className="border-t border-hairline px-6 py-5 text-sm text-muted">
                  <CellMark text={template} column={2} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </SectionShell>
  );
}
