// Demoify's logo mark (from demoify/src/app/icon.svg), with ids namespaced to avoid collisions.
export function DemoifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dm-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2FA8FF" />
          <stop offset=".5" stopColor="#7B3BF2" />
          <stop offset="1" stopColor="#FF2FA6" />
        </linearGradient>
        <linearGradient id="dm-play" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7B3BF2" />
          <stop offset="1" stopColor="#FF2FA6" />
        </linearGradient>
        <linearGradient id="dm-pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2FA8FF" />
          <stop offset="1" stopColor="#FF2FA6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#dm-pages)" strokeWidth="14">
        <rect x="40" y="112" width="220" height="288" rx="48" />
        <rect x="74" y="98" width="220" height="316" rx="48" />
        <rect x="108" y="84" width="220" height="344" rx="48" />
      </g>
      <path d="M204 64H288A192 192 0 0 1 288 448H204A62 62 0 0 1 142 386V126A62 62 0 0 1 204 64Z" fill="url(#dm-body)" />
      <path d="M212 156L406 256L212 356Z" fill="#0B0A16" stroke="#0B0A16" strokeWidth="68" strokeLinejoin="round" />
      <path d="M240 208L334 256L240 304Z" fill="url(#dm-play)" stroke="url(#dm-play)" strokeWidth="30" strokeLinejoin="round" />
      <circle cx="198" cy="378" r="14" fill="#FF2FA6" />
    </svg>
  );
}
