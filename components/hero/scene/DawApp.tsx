"use client";

import { motion, useReducedMotion } from "motion/react";
import { rng, r2 } from "@/lib/rng";
import { APP } from "./screenLayout";

const HEADER_W = 41;
const TOP = APP.y + 19; // below title bar + ruler
const LANE_X = APP.x + HEADER_W;
const LANE_W = APP.w - HEADER_W;
const BAR_W = LANE_W / 8;
const PLAY_SECONDS = 6.5;

type Kind = "hits" | "notes" | "wave";
const TRACKS: { name: string; color: string; kind: Kind; clips: [number, number][] }[] = [
  { name: "Drums", color: "#f5f05a", kind: "hits", clips: [[0, 4], [4, 4]] },
  { name: "Bass", color: "#22e0d6", kind: "notes", clips: [[0, 2], [2, 2], [4, 4]] },
  { name: "Guitar", color: "#ff4dd8", kind: "wave", clips: [[1, 3], [4, 4]] },
  { name: "Keys", color: "#8b6bff", kind: "notes", clips: [[2, 2], [6, 2]] },
  { name: "Vox", color: "#3cff8f", kind: "wave", clips: [[2, 6]] },
];
const TRACK_H = (APP.y + APP.h - TOP) / TRACKS.length;

// Clip contents are generated once from a seed so server and client markup match.
function clipContent(kind: Kind, x: number, y: number, w: number, h: number, seed: number) {
  const r = rng(seed);
  if (kind === "hits") {
    const out: { x: number; y: number; w: number; h: number }[] = [];
    for (let i = 0; i < w / (BAR_W / 8) - 0.5; i++) {
      const px = r2(x + 1 + i * (BAR_W / 8));
      if (i % 2 === 0) out.push({ x: px, y: r2(y + h * 0.62), w: 1.6, h: r2(h * 0.24) }); // kick
      if (i % 4 === 2) out.push({ x: px, y: r2(y + h * 0.3), w: 1.6, h: r2(h * 0.22) }); // snare
      out.push({ x: px, y: r2(y + h * 0.12), w: 1, h: r2(h * 0.1) }); // hats
    }
    return { rects: out };
  }
  if (kind === "notes") {
    const out: { x: number; y: number; w: number; h: number }[] = [];
    for (let px = x + 1.5; px < x + w - 4; ) {
      const len = r2(3 + r() * 9);
      out.push({ x: r2(px), y: r2(y + 2 + r() * (h - 6)), w: Math.min(len, r2(x + w - 1.5 - px)), h: 1.8 });
      px += len + 1 + r() * 3;
    }
    return { rects: out };
  }
  const mid = y + h / 2;
  const pts: string[] = [];
  for (let px = 0; px <= w; px += 1.5) {
    const amp = (0.25 + 0.75 * Math.abs(Math.sin(px * 0.11 + seed))) * (h / 2 - 1.5) * (0.5 + r() * 0.5);
    pts.push(`${r2(x + px)},${r2(mid - amp)}`);
  }
  for (let px = w; px >= 0; px -= 1.5) {
    const amp = (0.25 + 0.75 * Math.abs(Math.sin(px * 0.11 + seed))) * (h / 2 - 1.5) * (0.5 + r() * 0.5);
    pts.push(`${r2(x + px)},${r2(mid + amp)}`);
  }
  return { wave: pts.join(" ") };
}

const CLIPS = TRACKS.flatMap((t, ti) =>
  t.clips.map(([start, len], ci) => {
    const x = r2(LANE_X + start * BAR_W + 0.5);
    const w = r2(len * BAR_W - 1);
    const y = r2(TOP + ti * TRACK_H + 2);
    const h = r2(TRACK_H - 4);
    return { key: `${ti}-${ci}`, color: t.color, x, y, w, h, ...clipContent(t.kind, x, y + 3, w, h - 3, ti * 31 + ci * 7 + 1) };
  }),
);

