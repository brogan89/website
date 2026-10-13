"use client";

import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import type { ArtProps } from "../ProjectPanel";

const BOOT = [
  "$ dotnet new mainframe-game -n Forest",
  "restoring MainframeEngine 1.0.0 ...",
  "vulkan 1.2 // moltenvk ✓",
  "build succeeded · 120 fps · 8.3 ms",
];

// The editor screenshot in a window frame, with a terminal that boots on hover.
export function EngineArt({ active }: ArtProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[21px] bg-[#0b1226]">
      {/* Blueprint dot grid (echoes the logo) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: "radial-gradient(#1e40af 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}
      />

      <motion.div
        className="absolute inset-[7%] top-[9%] overflow-hidden rounded-xl border border-sky-400/30 bg-[#11131c] shadow-[0_30px_80px_-20px_rgb(56_189_248/0.45)]"
        animate={active ? { scale: 1.03, y: -6 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#1a1d29] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-[10px] text-white/50">mainframe editor — basic_3d.mscene</span>
        </div>
        <img src={asset("/media/engine/editor.webp")} alt="Mainframe Engine editor" className="w-full" />
        <div className="art-scanlines opacity-30" />
      </motion.div>

      {/* Terminal overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute bottom-[8%] left-[5%] w-[min(78%,420px)] rounded-lg border border-sky-400/40 bg-[#05070f]/90 p-3 font-mono text-[10px] leading-relaxed text-sky-200 shadow-[0_0_30px_rgb(56_189_248/0.35)] backdrop-blur sm:text-[11px]"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {BOOT.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.22 }}
                className={i === BOOT.length - 1 ? "text-[#f59e0b]" : undefined}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo badge with orbiting ring */}
      <motion.div
        className="absolute top-[4%] right-[4%] z-[5] size-[16%] min-w-14"
        animate={active ? { rotate: 0, scale: 1.12 } : { rotate: -8, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <svg className="absolute -inset-[22%] size-[144%] animate-[spin_9s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 7" opacity="0.7" />
          <circle cx="50" cy="4" r="3" fill="#f59e0b" />
        </svg>
        <img src={asset("/media/engine/logo.svg")} alt="" className="relative size-full drop-shadow-[0_0_18px_rgb(56_189_248/0.6)]" />
      </motion.div>
    </div>
  );
}
