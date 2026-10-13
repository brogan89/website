"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

// A soft violet/cyan light that trails the pointer across the whole page.
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(139 107 255 / 0.13), rgb(34 224 214 / 0.05) 40%, transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (reduce) return null;
  return <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" style={{ background }} />;
}
