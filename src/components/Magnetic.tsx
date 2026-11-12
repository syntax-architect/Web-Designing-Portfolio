import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, type MouseEvent, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  /** 0–1 fraction of the cursor offset the element follows. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic hover wrapper: the child drifts toward the cursor on a spring
 * and snaps back on leave. Pure transform — no layout thrash.
 */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.25 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className ?? 'inline-block'}
    >
      {children}
    </motion.div>
  );
}
