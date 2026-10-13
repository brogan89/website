"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Resolves `text` from random glyphs, left to right, starting after `delay` ms.
export function useScramble(text: string, { delay = 0, duration = 900, enabled = true } = {}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.max(0, now - start - delay) / duration;
      const settled = Math.floor(t * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (t < 1) frame = requestAnimationFrame(tick);
      else setOut(text);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, duration, enabled]);

  return out;
}
