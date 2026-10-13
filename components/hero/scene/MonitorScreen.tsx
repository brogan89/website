"use client";

import { motion, useReducedMotion } from "motion/react";
import { rng, r2 } from "@/lib/rng";

// Screen area inside the monitor bezel.
const S = { x: 1000, y: 340, w: 390, h: 236 };
const GAME_W = 250;
const HORIZON = 480;
const VP = S.x + GAME_W / 2; // vanishing point x

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

const CITY = (() => {
  const r = rng(5);
  const out: { x: number; w: number; h: number }[] = [];
  for (let x = S.x; x < S.x + GAME_W; ) {
    const w = Math.round(8 + r() * 16);
    out.push({ x, w, h: Math.round(6 + r() * 24) });
    x += w;
  }
  return out;
})();

const H_LINES = 7;

// The ultrawide's display: a synthwave game with the rolling grid, plus a code editor.
export function MonitorScreen() {
  const reduce = useReducedMotion();
  return (
    <g>
      <defs>
        <clipPath id="screen-clip">
          <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="3" />
        </clipPath>
        <clipPath id="code-clip">
          <rect x={S.x + GAME_W} y={S.y + 12} width={S.w - GAME_W} height={S.h - 12} />
        </clipPath>
        <linearGradient id="game-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12082e" />
          <stop offset=".7" stopColor="#4a1260" />
          <stop offset="1" stopColor="#ff4dd8" />
        </linearGradient>
        <linearGradient id="game-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f05a" />
          <stop offset=".6" stopColor="#ff4dd8" />
          <stop offset="1" stopColor="#8b6bff" />
        </linearGradient>
        <mask id="sun-mask">
          <circle cx={VP} cy={HORIZON} r="46" fill="#fff" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={VP - 50} y={HORIZON - 26 + i * 6} width="100" height={1.2 + i * 0.7} fill="#000" />
          ))}
        </mask>
      </defs>

      <g clipPath="url(#screen-clip)">
        {/* Game */}
        <rect x={S.x} y={S.y} width={GAME_W} height={HORIZON - S.y} fill="url(#game-sky)" />
        <rect x={S.x} y={HORIZON - 46} width={GAME_W} height="46" fill="url(#game-sun)" mask="url(#sun-mask)" />
        {CITY.map((b) => (
          <rect key={b.x} x={b.x} y={HORIZON - b.h} width={b.w - 1} height={b.h} fill="#140a30" />
        ))}
        <rect x={S.x} y={HORIZON} width={GAME_W} height={S.y + S.h - HORIZON} fill="#0b0520" />
        <g stroke="#ff4dd8" strokeOpacity=".55" strokeWidth=".8">
          {Array.from({ length: 21 }, (_, k) => (
            <line key={k} x1={VP} y1={HORIZON} x2={VP + (k - 10) * 42} y2={S.y + S.h} />
          ))}
          {Array.from({ length: H_LINES }, (_, i) =>
            reduce ? (
              <line key={i} x1={S.x} x2={S.x + GAME_W} y1={r2(HORIZON + ((i + 1) / H_LINES) ** 2 * 96)} y2={r2(HORIZON + ((i + 1) / H_LINES) ** 2 * 96)} />
            ) : (
              <motion.line
                key={i}
                x1={S.x}
                x2={S.x + GAME_W}
                initial={{ y1: HORIZON, y2: HORIZON }}
                animate={{ y1: [HORIZON, S.y + S.h], y2: [HORIZON, S.y + S.h] }}
                transition={{ duration: 2.1, ease: "easeIn", repeat: Infinity, delay: (i * 2.1) / H_LINES }}
              />
            ),
          )}
        </g>
        <line x1={S.x} x2={S.x + GAME_W} y1={HORIZON} y2={HORIZON} stroke="#ff9cf0" strokeWidth="1" />
        <text x={S.x + 8} y={S.y + 14} fill="#22e0d6" fontSize="8" style={{ fontFamily: "monospace" }}>
          SCORE 004200
        </text>
        <text x={S.x + GAME_W - 8} y={S.y + 14} fill="#ff4dd8" fontSize="8" textAnchor="end" style={{ fontFamily: "monospace" }}>
          ♥ ♥ ♥
        </text>

        {/* Code editor */}
        <rect x={S.x + GAME_W} y={S.y} width={S.w - GAME_W} height={S.h} fill="#090b16" />
        <rect x={S.x + GAME_W} y={S.y} width={S.w - GAME_W} height="11" fill="#121528" />
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <circle key={c} cx={S.x + GAME_W + 7 + i * 6} cy={S.y + 5.5} r="1.8" fill={c} />
        ))}
        <line x1={S.x + GAME_W} x2={S.x + GAME_W} y1={S.y} y2={S.y + S.h} stroke="#1f2440" />
        <g clipPath="url(#code-clip)">
          <g className="rs-code" style={{ ["--scroll" as string]: `-${CODE.length * LINE_H}px` }}>
            {[0, 1].map((copy) =>
              CODE.map((line, i) => {
                const y = S.y + 16 + (copy * CODE.length + i) * LINE_H;
                return (
                  <g key={`${copy}-${i}`}>
                    <rect x={S.x + GAME_W + 5} y={y} width="6" height="3.5" fill="#2c3152" />
                    {line.map((t) => (
                      <rect key={t.x} x={S.x + GAME_W + 16 + t.x} y={y} width={t.w} height="3.5" rx="1" fill={t.c} opacity=".85" />
                    ))}
                  </g>
                );
              }),
            )}
          </g>
        </g>
        <rect x={S.x + GAME_W + 16} y={S.y + S.h - 14} width="4" height="7" fill="#22e0d6" className="rs-blink" />

        {/* Screen glass */}
        <rect x={S.x} y={S.y} width={S.w} height={S.h} fill="url(#screen-sheen)" />
      </g>
    </g>
  );
}
