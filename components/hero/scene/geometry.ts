// Shared coordinate system for the stacked hero scene layers. Every layer is its own <svg>
// with the same viewBox, so they line up exactly but can be parallaxed independently.
export const SCENE_W = 1440;
export const SCENE_H = 900;

// Glass area of the window (inside the frame).
export const GLASS = { x: 42, y: 32, w: 1356, h: 566 };

export const sceneSvgProps = {
  className: "absolute inset-0 size-full",
  viewBox: `0 0 ${SCENE_W} ${SCENE_H}`,
  // Anchor right so phones see the desk and monitor rather than empty wall.
  preserveAspectRatio: "xMaxYMid slice",
  "aria-hidden": true,
} as const;
