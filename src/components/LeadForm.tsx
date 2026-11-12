import { motion } from 'motion/react';
import { ArrowRight, Check, CheckCircle2, Copy, ShieldCheck, Timer } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_EMAIL } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { DotPattern } from './magicui/dot-pattern';
import { SectionHeading, SectionShell } from './Section';

const PROJECT_TYPES = [
  'Website / Landing Page',
  'Web App / SaaS',
  'E-Commerce',
  'Social Media & Content',
  'Lead Gen & Sales',
] as const;
const BUDGETS = ['Starter', 'Standard', 'Full Growth', 'Monthly Retainer'] as const;
const TIMELINES = ['ASAP', '2 – 4 weeks', '1 – 2 months', 'Flexible'] as const;

type ChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function Chip({ label, active, onToggle }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
        active
          ? 'border-accent bg-accent text-white shadow-card'
          : 'border-hairline bg-surface text-muted hover:border-accent/50 hover:text-ink'
      }`}
    >
      {label}
    </motion.button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink/80">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-hairline bg-white px-4 py-3.5 text-base text-ink shadow-[0_1px_2px_rgb(16_24_40/0.04)] placeholder:text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 sm:text-sm';

export function LeadForm() {
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${name.trim()} — VELTRIX DIGITAL`);
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Needs: ${types.join(', ')}`,
        budget ? `Scope: ${budget}` : null,
        timeline ? `Timeline: ${timeline}` : null,
        brief.trim() ? `\nProject Details:\n${brief.trim()}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please add a valid email.');
    if (!types.length) return setError('Select at least one service.');
    setError('');
    setSent(true);
    window.location.href = buildMailtoHref();
  };

  return (
    <SectionShell id="scope" labelledBy="scope-title" className="relative">
      <SectionHeading
        id="scope-title"
        eyebrow="Start a Project"
        title={
          <>
            Tell us what you are <span className="text-gradient">building</span>.
          </>
        }
        description="Pick what you need below and send your brief directly to Agnish and Ayush. We reply within 24 hours with a clear plan."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.85, ease: EASE }}
        className="relative mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-3xl border border-hairline bg-surface shadow-soft md:mt-14 lg:grid-cols-[0.82fr_1.18fr]"
      >
        {/* Left studio brief panel */}
        <aside className="relative flex flex-col justify-between overflow-hidden bg-deep p-7 text-white sm:p-9">
          <DotPattern
            width={24}
            height={24}
            cr={1}
            className="text-white/15 [mask-image:radial-gradient(280px_circle_at_85%_18%,white,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,74,0.22),transparent)] blur-2xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-peach">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Direct Studio Desk
            </span>

            <h3 className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight text-white">
              Speak directly with the founders.
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-white/70">
              No intake bots or account managers. Your brief goes straight to Agnish (Web Dev) and
              Ayush (Marketing &amp; Leads).
            </p>

            <ol className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
              {[
                'Pick the services, engagement style, and timeline.',
                'Send the draft or copy our studio address below.',
                'Receive a scoped plan and build timeline within 24 hours.',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
              Studio Email
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="truncate font-mono text-xs font-medium text-white transition-colors hover:text-accent sm:text-[13px]"
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-accent hover:bg-accent"
                aria-label="Copy studio email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Right form surface */}
        <div className="relative">
          {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
            className="px-6 py-14 text-center sm:px-8 sm:py-16"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-live/10 text-live">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink md:text-3xl">
              Your brief is ready, {name.split(' ')[0]}.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Selected scope: <span className="font-medium text-ink">{types.join(', ')}</span>
              {budget ? ` · ${budget}` : ''}
              {timeline ? ` · ${timeline}` : ''}. If your mail client didn’t open automatically,
              click below to send it straight to us.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={buildMailtoHref()}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-white shadow-card transition-colors hover:bg-ink"
              >
                Open Email Draft
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="rounded-full border border-hairline bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/25"
              >
                Edit Details
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="grid gap-7 p-6 sm:p-10 md:grid-cols-2" noValidate>
            <div className="md:col-span-2">
              <p className="text-[12px] font-semibold text-ink/80">What do you need help with?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <Chip key={t} label={t} active={types.includes(t)} onToggle={() => toggleType(t)} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-ink/80">Engagement type</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} label={b} active={budget === b} onToggle={() => setBudget(b)} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-ink/80">Timeline</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <Chip key={t} label={t} active={timeline === t} onToggle={() => setTimeline(t)} />
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
              <Field label="Your name">
                <input
                  id="scope-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Sharma"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
              <Field label="Email address">
                <input
                  id="scope-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan@company.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Project details">
                  <textarea
                    id="scope-brief"
                    name="brief"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Share your business, goals, current website or social links..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </div>
            </div>

            {error && (
              <p className="md:col-span-2 text-[13px] font-medium text-coral-deep" role="alert">
                {error}
              </p>
            )}

            <div className="md:col-span-2">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-display text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-ink hover:shadow-lift sm:w-auto"
              >
                Send Project Brief
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-muted">
                <li className="flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Reply within 24 hours
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Direct to {CONTACT_EMAIL}
                </li>
              </ul>
            </div>
          </form>
          )}
        </div>
      </motion.div>
    </SectionShell>
  );
}
