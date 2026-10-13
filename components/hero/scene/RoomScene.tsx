"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { CityLayer } from "./CityLayer";
import { ForegroundLayer } from "./ForegroundLayer";
import { GlassLayer } from "./GlassLayer";
import { RoomLayer } from "./RoomLayer";

// Each layer is its own composited element, so mouse parallax is a GPU transform
// rather than a full SVG repaint. Depth: city (far) → glass + room → foreground (near).
export function RoomScene({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const cityX = useTransform(mx, (v) => v * -10);
  const cityY = useTransform(my, (v) => v * -6);
  const roomX = useTransform(mx, (v) => v * -24);
  const roomY = useTransform(my, (v) => v * -14);
  const foreX = useTransform(mx, (v) => v * -48);
  const foreY = useTransform(my, (v) => v * -24);

  return (
    <div className="pointer-events-none absolute inset-[-3%]" aria-hidden="true">
      <motion.div className="absolute inset-0 will-change-transform" style={{ x: cityX, y: cityY }}>
        <CityLayer />
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ x: roomX, y: roomY }}>
        <GlassLayer />
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ x: roomX, y: roomY }}>
        <RoomLayer />
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ x: foreX, y: foreY }}>
        <ForegroundLayer />
      </motion.div>
    </div>
  );
}
