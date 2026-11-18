import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BootLog } from "@/components/hero/BootLog";
import { GlitchLine } from "@/components/hero/GlitchTitle";
import { TypedRoles } from "@/components/hero/TypedRoles";
import { CountUp } from "@/components/resume/CountUp";
import { ResumePrint } from "@/components/resume/ResumePrint";
import { Timeline } from "@/components/resume/Timeline";
import { Reveal } from "@/components/Reveal";
import { SocialIcon } from "@/components/SocialIcon";
import { asset } from "@/lib/asset";
import { SOCIALS, type SocialPlatform } from "@/lib/projects";
import { BRUTAL, INDIE, INTERESTS, JOBS, QUALIFICATIONS, RESUME, RESUME_PDF, SKILLS, STATS } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Brogan King // Resume",
  description:
    "Game developer and technical producer. Technical production on BRUTAL (Kitten Space Agency, RimWorld), plus Stationeers, Monster Racing League and Blackout Rugby.",
};

const BOOT = ["load resume.dat", `mount /experience ...... ${JOBS.length} roles`, `link /side-projects ... ${INDIE.length} found`, "status: online"];

const CONTACTS: { platform: SocialPlatform; label: string; url: string }[] = [
  { platform: "email", label: RESUME.email, url: `mailto:${RESUME.email}` },
  ...SOCIALS.filter((s) => s.platform === "linkedin" || s.platform === "github").map((s) => ({
    platform: s.platform,
    label: s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    url: s.url,
  })),
];

function SectionHeading({ index, kicker, children }: { index: string; kicker: string; children: ReactNode }) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs">
        <span className="text-cyan">[{index}]</span> <span className="text-muted">{kicker}</span>
      </p>
      <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-4xl">{children}</h2>
    </Reveal>
  );
}

