import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  Clock,
  X,
} from 'lucide-react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { EASE } from '../lib/motion';
import { useLenis } from './SmoothScrollProvider';

const BookingContext = createContext<{ open: () => void } | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}

const TIME_SLOTS = ['10:00', '12:00', '15:00', '17:30'];
const TOPICS = ['New project', 'Redesign & rebuild', 'SEO audit', 'Partnership'] as const;

function nextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

type Step = 'slot' | 'details' | 'done';

const chipActive =
  'border-accent bg-accent text-white shadow-card';
const chipIdle =
  'border-hairline bg-white text-muted hover:border-accent/50 hover:text-ink';

function Modal({ onClose }: { onClose: () => void }) {
  const days = useMemo(() => nextBusinessDays(10), []);
  const dayNames = useMemo(
    () =>
      days.map((d) => ({
        date: d,
        weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
        day: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      })),
    [days],
  );

  const [step, setStep] = useState<Step>('slot');
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const confirm = () => {
    if (!name.trim()) return setError('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('That email doesn’t look valid.');
    setError('');
    setStep('done');
  };

  const picked = dayIdx !== null ? dayNames[dayIdx] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a strategy call"
    >
      <motion.button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } }}
        exit={{ opacity: 0, y: 32, scale: 0.97, transition: { duration: 0.25 } }}
        className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-hairline bg-surface shadow-soft outline-none [data-lenis-prevent]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-white/90 px-7 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {step === 'details' ? (
              <button
                type="button"
                onClick={() => setStep('slot')}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-accent/50 hover:text-ink"
                aria-label="Back to time selection"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tint text-accent">
                <CalendarCheck className="h-4 w-4" />
              </span>
            )}
            <div>
              <p className="text-[11px] font-medium text-muted">
                Strategy call — 30 min · Google Meet
              </p>
              <h3 className="font-display text-lg font-bold text-ink">
                {step === 'done' ? 'You’re booked in' : 'Book a Strategy Call'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-accent/50 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-7 py-6">
          {step === 'slot' && (
            <div>
              <p className="text-[12px] font-semibold text-ink/80">
                <span className="mr-1.5 text-accent">Step 1</span>· Pick a day
              </p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {dayNames.map((d, i) => (
                  <button
                    key={d.date.toISOString()}
                    type="button"
                    onClick={() => setDayIdx(i)}
                    aria-pressed={dayIdx === i}
                    className={`flex flex-col items-center rounded-xl border px-1 py-2.5 transition-all duration-200 ${
                      dayIdx === i ? chipActive : chipIdle
                    }`}
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-widest opacity-80">
                      {d.weekday}
                    </span>
                    <span className="font-display text-base font-bold">{d.day}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-widest opacity-80">
                      {d.month}
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-[12px] font-semibold text-ink/80">
                <span className="mr-1.5 text-accent">Step 2</span>· Time (UTC)
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    aria-pressed={time === t}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                      time === t ? chipActive : chipIdle
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {t}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={dayIdx === null || !time}
                onClick={() => setStep('details')}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-35"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 'details' && (
            <div>
              <div className="rounded-xl border border-tintline bg-tint/60 px-4 py-3 text-sm font-semibold text-ink">
                {picked?.weekday} {picked?.day} {picked?.month} · {time} UTC
              </div>

              <p className="mt-5 text-[12px] font-semibold text-ink/80">What’s this about?</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
                      topic === t ? chipActive : chipIdle
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[12px] font-semibold text-ink/80">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-semibold text-ink/80">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@company.com"
                    autoComplete="email"
                    className="mt-1.5 w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
                  />
                </label>
              </div>

              {error && <p className="mt-3 text-[13px] font-medium text-coral-deep">{error}</p>}

              <button
                type="button"
                onClick={confirm}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-sm font-semibold text-white transition-all duration-300 hover:bg-ink"
              >
                Confirm booking
                <Check className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
              className="py-4 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-live/10 text-live">
                <Check className="h-7 w-7" />
              </span>
              <h4 className="mt-5 font-display text-xl font-bold text-ink">
                Slot reserved
                {picked ? ` — ${picked.weekday} ${picked.day} ${picked.month}, ${time} UTC` : ''}
              </h4>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                A calendar invite and a short pre-call brief are on their way to{' '}
                <span className="font-medium text-ink">{email}</span>. Agnish or Ayush will join
                you personally.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full border border-hairline bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/25"
              >
                Back to site
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  return (
    <BookingContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <AnimatePresence>{isOpen && <Modal onClose={() => setOpen(false)} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
