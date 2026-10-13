"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import type { ArtProps } from "../ProjectPanel";

const CLIPS = ["01-tee-off-race", "02-slowmo-hole-out", "03-obstacle-chaos"];

// Gameplay loops that cycle while on screen, with the key-art crew bursting out of the frame on hover.
export function SgrArt({ active, inView }: ArtProps) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [clip, setClip] = useState(0);
  const playing = inView && !reduce;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, clip]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden rounded-[21px]">
        <video
          ref={video}
          key={clip}
          className="size-full object-cover"
          src={asset(`/media/sgr/${CLIPS[clip]}.mp4`)}
          poster={asset(`/media/sgr/${CLIPS[clip]}.jpg`)}
          muted
          playsInline
          preload={playing ? "auto" : "none"}
          onEnded={() => setClip((c) => (c + 1) % CLIPS.length)}
        />
        <div className="art-scanlines opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/50 to-transparent" />

        {/* HUD chrome */}
        <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/80 uppercase">
          <span className="size-2 animate-pulse rounded-full bg-red-500" /> rec
          <span className="text-white/40">{`// clip ${clip + 1}/${CLIPS.length}`}</span>
        </div>
        <div className="absolute right-4 bottom-4 flex gap-1.5">
          {CLIPS.map((c, i) => (
            <span key={c} className="h-1 w-6 rounded-full" style={{ background: i === clip ? "var(--accent)" : "rgb(255 255 255 / 0.25)" }} />
          ))}
        </div>
      </div>

      {/* Logo */}
      <motion.img
        src={asset("/media/sgr/logo.webp")}
        alt="Speed Golf Royale"
        className="absolute bottom-5 left-5 z-[5] w-[34%] drop-shadow-[0_6px_20px_rgb(0_0_0/0.7)]"
        animate={active ? { scale: 1.06, rotate: -3 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
      />

      {/* Key art bursts out of the frame */}
      <motion.img
        src={asset("/media/sgr/key-art.webp")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6%] -bottom-[10%] z-[5] w-[58%] drop-shadow-[0_20px_40px_rgb(0_0_0/0.6)]"
        style={{ translateZ: 60 }}
        animate={active ? { x: "-4%", y: "-10%", scale: 1.08, rotate: -2 } : { x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 13 }}
      />
    </>
  );
}
