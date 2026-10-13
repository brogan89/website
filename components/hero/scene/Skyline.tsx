// Neon city skyline that sits on the hero's horizon line.
// Everything is generated from a fixed seed so server and client markup match.

import { rng } from "@/lib/rng";

const W = 1440;
const H = 420;

type Building = { x: number; w: number; h: number; antenna: boolean; sign?: { text: string; color: string } };

const SIGNS = [
  { text: "電脳", color: "#ff4dd8" },
  { text: "ネオン", color: "#22e0d6" },
  { text: "未来", color: "#f5f05a" },
  { text: "夜城", color: "#8b6bff" },
];

function layer(seed: number, minW: number, maxW: number, minH: number, maxH: number, signEvery = 0) {
  const r = rng(seed);
  const out: Building[] = [];
  let x = -20;
  let i = 0;
  while (x < W + 20) {
    const w = Math.round(minW + r() * (maxW - minW));
    // Taller towers cluster toward the edges so the centre stays readable behind the title.
    const edge = Math.abs(x + w / 2 - W / 2) / (W / 2);
    const h = Math.round(minH + r() * (maxH - minH) * (0.45 + 0.55 * edge));
    const sign = signEvery && i % signEvery === 2 && h > maxH * 0.45 ? SIGNS[(i / signEvery) % SIGNS.length | 0] : undefined;
    out.push({ x, w, h, antenna: r() > 0.7, sign });
    x += w + Math.round(r() * 6);
    i++;
  }
  return out;
}

const FAR = layer(7, 26, 70, 90, 300);
const NEAR = layer(42, 44, 120, 50, 210, 4);

const WINDOW_COLORS = ["#f5f05a", "#22e0d6", "#ff4dd8", "#c9b8ff"];

function windows(b: Building, seed: number) {
  const r = rng(seed);
  const cols = Math.max(2, Math.floor((b.w - 10) / 9));
  const rows = Math.floor((b.h - 16) / 12);
  const out: { x: number; y: number; c: string; flicker: boolean; delay: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (r() > 0.32) continue;
      out.push({
        x: b.x + 6 + col * 9,
        y: H - b.h + 10 + row * 12,
        c: WINDOW_COLORS[Math.floor(r() * WINDOW_COLORS.length)],
        flicker: r() > 0.86,
        delay: r() * 6,
      });
    }
  }
  return out;
}

// Renders as a nested <svg> so it can be placed inside a larger scene.
export function Skyline({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sky-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1a5c" />
          <stop offset="1" stopColor="#120c2c" />
        </linearGradient>
        <linearGradient id="sky-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0a1f" />
          <stop offset="1" stopColor="#05050c" />
        </linearGradient>
        <linearGradient id="sky-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4dd8" stopOpacity="0" />
          <stop offset="1" stopColor="#ff4dd8" stopOpacity="0.35" />
        </linearGradient>
        <filter id="sky-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Far layer: hazy violet towers */}
      <g opacity="0.85">
        {FAR.map((b) => (
          <g key={`f${b.x}`}>
            <rect x={b.x} y={H - b.h} width={b.w} height={b.h} fill="url(#sky-far)" />
            {b.antenna && (
              <>
                <line x1={b.x + b.w / 2} x2={b.x + b.w / 2} y1={H - b.h} y2={H - b.h - 22} stroke="#2a1a5c" strokeWidth="2" />
                <circle cx={b.x + b.w / 2} cy={H - b.h - 22} r="2" fill="#ff3355" className="sky-beacon" style={{ animationDelay: `${(b.x % 7) * 0.3}s` }} />
              </>
            )}
          </g>
        ))}
      </g>

      <rect x="0" y={H - 160} width={W} height="160" fill="url(#sky-haze)" />

      {/* Near layer: dark silhouettes with lit windows, rim light and signs */}
      {NEAR.map((b, i) => (
        <g key={`n${b.x}`}>
          <rect x={b.x} y={H - b.h} width={b.w} height={b.h} fill="url(#sky-near)" />
          <line x1={b.x} x2={b.x + b.w} y1={H - b.h + 0.5} y2={H - b.h + 0.5} stroke={i % 2 ? "#22e0d6" : "#ff4dd8"} strokeOpacity=".18" strokeWidth="5" />
          <line x1={b.x} x2={b.x + b.w} y1={H - b.h + 0.5} y2={H - b.h + 0.5} stroke={i % 2 ? "#22e0d6" : "#ff4dd8"} strokeOpacity=".7" />
          {windows(b, i * 97 + 3).map((w) => (
            <rect
              key={`${w.x}-${w.y}`}
              x={w.x}
              y={w.y}
              width="4"
              height="5"
              fill={w.c}
              opacity="0.75"
              className={w.flicker ? "sky-flicker" : undefined}
              style={w.flicker ? { animationDelay: `${w.delay}s` } : undefined}
            />
          ))}
          {b.antenna && (
            <>
              <line x1={b.x + b.w * 0.3} x2={b.x + b.w * 0.3} y1={H - b.h} y2={H - b.h - 30} stroke="#1a1530" strokeWidth="2.5" />
              <circle cx={b.x + b.w * 0.3} cy={H - b.h - 30} r="2.5" fill="#ff3355" filter="url(#sky-glow)" className="sky-beacon" style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
            </>
          )}
          {b.sign && (
            <g filter="url(#sky-glow)" className="sky-sign" style={{ animationDelay: `${i * 0.7}s` }}>
              <rect x={b.x + b.w - 22} y={H - b.h + 14} width="16" height={b.sign.text.length * 17 + 10} rx="2" fill="#05050c" stroke={b.sign.color} strokeWidth="1.5" />
              <text
                x={b.x + b.w - 14}
                y={H - b.h + 22}
                fill={b.sign.color}
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
                style={{ writingMode: "vertical-rl" }}
              >
                {b.sign.text}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
