import { PROJECTS } from "@/lib/projects";

// Infinite ticker of project names along the bottom of the hero.
export function Marquee() {
  const items = [...PROJECTS, ...PROJECTS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-night/70 py-3 backdrop-blur" aria-hidden="true">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap font-display text-sm font-bold tracking-[0.3em] uppercase">
        {[0, 1].map((copy) =>
          items.map((p, i) => (
            <span key={`${copy}-${i}`} className="flex items-center gap-10">
              <span style={{ color: p.accent }}>{p.title}</span>
              <span className="text-muted/40">◆</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
