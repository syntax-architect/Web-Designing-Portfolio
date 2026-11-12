import { motion } from 'motion/react';
import { Compass, Gauge, Search } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SectionShell } from './Section';

const PRINCIPLES = [
  {
    icon: Gauge,
    title: 'Engineering over templates',
    body: 'Every line of VELTRIX DIGITAL code is written for you. No page builders, no inherited plugin debt — architecture you own end to end.',
  },
  {
    icon: Compass,
    title: 'Design that converts',
    body: 'Aesthetics are never decoration. Every layout decision is argued in conversions, clarity and trust — then measured.',
  },
  {
    icon: Search,
    title: 'Search-first architecture',
    body: 'Semantic structure, schema and speed are poured into the foundation on day one — not bolted on after launch.',
  },
];

export function Philosophy() {
  return (
    <SectionShell id="philosophy" labelledBy="philosophy-title">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-3"
      >
        {PRINCIPLES.map((p) => (
          <motion.article
            key={p.title}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-tintline hover:shadow-lift"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
              <p.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
              {p.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
