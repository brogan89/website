"use client";

import { motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { r2 } from "@/lib/rng";
import { APP } from "./screenLayout";

const TREE_W = 52;
const VIEW = { x: APP.x + TREE_W + 1, y: APP.y + 19, w: APP.w - TREE_W - 1, h: APP.h - 19 };
const VIEW_BOTTOM = VIEW.y + VIEW.h;
const HORIZON = 470;
const VP = VIEW.x + VIEW.w / 2;
const H_LINES = 7;

// Scene tree rows: [indent, icon colour, label width]. Row 4 is the selected cube.
const TREE: [number, string, number][] = [
  [0, "#a78bfa", 22],
  [1, "#f59e0b", 26],
  [1, "#facc15", 18],
  [1, "#38bdf8", 24],
  [2, "#38bdf8", 16],
  [2, "#22c55e", 20],
  [1, "#38bdf8", 28],
  [2, "#f472b6", 18],
  [1, "#94a3b8", 22],
];
const SELECTED = 4;

// Unit cube; faces wind counter-clockwise when seen from outside.
const VERTS = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const FACES: { idx: number[]; fill: string }[] = [
  { idx: [4, 5, 6, 7], fill: "#38bdf8" },
  { idx: [1, 0, 3, 2], fill: "#1d4ed8" },
  { idx: [0, 4, 7, 3], fill: "#2563eb" },
  { idx: [5, 1, 2, 6], fill: "#1e40af" },
  { idx: [3, 7, 6, 2], fill: "#7dd3fc" },
  { idx: [0, 1, 5, 4], fill: "#172554" },
];
const CUBE = { cx: VP, cy: 444, s: 17, tilt: 0.5 };

function project(angle: number) {
  const ca = Math.cos(angle), sa = Math.sin(angle);
  const ct = Math.cos(CUBE.tilt), st = Math.sin(CUBE.tilt);
  return VERTS.map(([x, y, z]) => {
    const x1 = x * ca + z * sa;
    const z1 = -x * sa + z * ca;
    const y1 = y * ct - z1 * st;
    return [CUBE.cx + x1 * CUBE.s, CUBE.cy - y1 * CUBE.s];
  });
}

// A Mainframe-style editor: scene tree, and a viewport with a spinning cube, move gizmo and rolling grid.
export function EngineApp() {
  const reduce = useReducedMotion();
  const faces = useRef<(SVGPolygonElement | null)[]>([]);
  const drawn = useRef(false);

  // Cube points are written straight to the DOM each frame rather than through React state.
  // They start empty, so server and client markup match.
  useAnimationFrame((t) => {
    if (reduce && drawn.current) return;
    drawn.current = true;
    const p = project(reduce ? 0.7 : t / 1100);
    FACES.forEach((f, i) => {
      const el = faces.current[i];
      if (!el) return;
      const [a, b, c] = f.idx.map((k) => p[k]);
      // Screen-space winding: only faces turned toward the camera are shown (convex, so no sorting needed)
      const front = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) < 0;
      el.setAttribute("points", f.idx.map((k) => `${r2(p[k][0])},${r2(p[k][1])}`).join(" "));
      el.style.display = front ? "" : "none";
    });
  });

  return (
    <g>
      <defs>
        <linearGradient id="eng-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2547" />
          <stop offset="1" stopColor="#0e1428" />
        </linearGradient>
        <clipPath id="eng-view">
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} />
        </clipPath>
      </defs>

      {/* Title bar with play controls */}
      <rect x={APP.x} y={APP.y} width={APP.w} height="11" fill="#151a2e" />
      <text x={APP.x + 4} y={APP.y + 8.3} fill="#38bdf8" fontSize="7" fontWeight="700" style={{ fontFamily: "monospace" }}>
        M
      </text>
      <text x={APP.x + 13} y={APP.y + 7.8} fill="#8b93b8" fontSize="5.5" style={{ fontFamily: "monospace" }}>
        mainframe editor — level.mscene
      </text>
      <polygon points={`${APP.x + 226},${APP.y + 2.5} ${APP.x + 226},${APP.y + 8.5} ${APP.x + 231},${APP.y + 5.5}`} fill="#28c840" className="rs-pulse" />
      <rect x={APP.x + 235} y={APP.y + 2.5} width="1.6" height="6" fill="#5d6390" />
      <rect x={APP.x + 238} y={APP.y + 2.5} width="1.6" height="6" fill="#5d6390" />
      <rect x={APP.x + 242} y={APP.y + 2.5} width="6" height="6" rx="1" fill="#5d6390" />

      {/* Toolbar */}
      <rect x={APP.x} y={APP.y + 11} width={APP.w} height="8" fill="#10142a" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={APP.x + 4 + i * 8} y={APP.y + 12.5} width="5" height="5" rx="1" fill={i === 1 ? "#2563eb" : "#2a3157"} />
      ))}

      {/* Scene tree */}
      <rect x={APP.x} y={VIEW.y} width={TREE_W} height={VIEW.h} fill="#0d1122" />
      {TREE.map(([indent, color, w], i) => {
        const y = VIEW.y + 5 + i * 9;
        return (
          <g key={i}>
            {i === SELECTED && <rect x={APP.x} y={y - 2} width={TREE_W} height="7.5" fill="#1d4ed8" opacity=".6" />}
            <rect x={APP.x + 3 + indent * 5} y={y} width="3.5" height="3.5" rx=".8" fill={color} />
            <rect
              x={APP.x + 8.5 + indent * 5}
              y={y + 0.5}
              width={Math.min(w, TREE_W - 12 - indent * 5)}
              height="2.5"
              rx="1"
              fill={i === SELECTED ? "#dbeafe" : "#3a4370"}
            />
          </g>
        );
      })}
      <line x1={APP.x + TREE_W} x2={APP.x + TREE_W} y1={VIEW.y} y2={VIEW_BOTTOM} stroke="#232a4a" />

      {/* Viewport */}
      <g clipPath="url(#eng-view)">
        <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={HORIZON - VIEW.y} fill="url(#eng-sky)" />
        <rect x={VIEW.x} y={HORIZON} width={VIEW.w} height={VIEW_BOTTOM - HORIZON} fill="#0a0e1c" />
        <g stroke="#3b4f8f" strokeOpacity=".7" strokeWidth=".7">
          {Array.from({ length: 21 }, (_, k) =>
            k === 10 ? null : <line key={k} x1={VP} y1={HORIZON} x2={VP + (k - 10) * 34} y2={VIEW_BOTTOM} />,
          )}
          {Array.from({ length: H_LINES }, (_, i) => {
            const y = r2(HORIZON + ((i + 1) / H_LINES) ** 2 * (VIEW_BOTTOM - HORIZON));
            return reduce ? (
              <line key={i} x1={VIEW.x} x2={VIEW.x + VIEW.w} y1={y} y2={y} />
            ) : (
              <motion.line
                key={i}
                x1={VIEW.x}
                x2={VIEW.x + VIEW.w}
                initial={{ y1: HORIZON, y2: HORIZON }}
                animate={{ y1: [HORIZON, VIEW_BOTTOM], y2: [HORIZON, VIEW_BOTTOM] }}
                transition={{ duration: 2.4, ease: "easeIn", repeat: Infinity, delay: (i * 2.4) / H_LINES }}
              />
            );
          })}
        </g>
        {/* World axes: Z runs to the vanishing point, X across */}
        <line x1={VP} y1={HORIZON} x2={VP} y2={VIEW_BOTTOM} stroke="#3b82f6" strokeOpacity=".8" strokeWidth=".9" />
        <line x1={VIEW.x} x2={VIEW.x + VIEW.w} y1={512} y2={512} stroke="#ef4444" strokeOpacity=".6" strokeWidth=".9" />

        <ellipse cx={CUBE.cx} cy={CUBE.cy + 40} rx="26" ry="5" fill="#000" opacity=".4" />
        {FACES.map((f, i) => (
          <polygon
            key={i}
            ref={(el) => {
              faces.current[i] = el;
            }}
            points=""
            fill={f.fill}
            stroke="#f59e0b"
            strokeWidth=".9"
            strokeLinejoin="round"
          />
        ))}

        {/* Move gizmo */}
        <g strokeWidth="1.4" strokeLinecap="round">
          <line x1={CUBE.cx} y1={CUBE.cy} x2={CUBE.cx + 36} y2={CUBE.cy + 6} stroke="#ef4444" />
          <polygon points={`${CUBE.cx + 40},${CUBE.cy + 6.7} ${CUBE.cx + 34},${CUBE.cy + 3} ${CUBE.cx + 33},${CUBE.cy + 9}`} fill="#ef4444" />
          <line x1={CUBE.cx} y1={CUBE.cy} x2={CUBE.cx} y2={CUBE.cy - 36} stroke="#22c55e" />
          <polygon points={`${CUBE.cx},${CUBE.cy - 41} ${CUBE.cx - 3},${CUBE.cy - 35} ${CUBE.cx + 3},${CUBE.cy - 35}`} fill="#22c55e" />
          <line x1={CUBE.cx} y1={CUBE.cy} x2={CUBE.cx - 22} y2={CUBE.cy + 20} stroke="#3b82f6" />
          <polygon points={`${CUBE.cx - 25},${CUBE.cy + 23} ${CUBE.cx - 23},${CUBE.cy + 16} ${CUBE.cx - 18},${CUBE.cy + 21}`} fill="#3b82f6" />
          <circle cx={CUBE.cx} cy={CUBE.cy} r="1.8" fill="#fff" />
        </g>

        <rect x={VIEW.x + 4} y={VIEW.y + 4} width="34" height="8" rx="2" fill="#0b0f1f" opacity=".85" />
        <text x={VIEW.x + 7} y={VIEW.y + 9.6} fill="#9ca3af" fontSize="5" style={{ fontFamily: "monospace" }}>
          Perspective
        </text>
        <text x={VIEW.x + VIEW.w - 4} y={VIEW.y + 9.6} fill="#9ca3af" fontSize="5" textAnchor="end" style={{ fontFamily: "monospace" }}>
          120 fps · 8.3 ms
        </text>
      </g>
    </g>
  );
}
