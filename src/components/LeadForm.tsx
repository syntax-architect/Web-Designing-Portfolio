import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Timer } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_EMAIL } from '../lib/data';
import { EASE, viewportOnce } from '../lib/motion';
import { SectionHeading, SectionShell } from './Section';

const PROJECT_TYPES = ['Web App', 'Business Portal', 'E-Commerce', 'SEO Growth', '3D / Motion'] as const;
const BUDGETS = ['< $5k', '$5k – $15k', '$15k – $50k', '$50k+'] as const;
const TIMELINES = ['ASAP', '2 – 4 weeks', '1 – 3 months', 'Flexible'] as const;

type ChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function Chip({ label, active, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
        active
          ? 'border-accent bg-accent text-white shadow-card'
          : 'border-hairline bg-surface text-muted hover:border-accent/50 hover:text-ink'
      }`}
    >
      {label}
    </button>
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
  'w-full rounded-xl border border-hairline bg-white px-4 py-3.5 text-sm text-ink shadow-[0_1px_2px_rgb(16_24_40/0.04)] placeholder:text-muted/60 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10';

export function LeadForm() {
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please add a valid email.');
    if (!types.length) return setError('Select at least one project type.');
    setError('');
    setSending(true);
    // Demo transmission — wire to your CRM / email service in production.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <SectionShell id="scope" labelledBy="scope-title" className="relative">
      <SectionHeading
        id="scope-title"
        eyebrow="Pricing / Scope"
        title={
          <>
            Scope your build in <span className="text-gradient">90 seconds</span>.
          </>
        }
        description="Select what you need — the VELTRIX DIGITAL team replies within 24 hours with a tailored architecture plan and a fixed quote. No discovery-call gatekeeping."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-hairline bg-surface shadow-soft"
      >
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
            className="px-8 py-16 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-live/10 text-live">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink md:text-3xl">
              Brief received, {name.split(' ')[0]}.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Your scope — <span className="font-medium text-ink">{types.join(', ')}</span>
              {budget ? ` · ${budget}` : ''}
              {timeline ? ` · ${timeline}` : ''} — is queued for review. Expect a tailored plan in
              your inbox within 24 hours.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:text-ink"
            >
              or email us directly — {CONTACT_EMAIL}
            </a>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="grid gap-7 p-6 sm:p-10 md:grid-cols-2" noValidate>
            <div className="md:col-span-2">
              <p className="text-[12px] font-semibold text-ink/80">Project type</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <Chip key={t} label={t} active={types.includes(t)} onToggle={() => toggleType(t)} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-ink/80">Budget range</p>
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
              <Field label="Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@company.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Project description">
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Goals, current site, references, must-have features…"
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
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-display text-sm font-semibold text-white transition-all duration-300 hover:bg-ink disabled:opacity-60 sm:w-auto"
              >
                {sending ? 'Sending…' : 'Get My Fixed Quote'}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-muted">
                <li className="flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Reply within 24 hours
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  NDA on request · No spam, ever
                </li>
              </ul>
            </div>
          </form>
        )}
      </motion.div>
    </SectionShell>
  );
}
