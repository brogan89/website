import { GLASS, SCENE_W, sceneSvgProps } from "./geometry";
import { MonitorScreen } from "./MonitorScreen";

const FANS = [445, 505, 565];
const BLADES = Array.from({ length: 7 }, (_, i) => (i * 360) / 7);
const KEY_ROWS = [0, 1, 2];

// A straight line has a zero-width bounding box, which collapses bbox-relative filter regions,
// so glowing lines use filters with an explicit user-space region around the line instead.
function LineFilters({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  return (
    <>
      <filter id={`${id}-glow`} filterUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${id}-blur`} filterUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </>
  );
}

function NeonTube({ id, x1, y1, x2, y2, color }: { id: string; x1: number; y1: number; x2: number; y2: number; color: string }) {
  return (
    <g className="rs-neon">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="18" strokeOpacity=".3" strokeLinecap="round" filter={`url(#${id}-blur)`} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="6" strokeLinecap="round" filter={`url(#${id}-glow)`} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Fan({ cy }: { cy: number }) {
  const cx = 860;
  return (
    <g>
      <circle cx={cx} cy={cy} r="17" fill="#0d0a1a" stroke="#c08bff" strokeWidth="2.5" filter="url(#room-glow)" className="rs-pulse" />
      <g transform={`translate(${cx} ${cy})`}>
        <g className="rs-fan">
          {BLADES.map((a) => (
            <path key={a} d="M0 0 Q 7 -5 14 -2 Q 8 2 0 0 Z" fill="#6d4fb8" opacity=".85" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="4" fill="#1a1530" stroke="#c08bff" strokeWidth="1" />
      </g>
    </g>
  );
}

// The room: wall with the window cut out, neon tubes, desk, PC, monitor, keyboard and lamp.
export function RoomLayer() {
  return (
    <svg {...sceneSvgProps}>
      <defs>
        <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c0a22" />
          <stop offset="1" stopColor="#090717" />
        </linearGradient>
        <radialGradient id="room-screen-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#22e0d6" stopOpacity=".28" />
          <stop offset=".5" stopColor="#8b6bff" stopOpacity=".12" />
          <stop offset="1" stopColor="#8b6bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="room-pc-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#b46bff" stopOpacity=".35" />
          <stop offset="1" stopColor="#b46bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="room-magenta-spill" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ff4dd8" stopOpacity=".22" />
          <stop offset="1" stopColor="#ff4dd8" stopOpacity="0" />
        </radialGradient>
        {/* Soft pools of light; gradients rather than blur filters, which clip on thin shapes */}
        <radialGradient id="room-soft-violet" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#b46bff" stopOpacity=".32" />
          <stop offset="1" stopColor="#b46bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="room-soft-cyan" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#22e0d6" stopOpacity=".45" />
          <stop offset="1" stopColor="#22e0d6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="room-under" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b46bff" stopOpacity=".3" />
          <stop offset="1" stopColor="#b46bff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="room-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120f24" />
          <stop offset="1" stopColor="#0a0816" />
        </linearGradient>
        <linearGradient id="room-lamp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd59a" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="room-ram" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22e0d6" />
          <stop offset="1" stopColor="#ff4dd8" />
        </linearGradient>
        <linearGradient id="screen-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".07" />
          <stop offset=".4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Rainbow wave that sweeps across the keyboard */}
        <linearGradient id="room-rgb" gradientUnits="userSpaceOnUse" x1="1040" y1="0" x2="1300" y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor="#22e0d6" />
          <stop offset=".33" stopColor="#8b6bff" />
          <stop offset=".66" stopColor="#ff4dd8" />
          <stop offset="1" stopColor="#22e0d6" />
          <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="260 0" dur="4s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="room-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <LineFilters id="tube-v" x={900} y={0} w={100} h={640} />
        <LineFilters id="tube-d" x={940} y={20} w={490} h={210} />
        <LineFilters id="desk-led" x={640} y={630} w={900} h={70} />
        <LineFilters id="leg-led" x={680} y={640} w={60} h={260} />
        <LineFilters id="kb" x={1010} y={590} w={300} h={80} />
        <LineFilters id="gpu-led" x={720} y={530} w={130} h={40} />
        <filter id="room-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Wall with the window cut out */}
      <path
        fillRule="evenodd"
        fill="url(#room-wall)"
        d={`M-200 -200H${SCENE_W + 200}V1100H-200Z M${GLASS.x} ${GLASS.y}h${GLASS.w}v${GLASS.h}h-${GLASS.w}Z`}
      />
      <ellipse cx="951" cy="320" rx="260" ry="340" fill="url(#room-magenta-spill)" />

      {/* Window frame */}
      <g fill="#06050d">
        <rect x="18" y="8" width="1404" height="24" />
        <rect x="18" y="8" width="24" height="600" />
        <rect x="1398" y="8" width="24" height="600" />
        <rect x="474" y="20" width="14" height="590" />
        <rect x="944" y="20" width="14" height="590" />
        <rect x="30" y="146" width="1380" height="10" />
      </g>
      <g stroke="#2b2450" strokeWidth="1" fill="none">
        <rect x={GLASS.x} y={GLASS.y} width={GLASS.w} height={GLASS.h} />
        <line x1="474" x2="474" y1="32" y2="598" />
        <line x1="958" x2="958" y1="32" y2="598" />
      </g>

      <NeonTube id="tube-v" x1={951} y1={44} x2={951} y2={586} color="#ff4dd8" />
      <NeonTube id="tube-d" x1={975} y1={186} x2={1388} y2={60} color="#22e0d6" />

      {/* Sill with a plant and books */}
      <rect x="10" y="598" width="1420" height="24" fill="#0d0b1b" />
      <line x1="10" x2="1430" y1="598.5" y2="598.5" stroke="#3b2f6b" />
      <g>
        <polygon points="100,598 140,598 136,574 104,574" fill="#1a1530" stroke="#2a2440" />
        {[-40, -15, 10, 35].map((a) => (
          <ellipse key={a} cx="120" cy="552" rx="7" ry="22" fill="#0b221d" stroke="#2ee6c8" strokeOpacity=".3" transform={`rotate(${a} 120 574)`} />
        ))}
        {[
          [180, 30, "#2a1f4a"],
          [192, 38, "#3a1f3f"],
          [206, 34, "#1f2f4a"],
          [218, 42, "#2f2a55"],
        ].map(([x, h, c]) => (
          <rect key={x as number} x={x as number} y={598 - (h as number)} width="11" height={h as number} fill={c as string} stroke="#05050c" />
        ))}
      </g>

      {/* Light spill from the screen and PC */}
      <ellipse cx="1195" cy="470" rx="380" ry="260" fill="url(#room-screen-glow)" />
      <ellipse cx="800" cy="520" rx="170" ry="190" fill="url(#room-pc-glow)" />

      {/* Under the desk: legs, drawers, floor */}
      <rect x="690" y="666" width="820" height="130" fill="url(#room-under)" />
      <rect x="700" y="664" width="16" height="216" fill="#08070f" />
      <line x1="708" x2="708" y1="672" y2="870" stroke="#22e0d6" strokeWidth="2" filter="url(#leg-led-glow)" />
      <rect x="1280" y="664" width="150" height="216" fill="#0b0a16" stroke="#1d1934" />
      {[700, 760, 820].map((y) => (
        <g key={y}>
          <line x1="1280" x2="1430" y1={y + 4} y2={y + 4} stroke="#1d1934" />
          <rect x="1338" y={y + 22} width="34" height="3" rx="1.5" fill="#2a2545" />
        </g>
      ))}
      <rect x="-200" y="870" width={SCENE_W + 400} height="230" fill="#06050b" />
      <ellipse cx="1080" cy="882" rx="460" ry="26" fill="url(#room-soft-violet)" />
      <ellipse cx="708" cy="884" rx="50" ry="12" fill="url(#room-soft-cyan)" />

      {/* Desk surface */}
      <polygon points="700,612 1500,612 1500,650 680,650" fill="url(#room-desk)" />
      <line x1="700" x2="1500" y1="612.5" y2="612.5" stroke="#2c2550" />
      <ellipse cx="1195" cy="628" rx="250" ry="22" fill="url(#room-soft-cyan)" opacity=".4" />
      <rect x="680" y="650" width="820" height="16" fill="#0e0c1c" />
      <line x1="680" x2="1500" y1="664" y2="664" stroke="#b46bff" strokeWidth="10" strokeOpacity=".45" filter="url(#desk-led-blur)" />
      <line x1="680" x2="1500" y1="664" y2="664" stroke="#d8b4ff" strokeWidth="2.5" filter="url(#desk-led-glow)" />

      {/* PC tower with a glass side panel */}
      <g>
        <rect x="720" y="400" width="160" height="236" rx="4" fill="#08070e" stroke="#2a2440" />
        <rect x="728" y="410" width="110" height="216" fill="#0f0b1e" stroke="#2a2440" />
        <rect x="736" y="418" width="94" height="120" fill="#120f24" />
        <circle cx="778" cy="462" r="18" fill="#0b0916" stroke="#b46bff" strokeWidth="2.5" filter="url(#room-glow)" className="rs-pulse" />
        <circle cx="778" cy="462" r="7" fill="#1a1530" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={804 + i * 6} y="432" width="4" height="56" fill="url(#room-ram)" className="rs-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <rect x="734" y="548" width="100" height="22" rx="2" fill="#1a1630" stroke="#2a2440" />
        <line x1="738" x2="830" y1="549" y2="549" stroke="#ff4dd8" strokeWidth="1.5" filter="url(#gpu-led-glow)" />
        <circle cx="762" cy="560" r="7" fill="none" stroke="#3a3360" />
        <circle cx="806" cy="560" r="7" fill="none" stroke="#3a3360" />
        <rect x="728" y="584" width="110" height="42" fill="#0b0916" />
        <path d="M752 538 C 752 560, 790 560, 800 584" stroke="#241f3d" strokeWidth="3" fill="none" />
        <rect x="840" y="410" width="34" height="216" fill="#0d0a1a" stroke="#2a2440" />
        {FANS.map((cy) => (
          <Fan key={cy} cy={cy} />
        ))}
        <polygon points="732,412 760,412 734,520 732,520" fill="#fff" opacity=".05" />
      </g>

      {/* Ultrawide monitor */}
      <g>
        <rect x="1185" y="584" width="20" height="44" fill="#0d0b18" />
        <ellipse cx="1195" cy="630" rx="56" ry="5" fill="#110e20" stroke="#2a2440" />
        <rect x="990" y="330" width="410" height="256" rx="9" fill="#06060c" stroke="#1f1b35" />
        <MonitorScreen />
        <line x1="1000" x2="1390" y1="582" y2="582" stroke="#22e0d6" strokeOpacity=".5" />
      </g>

      {/* Mousepad, keyboard, mouse */}
      <polygon points="1040,614 1345,614 1356,644 1028,644" fill="#07060d" stroke="#b46bff" strokeOpacity=".8" strokeWidth="1.5" filter="url(#room-glow)" />
      <polygon points="1060,620 1272,620 1280,640 1052,640" fill="url(#room-rgb)" opacity=".45" filter="url(#kb-blur)" />
      <polygon points="1062,617 1270,617 1279,638 1053,638" fill="#0b0a14" stroke="#2a2440" />
      {KEY_ROWS.map((row) => {
        const x0 = 1066 - row * 3.5;
        const span = 200 + row * 7;
        const n = 20;
        const w = (span - (n - 1) * 2) / n;
        return Array.from({ length: n }, (_, i) => (
          <rect key={`${row}-${i}`} x={x0 + i * (w + 2)} y={620 + row * 6} width={w} height="4.2" rx=".8" fill="url(#room-rgb)" />
        ));
      })}
      <ellipse cx="1312" cy="630" rx="10" ry="6.5" fill="#0d0b18" stroke="#ff4dd8" strokeWidth="1.2" filter="url(#room-glow)" />
      <line x1="1312" x2="1312" y1="625" y2="629" stroke="#ff4dd8" strokeWidth="1" />

      {/* Desk lamp */}
      <g>
        <polygon points="950,486 990,498 1060,640 870,640" fill="url(#room-lamp)" style={{ mixBlendMode: "screen" }} />
        <ellipse cx="915" cy="640" rx="20" ry="4.5" fill="#15122a" />
        <path d="M915 638 L906 520 L958 466" stroke="#1d1934" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="906" cy="520" r="4" fill="#2a2545" />
        <circle cx="958" cy="466" r="4" fill="#2a2545" />
        <polygon points="946,452 994,470 984,494 936,476" fill="#1d1934" stroke="#2f2950" />
        <ellipse cx="966" cy="488" rx="16" ry="3.5" fill="#ffe4b0" filter="url(#room-glow)" transform="rotate(21 966 488)" />
      </g>
    </svg>
  );
}
