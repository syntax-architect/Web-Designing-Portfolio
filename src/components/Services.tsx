import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Gauge, Megaphone, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES } from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { SectionHeading, SectionShell } from './Section';

const ICONS: Record<string, LucideIcon> = {
  apps: Code2,
  seo: Gauge,
  marketing: Megaphone,
  sales: TrendingUp,
};

function ServiceRow({
  id,
  owner,
  track,
  index,
  title,
  body,
  points,
}: (typeof SERVICES)[number]) {
  const Icon = ICONS[id] ?? Code2;
  const isBuild = owner === 'Agnish';

  return (
    <motion.article
      variants={fadeUp}
      className="group relative border-t border-hairline px-6 py-6 transition-colors duration-300 first:border-t-0 hover:bg-soft/45 sm:px-8 sm:py-7"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-y-6 left-0 w-0.5 scale-y-0 rounded-full transition-transform duration-300 group-hover:scale-y-100 ${
          isBuild ? 'bg-teal' : 'bg-accent'
        }`}
      />
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline transition-all duration-300 group-hover:scale-105 ${
            isBuild
              ? 'bg-surface text-teal group-hover:border-teal group-hover:bg-teal group-hover:text-white'
              : 'bg-surface text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted">
              {index} · {track.toUpperCase()}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                isBuild ? 'bg-teal/10 text-teal' : 'bg-accent/10 text-accent'
              }`}
            >
              Led by {owner}
            </span>
          </div>

          <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {points.map((point) => (
              <li
                key={point}
                className="rounded-lg border border-hairline bg-surface px-3 py-1 text-[11px] font-medium text-ink/80 transition-colors group-hover:border-tintline"
              >
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
  tone,
  services,
  onDiscuss,
}: {
  title: string;
  subtitle: string;
  owner: string;
  tone: 'teal' | 'accent';
  services: readonly (typeof SERVICES)[number][];
  onDiscuss: () => void;
}) {
  const isTeal = tone === 'teal';
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface/90 shadow-card transition-shadow duration-500 hover:shadow-lift"
    >
      <div className={`h-1 w-full ${isTeal ? 'bg-teal' : 'bg-accent'}`} />
      <div
        className={`flex items-center justify-between gap-4 border-b border-hairline px-6 py-5 sm:px-8 ${
          isTeal ? 'bg-teal/[0.04]' : 'bg-accent/[0.04]'
        }`}
      >
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            {subtitle}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onDiscuss}
          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
            isTeal
              ? 'border-teal/25 bg-surface text-teal hover:bg-teal hover:text-white'
              : 'border-accent/25 bg-surface text-accent hover:bg-accent hover:text-white'
          }`}
        >
          {owner}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1">
        {services.map((service) => (
          <ServiceRow key={service.id} {...service} />
        ))}
      </div>
    </motion.div>
  );
}

export function Services() {
  const { open } = useBooking();
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
          tone="teal"
          services={devServices}
          onDiscuss={open}
        />
        <TrackCard
          subtitle="Track 02 · Acquisition"
          title="Marketing, Socials & Sales"
          owner="Ayush"
          tone="accent"
          services={growthServices}
          onDiscuss={open}
        />
      </div>
    </SectionShell>
  );
}
