import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import { EASE } from '../lib/motion';
import { useBooking } from './BookingModal';
import { useScrollTo } from './SmoothScrollProvider';

/**
 * Floating Lenis + Motion quick-action pill shown once the visitor scrolls past
 * the hero, keeping top-scroll and strategy call booking one tap away on desktop and phones.
 */
export function FloatingDock() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const scrollTo = useScrollTo();
  const { open } = useBooking();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nearBottom =
      typeof window !== 'undefined' &&
      latest + window.innerHeight >= document.documentElement.scrollHeight - 140;
    setVisible(latest > 520 && !nearBottom);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-1.5 rounded-full border border-white/15 bg-deep/92 p-1.5 text-white shadow-lift backdrop-blur-md sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-ink sm:px-4"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Book Call</span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Scroll back to top"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-accent/60 hover:bg-white/10 hover:text-white"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

