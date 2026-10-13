"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { rng } from "@/lib/rng";
import { DawApp } from "./DawApp";
import { EngineApp } from "./EngineApp";
import { APP, APP_W, DOCK_H, SCREEN as S } from "./screenLayout";

const SWITCH_MS = 6500;
type AppName = "engine" | "daw";

const CODE_COLORS = ["#22e0d6", "#ff4dd8", "#8b6bff", "#f5f05a", "#5d6390", "#5d6390"];
const LINE_H = 9;
const CODE = (() => {
  const r = rng(77);
  return Array.from({ length: 24 }, () => {
    const indent = Math.floor(r() * 4) * 7;
    let x = indent;
    return Array.from({ length: 1 + Math.floor(r() * 4) }, () => {
      const w = Math.round(6 + r() * 26);
      const tok = { x, w, c: CODE_COLORS[Math.floor(r() * CODE_COLORS.length)] };
      x += w + 3;
      return tok;
    }).filter((t) => t.x + t.w < 118);
  });
})();

const DOCK_Y = APP.y + APP.h;
const DOCK_ICONS: { app: AppName; x: number }[] = [
  { app: "engine", x: APP.x + APP_W / 2 - 9 },
  { app: "daw", x: APP.x + APP_W / 2 + 9 },
];

// The ultrawide's display: the engine editor and a DAW take turns on the left, code scrolls on the right.
export function MonitorScreen() {
  const reduce = useReducedMotion();
  const [app, setApp] = useState<AppName>("engine");

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setApp((a) => (a === "engine" ? "daw" : "engine")), SWITCH_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <g>
      <defs>
        <clipPath id="screen-clip">
          <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="3" />
        </clipPath>
        <clipPath id="app-clip">
          <rect x={APP.x} y={APP.y} width={APP.w} height={APP.h} />
        </clipPath>
        <clipPath id="code-clip">
          <rect x={S.x + APP_W} y={S.y + 12} width={S.w - APP_W} height={S.h - 12} />
        </clipPath>
      </defs>

      <g clipPath="url(#screen-clip)">
        <rect x={APP.x} y={APP.y} width={APP.w} height={APP.h} fill="#07080f" />

        {/* Engine and DAW swap with a quick sideways glitch and a screen flash */}
        <g clipPath="url(#app-clip)">
          <AnimatePresence initial={false}>
            <motion.g
              key={app}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {app === "engine" ? <EngineApp /> : <DawApp />}
            </motion.g>
          </AnimatePresence>
          <motion.rect
            key={`flash-${app}`}
            x={APP.x}
            y={APP.y}
            width={APP.w}
            height={APP.h}
            fill="#cfe8ff"
            initial={{ opacity: reduce ? 0 : 0.35 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ pointerEvents: "none" }}
          />
        </g>

        {/* Dock: highlights the app on screen */}
        <rect x={APP.x} y={DOCK_Y} width={APP.w} height={DOCK_H} fill="#0a0c18" />
        <line x1={APP.x} x2={APP.x + APP.w} y1={DOCK_Y} y2={DOCK_Y} stroke="#1f2440" />
        {DOCK_ICONS.map((d) => (
          <g key={d.app} opacity={d.app === app ? 1 : 0.45}>
            <rect x={d.x - 4} y={DOCK_Y + 1.5} width="8" height="6" rx="1.5" fill={d.app === "engine" ? "#172554" : "#2a1236"} />
            {d.app === "engine" ? (
              <text x={d.x} y={DOCK_Y + 6.5} fill="#38bdf8" fontSize="5" fontWeight="700" textAnchor="middle" style={{ fontFamily: "monospace" }}>
                M
              </text>
            ) : (
              <polyline points={`${d.x - 2.5},${DOCK_Y + 4.5} ${d.x - 1.2},${DOCK_Y + 3} ${d.x},${DOCK_Y + 6} ${d.x + 1.2},${DOCK_Y + 2.5} ${d.x + 2.5},${DOCK_Y + 4.5}`} fill="none" stroke="#ff4dd8" strokeWidth=".8" />
            )}
          </g>
        ))}
        <motion.circle
          cy={DOCK_Y + 9}
          r=".9"
          fill="#22e0d6"
          initial={false}
          animate={{ cx: DOCK_ICONS.find((d) => d.app === app)!.x }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />

        {/* Code editor */}
        <rect x={S.x + APP_W} y={S.y} width={S.w - APP_W} height={S.h} fill="#090b16" />
        <rect x={S.x + APP_W} y={S.y} width={S.w - APP_W} height="11" fill="#121528" />
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <circle key={c} cx={S.x + APP_W + 7 + i * 6} cy={S.y + 5.5} r="1.8" fill={c} />
        ))}
        <line x1={S.x + APP_W} x2={S.x + APP_W} y1={S.y} y2={S.y + S.h} stroke="#1f2440" />
        <g clipPath="url(#code-clip)">
          <g className="rs-code" style={{ ["--scroll" as string]: `-${CODE.length * LINE_H}px` }}>
            {[0, 1].map((copy) =>
              CODE.map((line, i) => {
                const y = S.y + 16 + (copy * CODE.length + i) * LINE_H;
                return (
                  <g key={`${copy}-${i}`}>
                    <rect x={S.x + APP_W + 5} y={y} width="6" height="3.5" fill="#2c3152" />
                    {line.map((t) => (
                      <rect key={t.x} x={S.x + APP_W + 16 + t.x} y={y} width={t.w} height="3.5" rx="1" fill={t.c} opacity=".85" />
                    ))}
                  </g>
                );
              }),
            )}
          </g>
        </g>
        <rect x={S.x + APP_W + 16} y={S.y + S.h - 14} width="4" height="7" fill="#22e0d6" className="rs-blink" />

        {/* Screen glass */}
        <rect x={S.x} y={S.y} width={S.w} height={S.h} fill="url(#screen-sheen)" />
      </g>
    </g>
  );
}
