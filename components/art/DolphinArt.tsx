"use client";

import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";
import type { ArtProps } from "../ProjectPanel";

const BAND_PHOTO = "https://www.muzic.nz/wp-content/uploads/gallery/JW08714.jpg";
// Resting heights for the equaliser bars (0–1), fixed so server and client markup match.
const BARS = [0.35, 0.6, 0.45, 0.8, 0.55, 0.9, 0.4, 0.7, 0.5, 0.85, 0.3, 0.65, 0.75, 0.45, 0.95, 0.5, 0.6, 0.35, 0.8, 0.55, 0.7, 0.4, 0.6, 0.3];

// Band photo in a cyan/magenta duotone, the grunge logo flickering on like a neon sign, and a bouncing EQ.
export function DolphinArt({ active, inView }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[21px] bg-gradient-to-br from-[#062a33] via-void to-[#2a0632]">
      <motion.img
        src={BAND_PHOTO}
        alt="Dolphin Drive playing live"
        className="absolute inset-0 size-full object-cover grayscale"
        style={{ objectPosition: "center 30%" }}
        animate={active ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#2ee6c8] to-magenta opacity-60 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10" />
      <div className="art-scanlines opacity-50" />

      <motion.img
        src={asset("/media/dolphin/logo.webp")}
        alt="Dolphin Drive"
        className="absolute top-[12%] left-[11%] z-[5] w-[78%] mix-blend-screen"
        initial={false}
        animate={
          inView && !reduce
            ? { opacity: [0, 1, 0.2, 1, 0.5, 1], scale: active ? 1.06 : 1 }
            : { opacity: 1 }
        }
        transition={{ opacity: { duration: 0.9, times: [0, 0.1, 0.2, 0.35, 0.5, 1] }, scale: { type: "spring", stiffness: 260, damping: 14 } }}
      />

      <div className="absolute inset-x-[6%] bottom-[7%] z-[5] flex h-[26%] items-end gap-[1.2%]" aria-hidden="true">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-[#2ee6c8] to-magenta"
            style={{ height: "100%" }}
            initial={false}
            animate={
              reduce || !inView
                ? { scaleY: h * 0.5 }
                : { scaleY: [h * 0.3, h, h * 0.55, Math.min(1, h * 1.15), h * 0.3] }
            }
            transition={{ duration: active ? 0.55 : 1.4, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.07 }}
          />
        ))}
      </div>
    </div>
  );
}
