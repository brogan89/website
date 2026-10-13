import { rng, r2 } from "@/lib/rng";
import { Skyline } from "./Skyline";
import { SCENE_H, SCENE_W, sceneSvgProps } from "./geometry";

// Hero towers right behind the glass, with big vertical neon signs.
const TOWERS = [
  { x: 230, w: 120, top: 150, rim: "#ff4dd8" },
  { x: 590, w: 140, top: 300, rim: "#22e0d6" },
  { x: 1040, w: 160, top: 100, rim: "#8b6bff" },
];

function towerWindows(t: (typeof TOWERS)[number], seed: number) {
  const r = rng(seed);
  const out: { x: number; y: number; c: string }[] = [];
  for (let y = t.top + 16; y < 600; y += 14) {
    for (let x = t.x + 8; x < t.x + t.w - 8; x += 11) {
      if (r() > 0.22) continue;
      out.push({ x, y, c: r() > 0.5 ? "#f5f05a" : r() > 0.5 ? "#22e0d6" : "#c9b8ff" });
    }
  }
  return out;
}

const CARS = [
  { y: 210, dur: "14s", delay: "-3s", light: "#22e0d6" },
  { y: 268, dur: "10s", delay: "-7s", light: "#ff4dd8" },
  { y: 330, dur: "18s", delay: "-12s", light: "#f5f05a" },
];

function VerticalSign({ x, y, text, color, size }: { x: number; y: number; text: string; color: string; size: number }) {
  const h = text.length * (size + 4) + 16;
  return (
    <g filter="url(#city-glow)" className="sky-sign" style={{ animationDelay: `${r2(x / 300)}s` }}>
      <rect x={x} y={y} width={size + 12} height={h} rx="3" fill="#07050f" stroke={color} strokeWidth="2" />
      <text
        x={x + (size + 12) / 2}
        y={y + 10}
        fill={color}
        fontSize={size}
        fontWeight="700"
        textAnchor="middle"
        style={{ writingMode: "vertical-rl", fontFamily: "sans-serif", letterSpacing: 4 }}
      >
        {text}
      </text>
    </g>
  );
}

// The night city seen through the window. Furthest parallax layer.
export function CityLayer() {
  return (
    <svg {...sceneSvgProps}>
      <defs>
        <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050920" />
          <stop offset=".55" stopColor="#170f3e" />
          <stop offset=".85" stopColor="#36124e" />
          <stop offset="1" stopColor="#57195a" />
        </linearGradient>
        <radialGradient id="city-haze" cx=".5" cy="1" r=".7">
          <stop offset="0" stopColor="#ff4dd8" stopOpacity=".35" />
          <stop offset="1" stopColor="#ff4dd8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="city-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22e0d6" stopOpacity=".3" />
          <stop offset="1" stopColor="#22e0d6" stopOpacity="0" />
        </linearGradient>
        <filter id="city-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="-200" y="-200" width={SCENE_W + 400} height="860" fill="url(#city-sky)" />
      <rect x="-200" y="250" width={SCENE_W + 400} height="400" fill="url(#city-haze)" />
      <rect x="-200" y="-200" width={SCENE_W + 400} height="860" fill="#b9c6ff" className="rs-lightning" />

      {/* Searchlights sweeping from behind the skyline */}
      {[330, 880, 1260].map((x, i) => (
        <polygon
          key={x}
          points={`${x - 6},600 ${x + 6},600 ${x + 110},-40 ${x - 110},-40`}
          fill="url(#city-beam)"
          className="rs-beam"
          style={{ transformOrigin: `${x}px 600px`, animationDelay: `${-i * 3.3}s`, animationDuration: `${9 + i * 2}s` }}
        />
      ))}

      <Skyline x={-60} y={130} width={SCENE_W + 120} height={480} />

      {TOWERS.map((t, i) => (
        <g key={t.x}>
          <rect x={t.x} y={t.top} width={t.w} height={SCENE_H} fill="#0a0818" />
          <line x1={t.x} x2={t.x + t.w} y1={t.top + 0.5} y2={t.top + 0.5} stroke={t.rim} strokeOpacity=".2" strokeWidth="6" />
          <line x1={t.x} x2={t.x + t.w} y1={t.top + 0.5} y2={t.top + 0.5} stroke={t.rim} strokeOpacity=".8" strokeWidth="1.5" />
          {towerWindows(t, 300 + i * 17).map((w) => (
            <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="5" height="6" fill={w.c} opacity=".6" />
          ))}
          <line x1={t.x + t.w / 2} x2={t.x + t.w / 2} y1={t.top} y2={t.top - 40} stroke="#1a1530" strokeWidth="3" />
          <circle cx={t.x + t.w / 2} cy={t.top - 40} r="3" fill="#ff3355" filter="url(#city-glow)" className="sky-beacon" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}

      <VerticalSign x={312} y={190} text="電脳街" color="#ff4dd8" size={26} />
      <VerticalSign x={1052} y={140} text="ネオン" color="#22e0d6" size={20} />
      <VerticalSign x={1160} y={170} text="夜城" color="#f5f05a" size={16} />

      {/* Rooftop billboard */}
      <g filter="url(#city-glow)" className="sky-sign" style={{ animationDelay: "-2s" }}>
        <rect x="600" y="326" width="120" height="34" rx="3" fill="#06060f" stroke="#22e0d6" strokeWidth="2" />
        <text x="660" y="349" fill="#22e0d6" fontSize="15" fontWeight="700" textAnchor="middle" style={{ fontFamily: "monospace", letterSpacing: 2 }}>
          MAINFRAME
        </text>
      </g>

      {/* Flying cars */}
      {CARS.map((c) => (
        <g key={c.y} className="rs-car" style={{ ["--dur" as string]: c.dur, ["--delay" as string]: c.delay }}>
          <line x1="-60" x2="-4" y1={c.y + 2} y2={c.y + 2} stroke={c.light} strokeOpacity=".5" strokeWidth="1.5" />
          <rect x="0" y={c.y} width="22" height="5" rx="2" fill="#1a1630" />
          <rect x="18" y={c.y + 1} width="4" height="2" fill="#f5f05a" filter="url(#city-glow)" />
          <rect x="0" y={c.y + 1} width="3" height="2" fill="#ff3355" />
        </g>
      ))}
    </svg>
  );
}
