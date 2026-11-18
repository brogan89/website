"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Hydration-safe stand-in for Motion's useReducedMotion. Motion's hook reads the media query
// during the first client render, so reduced-motion visitors got different markup from the
// server and a hydration error. This reports false on the server and while hydrating, then
// the real preference. Anything Motion animates in between is tamed by
// <MotionConfig reducedMotion="user"> in MotionProvider.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
