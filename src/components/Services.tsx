import { motion } from 'motion/react';
import { Boxes, Code2, LayoutDashboard, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

const ICONS: Record<string, LucideIcon> = {
  apps: Code2,
  portals: LayoutDashboard,
  seo: Search,
  motion: Boxes,
};

/**
 * Service card with a cursor-lit border ring and soft spotlight,
 * both driven by CSS vars set on pointermove (zero re-renders).
 */
function ServiceCard({ id, index, title, body, points }: (typeof SERVICES)[number]) {
  const Icon = ICONS[id] ?? Code2;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      variants={fadeUp}
      onPointerMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-tintline hover:shadow-lift"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(255,107,74,0.08), transparent 65%)',
        }}
      />
      {/* Cursor-lit border ring (1px via mask-composite) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: '1px',
          background:
            'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,107,74,0.6), rgba(20,125,124,0.25) 45%, transparent 70%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-mono text-xs font-medium text-muted/60">{index}</span>
        </div>

        <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>

        <ul className="mt-6 space-y-2.5 border-t border-hairline pt-5">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-[12px] font-medium text-ink/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <SectionShell id="services" labelledBy="services-title" className="relative bg-soft/60">
      <SectionHeading
        id="services-title"
        eyebrow="Solutions & Services"
        title={
          <>
            Every scale. <span className="text-gradient">Every industry.</span>
          </>
        }
        description="Four disciplines, one integrated VELTRIX DIGITAL build — engineered to work as a system, not a menu of add-ons."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
