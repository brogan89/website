import { SOCIALS } from "@/lib/projects";
import { SocialIcon } from "./SocialIcon";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between py-6">
        <a href="#top" className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-wide">
          <span className="inline-block text-cyan transition-transform duration-700 group-hover:rotate-180">◆</span>
          <span>
            brogan<span className="text-magenta">.king</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1.5" aria-label="Social links">
            {SOCIALS.filter((s) => s.url).map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener"
                aria-label={s.platform[0].toUpperCase() + s.platform.slice(1)}
                className="grid size-9 place-items-center rounded-lg border border-line bg-panel/60 text-muted backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_18px_rgb(34_224_214/0.35)]"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </nav>
          <span className="hidden items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3cff8f] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[#3cff8f]" />
            </span>
            online
          </span>
        </div>
      </div>
    </header>
  );
}
