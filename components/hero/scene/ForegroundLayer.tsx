import { sceneSvgProps } from "./geometry";

// [angle, length, half-width] for each leaf of the floor plant, fanning out from the pot.
const LEAVES: [number, number, number][] = [
  [-80, 110, 26],
  [-58, 150, 34],
  [-34, 190, 40],
  [-10, 210, 42],
  [14, 186, 38],
  [38, 160, 34],
  [62, 118, 28],
];
const POT = { x: 633, y: 822 };

// Closest layer: a floor plant, a stack of books and the back of a gaming chair.
export function ForegroundLayer() {
  return (
    <svg {...sceneSvgProps}>
      <defs>
        <filter id="fg-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Floor plant */}
      <g className="rs-sway" style={{ transformOrigin: `${POT.x}px ${POT.y}px` }}>
        {LEAVES.map(([a, len, w]) => (
          <g key={a} transform={`rotate(${a} ${POT.x} ${POT.y})`}>
            <path
              d={`M${POT.x} ${POT.y} Q ${POT.x - w} ${POT.y - len * 0.55} ${POT.x} ${POT.y - len} Q ${POT.x + w} ${POT.y - len * 0.55} ${POT.x} ${POT.y} Z`}
              fill="#0a1f1b"
              stroke="#2ee6c8"
              strokeOpacity=".3"
            />
            <line x1={POT.x} y1={POT.y} x2={POT.x} y2={POT.y - len * 0.92} stroke="#16413a" strokeWidth="1.5" />
          </g>
        ))}
      </g>
      <polygon points="596,884 670,884 680,822 586,822" fill="#141026" stroke="#2a2440" />
      <rect x="582" y="816" width="102" height="10" rx="2" fill="#1c1734" />

      {/* Books on the floor */}
      {[
        [500, 864, 78, "#2a1f4a"],
        [506, 852, 70, "#3a1f3f"],
        [498, 840, 80, "#1f2f4a"],
        [510, 829, 62, "#2f2a55"],
      ].map(([x, y, w, c]) => (
        <rect key={y as number} x={x as number} y={y as number} width={w as number} height="11" rx="1" fill={c as string} stroke="#05050c" />
      ))}

      {/* Gaming chair back */}
      <g>
        <path d="M1272 920 L1262 724 Q1262 678 1302 674 L1378 674 Q1418 678 1418 724 L1410 920 Z" fill="#07060d" />
        <path
          d="M1272 920 L1262 724 Q1262 678 1302 674 L1378 674 Q1418 678 1418 724 L1410 920"
          fill="none"
          stroke="#22e0d6"
          strokeWidth="2"
          filter="url(#fg-glow)"
        />
        <rect x="1305" y="688" width="70" height="24" rx="10" fill="#0d0b18" stroke="#22e0d6" strokeOpacity=".4" />
        <path d="M1300 740 L1296 900 M1380 740 L1384 900" stroke="#1a1730" strokeWidth="2" />
      </g>
    </svg>
  );
}
