"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

// Vertical timeline whose neon rail fills in as you scroll through it.
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative pl-8 sm:pl-11">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-line" />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-[#3cff8f] via-cyan to-magenta shadow-[0_0_12px_rgb(34_224_214/0.8)]"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      {children}
    </ol>
  );
}
