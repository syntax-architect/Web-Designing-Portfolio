import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Code2, Layers, Megaphone, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from '../lib/gsap';
import { EASE } from '../lib/motion';
import { useBooking } from './BookingModal';
import { Magnetic } from './Magnetic';
import { BorderBeam } from './magicui/border-beam';
import { ShimmerButton } from './magicui/shimmer-button';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';
import { useScrollTo } from './SmoothScrollProvider';

const PILLARS = [
  {
    icon: Code2,
    tag: '01 · Agnish',
    title: 'Web & App Development',
    detail: 'Custom React/Next.js frontends, backend APIs, fast load times, and technical SEO.',
  },
  {
    icon: Megaphone,
    tag: '02 · Ayush',
    title: 'Marketing, Socials & Sales',
    detail: 'Social media positioning, lead generation funnels, outreach, and client acquisition.',
  },
  {
    icon: Layers,
    tag: '03 · Direct Studio',
    title: 'No Middlemen',
    detail: 'You work straight with the two people building your site and growing your pipeline.',
  },
];

type StudioTab = 'build' | 'growth';

const STUDIO_VIEWS: Record<
  StudioTab,
  {
    label: string;
    lead: string;
    badge: string;
    headline: string;
    items: Array<{ name: string; status: string; pct: number }>;
    deliverables: string[];
  }
> = {
  build: {
    label: 'Web Build',
    lead: 'Handled by Agnish',
    badge: 'Engineering Stack',
    headline: 'Custom code built for speed, responsiveness, and search indexing.',
    items: [
      { name: 'Frontend UI & Motion', status: 'React · TypeScript', pct: 95 },
      { name: 'Backend APIs & Data', status: 'Node · PostgreSQL', pct: 88 },
      { name: 'Mobile & Core Vitals', status: '60fps · Responsive', pct: 98 },
    ],
    deliverables: ['Full source ownership', 'SEO-ready HTML & schema', 'Cloud deployment'],
  },
  growth: {
    label: 'Marketing & Leads',
    lead: 'Handled by Ayush',
    badge: 'Growth Engine',
    headline: 'Turning brand attention across socials and search into booked calls.',
    items: [
      { name: 'Social Content & Reach', status: 'IG · LinkedIn · Reels', pct: 92 },
      { name: 'Funnel & Lead Capture', status: 'Landing · Forms', pct: 90 },
      { name: 'Sales & Outreach Flow', status: 'Follow-ups · Pipeline', pct: 94 },
    ],
    deliverables: ['Offer & hook positioning', 'Lead routing setup', 'Sales conversion copy'],
  },
};

