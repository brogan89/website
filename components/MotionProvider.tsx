"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Honour the OS reduced-motion setting for every Motion animation: transforms and layout
// changes jump straight to their end state, while opacity fades still play.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
