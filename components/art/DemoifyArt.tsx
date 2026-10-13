"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ArtProps } from "../ProjectPanel";
import { DemoifyMark } from "./DemoifyMark";

const N = 56;
// Deterministic pseudo-waveform so SSR and client agree.
const WAVE = Array.from({ length: N }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.53) * Math.cos(i * 0.21 + 1)));
const VERSIONS = [
  { tag: "v3", name: "final_final_mix.wav", note: "+ vocals, tighter chorus" },
  { tag: "v2", name: "demo_bridge.wav", note: "new bridge" },
  { tag: "v1", name: "voice_memo.m4a", note: "first idea" },
];

// A waveform player with a sweeping playhead, version cards that fan out, and a timestamped comment.
export function DemoifyArt({ active, inView }: ArtProps) {
  const reduce = useReducedMotion();
  const live = inView && !reduce;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[21px] bg-[#0b0a16]">
      <div className="absolute -top-1/3 -left-1/4 size-[80%] rounded-full bg-[#2FA8FF] opacity-25 blur-[90px]" />
      <div className="absolute -right-1/4 -bottom-1/3 size-[80%] rounded-full bg-[#FF2FA6] opacity-25 blur-[90px]" />

      {/* Logo */}
      <motion.div
        className="absolute top-[9%] left-[6%] flex items-center gap-3"
        animate={active ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
      >
        <DemoifyMark className="size-12 drop-shadow-[0_0_20px_rgb(123_59_242/0.7)] sm:size-16" />
        <span className="font-display text-xl font-black tracking-wider text-white sm:text-2xl">DEMOIFY</span>
      </motion.div>

      {/* Version stack */}
      <div className="absolute top-[8%] right-[5%] w-[46%]">
        {VERSIONS.map((v, i) => (
          <motion.div
            key={v.tag}
            className="absolute inset-x-0 rounded-lg border border-white/10 bg-[#15132a]/90 p-2.5 font-mono text-[9px] text-white/70 shadow-xl backdrop-blur sm:text-[11px]"
            style={{ zIndex: VERSIONS.length - i }}
            animate={active ? { y: i * 46, rotate: 0, opacity: 1 } : { y: i * 8, rotate: i * 2.5, opacity: 1 - i * 0.25 }}
            transition={{ type: "spring", stiffness: 220, damping: 20, delay: active ? i * 0.05 : 0 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="rounded px-1.5 py-0.5 font-bold text-[#0b0a16]"
                style={{ background: i === 0 ? "linear-gradient(90deg,#2FA8FF,#FF2FA6)" : "rgb(255 255 255 / 0.5)" }}
              >
                {v.tag}
              </span>
              <span className="truncate text-white">{v.name}</span>
            </div>
            <div className="mt-1 truncate text-white/40">{v.note}</div>
          </motion.div>
        ))}
      </div>

      {/* Waveform player */}
      <div className="absolute inset-x-[6%] bottom-[10%]">
        <div className="relative flex h-20 items-center gap-[2px] sm:h-28">
          {WAVE.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-full"
              style={{ height: "100%", background: `linear-gradient(180deg, #2FA8FF, ${i / N > 0.5 ? "#FF2FA6" : "#7B3BF2"})` }}
              initial={false}
              animate={
                live
                  ? { scaleY: active ? [h, h * 0.4, Math.min(1, h * 1.2), h] : [h * 0.8, h, h * 0.8] }
                  : { scaleY: h * 0.8 }
              }
              transition={{ duration: active ? 0.6 : 2, repeat: Infinity, ease: "easeInOut", delay: (i % 8) * 0.06 }}
            />
          ))}
          {live && (
            <motion.span
              className="absolute inset-y-[-8px] w-0.5 bg-white shadow-[0_0_14px_#fff]"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-white/40">
          <span>0:00</span>
          <span>v3 · 3:12</span>
        </div>

        {/* Timestamped comment */}
        <motion.div
          className="absolute bottom-full left-[38%] mb-3 rounded-lg rounded-bl-none border border-[#FF2FA6]/50 bg-[#1b1030]/95 px-3 py-1.5 font-mono text-[10px] text-white shadow-[0_0_24px_rgb(255_47_166/0.4)] sm:text-xs"
          initial={false}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: active ? 0.25 : 0 }}
        >
          <span className="text-[#2FA8FF]">@ 1:24</span> that riff 🔥🔥
        </motion.div>
      </div>
      <div className="art-scanlines opacity-25" />
    </div>
  );
}