/** Line-reveal headline: each line slides up from behind an overflow mask. */
function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const scrollTo = useScrollTo();
  const { open } = useBooking();
  const [studioTab, setStudioTab] = useState<StudioTab>('build');
  const heroRef = useRef<HTMLElement>(null);
  const studioCardRef = useRef<HTMLDivElement>(null);
  const activeView = STUDIO_VIEWS[studioTab];

  useEffect(() => {
    const hero = heroRef.current;
    const card = studioCardRef.current;
    if (!hero || !card) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(card, {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      aria-label="Introduction"
      className="relative flex flex-col justify-start overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-10 md:pb-16 md:pt-32 lg:min-h-[96svh] lg:justify-center lg:px-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Left column: copy & actions */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-hairline bg-surface px-3.5 py-1.5 shadow-card sm:px-4 sm:py-2"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em]">
                <ShinyText
                  text="VELTRIX DIGITAL · Agnish & Ayush"
                  color="#526969"
                  shineColor="#FF6B4A"
                  speed={2.8}
                  delay={1.2}
                />
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5.3vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink md:mt-7">
              <RevealLine delay={0.2}>We build fast websites</RevealLine>
              <RevealLine delay={0.3}>
                and turn <span className="text-gradient">attention</span>
              </RevealLine>
              <RevealLine delay={0.4}>into real leads.</RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.52 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base md:mt-6 md:text-lg"
            >
              <strong className="font-semibold text-ink">VELTRIX DIGITAL</strong> pairs full-stack
              web development with hands-on marketing, social media, and sales strategy. Built
              directly by two founders for businesses that want clean design and measurable
              inquiries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.64 }}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <ShimmerButton
                  type="button"
                  onClick={open}
                  background="#ff6b4a"
                  shimmerColor="#fff7ed"
                  shimmerSize="0.08em"
                  shimmerDuration="2.8s"
                  borderRadius="9999px"
                  className="group inline-flex w-full items-center justify-center gap-2.5 border-white/15 px-8 py-4 font-display text-sm font-semibold text-white shadow-card transition-all duration-300 hover:scale-[1.01] hover:shadow-lift sm:w-auto"
                >
                  <span className="relative">Start a Project</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ShimmerButton>
              </Magnetic>
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <motion.button
                  type="button"
                  onClick={() => scrollTo('#work')}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-hairline bg-surface px-8 py-4 font-display text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/25 hover:shadow-card sm:w-auto"
                >
                  View Our Work
                </motion.button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right column: Interactive Dual-Track Studio Card (React Bits SpotlightCard + GSAP Parallax) */}
          <div ref={studioCardRef} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.45 }}
              className="relative"
            >
              {/* Subtle decorative offset glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/15 via-transparent to-accent/15 blur-xl"
              />

              <SpotlightCard
                theme="dark"
                spotlightColor={studioTab === 'build' ? '#147D7C' : '#FF6B4A'}
                intensity={0.22}
                spotlightSize={280}
                borderGlow={0.75}
                className="relative rounded-3xl p-5 text-white shadow-soft sm:p-7"
                style={
                  {
                    '--spotlight-card-surface': '#0a2e2f',
                    '--spotlight-card-border': 'rgba(255, 255, 255, 0.12)',
                  } as CSSProperties
                }
              >
                {/* Subtle top studio radial highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.22),transparent)] blur-2xl"
                />
                <BorderBeam
                  size={110}
                  duration={8}
                  borderWidth={1.5}
                  colorFrom={studioTab === 'build' ? '#147D7C' : '#FF6B4A'}
                  colorTo="#FF9E7A"
                />

              {/* Switcher */}
              <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    Inside the studio
                  </span>
                </div>

                <div
                  role="tablist"
                  aria-label="Preview studio track"
                  className="inline-flex rounded-full border border-white/10 bg-white/5 p-1"
                >
                  {(['build', 'growth'] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={studioTab === key}
                      onClick={() => setStudioTab(key)}
                      className={`relative rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                        studioTab === key ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {studioTab === key && (
                        <motion.span
                          layoutId="hero-studio-tab"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-accent shadow-card"
                        />
                      )}
                      <span className="relative z-10">{STUDIO_VIEWS[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={studioTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative mt-5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-peach">{activeView.lead}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/70">
                      {activeView.badge}
                    </span>
                  </div>

                  <p className="mt-3 font-display text-base font-semibold leading-snug text-white sm:text-lg">
                    {activeView.headline}
                  </p>

                  {/* Animated capability bars */}
                  <div className="mt-5 space-y-3.5">
                    {activeView.items.map((item, idx) => (
                      <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-white">{item.name}</span>
                          <span className="font-mono text-[11px] text-white/60">{item.status}</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.pct}%` }}
                            transition={{ duration: 0.7, ease: EASE, delay: idx * 0.08 }}
                            className={`h-full rounded-full ${
                              studioTab === 'build'
                                ? 'bg-gradient-to-r from-teal to-[#6FB5B3]'
                                : 'bg-gradient-to-r from-accent to-peach'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {activeView.deliverables.map((d) => (
                      <li
                        key={d}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80"
                      >
                        <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>

        {/* Architectural capability strips (breaks up the boxy card look) */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.78 } },
          }}
          className="mt-12 grid gap-6 border-t border-hairline pt-8 md:mt-16 md:grid-cols-3 md:gap-8"
        >
          {PILLARS.map((item) => (
            <motion.div
              key={item.tag}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              className="group relative"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-0 h-0.5 w-16 origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-teal transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-accent">
                  {item.tag}
                </span>
                <item.icon
                  className="h-4 w-4 text-ink/50 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-2.5 font-display text-lg font-bold tracking-tight text-ink">
                {item.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
