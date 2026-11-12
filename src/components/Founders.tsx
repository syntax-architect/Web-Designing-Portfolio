import { motion } from 'motion/react';
import { Code2, Quote, TrendingUp } from 'lucide-react';
import agnishImg from '../assets/agnish.png';
import ayushImg from '../assets/ayush.png';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

interface FounderSocial {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x';
}

interface Founder {
  indexLabel: string;
  name: string;
  role: string;
  roleTag: string;
  bio: string;
  focus: string[];
  highlight: string;
  image: string;
  accent: string;
  glow: string;
  badgeIcon: 'code' | 'growth';
  socials: FounderSocial[];
}

const FOUNDERS: Founder[] = [
  {
    indexLabel: '01 · BUILD',
    name: 'Agnish',
    role: 'Co-Founder · Web Development & Architecture',
    roleTag: 'Web Engineering',
    bio: 'Builds every website and web application from the ground up — responsive interfaces, custom backends, database architecture, and sub-second performance.',
    focus: [
      'Full-Stack Web Dev',
      'Frontend & Motion',
      'APIs & Databases',
      'Technical SEO & Speed',
    ],
    highlight: 'Owns code, architecture & deployment',
    image: agnishImg,
    accent: '#147D7C',
    glow: 'rgba(20, 125, 124, 0.22)',
    badgeIcon: 'code',
    socials: [
      { label: 'Agnish on GitHub', href: 'https://github.com', icon: 'github' },
      { label: 'Agnish on LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    ],
  },
  {
    indexLabel: '02 · GROWTH',
    name: 'Ayush',
    role: 'Co-Founder · Marketing, Sales & Lead Generation',
    roleTag: 'Marketing & Sales',
    bio: 'Drives pipeline, brand visibility, and revenue — social media growth, outbound & inbound lead generation, client acquisition, and conversion strategy.',
    focus: [
      'Social Media Growth',
      'Lead Generation',
      'Sales & Client Strategy',
      'Campaign Marketing',
    ],
    highlight: 'Owns marketing, socials & client pipeline',
    image: ayushImg,
    accent: '#FF6B4A',
    glow: 'rgba(255, 107, 74, 0.22)',
    badgeIcon: 'growth',
    socials: [
      { label: 'Ayush on LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { label: 'Ayush on X', href: 'https://x.com', icon: 'x' },
    ],
  },
];

function SocialBadge({ social }: { social: FounderSocial }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={social.label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-canvas/70 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface hover:text-ink hover:shadow-card"
    >
      {social.icon === 'github' && <GithubIcon className="h-4 w-4" />}
      {social.icon === 'linkedin' && <LinkedinIcon className="h-4 w-4" />}
      {social.icon === 'x' && <XIcon className="h-3.5 w-3.5" />}
    </a>
  );
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const BadgeIcon = founder.badgeIcon === 'code' ? Code2 : TrendingUp;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative grid overflow-hidden rounded-3xl border border-hairline bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-tintline hover:shadow-lift sm:grid-cols-[220px_1fr]"
    >
      {/* Portrait studio stage — blends cutout seamlessly into warm ivory + brand aura */}
      <div className="relative flex h-64 items-end justify-center overflow-hidden border-b border-hairline bg-gradient-to-b from-soft via-elevated/60 to-soft sm:h-auto sm:min-h-[340px] sm:border-b-0 sm:border-r">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle at 50% 62%, ${founder.glow} 0%, transparent 72%)`,
          }}
        />

        <span className="absolute left-4 top-4 z-10 rounded-full border border-hairline bg-surface/90 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink/75 backdrop-blur-sm">
          {founder.indexLabel}
        </span>

        <img
          src={founder.image}
          alt={`${founder.name} — ${founder.role}`}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className="relative z-10 h-[92%] w-full object-contain object-bottom drop-shadow-[0_12px_22px_rgba(15,61,62,0.16)] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Details column */}
      <div className="relative flex flex-col justify-between p-7 md:p-8">
        {/* Soft hover corner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(closest-side, ${founder.glow}, transparent)` }}
        />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/80">
              <BadgeIcon className="h-3.5 w-3.5" style={{ color: founder.accent }} aria-hidden="true" />
              {founder.roleTag}
            </span>
            <div className="flex items-center gap-2">
              {founder.socials.map((s) => (
                <SocialBadge key={s.label} social={s} />
              ))}
            </div>
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {founder.name}
          </h3>
          <p className="mt-1 text-[13px] font-medium text-muted">{founder.role}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{founder.bio}</p>

          <ul
            className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2"
            aria-label={`${founder.name}'s focus areas`}
          >
            {founder.focus.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl border border-hairline bg-soft/70 px-3 py-2 text-[11.5px] font-medium text-ink/85"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: founder.accent }}
                />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-6 flex items-center gap-2 border-t border-hairline pt-4 text-[11px] font-medium text-muted">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: founder.accent }}
          />
          {founder.highlight}
        </div>
      </div>
    </motion.article>
  );
}

export function Founders() {
  return (
    <SectionShell id="founders" labelledBy="founders-title">
      <SectionHeading
        id="founders-title"
        eyebrow="The Founders"
        title={
          <>
            Two founders. <span className="text-gradient">Zero handoffs.</span>
          </>
        }
        description="Engineering meets growth — Agnish builds the entire web platform from code to launch, while Ayush drives the marketing, social media, and lead pipeline."
        align="center"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 lg:grid-cols-2"
      >
        {FOUNDERS.map((f, i) => (
          <FounderCard key={f.name} founder={f} index={i} />
        ))}
      </motion.div>

      {/* Shared quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-tintline bg-gradient-to-br from-tint/80 via-surface to-soft p-10 text-center shadow-card"
      >
        <Quote className="mx-auto h-6 w-6 text-accent" aria-hidden="true" />
        <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
          “We don’t build generic web templates; we engineer digital revenue engines.”
        </p>
        <footer className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
          — Agnish &amp; Ayush, Founders of VELTRIX DIGITAL
        </footer>
      </motion.blockquote>
    </SectionShell>
  );
}
