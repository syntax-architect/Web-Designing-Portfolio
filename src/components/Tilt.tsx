import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, type MouseEvent, type ReactNode } from 'react';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * Interactive 3D card tilt driven by spring-damped motion values,
 * with a specular glare that tracks the cursor. Disabled automatically
 * on touch devices (no hover) and degrades to a static card.
 */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 18,
  });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);

  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,107,74,0.07), transparent 55%)`,
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className ?? 'h-full'}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}
