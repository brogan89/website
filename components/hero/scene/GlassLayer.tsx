import { rng, r2 } from "@/lib/rng";
import { GLASS, sceneSvgProps } from "./geometry";

const r = rng(9001);

const STREAKS = Array.from({ length: 110 }, () => ({
  x: r2(GLASS.x + r() * GLASS.w),
  len: r2(25 + r() * 55),
  dur: `${r2(0.7 + r() * 0.9)}s`,
  delay: `${r2(-r() * 3)}s`,
  o: r2(0.15 + r() * 0.3),
}));

const DROPLETS = Array.from({ length: 170 }, () => ({
  x: r2(GLASS.x + r() * GLASS.w),
  y: r2(GLASS.y + r() * GLASS.h),
  rad: r2(0.8 + r() * 1.8),
  o: r2(0.18 + r() * 0.35),
}));

const RIVULETS = Array.from({ length: 14 }, () => ({
  x: r2(GLASS.x + 20 + r() * (GLASS.w - 40)),
  y: r2(GLASS.y + r() * 120),
  dur: `${r2(7 + r() * 8)}s`,
  delay: `${r2(-r() * 14)}s`,
}));

// Rain on the window glass. Moves with the room, in front of the city.
export function GlassLayer() {
  return (
    <svg {...sceneSvgProps}>
      <defs>
        <clipPath id="glass-clip">
          <rect x={GLASS.x} y={GLASS.y} width={GLASS.w} height={GLASS.h} />
        </clipPath>
      </defs>
      <g clipPath="url(#glass-clip)">
        <rect x={GLASS.x} y={GLASS.y} width={GLASS.w} height={GLASS.h} fill="#2a3a7a" opacity=".08" />
        {/* Glass reflections */}
        <polygon points="230,32 430,32 140,598 -60,598" fill="#fff" opacity=".035" />
        <polygon points="470,32 520,32 230,598 180,598" fill="#fff" opacity=".025" />
        <polygon points="1180,32 1290,32 1000,598 890,598" fill="#fff" opacity=".03" />

        {DROPLETS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.rad} fill="#d6e4ff" opacity={d.o} />
        ))}

        {STREAKS.map((s, i) => (
          <line
            key={i}
            x1={s.x}
            x2={s.x}
            y1={-80}
            y2={-80 + s.len}
            stroke="#c8d8ff"
            strokeOpacity={s.o}
            strokeWidth="1"
            strokeLinecap="round"
            className="rs-rain"
            style={{ ["--dur" as string]: s.dur, ["--delay" as string]: s.delay }}
          />
        ))}

        {RIVULETS.map((v, i) => (
          <g key={i} className="rs-rivulet" style={{ ["--dur" as string]: v.dur, ["--delay" as string]: v.delay }}>
            <line x1={v.x} x2={v.x} y1={v.y - 34} y2={v.y} stroke="#dfe9ff" strokeOpacity=".22" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx={v.x} cy={v.y} r="2.4" fill="#e6efff" opacity=".6" />
          </g>
        ))}
      </g>
    </svg>
  );
}
