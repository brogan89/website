"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { BootLog } from "./hero/BootLog";
import { GlitchTitle } from "./hero/GlitchTitle";
import { Marquee } from "./hero/Marquee";
import { RoomScene } from "./hero/scene/RoomScene";
import { TypedRoles } from "./hero/TypedRoles";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Mouse parallax: the scene's layers drift at different depths, the copy drifts the other way.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const fgX = useTransform(sx, (v) => v * 14);
  const fgY = useTransform(sy, (v) => v * 10);

  // Scroll-out: the hero content lifts and fades as you scroll into the projects.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <RoomScene mx={sx} my={sy} />
      </motion.div>
      {/* Keep the copy readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-void/55 bg-gradient-to-r from-void/80 via-void/40 to-transparent md:bg-transparent md:from-void/90 md:via-void/45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(5_5_12/0.7))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex w-[min(1200px,92vw)] flex-1 flex-col justify-center pt-28 pb-16"
        style={{ x: fgX, y: fgY }}
      >
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <BootLog />
          <GlitchTitle delay={0.55} />
          <div className="mt-6 flex flex-col gap-6 sm:mt-8">
            <TypedRoles startDelay={1.3} />
            <motion.p
              className="max-w-xl text-lg text-muted sm:text-xl"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              I build games, game engines, music and the tools in between. Here&apos;s what&apos;s on the workbench right now.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <a
                href="#projects"
                className="cta group relative inline-flex items-center gap-2 bg-cyan px-6 py-3 font-mono text-sm font-medium text-void transition hover:shadow-[0_0_32px_rgb(34_224_214/0.7)]"
              >
                view projects
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="https://github.com/brogan89"
                target="_blank"
                rel="noopener"
                className="cta inline-flex items-center gap-2 border border-magenta/60 bg-magenta/10 px-6 py-3 font-mono text-sm text-magenta transition hover:bg-magenta/20 hover:shadow-[0_0_32px_rgb(255_77_216/0.5)]"
              >
                github ↗
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted uppercase sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-cue_1.6s_ease-in-out_infinite] bg-cyan" />
        </span>
      </motion.a>

      <div className="relative z-10">
        <Marquee />
      </div>
    </section>
  );
}
