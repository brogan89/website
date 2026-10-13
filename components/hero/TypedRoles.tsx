"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const ROLES = ["game developer", "engine builder", "guitarist", "web tinkerer", "always shipping"];

// Types each role out, holds, deletes it, then moves on to the next.
export function TypedRoles({ startDelay = 0 }: { startDelay?: number }) {
  const reduce = useReducedMotion();
  const [role, setRole] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || reduce) return;
    const word = ROLES[role];
    let wait = deleting ? 35 : 70;
    if (!deleting && len === word.length) wait = 1600;
    if (deleting && len === 0) wait = 300;
    const t = setTimeout(() => {
      if (!deleting && len === word.length) setDeleting(true);
      else if (deleting && len === 0) {
        setDeleting(false);
        setRole((r) => (r + 1) % ROLES.length);
      } else setLen((l) => l + (deleting ? -1 : 1));
    }, wait);
    return () => clearTimeout(t);
  }, [started, reduce, role, len, deleting]);

  const text = reduce ? ROLES.slice(0, 3).join(" // ") : ROLES[role].slice(0, len);
  return (
    <p className="font-mono text-base text-muted sm:text-lg" aria-label={ROLES.join(", ")}>
      <span className="text-magenta">&gt;</span> <span className="text-text">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}
