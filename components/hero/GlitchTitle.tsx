"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const INTRO_MS = 900;

type Phase = "hidden" | "intro" | "idle";

// Each line glitches in (flicker, jitter and RGB-split slices that decay), then settles
// into an occasional subtle glitch.
function Line({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (reduce) return;
    const start = setTimeout(() => setPhase("intro"), delay * 1000);
    const settle = setTimeout(() => setPhase("idle"), delay * 1000 + INTRO_MS);
    return () => {
      clearTimeout(start);
      clearTimeout(settle);
    };
  }, [delay, reduce]);

  const cls = reduce ? "" : phase === "intro" ? "glitch glitch-intro" : phase === "idle" ? "glitch" : "opacity-0";
  return (
    <span className={`block ${cls} ${className ?? ""}`} data-text={text}>
      {text}
    </span>
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
          delay={delay + 0.22}
          className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent"
        />
      </span>
    </h1>
  );
}
