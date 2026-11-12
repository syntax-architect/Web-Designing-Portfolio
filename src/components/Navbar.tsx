import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '../lib/data';
import { EASE } from '../lib/motion';
import { useBooking } from './BookingModal';
import { Magnetic } from './Magnetic';
import { useScrollTo } from './SmoothScrollProvider';

/** Monogram: sharp geometric V on a deep-teal tile with coral accent. */
function Monogram() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-deep shadow-card">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M4 5l8 14L20 5h-3.4L12 13.4 7.4 5H4z" fill="#FF6B4A" />
      </svg>
    </span>
  );
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useScrollTo();
  const { open } = useBooking();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  const go = (href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: 0.1 } }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-b border-hairline bg-glass shadow-[0_1px_0_rgba(16,24,40,0.02)]'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-14"
        >
          <button
            type="button"
            onClick={() => go('#top')}
            className="flex items-center gap-3"
            aria-label="VELTRIX DIGITAL — back to top"
          >
            <Monogram />
            <span className="font-display text-[15px] font-bold tracking-[0.14em] text-ink">
              VELTRIX&nbsp;DIGITAL
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="group relative text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.2} className="hidden md:inline-block">
              <button
                type="button"
                onClick={open}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-ink"
              >
                Book a Strategy Call
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink transition-colors hover:border-ink/25 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-ink transition-all duration-300 ${
                    menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-ink transition-all duration-300 ${
                    menuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Scroll progress hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent via-peach to-teal"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-canvas/95 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE },
                  }}
                  onClick={() => go(link.href)}
                  className="block w-full border-b border-hairline py-4.5 text-left font-display text-2xl font-bold text-ink"
                >
                  <span className="mr-4 font-mono text-xs font-medium text-accent">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: EASE } }}
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="mt-8 w-full rounded-2xl bg-accent py-4 font-display text-base font-semibold text-white transition-colors hover:bg-ink"
              >
                Book a Strategy Call
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
