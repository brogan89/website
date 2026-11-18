"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINES = ["init mainframe.sys", "mount /projects ........ 4 found", "link neon.drv", "status: online"];

// Fast terminal boot lines that tick in above the title.
export function BootLog({ lines = LINES }: { lines?: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-6 space-y-0.5 font-mono text-[11px] text-muted/80 sm:text-xs" aria-hidden="true">
      {lines.map((line, i) => (
        <motion.div
          key={line}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 + i * 0.12, duration: 0.2 }}
        >
          <span className="text-cyan">[{String(i).padStart(2, "0")}]</span> {line}
          {i === lines.length - 1 ? <span className="text-[#3cff8f]"> ✓</span> : <span className="text-muted/50"> ok</span>}
        </motion.div>
      ))}
    </div>
  );
}
