"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

// Each line blurs up into place; the RGB-split glitch only kicks in once it has settled.
function Line({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [settled, setSettled] = useState(false);
  return (
    <motion.span
      className={`block ${settled && !reduce ? "glitch" : ""} ${className ?? ""}`}
      data-text={text}
      initial={reduce ? false : { opacity: 0, y: "0.18em", filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => setSettled(true)}
    >
      {text}
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
          delay={delay + 0.15}
          className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent"
        />
      </span>
    </h1>
  );
}
