import { motion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { CONTACT_EMAIL, NAV_LINKS, SERVICES } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { useBooking } from './BookingModal';
import { BorderBeam } from './magicui/border-beam';
import { DotPattern } from './magicui/dot-pattern';
import { ShimmerButton } from './magicui/shimmer-button';
import SpotlightCard from './reactbits/SpotlightCard';
import { useScrollTo } from './SmoothScrollProvider';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

function StudioClock() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/80">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="tabular-nums">{time}</span>
      <span className="text-white/50">IST · India</span>
    </span>
  );
}

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/syntax-architect', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
  { label: 'X (Twitter)', href: 'https://x.com', Icon: XIcon },
];

export function Footer() {
  const scrollTo = useScrollTo();
  const { open } = useBooking();
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep px-4 pb-10 pt-16 text-white sm:px-6 md:px-10 md:pt-20 lg:px-14">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.14),transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-[-10rem] h-[360px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(20,125,124,0.22),transparent)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* Featured Spotlight CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <SpotlightCard
            theme="dark"
            spotlightColor="#FF6B4A"
            intensity={0.18}
            spotlightSize={320}
            borderGlow={0.65}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-11"
            style={
              {
                '--spotlight-card-surface': 'rgba(255, 255, 255, 0.035)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.12)',
              } as CSSProperties
            }
          >
            <DotPattern
              width={26}
              height={26}
              cr={1}
              className="text-white/10 [mask-image:radial-gradient(360px_circle_at_90%_20%,white,transparent)]"
            />
            <BorderBeam
              size={140}
              duration={9}
              borderWidth={1.5}
              colorFrom="#FF6B4A"
              colorTo="#147D7C"
            />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-peach">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Ready when you are
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                  Have a project in mind? <span className="text-gradient">Let’s talk</span>.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                  Tell us whether you need custom web engineering from Agnish, marketing and lead
                  generation from Ayush, or both built together.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <ShimmerButton
                  type="button"
                  onClick={open}
                  background="#ff6b4a"
                  shimmerColor="#fff7ed"
                  shimmerSize="0.08em"
                  shimmerDuration="2.8s"
                  borderRadius="9999px"
                  className="group inline-flex w-full items-center justify-center gap-2.5 border-white/20 px-7 py-4 font-display text-sm font-semibold text-white shadow-lift transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
                >
                  Book a Strategy Call
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ShimmerButton>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-4 text-xs font-semibold text-white/90 transition-colors hover:border-accent/60 hover:bg-white/10 sm:w-auto"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                      <span>Copied email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-white/60" aria-hidden="true" />
                      <span>{CONTACT_EMAIL}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Architectural Footer Grid */}
        <nav
          aria-label="Footer"
          className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14"
        >
          {/* Studio Identity */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                  <path d="M4 5l8 14L20 5h-3.4L12 13.4 7.4 5H4z" fill="#FF6B4A" />
                </svg>
              </span>
              <span className="font-display text-base font-bold tracking-[0.14em] text-white">
                VELTRIX DIGITAL
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Two-founder digital studio pairing full-stack web engineering with organic socials,
              outbound campaigns, and conversion growth.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => scrollTo('#founders')}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80 transition-colors hover:border-teal/70 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                Agnish · Web Dev
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#founders')}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80 transition-colors hover:border-accent/70 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Ayush · Marketing &amp; Sales
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Site Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link, idx) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2.5 text-sm font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-[10px] text-white/35 transition-colors group-hover:text-accent">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Capabilities
            </h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo('#services')}
                    className="group flex items-center gap-2.5 text-left text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        s.owner === 'Agnish' ? 'bg-teal' : 'bg-accent'
                      }`}
                    />
                    <span className="transition-colors group-hover:text-accent">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Studio Desk */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Direct Desk
            </h3>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 truncate text-sm font-medium text-white transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="truncate">{CONTACT_EMAIL}</span>
              </a>
              <p className="mt-2.5 text-xs leading-relaxed text-white/55">
                Working with startups and founders across India and worldwide. Typical reply within
                24 hours.
              </p>
              <button
                type="button"
                onClick={() => scrollTo('#scope')}
                className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-peach transition-colors hover:text-white"
              >
                Send project brief
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* Signature oversized wordmark with subtle backdrop radial */}
        <div
          className="relative select-none overflow-hidden py-8 sm:py-10"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,107,74,0.12),transparent_65%)] blur-2xl" />
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative whitespace-nowrap bg-gradient-to-b from-white via-white/75 to-white/15 bg-clip-text text-center font-display text-[clamp(2.2rem,9vw,8.5rem)] font-bold leading-none tracking-[-0.03em] text-transparent"
          >
            VELTRIX DIGITAL
          </motion.p>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
            © {year} VELTRIX DIGITAL · Agnish &amp; Ayush
          </p>
          <StudioClock />
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-all duration-300 hover:border-accent/60 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