// A DAW arrangement: five tracks of clips, bouncing level meters and a sweeping playhead.
export function DawApp() {
  const reduce = useReducedMotion();
  return (
    <g>
      {/* Title bar with transport */}
      <rect x={APP.x} y={APP.y} width={APP.w} height="11" fill="#1a1424" />
      <text x={APP.x + 4} y={APP.y + 7.8} fill="#b8a8c8" fontSize="5.5" style={{ fontFamily: "monospace" }}>
        ♪ demo_v3 — 128 BPM · 4/4
      </text>
      <polygon points={`${APP.x + 222},${APP.y + 2.5} ${APP.x + 222},${APP.y + 8.5} ${APP.x + 227},${APP.y + 5.5}`} fill="#28c840" />
      <circle cx={APP.x + 234} cy={APP.y + 5.5} r="2.8" fill="#ef4444" className="rs-blink" />
      <rect x={APP.x + 240} y={APP.y + 3} width="7" height="5" rx="2.5" fill="none" stroke="#5d6390" strokeWidth="1" />

      {/* Bar ruler */}
      <rect x={APP.x} y={APP.y + 11} width={APP.w} height="8" fill="#120e1c" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <line x1={LANE_X + i * BAR_W} x2={LANE_X + i * BAR_W} y1={APP.y + 13} y2={APP.y + 19} stroke="#3a3050" />
          <text x={LANE_X + i * BAR_W + 1.5} y={APP.y + 17.5} fill="#6e6290" fontSize="4.5" style={{ fontFamily: "monospace" }}>
            {i + 1}
          </text>
        </g>
      ))}

      {/* Tracks */}
      {TRACKS.map((t, i) => {
        const y = TOP + i * TRACK_H;
        return (
          <g key={t.name}>
            <rect x={APP.x} y={y} width={HEADER_W} height={TRACK_H} fill={i % 2 ? "#17121f" : "#151020"} />
            <rect x={LANE_X} y={y} width={LANE_W} height={TRACK_H} fill={i % 2 ? "#110d1a" : "#0f0c18"} />
            <rect x={APP.x + 1} y={y + 3} width="2.5" height={TRACK_H - 6} rx="1" fill={t.color} />
            <text x={APP.x + 6} y={y + 9} fill="#d6cce6" fontSize="5" style={{ fontFamily: "monospace" }}>
              {t.name}
            </text>
            {["M", "S"].map((l, k) => (
              <g key={l}>
                <rect x={APP.x + 6 + k * 8} y={y + TRACK_H - 10} width="6" height="5" rx="1" fill="#2a2240" />
                <text x={APP.x + 9 + k * 8} y={y + TRACK_H - 6.4} fill="#8a7fa8" fontSize="3.6" textAnchor="middle" style={{ fontFamily: "monospace" }}>
                  {l}
                </text>
              </g>
            ))}
            {/* Level meter */}
            <rect x={APP.x + 35} y={y + 3} width="3" height={TRACK_H - 6} fill="#0c0a14" />
            <rect
              x={APP.x + 35}
              y={y + 3}
              width="3"
              height={TRACK_H - 6}
              fill="url(#daw-meter)"
              className="rs-meter"
              style={{ ["--dur" as string]: `${0.42 + i * 0.09}s`, animationDelay: `${-i * 0.13}s` }}
            />
            <line x1={APP.x} x2={APP.x + APP.w} y1={y + TRACK_H} y2={y + TRACK_H} stroke="#1f1830" />
          </g>
        );
      })}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={LANE_X + (i + 1) * BAR_W} x2={LANE_X + (i + 1) * BAR_W} y1={TOP} y2={APP.y + APP.h} stroke="#1c1729" />
      ))}
      <line x1={LANE_X} x2={LANE_X} y1={APP.y + 11} y2={APP.y + APP.h} stroke="#2a2240" />

      {/* Clips */}
      {CLIPS.map((c) => (
        <g key={c.key}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="1.5" fill={c.color} fillOpacity=".2" stroke={c.color} strokeOpacity=".75" strokeWidth=".6" />
          <rect x={c.x} y={c.y} width={c.w} height="2.5" rx="1" fill={c.color} opacity=".85" />
          {c.rects?.map((r, i) => (
            <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={c.color} opacity=".9" />
          ))}
          {c.wave && <polygon points={c.wave} fill={c.color} opacity=".7" />}
        </g>
      ))}

      <defs>
        <linearGradient id="daw-meter" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3cff8f" />
          <stop offset=".7" stopColor="#f5f05a" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* Playhead */}
      <motion.g
        initial={{ x: 0 }}
        animate={reduce ? { x: LANE_W * 0.35 } : { x: LANE_W }}
        transition={reduce ? { duration: 0 } : { duration: PLAY_SECONDS, ease: "linear", repeat: Infinity }}
      >
        <line x1={LANE_X} x2={LANE_X} y1={APP.y + 11} y2={APP.y + APP.h} stroke="#fff" strokeWidth=".8" />
        <polygon points={`${LANE_X - 2.5},${APP.y + 11} ${LANE_X + 2.5},${APP.y + 11} ${LANE_X},${APP.y + 15}`} fill="#fff" />
      </motion.g>
    </g>
  );
}
