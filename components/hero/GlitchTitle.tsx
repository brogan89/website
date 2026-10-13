"use client";

import { motion, useReducedMotion } from "motion/react";
import { useScramble } from "./useScramble";

function Line({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const shown = useScramble(text, { delay: delay * 1000, duration: 700, enabled: !reduce });
  return (
    <motion.span
      className={`glitch block ${className ?? ""}`}
      data-text={text}
      initial={reduce ? false : { opacity: 0, y: 40, skewX: -12, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 16 }}
    >
      {shown}
    </motion.span>
  );
}

export function GlitchTitle({ delay = 0 }: { delay?: number }) {
  return (
    <h1 className="font-display text-[clamp(3.2rem,13vw,10.5rem)] leading-[0.86] font-black tracking-tight uppercase">
      <span className="sr-only">Brogan King</span>
      <span aria-hidden="true">
        <Line text="BROGAN" delay={delay} className="text-neon" />
        <Line
          text="KING"
          delay={delay + 0.18}
          className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent"
        />
      </span>
    </h1>
  );
}
