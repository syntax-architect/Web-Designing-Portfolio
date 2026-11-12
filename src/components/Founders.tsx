import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Mail, Phone, Quote, TrendingUp } from 'lucide-react';
import type { CSSProperties } from 'react';
import agnishImg from '../assets/agnish.png';
import ayushImg from '../assets/ayush.png';
import {
  AGNISH_GITHUB_HANDLE,
  AGNISH_GITHUB_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '../lib/data';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { BorderBeam } from './magicui/border-beam';
import { DotPattern } from './magicui/dot-pattern';
import SplitText from './reactbits/SplitText';
import SpotlightCard from './reactbits/SpotlightCard';
import { SectionHeading, SectionShell } from './Section';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

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
  direct?: {
    githubLabel?: string;
    githubHref?: string;
    email?: string;
    phone?: string;
    phoneHref?: string;
  };
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
      { label: 'Agnish on GitHub (@syntax-architect)', href: AGNISH_GITHUB_URL, icon: 'github' },
      { label: 'Agnish on LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    ],
    direct: {
      githubLabel: `@${AGNISH_GITHUB_HANDLE}`,
      githubHref: AGNISH_GITHUB_URL,
      email: CONTACT_EMAIL,
      phone: CONTACT_PHONE,
      phoneHref: CONTACT_PHONE_HREF,
    },
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

function FounderCard({
  founder,
  index,
  onBook,
}: {
  founder: Founder;
  index: number;
  onBook: () => void;
}) {
  const BadgeIcon = founder.badgeIcon === 'code' ? Code2 : TrendingUp;
  const isBuild = founder.badgeIcon === 'code';

  return (
    <motion.article variants={fadeUp} custom={index} className="h-full">
      <SpotlightCard
        theme="light"
        spotlightColor={founder.accent}
        intensity={0.14}
        spotlightSize={300}
        borderGlow={0.55}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl !p-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
        style={
          {
            '--spotlight-card-surface': '#fffdf8',
            '--spotlight-card-border': 'rgba(15, 61, 62, 0.1)',
          } as CSSProperties
        }
      >
        {/* Full-Width Illuminated Studio Portrait Stage */}
        <div
          className="relative flex h-[300px] w-full items-end justify-center overflow-hidden bg-deep sm:h-[340px]"
          style={{
            background: isBuild
              ? 'radial-gradient(circle at 80% 25%, rgba(255, 107, 74, 0.22) 0%, transparent 48%), radial-gradient(circle at 22% 35%, rgba(20, 125, 124, 0.55) 0%, transparent 60%), linear-gradient(160deg, #05191a 0%, #0a2e2f 55%, #124849 100%)'
              : 'radial-gradient(circle at 22% 28%, rgba(20, 125, 124, 0.35) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255, 107, 74, 0.36) 0%, transparent 58%), linear-gradient(160deg, #05191a 0%, #0a2e2f 55%, #153839 100%)',
          }}
        >
          <DotPattern
            width={22}
            height={22}
            cr={1}
            className="text-white/15 [mask-image:radial-gradient(280px_circle_at_50%_45%,white,transparent)]"
          />

          <BorderBeam
            size={120}
            duration={9}
            borderWidth={1.5}
            colorFrom={isBuild ? '#147D7C' : '#FF6B4A'}
            colorTo={isBuild ? '#6FB5B3' : '#FF9E7A'}
          />

          {/* Layered Backlit Studio Halo behind silhouette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-2xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 sm:h-64 sm:w-64"
            style={{
              background: `radial-gradient(circle, ${founder.accent}55 0%, transparent 70%)`,
            }}
          />

          {/* Crisp studio spotlight ring framing behind head/shoulders */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[52%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-105 sm:h-60 sm:w-60"
          />

          {/* Architectural Oversized Typography behind the transparent PNG */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[24%] select-none text-center font-display text-[clamp(4rem,10vw,6.75rem)] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.07] transition-transform duration-700 group-hover:scale-[1.03]"
          >
            {founder.name}
          </span>

          {/* Top Floating Studio Chips */}
          <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between gap-2 sm:inset-x-6 sm:top-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/25 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-white/90 backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: founder.accent }}
                aria-hidden="true"
              />
              {founder.indexLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
              <BadgeIcon className="h-3.5 w-3.5" style={{ color: founder.accent }} aria-hidden="true" />
              {founder.roleTag}
            </span>
          </div>

          {/* Transparent Studio Cutout Portrait anchored cleanly to bottom edge */}
          <img
            src={founder.image}
            alt={`${founder.name} — ${founder.role}`}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="relative z-10 h-[86%] w-auto max-w-[92%] origin-bottom object-contain object-bottom drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-[88%]"
          />

          {/* Subtle bottom floor shadow blend */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t from-[#05191a]/80 via-[#05191a]/25 to-transparent"
          />
        </div>

        {/* Identity Strip & Focus Breakdown */}
        <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6 md:p-7">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {founder.name}
                </h3>
                <p className="mt-1 text-[13px] font-medium text-muted">{founder.role}</p>
              </div>
              <div className="flex items-center gap-2">
                {founder.socials.map((s) => (
                  <SocialBadge key={s.label} social={s} />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">{founder.bio}</p>

            <ul
              className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5"
              aria-label={`${founder.name}'s focus areas`}
            >
              {founder.focus.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 rounded-xl border border-hairline bg-soft/75 px-3.5 py-2.5 text-xs font-medium text-ink/85 transition-colors hover:border-tintline hover:bg-surface"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: founder.accent }}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            {founder.direct && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {founder.direct.githubHref && founder.direct.githubLabel && (
                  <a
                    href={founder.direct.githubHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] font-medium text-ink transition-colors hover:border-teal/50 hover:text-teal"
                  >
                    <GithubIcon className="h-3.5 w-3.5 text-teal" />
                    <span>{founder.direct.githubLabel}</span>
                  </a>
                )}
                {founder.direct.phone && founder.direct.phoneHref && (
                  <a
                    href={founder.direct.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span>{founder.direct.phone}</span>
                  </a>
                )}
                {founder.direct.email && (
                  <a
                    href={`mailto:${founder.direct.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span>{founder.direct.email}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-hairline pt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: founder.accent }}
              />
              {founder.highlight}
            </div>
            <button
              type="button"
              onClick={onBook}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-ink transition-colors hover:text-accent"
            >
              <span>Talk to {founder.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </SpotlightCard>
    </motion.article>
  );
}

export function Founders() {
  const { open } = useBooking();

  return (
    <SectionShell id="founders" labelledBy="founders-title">
      <SectionHeading
        id="founders-title"
        eyebrow="The Team"
        title={
          <>
            Meet the people <span className="text-gradient">behind the work</span>.
          </>
        }
        description="You talk directly to the developer writing the code and the marketer running your growth. No account managers in the middle."
        align="center"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"
      >
        {FOUNDERS.map((f, i) => (
          <FounderCard key={f.name} founder={f} index={i} onBook={open} />
        ))}
      </motion.div>

      {/* Shared note with GSAP SplitText word rise */}
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-tintline bg-gradient-to-br from-tint/80 via-surface to-soft p-8 text-center shadow-card sm:p-10"
      >
        <Quote className="mx-auto h-6 w-6 text-accent" aria-hidden="true" />
        <SplitText
          text="“A great website means nothing if nobody sees it. Good engineering and good marketing belong together.”"
          tag="p"
          splitType="words"
          effect="rise"
          mask
          trigger="view"
          rootMargin="-30px"
          delay={28}
          duration={0.85}
          textAlign="center"
          className="mt-4 block font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl md:text-3xl"
        />
        <footer className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
          Agnish &amp; Ayush · VELTRIX DIGITAL
        </footer>
      </motion.blockquote>
    </SectionShell>
  );
}
