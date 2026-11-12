import { motion } from 'motion/react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CONTACT_EMAIL, NAV_LINKS, SERVICES } from '../lib/data';
import { useBooking } from './BookingModal';
import { ShimmerButton } from './magicui/shimmer-button';
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
    <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/75">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="tabular-nums">{time}</span>
      <span className="text-white/50">IST</span>
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
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep px-6 pb-10 pt-20 text-white md:px-10 lg:px-14">
      {/* Soft coral glow on the dark band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.14),transparent)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-center">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Ready when you are
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Have a project in mind? <span className="text-gradient">Let’s talk</span>.
            </h2>
          </div>
          <ShimmerButton
            type="button"
            onClick={open}
            background="#ff6b4a"
            shimmerColor="#fff7ed"
            shimmerSize="0.08em"
            shimmerDuration="2.8s"
            borderRadius="9999px"
            className="group inline-flex items-center gap-2.5 border-white/20 px-8 py-4 font-display text-sm font-semibold text-white shadow-lift transition-transform duration-300 hover:scale-[1.02]"
          >
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ShimmerButton>
        </div>

        {/* Semantic sitemap */}
        <nav aria-label="Footer" className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Site
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo('#services')}
                    className="text-left text-sm font-medium text-white/80 transition-colors hover:text-accent"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm font-medium">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={open}
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  Book a strategy call
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#founders')}
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  Meet the founders
                </button>
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Legal
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>Privacy notice — provided on engagement</li>
              <li>Terms of engagement — per contract</li>
              <li>Accessibility — WCAG 2.2 AA target</li>
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-white/45">
              VELTRIX DIGITAL
              <br />
              Built by Agnish &amp; Ayush · India &amp; Remote
            </p>
          </div>
        </nav>

        {/* Giant brand wordmark */}
        <div className="select-none overflow-hidden border-t border-white/10 pt-12" aria-hidden="true">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -5% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-center font-display text-[clamp(2.4rem,9.2vw,9rem)] font-bold leading-none tracking-[-0.02em] text-transparent"
          >
            VELTRIX DIGITAL
          </motion.p>
        </div>

        {/* Base line */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 md:flex-row md:items-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
            © {year} VELTRIX DIGITAL · All rights reserved
          </p>
          <StudioClock />
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent/60 group-hover:text-accent">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
