"use client";

import { motion, useReducedMotion } from "motion/react";

// Circuit traces that run in from the edges, each with a light packet pulsing along it.
const TRACES = [
  "M0 140 H180 L230 190 H420",
  "M0 520 H120 L170 470 H300 L340 430",
  "M1440 110 H1260 L1210 160 H1040",
  "M1440 470 H1300 L1250 520 H1110 L1080 490",
  "M260 0 V70 L310 120 V200",
  "M1180 0 V60 L1130 110 V230",
  "M0 330 H90 L130 290 H210",
  "M1440 300 H1350 L1320 330 H1220",
];

const NODES: [number, number][] = [
  [420, 190], [340, 430], [1040, 160], [1080, 490], [310, 200], [1130, 230], [210, 290], [1220, 330],
];

export function CircuitGrid() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Horizon sun, clipped at the horizon line */}
      <div className="absolute inset-x-0 top-0 bottom-[46%] overflow-hidden">
        <div className="absolute bottom-0 left-1/2 size-[min(46vw,520px)] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-b from-volt via-magenta to-violet opacity-[0.22] [mask-image:repeating-linear-gradient(to_bottom,#000_0_14px,transparent_14px_20px)]" />
      </div>

      {/* Synthwave floor: a perspective grid rushing toward the viewer */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] [perspective:420px]">
        <div
          className="absolute inset-x-[-50%] bottom-[-10%] h-[160%] origin-bottom [transform:rotateX(68deg)]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(139 107 255 / 0.55) 1.5px, transparent 1.5px), linear-gradient(90deg, rgb(34 224 214 / 0.4) 1.5px, transparent 1.5px)",
            backgroundSize: "64px 64px",
            animation: reduce ? undefined : "floor-run 1.2s linear infinite",
            maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta to-transparent shadow-[0_0_24px_4px_rgb(255_77_216/0.6)]" />
      </div>


      <svg className="absolute inset-0 size-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="trace" x1="0" x2="1">
            <stop offset="0" stopColor="#22e0d6" />
            <stop offset="1" stopColor="#ff4dd8" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d, i) => (
            <g key={d}>
              <motion.path
                d={d}
                stroke="rgb(120 130 200 / 0.22)"
                strokeWidth="1.5"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.3 + i * 0.08, ease: "easeInOut" }}
              />
              {!reduce && (
                <motion.path
                  d={d}
                  stroke="url(#trace)"
                  strokeWidth="2.5"
                  filter="url(#glow)"
                  strokeDasharray="0.12 1"
                  pathLength={1}
                  initial={{ strokeDashoffset: 0.12 }}
                  animate={{ strokeDashoffset: -1 }}
                  transition={{ duration: 2.4 + (i % 3) * 0.6, delay: 1.2 + i * 0.35, repeat: Infinity, repeatDelay: 1.5 + (i % 4), ease: "easeIn" }}
                />
              )}
            </g>
          ))}
        </g>
        {NODES.map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="#05050c"
            stroke={i % 2 ? "#ff4dd8" : "#22e0d6"}
            strokeWidth="2"
            filter="url(#glow)"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.08, type: "spring", stiffness: 300, damping: 14 }}
          />
        ))}
      </svg>
    </div>
  );
}
