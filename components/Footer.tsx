export function Footer() {
  return (
    <footer className="mx-auto flex w-[min(1200px,92vw)] flex-wrap items-center justify-between gap-3 border-t border-line py-8 font-mono text-xs text-muted">
      <span>© {new Date().getFullYear()} brogan king</span>
      <span>
        <span className="text-cyan">&gt;</span> built with next.js, motion &amp; too much neon
      </span>
    </footer>
  );
}
