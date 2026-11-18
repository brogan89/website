import Link from "next/link";
import { SOCIALS } from "@/lib/projects";
import { SocialIcon } from "./SocialIcon";

const PILL =
  "flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur";

export function Header({ current = "home" }: { current?: "home" | "resume" }) {
  const onHome = current === "home";
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between py-6">
        <Link href={onHome ? "#top" : "/"} className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-wide">
          <span className="inline-block text-cyan transition-transform duration-700 group-hover:rotate-180">◆</span>
          <span>
            brogan<span className="text-magenta">.king</span>
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Icon-only square on phones (to fit beside the socials), labelled pill from sm up */}
          <Link
            href={onHome ? "/resume" : "/"}
            aria-label={onHome ? "Resume" : "Projects"}
            className="grid size-9 place-items-center rounded-lg border border-line bg-panel/60 font-mono text-xs text-muted backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_18px_rgb(34_224_214/0.35)] sm:flex sm:size-auto sm:gap-2 sm:rounded-full sm:px-3 sm:py-1.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 sm:hidden" aria-hidden="true">
              {onHome ? (
                <>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="13" y2="17" />
                </>
              ) : (
                <>
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </>
              )}
            </svg>
            <span className="hidden text-cyan sm:inline">{onHome ? "/" : "←"}</span>
            <span className="hidden sm:inline">{onHome ? "resume" : "projects"}</span>
          </Link>
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
          <span className={`${PILL} hidden md:flex`}>
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
