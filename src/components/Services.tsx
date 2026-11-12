import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Code2, Gauge, Layers, Megaphone, TrendingUp } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '../lib/data';
import { EASE, fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { BorderBeam } from './magicui/border-beam';
import SpotlightCard from './reactbits/SpotlightCard';
import { SectionHeading, SectionShell } from './Section';
import { useScrollTo } from './SmoothScrollProvider';

const ICONS: Record<string, LucideIcon> = {
  apps: Code2,
  seo: Gauge,
  marketing: Megaphone,
  sales: TrendingUp,
};

function ServiceRow({
  service,
  dark,
  onSelect,
}: {
  service: (typeof SERVICES)[number];
  dark: boolean;
  onSelect: () => void;
}) {
  const { id, track, index, title, body, points } = service;
  const Icon = ICONS[id] ?? Code2;

  return (
    <motion.article
      variants={fadeUp}
      className={`group relative border-t px-5 py-6 transition-colors duration-300 first:border-t-0 sm:px-8 sm:py-7 ${
        dark
          ? 'border-white/10 hover:bg-white/[0.04]'
          : 'border-hairline hover:bg-soft/45'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-y-6 left-0 w-0.5 scale-y-0 rounded-full transition-transform duration-300 group-hover:scale-y-100 ${
          dark ? 'bg-accent' : 'bg-teal'
        }`}
      />
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
            dark
              ? 'border-white/15 bg-white/[0.06] text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white'
              : 'border-hairline bg-surface text-teal group-hover:border-teal group-hover:bg-teal group-hover:text-white'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`font-mono text-[11px] font-medium tracking-[0.14em] ${
                dark ? 'text-white/55' : 'text-muted'
              }`}
            >
              {index} · {track.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={onSelect}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                dark
                  ? 'bg-white/10 text-peach hover:bg-accent hover:text-white'
                  : 'bg-teal/10 text-teal hover:bg-teal hover:text-white'
              }`}
            >
              <span>Scope</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>

          <h3
            className={`mt-2 font-display text-xl font-bold tracking-tight md:text-2xl ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              dark ? 'text-white/70' : 'text-muted'
            }`}
          >
            {body}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {points.map((point) => (
              <li
                key={point}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-medium transition-colors ${
                  dark
                    ? 'border-white/10 bg-white/[0.05] text-white/85 group-hover:border-white/20'
                    : 'border-hairline bg-surface text-ink/80 group-hover:border-tintline'
                }`}
              >
                <CheckCircle2
                  className={`h-3 w-3 shrink-0 ${dark ? 'text-accent' : 'text-teal'}`}
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function TrackCard({
  title,
  subtitle,
  owner,
  trackIcon: TrackIcon,
  dark = false,
  services,
  onDiscuss,
}: {
  title: string;
  subtitle: string;
  owner: string;
  trackIcon: LucideIcon;
  dark?: boolean;
  services: readonly (typeof SERVICES)[number][];
  onDiscuss: () => void;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="h-full"
    >
      <SpotlightCard
        theme={dark ? 'dark' : 'light'}
        spotlightColor={dark ? '#FF6B4A' : '#147D7C'}
        intensity={dark ? 0.2 : 0.12}
        spotlightSize={290}
        borderGlow={dark ? 0.7 : 0.45}
        className={`relative flex h-full flex-col rounded-3xl !p-0 transition-shadow duration-500 ${
          dark ? 'text-white shadow-soft' : 'text-ink shadow-card hover:shadow-lift'
        }`}
        style={
          (dark
            ? {
                '--spotlight-card-surface': '#0a2e2f',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.12)',
              }
            : {
                '--spotlight-card-surface': '#fffdf8',
                '--spotlight-card-border': 'rgba(15, 61, 62, 0.1)',
              }) as CSSProperties
        }
      >
        {dark && (
          <BorderBeam
            size={120}
            duration={9}
            borderWidth={1.5}
            colorFrom="#FF6B4A"
            colorTo="#147D7C"
          />
        )}
        <div className={`h-1 w-full ${dark ? 'bg-accent' : 'bg-teal'}`} />
        <div
          className={`flex flex-wrap items-center justify-between gap-4 border-b px-5 py-5 sm:px-8 ${
            dark
              ? 'border-white/10 bg-white/[0.03]'
              : 'border-hairline bg-teal/[0.04]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                dark
                  ? 'border-white/15 bg-white/[0.08] text-accent'
                  : 'border-teal/20 bg-surface text-teal shadow-card'
              }`}
            >
              <TrackIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
                  dark ? 'text-peach' : 'text-muted'
                }`}
              >
                {subtitle}
              </p>
              <h3
                className={`mt-0.5 font-display text-lg font-bold sm:text-xl ${
                  dark ? 'text-white' : 'text-ink'
                }`}
              >
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onDiscuss}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
              dark
                ? 'border-white/15 bg-white/10 text-white hover:border-accent hover:bg-accent'
                : 'border-teal/25 bg-surface text-teal hover:bg-teal hover:text-white'
            }`}
          >
            <span>With {owner}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1">
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} dark={dark} onSelect={onDiscuss} />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Services() {
  const { open } = useBooking();
  const scrollTo = useScrollTo();
  const devServices = SERVICES.filter((s) => s.owner === 'Agnish');
  const growthServices = SERVICES.filter((s) => s.owner === 'Ayush');

  return (
    <SectionShell id="services" labelledBy="services-title" className="relative bg-soft/60">
      <SectionHeading
        id="services-title"
        eyebrow="What We Do"
        title={
          <>
            Two tracks, <span className="text-gradient">one studio</span>.
          </>
        }
        description="Hire us for web development, marketing and lead generation, or combine both into a single launch."
      />

      <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10">
        <TrackCard
          subtitle="Track 01 · Engineering"
          title="Web Development & Tech"
          owner="Agnish"
          trackIcon={Code2}
          services={devServices}
          onDiscuss={open}
        />
        <TrackCard
          subtitle="Track 02 · Acquisition"
          title="Marketing, Socials & Sales"
          owner="Ayush"
          trackIcon={Megaphone}
          dark
          services={growthServices}
          onDiscuss={open}
        />
      </div>

      {/* Combined engagement strip */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl border border-hairline bg-surface p-6 shadow-card sm:flex-row sm:items-center sm:px-8"
      >
        <div className="flex items-start gap-4 sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-tint text-accent">
            <Layers className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-base font-bold text-ink sm:text-lg">
              Need website development + lead growth together?
            </p>
            <p className="mt-0.5 text-sm text-muted">
              Agnish ships the build while Ayush sets up positioning, socials, and inquiry capture
              from day one.
            </p>
          </div>
        </div>
        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => scrollTo('#pricing')}
            className="flex-1 rounded-full border border-hairline bg-soft px-5 py-3 text-xs font-semibold text-ink transition-colors hover:border-ink/25 sm:flex-none"
          >
            See Plans
          </button>
          <button
            type="button"
            onClick={open}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-ink sm:flex-none"
          >
            Combine Both
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </SectionShell>
  );
}
