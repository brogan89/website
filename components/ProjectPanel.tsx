"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, useState, type ComponentType } from "react";
import type { Project } from "@/lib/projects";
import { useCanHover } from "@/lib/useCanHover";

export type ArtProps = { active: boolean; inView: boolean };

const STATUS_LABEL = { live: "live", building: "in development" } as const;

export function ProjectPanel({ project, Art, flip }: { project: Project; Art: ComponentType<ArtProps>; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const canHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  // On touch devices there's no hover, so the art comes alive while it's on screen.
  const active = canHover ? hovered : inView;

  // Pointer tilt for the art frame (mouse only).
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const glareX = useTransform(sry, [-8, 8], ["0%", "100%"]);
  const glareY = useTransform(srx, [8, -8], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.35), transparent 55%)`,
  );

  const slide = flip ? 80 : -80;

  return (
    <section
      ref={ref}
      id={project.id}
      className="relative mx-auto grid w-[min(1200px,92vw)] items-center gap-10 py-16 md:grid-cols-12 md:gap-14 md:py-24"
      style={{ ["--accent" as string]: project.accent }}
    >
      {/* Giant outlined index number behind everything */}
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute top-4 font-display text-[clamp(7rem,22vw,18rem)] leading-none font-black text-transparent select-none ${flip ? "left-0" : "right-0"}`}
        style={{ WebkitTextStroke: `1px ${project.accent}33` }}
        initial={reduce ? false : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.index}
      </motion.span>

      <motion.div
        className={`relative md:col-span-7 ${flip ? "md:order-2" : ""}`}
        initial={reduce ? false : { opacity: 0, x: slide, rotate: flip ? 2 : -2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
        style={{ perspective: 1200 }}
      >
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener"
          aria-label={`Open ${project.title}`}
          className="panel-frame block"
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => {
            setHovered(false);
            rx.set(0);
            ry.set(0);
          }}
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
            rx.set(((e.clientY - r.top) / r.height - 0.5) * -12);
          }}
        >
          <div className="relative aspect-[16/10] rounded-[21px] bg-panel">
            <Art active={active} inView={inView} />
            <div className="corner-brackets" />
            {/* Moving glare */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-[4] rounded-[21px] opacity-0 mix-blend-overlay transition-opacity duration-300 [.panel-frame:hover_&]:opacity-100"
              style={{ background: glare }}
            />
          </div>
        </motion.a>
      </motion.div>

      <motion.div
        className={`relative md:col-span-5 ${flip ? "md:order-1" : ""}`}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
      >
        {[
          <div key="meta" className="flex items-center gap-3 font-mono text-xs">
            <span style={{ color: project.accent }}>[{project.index}]</span>
            <span className="text-muted">{project.kicker}</span>
          </div>,
          <h2 key="title" className="mt-4 font-display text-4xl leading-[0.95] font-black uppercase sm:text-5xl">
            {project.title}
          </h2>,
          <div key="status" className="mt-5">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider uppercase"
              style={{ borderColor: `${project.accent}66`, color: project.accent, background: `${project.accent}14` }}
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full opacity-75" style={{ background: project.accent }} />
                <span className="relative inline-flex size-1.5 rounded-full" style={{ background: project.accent }} />
              </span>
              {STATUS_LABEL[project.status]}
            </span>
          </div>,
          <p key="desc" className="mt-5 text-lg leading-relaxed text-muted">
            {project.description}
          </p>,
          <ul key="tags" className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-md border border-line bg-night px-2.5 py-1 font-mono text-xs text-muted">
                #{t}
              </li>
            ))}
          </ul>,
          <a
            key="cta"
            href={project.link}
            target="_blank"
            rel="noopener"
            className="cta group mt-8 inline-flex items-center gap-3 px-6 py-3 font-mono text-sm font-medium text-void transition-shadow"
            style={{ background: project.accent, boxShadow: active ? `0 0 36px ${project.accent}aa` : undefined }}
          >
            {project.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>,
        ].map((child) => (
          <motion.div
            key={child.key}
            variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
