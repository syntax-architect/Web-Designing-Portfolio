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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-tintline hover:shadow-lift"
    >
      {/* Soft hover corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, ${founder.glow}, transparent)` }}
      />

      {/* Top header: 1:1 studio portrait + identity */}
      <div className="relative flex flex-col gap-5 border-b border-hairline bg-soft/45 p-6 sm:flex-row sm:items-center md:p-7">
        {/* 1:1 deep-teal studio frame matching the portrait's cool/warm rim lighting */}
        <div
          className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl shadow-lift ring-1 ring-ink/15 sm:h-44 sm:w-44"
          style={{
            background:
              'radial-gradient(circle at 82% 24%, rgba(255, 107, 74, 0.28) 0%, transparent 52%), radial-gradient(circle at 18% 30%, rgba(20, 125, 124, 0.45) 0%, transparent 58%), linear-gradient(155deg, #072223 0%, #0F3D3E 58%, #145353 100%)',
          }}
        >
          <img
            src={founder.image}
            alt={`${founder.name} — ${founder.role}`}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#072223]/55 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
          />
        </div>

        {/* Name, role, badge & socials */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/85 shadow-[0_1px_2px_rgb(15_61_62/0.04)]">
              <BadgeIcon className="h-3.5 w-3.5" style={{ color: founder.accent }} aria-hidden="true" />
              {founder.roleTag}
            </span>
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-muted">
              {founder.indexLabel}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {founder.name}
          </h3>
          <p className="mt-1 text-[13px] font-medium leading-snug text-muted">{founder.role}</p>

          <div className="mt-4 flex items-center gap-2">
            {founder.socials.map((s) => (
              <SocialBadge key={s.label} social={s} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom body: bio, full-width 2x2 focus grid & ownership footer */}
      <div className="relative flex flex-1 flex-col justify-between p-6 md:p-7">
        <div>
          <p className="text-sm leading-relaxed text-muted">{founder.bio}</p>

          <ul
            className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            aria-label={`${founder.name}'s focus areas`}
          >
            {founder.focus.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-hairline bg-soft/75 px-3.5 py-2.5 text-xs font-medium text-ink/85"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: founder.accent }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-hairline pt-4 text-xs font-medium text-muted">
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