function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={asset(RESUME_PDF)}
      download
      className={`cta group inline-flex items-center gap-3 bg-cyan px-6 py-3 font-mono text-sm font-medium text-void shadow-[0_0_28px_rgb(34_224_214/0.45)] transition hover:shadow-[0_0_44px_rgb(34_224_214/0.8)] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      download pdf
    </a>
  );
}

function Portrait() {
  return (
    <Reveal delay={0.3} className="order-first w-36 sm:w-44 md:order-last md:col-span-4 md:ml-auto md:w-full md:max-w-[340px]">
      <div className="panel-frame" style={{ ["--accent" as string]: "#22e0d6" }}>
        <div className="group relative overflow-hidden rounded-[21px] bg-panel">
          <img
            src={asset(RESUME.photo)}
            alt={`Portrait of ${RESUME.name}`}
            className="aspect-square w-full object-cover saturate-[0.85] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/30 via-transparent to-magenta/40 mix-blend-overlay" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent" />
          <div aria-hidden="true" className="art-scanlines" />
          <div aria-hidden="true" className="corner-brackets" />
          <p aria-hidden="true" className="absolute inset-x-5 bottom-4 hidden justify-between font-mono text-[11px] text-text/85 sm:flex">
            <span>
              <span className="text-cyan">▸</span> player_01
            </span>
            <span className="text-[#3cff8f]">● online</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ResumePage() {
  return (
    <>
      <div className="print:hidden">
        <Header current="resume" />
        <main className="mx-auto w-[min(1200px,92vw)] pt-32 pb-20 sm:pt-40">
          {/* ---------- Intro ---------- */}
          <section className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-0 -z-10 size-[min(520px,80vw)] rounded-full bg-violet/20 blur-[120px]"
            />
            <div className="grid items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <BootLog lines={BOOT} />
                <h1 className="font-display text-[clamp(3rem,12vw,8.5rem)] leading-[0.86] font-black tracking-tight uppercase">
                  <span className="sr-only">{RESUME.name}</span>
                  <span aria-hidden="true">
                    <GlitchLine text="BROGAN" delay={0.5} className="text-neon" />
                    <GlitchLine text="KING" delay={0.72} className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent" />
                  </span>
                </h1>
                <div className="mt-6">
                  <TypedRoles startDelay={1.2} roles={RESUME.roles} />
                </div>
                <p className="mt-2 font-mono text-xs text-muted sm:text-sm">
                  <span className="text-cyan">@</span> {RESUME.location.toLowerCase()}
                </p>
                <Reveal delay={0.9} className="mt-9 flex flex-wrap items-center gap-3">
                  <DownloadButton />
                  <ul className="flex flex-wrap gap-2.5">
                    {CONTACTS.map((c) => (
                      <li key={c.platform}>
                        <a
                          href={c.url}
                          target={c.platform === "email" ? undefined : "_blank"}
                          rel="noopener"
                          aria-label={c.label}
                          className="flex h-11 items-center gap-2.5 rounded-lg border border-line bg-panel/60 px-3.5 font-mono text-xs text-muted backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_18px_rgb(34_224_214/0.35)]"
                        >
                          <SocialIcon platform={c.platform} />
                          <span className={c.platform === "email" ? "" : "hidden md:inline"}>{c.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <Portrait />
            </div>
          </section>

          {/* ---------- Stats ---------- */}
          <Reveal className="mt-16">
            <ul className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-panel/60 backdrop-blur md:grid-cols-4">
              {STATS.map((s, i) => (
                <li
                  key={s.label}
                  className={`group relative px-6 py-6 transition-colors hover:bg-cyan/5 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                >
                  <p className="font-display text-4xl font-black text-neon sm:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 font-mono text-xs text-muted">{s.label}</p>
                  <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100" />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---------- Summary ---------- */}
          <Reveal className="mt-10">
            <div className="panel-frame">
              <div className="relative rounded-[21px] bg-panel px-6 py-8 sm:px-10 sm:py-10">
                <div className="corner-brackets" />
                <p className="font-mono text-xs text-muted">
                  <span className="text-cyan">$</span> cat summary.txt
                </p>
                <p className="mt-4 max-w-4xl text-lg leading-relaxed sm:text-xl">{RESUME.summary}</p>
              </div>
            </div>
          </Reveal>

          {/* ---------- Featured: BRUTAL ---------- */}
          <Reveal className="mt-24">
            <div className="panel-frame" style={{ ["--accent" as string]: "#ff4dd8" }}>
              <div className="relative overflow-hidden rounded-[21px] bg-panel px-6 py-10 sm:px-12 sm:py-14">
                <div className="corner-brackets" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -bottom-8 font-display text-[clamp(5rem,18vw,13rem)] leading-none font-black text-transparent select-none"
                  style={{ WebkitTextStroke: "1px rgb(255 77 216 / 0.25)" }}
                >
                  {BRUTAL.title}
                </span>
                <div className="relative max-w-2xl">
                  <p className="font-mono text-xs text-magenta">{BRUTAL.kicker}</p>
                  <h2 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">
                    Technical production on <span className="text-magenta [text-shadow:0_0_24px_rgb(255_77_216/0.6)]">{BRUTAL.title}</span>
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{BRUTAL.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {["Kitten Space Agency", "RimWorld · Waylith", "C#", "open source"].map((t) => (
                      <li key={t} className="rounded-md border border-line bg-night px-2.5 py-1 font-mono text-xs text-muted">
                        #{t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {BRUTAL.links.map((l, i) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener"
                        className={`group inline-flex items-center gap-3 px-5 py-2.5 font-mono text-sm font-medium transition ${
                          i === 0
                            ? "cta bg-magenta text-void shadow-[0_0_28px_rgb(255_77_216/0.45)] hover:shadow-[0_0_44px_rgb(255_77_216/0.8)]"
                            : "rounded-md border border-magenta/50 text-magenta hover:bg-magenta/10"
                        }`}
                      >
                        {i === 0 ? "▶" : "↗"} {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- Experience ---------- */}
          <section className="mt-28">
            <SectionHeading index="01" kicker="employment_record">
              Experience
            </SectionHeading>
            <Timeline>
              {JOBS.map((job) => (
                <li key={`${job.company}-${job.start}`} className="relative pb-8 last:pb-0" style={{ ["--accent" as string]: job.accent }}>
                  <span
                    aria-hidden="true"
                    className="absolute top-7 -left-8 size-3.5 -translate-x-1/2 rounded-full ring-4 ring-void sm:-left-11"
                    style={{ background: job.accent, boxShadow: `0 0 16px ${job.accent}` }}
                  />
                  <Reveal>
                    <article className="group rounded-2xl border border-line bg-panel/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:[border-color:var(--accent)] hover:shadow-[0_0_40px_-12px_var(--accent)] sm:p-8">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                        <span>
                          {job.start} <span style={{ color: job.accent }}>→</span> {job.end}
                        </span>
                        {job.current && (
                          <span
                            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] tracking-wider uppercase"
                            style={{ borderColor: `${job.accent}66`, color: job.accent, background: `${job.accent}14` }}
                          >
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex size-full animate-ping rounded-full opacity-75" style={{ background: job.accent }} />
                              <span className="relative inline-flex size-1.5 rounded-full" style={{ background: job.accent }} />
                            </span>
                            now
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold uppercase sm:text-3xl">{job.company}</h3>
                      <p className="mt-1 text-lg">
                        {job.role}
                        {job.detail && <span className="text-muted"> · {job.detail}</span>}
                      </p>
                      {job.game && (
                        <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
                          {job.game.url ? (
                            <a
                              href={job.game.url}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center gap-2 rounded-md border border-line bg-night px-2.5 py-1 text-text transition hover:[border-color:var(--accent)] hover:text-[var(--accent)]"
                            >
                              <span style={{ color: job.accent }}>▶</span>
                              {job.game.title} ↗
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-night px-2.5 py-1 text-text">
                              <span style={{ color: job.accent }}>▶</span>
                              {job.game.title}
                            </span>
                          )}
                          <span className="text-muted">{job.game.meta}</span>
                        </p>
                      )}
                      <ul className="mt-5 space-y-2.5">
                        {job.bullets.map((b) => (
                          <li key={b} className="flex gap-3 leading-relaxed text-muted transition-colors group-hover:text-text/90">
                            <span aria-hidden="true" style={{ color: job.accent }}>
                              ▹
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {job.links && (
                        <p className="mt-5 flex flex-wrap gap-3 font-mono text-xs">
                          {job.links.map((l) => (
                            <a key={l.url} href={l.url} target="_blank" rel="noopener" className="underline underline-offset-4" style={{ color: job.accent }}>
                              {l.label} ↗
                            </a>
                          ))}
                        </p>
                      )}
                    </article>
                  </Reveal>
                </li>
              ))}
            </Timeline>
          </section>

          {/* ---------- Independent work ---------- */}
          <section className="mt-28">
            <SectionHeading index="02" kicker="mainframe_games + side_projects">
              Independent work
            </SectionHeading>
            <div className="grid gap-5 md:grid-cols-3">
              {INDIE.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <a href={p.url} target="_blank" rel="noopener" className="panel-frame block h-full" style={{ ["--accent" as string]: p.accent }}>
                    <div className="relative flex h-full flex-col rounded-[21px] bg-panel p-6">
                      <p className="font-mono text-xs" style={{ color: p.accent }}>
                        {p.kicker}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold uppercase">{p.title}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-muted">{p.blurb}</p>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <li key={t} className="rounded border border-line bg-night px-2 py-0.5 font-mono text-[11px] text-muted">
                            #{t}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 font-mono text-xs" style={{ color: p.accent }}>
                        open ↗
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------- Skills + Education ---------- */}
          <div className="mt-28 grid gap-16 lg:grid-cols-12 lg:gap-14">
            <section className="lg:col-span-6">
              <SectionHeading index="03" kicker="summary_of_skills">
                Skills
              </SectionHeading>
              <dl className="space-y-6">
                {SKILLS.map((group, i) => (
                  <Reveal key={group.label} delay={i * 0.05}>
                    <dt className="font-mono text-xs text-muted">
                      <span className="text-magenta">#</span>
                      {group.label}
                    </dt>
                    <dd className="mt-2.5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-line bg-night px-3 py-1.5 font-mono text-xs transition hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_14px_rgb(34_224_214/0.3)]"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </section>

            <section className="lg:col-span-6">
              <SectionHeading index="04" kicker="qualifications">
                Education
              </SectionHeading>
              <ul className="space-y-3">
                {QUALIFICATIONS.map((q, i) => (
                  <li key={q.title}>
                    <Reveal delay={i * 0.04}>
                      <div className="flex gap-5 rounded-xl border border-line bg-panel/60 px-5 py-4 backdrop-blur transition hover:border-violet/60 hover:shadow-[0_0_28px_-10px_rgb(139_107_255/0.8)]">
                        <p className="pt-0.5 font-mono text-sm text-violet">{q.year}</p>
                        <div>
                          <p className="font-medium">
                            {q.title}
                            {q.honours && <span className="text-cyan"> · {q.honours}</span>}
                          </p>
                          <p className="mt-0.5 text-sm text-muted">{q.institution}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ---------- Outro ---------- */}
          <Reveal className="mt-28">
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-panel/60 p-8 backdrop-blur sm:p-10 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-xs text-muted">
                  <span className="text-cyan">$</span> cat interests.txt
                </p>
                <p className="mt-3 max-w-xl text-lg">{INTERESTS}</p>
              </div>
              <DownloadButton className="shrink-0" />
            </div>
          </Reveal>
        </main>
        <Footer />
      </div>
      <ResumePrint />
    </>
  );
}
