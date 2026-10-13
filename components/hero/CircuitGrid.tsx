"use client";

import { motion, useReducedMotion } from "motion/react";
import { Rain } from "./Rain";
import { Skyline } from "./Skyline";

// Hero backdrop: circuit traces with light packets, searchlights, flying cars, a neon skyline,
// the synthwave floor and rain. Circuit traces that run in from the edges:
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
      {/* Searchlights sweeping up from behind the city */}
      {!reduce && (
        <div className="absolute inset-x-0 top-0 bottom-[46%] overflow-hidden">
          <div className="searchlight left-[18%]" />
          <div className="searchlight left-[72%] [animation-delay:-4s] [animation-duration:11s]" />
        </div>
      )}

      {/* Flying cars crossing the sky */}
      {!reduce && (
        <>
          <span className="spinner-car top-[18%]" style={{ ["--dur" as string]: "13s", ["--car" as string]: "#22e0d6" }} />
          <span className="spinner-car top-[30%] [animation-delay:-6s]" style={{ ["--dur" as string]: "9s" }} />
          <span className="spinner-car top-[40%] [animation-direction:reverse] [animation-delay:-3s]" style={{ ["--dur" as string]: "16s", ["--car" as string]: "#f5f05a" }} />
        </>
      )}

      {/* Neon city on the horizon */}
      <div className="absolute inset-x-0 bottom-[46%] h-[42%]">
        <Skyline />
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


      {!reduce && <Rain />}
    </div>
  );
}
