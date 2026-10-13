// Slanted neon rain streaks. Positions are fixed so server and client markup match.
const DROPS = Array.from({ length: 70 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const b = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
  // Rounded so the server and browser serialise identical style strings.
  return {
    left: `${((i / 70) * 110 - 5 + a * 1.5).toFixed(2)}%`,
    height: Math.round(40 + b * 80),
    dur: `${(0.55 + a * 0.6).toFixed(2)}s`,
    delay: `${(-b * 2).toFixed(2)}s`,
    pink: i % 9 === 0,
  };
});

export function Rain() {
  return (
    <div className="absolute inset-0 rotate-[12deg] scale-125 opacity-70" aria-hidden="true">
      {DROPS.map((d, i) => (
        <span
          key={i}
          className="rain-drop"
          style={{
            left: d.left,
            height: d.height,
            ["--dur" as string]: d.dur,
            ["--delay" as string]: d.delay,
            background: d.pink ? "linear-gradient(to bottom, transparent, rgb(255 77 216 / 0.6))" : undefined,
          }}
        />
      ))}
    </div>
  );
}
