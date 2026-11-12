import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { CATEGORY_TABS, PROJECTS, type Project, type ProjectCategory } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';
import { Tilt } from './Tilt';

type Tab = (typeof CATEGORY_TABS)[number]['id'];

/** Abstract browser-chrome mockup rendered in pure CSS — no image payload. */
function DeviceMockup({ project }: { project: Project }) {
  const { mock, from, to } = project;
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-[#FBFCFE] shadow-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-stone-300" />
          <i className="h-2 w-2 rounded-full bg-stone-300" />
          <i className="h-2 w-2 rounded-full bg-stone-300" />
        </span>
        <span className="ml-2 flex-1 rounded-md bg-elevated px-3 py-1 text-[9px] font-medium tracking-wider text-muted">
          {project.id}.app
        </span>
      </div>
      {/* Screen */}
      <div
        className="relative aspect-[16/9] p-4"
        style={{
          background: `radial-gradient(120% 130% at 20% 0%, ${from}14 0%, transparent 55%), radial-gradient(120% 130% at 90% 100%, ${to}10 0%, transparent 50%), #ffffff`,
        }}
      >
        {mock === 'dashboard' && (
          <div className="flex h-full flex-col gap-3">
            <div className="flex gap-3">
              {['A', 'B', 'C'].map((k) => (
                <div key={k} className="h-12 flex-1 rounded-lg border border-stone-200/80 bg-stone-50" />
              ))}
            </div>
            <div className="relative flex-1 rounded-lg border border-stone-200/80 bg-white p-3">
              <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M0 50 C 25 46, 35 30, 55 32 S 90 44, 110 26 S 150 10, 175 16 L 200 8"
                  fill="none"
                  stroke={from}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.6, ease: EASE }}
                />
                <motion.path
                  d="M0 55 C 30 52, 50 44, 75 46 S 120 34, 145 36 S 180 28, 200 30"
                  fill="none"
                  stroke={to}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
                />
              </svg>
            </div>
          </div>
        )}

        {mock === 'commerce' && (
          <div className="flex h-full gap-3">
            <div className="flex flex-1 flex-col justify-between rounded-lg border border-stone-200/80 bg-white p-3">
              <div className="space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-stone-200" />
                <div className="h-2 w-1/2 rounded-full bg-stone-200" />
                <div className="h-2 w-2/3 rounded-full" style={{ background: `${from}55` }} />
              </div>
              <div
                className="h-7 w-24 self-start rounded-full"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
            </div>
            <div className="flex w-[42%] flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 rounded-lg border border-stone-200/80 bg-stone-50" />
              ))}
            </div>
          </div>
        )}

        {mock === 'landing' && (
          <div className="flex h-full flex-col items-center justify-center gap-2.5">
            <div className="h-2.5 w-1/3 rounded-full bg-stone-300" />
            <div className="h-2 w-1/2 rounded-full bg-stone-200" />
            <div className="mt-2 flex gap-2">
              <div
                className="h-6 w-20 rounded-full"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
              <div className="h-6 w-20 rounded-full border border-stone-300 bg-white" />
            </div>
          </div>
        )}

        {/* Specular sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-[-60%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[60%]"
        />
      </div>
    </div>
  );
}

/** Card inner content — the motion wrapper lives in the grid map so that
 *  AnimatePresence always sees motion elements as direct children. */
function CardInner({ project }: { project: Project }) {
  return (
    <Tilt className="relative flex h-full flex-col rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-[box-shadow,border-color] duration-500 group-hover:border-tintline group-hover:shadow-lift">
      <DeviceMockup project={project} />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          {project.categoryLabel} · {project.year}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-live/10 px-3 py-1 text-[11px] font-semibold text-live">
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
          {project.result}
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

      {/* Hover action */}
      <div className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-display text-sm font-semibold text-white shadow-lift transition-colors hover:bg-ink"
          aria-label={`View live architecture of ${project.title}`}
        >
          View Live Architecture
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Tilt>
  );
}

export function Work() {
  const [tab, setTab] = useState<Tab>('all');
  const visible =
    tab === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === (tab as ProjectCategory));

  return (
    <SectionShell id="work" labelledBy="work-title" className="bg-soft/60">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-title"
          eyebrow="Selected Work"
          title={
            <>
              Proof, not <span className="text-gradient">promises</span>.
            </>
          }
          description="A slice of recent VELTRIX DIGITAL engagements — every project engineered end-to-end, from keyword architecture to production deployment."
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
              className={`relative rounded-full px-4 py-2.5 text-[12px] font-semibold tracking-wide transition-colors duration-300 ${
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

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        <AnimatePresence>
          {visible.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group relative h-full"
            >
              <CardInner project={project} />
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
