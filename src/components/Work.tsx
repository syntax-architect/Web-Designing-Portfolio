import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Code2, Expand, TrendingUp, X } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { CATEGORY_TABS, PROJECTS, type Project, type ProjectCategory } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import SpotlightCard from './reactbits/SpotlightCard';
import { SectionHeading, SectionShell } from './Section';
import { useLenis } from './SmoothScrollProvider';
import { Tilt } from './Tilt';

type Tab = (typeof CATEGORY_TABS)[number]['id'];

/** Miniature UI preview rendered cleanly in code — fast load, sharp at any DPI. */
function DeviceMockup({ project }: { project: Project }) {
  const { mock, from, to } = project;
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-[#FBFCFE] shadow-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-surface px-3.5 py-2">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-coral-deep/50" />
          <i className="h-2 w-2 rounded-full bg-amber-400/60" />
          <i className="h-2 w-2 rounded-full bg-teal/55" />
        </span>
        <span className="ml-2 flex-1 rounded-md bg-elevated/80 px-2.5 py-0.5 font-mono text-[9px] font-medium tracking-wide text-muted">
          {project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.app
        </span>
      </div>
      {/* Screen */}
      <div
        className="relative aspect-[16/9] overflow-hidden p-3.5"
        style={{
          background: `radial-gradient(120% 130% at 15% 0%, ${from}16 0%, transparent 55%), radial-gradient(120% 130% at 95% 100%, ${to}14 0%, transparent 50%), #ffffff`,
        }}
      >
        {mock === 'dashboard' && (
          <div className="flex h-full gap-2.5">
            {/* Mini sidebar */}
            <div className="hidden w-11 shrink-0 flex-col justify-between rounded-lg border border-stone-200/80 bg-stone-50/90 p-2 sm:flex">
              <span className="h-3 w-3 rounded" style={{ background: from }} />
              <div className="space-y-1.5">
                <span className="block h-1.5 w-full rounded-full bg-stone-300" />
                <span className="block h-1.5 w-4/5 rounded-full bg-stone-200" />
                <span className="block h-1.5 w-full rounded-full bg-stone-200" />
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            </div>
            {/* Main canvas */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Active', val: '1,284' },
                  { label: 'Latency', val: '38ms' },
                  { label: 'Uptime', val: '99.9%' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-stone-200/80 bg-white px-2.5 py-1.5"
                  >
                    <span className="block text-[7px] font-semibold uppercase tracking-wider text-stone-400">
                      {stat.label}
                    </span>
                    <span className="mt-0.5 block font-display text-[11px] font-bold text-ink">
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative flex-1 rounded-lg border border-stone-200/80 bg-white p-2.5">
                <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`fill-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={from} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={from} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 50 C 25 46, 35 30, 55 32 S 90 44, 110 26 S 150 10, 175 16 L 200 8 L 200 60 L 0 60 Z"
                    fill={`url(#fill-${project.id})`}
                  />
                  <motion.path
                    d="M0 50 C 25 46, 35 30, 55 32 S 90 44, 110 26 S 150 10, 175 16 L 200 8"
                    fill="none"
                    stroke={from}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.5, ease: EASE }}
                  />
                  <motion.path
                    d="M0 55 C 30 52, 50 44, 75 46 S 120 34, 145 36 S 180 28, 200 30"
                    fill="none"
                    stroke={to}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.65"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.5, ease: EASE, delay: 0.25 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {mock === 'commerce' && (
          <div className="flex h-full gap-2.5">
            <div className="flex flex-1 flex-col justify-between rounded-lg border border-stone-200/80 bg-white p-3">
              <div>
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white"
                  style={{ background: from }}
                >
                  New Drop
                </span>
                <p className="mt-2 font-display text-xs font-bold text-ink">
                  Signature Edition
                </p>
                <p className="mt-0.5 text-[9px] text-stone-500">Free express shipping</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: from }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: to }} />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink" />
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-[8px] font-semibold text-white"
                  style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                >
                  Add to Bag
                </span>
              </div>
            </div>
            <div
              className="relative flex w-[42%] flex-col items-center justify-center overflow-hidden rounded-lg border border-stone-200/80 p-2"
              style={{ background: `linear-gradient(145deg, ${from}22, ${to}30)` }}
            >
              <div
                className="h-12 w-12 rounded-xl shadow-card"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              />
              <span className="mt-2 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-semibold text-ink">
                In Stock
              </span>
            </div>
          </div>
        )}

        {mock === 'landing' && (
          <div className="flex h-full flex-col justify-between rounded-lg border border-stone-200/80 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] font-bold text-ink">Campaign Hub</span>
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-semibold text-white"
                style={{ background: from }}
              >
                Book Now
              </span>
            </div>
            <div className="my-auto text-center">
              <p className="font-display text-xs font-bold text-ink">
                Convert social clicks into booked calls
              </p>
              <p className="mt-1 text-[9px] text-stone-500">
                Fast landing flow · Direct WhatsApp &amp; calendar routing
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['Hook', 'Offer', 'Booking'].map((step, idx) => (
                <div
                  key={step}
                  className="rounded-md border border-stone-200/80 bg-stone-50 px-2 py-1 text-center text-[8px] font-semibold text-ink"
                >
                  0{idx + 1} · {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specular sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-[-60%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[60%]"
        />
      </div>
    </div>
  );
}

/** Card inner content — the motion wrapper lives in the grid map so that
 *  AnimatePresence always sees motion elements as direct children. */
function CardInner({
  project,
  onAction,
  onInspect,
}: {
  project: Project;
  onAction: () => void;
  onInspect: () => void;
}) {
  return (
    <Tilt className="h-full">
      <SpotlightCard
        theme="light"
        spotlightColor={project.from}
        intensity={0.11}
        spotlightSize={250}
        borderGlow={0.45}
        className="relative flex h-full flex-col rounded-2xl !p-5 transition-[box-shadow,border-color] duration-500 group-hover:shadow-lift"
        style={
          {
            '--spotlight-card-surface': '#fffdf8',
            '--spotlight-card-border': 'rgba(15, 61, 62, 0.1)',
          } as CSSProperties
        }
      >
        <div className="relative">
          <DeviceMockup project={project} />
          <button
            type="button"
            onClick={onInspect}
            aria-label={`Inspect build details for ${project.title}`}
            className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/95 px-2.5 py-1 text-[10px] font-semibold text-ink shadow-card backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <Expand className="h-3 w-3" aria-hidden="true" />
            <span>Specs</span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {project.categoryLabel} · {project.year}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-live/10 px-3 py-1 text-[11px] font-semibold text-live">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            {project.tag}
          </span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-elevated px-2.5 py-1 text-[10px] font-medium tracking-wide text-ink/70"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Mobile tap CTA (always accessible on touch devices) */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:hidden">
          <button
            type="button"
            onClick={onInspect}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-hairline bg-surface py-3 font-display text-xs font-semibold text-ink transition-colors active:scale-[0.98]"
          >
            Inspect Scope
          </button>
          <button
            type="button"
            onClick={onAction}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-accent py-3 font-display text-xs font-semibold text-white transition-colors active:scale-[0.98]"
            aria-label={`Request something similar to ${project.title}`}
          >
            Build Similar
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Desktop hover action */}
        <div className="pointer-events-none absolute inset-x-5 bottom-5 hidden translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <button
            type="button"
            onClick={onAction}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-display text-sm font-semibold text-white shadow-lift transition-colors hover:bg-ink"
            aria-label={`Request something similar to ${project.title}`}
          >
            Build Something Similar
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </SpotlightCard>
    </Tilt>
  );
}

function ProjectModal({
  project,
  onClose,
  onBook,
}: {
  project: Project;
  onClose: () => void;
  onBook: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} concept breakdown`}
    >
      <motion.button
        type="button"
        aria-label="Close breakdown"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } }}
        exit={{ opacity: 0, y: 18, scale: 0.96, transition: { duration: 0.25, ease: EASE } }}
        className="relative z-10 max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-hairline bg-surface p-6 shadow-lift sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {project.categoryLabel} · {project.tag}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-ink/30 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          <DeviceMockup project={project} />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-soft/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              Agnish · Engineering Track
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
              Custom UI &amp; responsive layout built with clean code, fast asset delivery, and
              SEO-structured markup.
            </p>
          </div>
          <div className="rounded-2xl border border-hairline bg-soft/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Ayush · Growth &amp; Leads
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
              Conversion hierarchy, landing page hooks, and direct form/calendar capture designed to
              turn visitors into inquiries.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-elevated px-2.5 py-1 text-[10px] font-medium text-ink/75"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook();
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Build Something Similar
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const [tab, setTab] = useState<Tab>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const { open } = useBooking();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (selected) lenis.stop();
    else lenis.start();
  }, [selected, lenis]);

  const visible =
    tab === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === (tab as ProjectCategory));

  return (
    <SectionShell id="work" labelledBy="work-title" className="bg-soft/60">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <SectionHeading
          id="work-title"
          eyebrow="Selected Work"
          title={
            <>
              Studio concepts &amp; <span className="text-gradient">builds</span>.
            </>
          }
          description="Examples of the interfaces, storefronts, and lead-generation funnels we design and ship for clients."
        />

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {CATEGORY_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-wide transition-colors duration-300 sm:px-4 sm:py-2.5 sm:text-[12px] ${
                tab === t.id ? 'text-white' : 'border border-hairline bg-surface text-muted hover:border-ink/25 hover:text-ink'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="work-tab-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-ink shadow-card"
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.42, ease: EASE, delay: i * 0.04 }}
              className="group relative h-full"
            >
              <CardInner
                project={project}
                onAction={open}
                onInspect={() => setSelected(project)}
              />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <ProjectModal
                project={selected}
                onClose={() => setSelected(null)}
                onBook={open}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </SectionShell>
  );
}
