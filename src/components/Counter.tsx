import { animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { EASE } from '../lib/motion';

interface CounterProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Stat value that rolls up smoothly the first time it enters the viewport. */
export function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const [display, setDisplay] = useState(`0${decimals ? `.${'0'.repeat(decimals)}` : ''}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (value) => setDisplay(value.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
