import type { ReactNode } from "react";
import { BRUTAL, INDIE, INTERESTS, JOBS, QUALIFICATIONS, RESUME, SKILLS, STATS, type Job } from "@/lib/resume";
import { SOCIALS } from "@/lib/projects";

// The A4 layout behind the downloadable PDF. Hidden on screen, it replaces the page when
// printing, so `npm run resume:pdf` (or Cmd+P > Save as PDF) gives the same themed document.
// Two fixed sheets keep page breaks under our control; if content grows, move jobs between
// pages with PAGE_ONE_JOBS. Avoid blur filters, text-shadow, box-shadow and masks in here:
// Chrome rasterises them into blocky tiles in the PDF. Radial gradients stay vector.

const PAGE_ONE_JOBS = 4;
const stripUrl = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const linkedin = SOCIALS.find((s) => s.platform === "linkedin")?.url ?? "";
const github = SOCIALS.find((s) => s.platform === "github")?.url ?? "";

function Sheet({ page, children }: { page: number; children: ReactNode }) {
  return (
    <section className="relative h-[297mm] w-[210mm] overflow-hidden bg-void px-[14mm] pt-[12mm] pb-[14mm] text-[9pt] leading-[1.45] text-text break-after-page last:break-after-auto">
      <div aria-hidden="true" className="sheet-grid absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1.6mm] bg-gradient-to-r from-cyan via-violet to-magenta" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 92% 0%, rgb(139 107 255 / 0.16), transparent 45%), radial-gradient(circle at 0% 100%, rgb(34 224 214 / 0.07), transparent 40%)" }}
      />
      <div className="relative">{children}</div>
      <footer className="absolute inset-x-[14mm] bottom-[7mm] flex justify-between border-t border-line pt-[2mm] font-mono text-[6.5pt] text-muted">
        <span>
          <span className="text-cyan">&gt;</span> {stripUrl(RESUME.website)}/resume
        </span>
        <span>
          {RESUME.name.toLowerCase()} <span className="text-cyan">{"//"}</span> page {page} of 2
        </span>
      </footer>
    </section>
  );
}

function Heading({ index, kicker, children }: { index: string; kicker: string; children: ReactNode }) {
  return (
    <div className="mb-[3mm] flex items-baseline gap-[3mm]">
      <h2 className="font-display text-[12pt] font-black tracking-wide uppercase">{children}</h2>
      <span className="font-mono text-[6.5pt] text-muted">
        <span className="text-cyan">[{index}]</span> {kicker}
      </span>
      <span aria-hidden="true" className="h-px flex-1 self-center bg-gradient-to-r from-line to-transparent" />
    </div>
  );
}

function JobBlock({ job }: { job: Job }) {
  return (
    <article className="relative mb-[4mm] break-inside-avoid pl-[5mm]">
      <span
        aria-hidden="true"
        className="absolute top-[0.9mm] -left-[0.5mm] size-[3mm] rounded-full"
        style={{ background: `radial-gradient(circle, ${job.accent} 45%, ${job.accent}55 70%, transparent 72%)` }}
      />
      <div className="flex items-baseline justify-between gap-[4mm]">
        <h3 className="font-display text-[10.5pt] font-bold uppercase">
          {job.company}
          <span className="font-sans text-[9.5pt] font-medium normal-case text-text">
            <span className="text-muted"> · </span>
            {job.role}
          </span>
        </h3>
        <span className="shrink-0 font-mono text-[7pt] text-muted">
          {job.start} <span style={{ color: job.accent }}>→</span> {job.end}
        </span>
      </div>
      {(job.detail || job.game) && (
        <p className="mt-[0.5mm] font-mono text-[7pt] text-muted">
          {job.detail}
          {job.game && (
            <>
              <span style={{ color: job.accent }}>▶ </span>
              {job.game.url ? (
                <a href={job.game.url} className="text-text underline decoration-line underline-offset-2">
                  {job.game.title}
                </a>
              ) : (
                <span className="text-text">{job.game.title}</span>
              )}
              <span> · {job.game.meta}</span>
            </>
          )}
          {job.links?.map((l) => (
            <span key={l.url}>
              <span className="text-line"> | </span>
              <a href={l.url} className="underline underline-offset-2" style={{ color: job.accent }}>
                {l.label} ↗
              </a>
            </span>
          ))}
        </p>
      )}
      <ul className="mt-[1.5mm] space-y-[0.8mm]">
        {job.bullets.map((b) => (
          <li key={b} className="flex gap-[2mm] text-[8.8pt] text-text/90">
            <span aria-hidden="true" style={{ color: job.accent }}>
              ▹
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ResumePrint() {
  const [firstName, lastName] = RESUME.name.toUpperCase().split(" ");
  return (
    <div className="hidden print:block">
      <Sheet page={1}>
        <header className="flex items-end justify-between gap-[6mm] border-b border-line pb-[5mm]">
          <div>
            <p className="font-mono text-[7pt] text-cyan">{"// resume"}</p>
            <h1 className="mt-[1.5mm] font-display text-[30pt] leading-[0.95] font-black tracking-tight">
              <span>{firstName}</span>{" "}
              <span className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent">{lastName}</span>
            </h1>
            <p className="mt-[2mm] font-mono text-[8.5pt] text-muted">
              <span className="text-magenta">&gt;</span> {RESUME.headline.toLowerCase()}
            </p>
          </div>
          <ul className="space-y-[0.8mm] text-right font-mono text-[7pt] text-muted">
            <li>{RESUME.location}</li>
            <li>
              <a href={`mailto:${RESUME.email}`} className="text-text">
                {RESUME.email}
              </a>
            </li>
            <li>
              <a href={RESUME.website} className="text-cyan">
                {stripUrl(RESUME.website)}
              </a>
            </li>
            <li>
              <a href={linkedin}>{stripUrl(linkedin)}</a>
            </li>
            <li>
              <a href={github}>{stripUrl(github)}</a>
            </li>
          </ul>
        </header>

        <p className="mt-[5mm] text-[9.6pt] leading-[1.55]">{RESUME.summary}</p>

        <ul className="mt-[5mm] grid grid-cols-4 overflow-hidden rounded-[2.5mm] border border-line bg-panel/80">
          {STATS.map((s, i) => (
            <li key={s.label} className={`px-[4mm] py-[3mm] ${i ? "border-l border-line" : ""}`}>
              <p className="font-display text-[15pt] leading-none font-black text-cyan">
                {s.value.toLocaleString("en-US")}
                {s.suffix}
              </p>
              <p className="mt-[1mm] font-mono text-[6.5pt] text-muted">{s.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-[7mm]">
          <Heading index="01" kicker="employment_record">
            Experience
          </Heading>
          {JOBS.slice(0, PAGE_ONE_JOBS).map((job) => (
            <JobBlock key={`${job.company}-${job.start}`} job={job} />
          ))}
        </div>
      </Sheet>

      <Sheet page={2}>
        <Heading index="01" kicker="employment_record (cont.)">
          Experience
        </Heading>
        {JOBS.slice(PAGE_ONE_JOBS).map((job) => (
          <JobBlock key={`${job.company}-${job.start}`} job={job} />
        ))}

        <div className="relative mt-[3mm] mb-[7mm] overflow-hidden rounded-[2.5mm] border border-magenta/40 bg-panel/80 px-[5mm] py-[4.5mm]">
          <span
            aria-hidden="true"
            className="absolute -right-[2mm] -bottom-[5mm] font-display text-[44pt] leading-none font-black text-transparent"
            style={{ WebkitTextStroke: "0.3mm rgb(255 77 216 / 0.22)" }}
          >
            {BRUTAL.title}
          </span>
          <p className="relative font-mono text-[6.5pt] text-magenta">{BRUTAL.kicker}</p>
          <h3 className="relative mt-[1mm] font-display text-[11pt] font-black uppercase">
            Technical production on <span className="text-magenta">{BRUTAL.title}</span>
          </h3>
          <p className="relative mt-[1.5mm] max-w-[140mm] text-[8.6pt] text-text/90">{BRUTAL.blurb}</p>
          <p className="relative mt-[2mm] flex gap-[4mm] font-mono text-[7pt]">
            {BRUTAL.links.map((l) => (
              <a key={l.url} href={l.url} className="text-magenta underline underline-offset-2">
                {l.label} ↗
              </a>
            ))}
          </p>
        </div>

        <div>
          <Heading index="02" kicker="mainframe_games + side_projects">
            Independent work
          </Heading>
          <div className="grid grid-cols-3 gap-[3mm]">
            {INDIE.map((p) => (
              <a
                key={p.title}
                href={p.url}
                className="block rounded-[2.5mm] border bg-panel/80 p-[3.5mm]"
                style={{ borderColor: `${p.accent}55` }}
              >
                <p className="font-mono text-[6pt]" style={{ color: p.accent }}>
                  {p.kicker}
                </p>
                <h3 className="mt-[1mm] font-display text-[9pt] font-bold uppercase">{p.title}</h3>
                <p className="mt-[1.5mm] text-[7.6pt] leading-[1.45] text-text/85">{p.blurb}</p>
                <p className="mt-[2mm] font-mono text-[6pt] text-muted">{p.tech.map((t) => `#${t}`).join("  ")}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-[7mm] grid grid-cols-[1.1fr_1fr] gap-[8mm]">
          <div>
            <Heading index="03" kicker="summary_of_skills">
              Skills
            </Heading>
            <dl className="space-y-[2.5mm]">
              {SKILLS.map((g) => (
                <div key={g.label}>
                  <dt className="font-mono text-[6.5pt] text-muted">
                    <span className="text-magenta">#</span>
                    {g.label}
                  </dt>
                  <dd className="mt-[1mm] flex flex-wrap gap-[1.2mm]">
                    {g.items.map((item) => (
                      <span key={item} className="rounded-[1mm] border border-line bg-night px-[1.8mm] py-[0.5mm] font-mono text-[6.8pt]">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Heading index="04" kicker="qualifications">
              Education
            </Heading>
            <ul className="space-y-[2.2mm]">
              {QUALIFICATIONS.map((q) => (
                <li key={q.title} className="flex gap-[3mm]">
                  <span className="w-[8mm] shrink-0 font-mono text-[7pt] text-violet">{q.year}</span>
                  <span>
                    <span className="block text-[8.2pt] font-medium">
                      {q.title}
                      {q.honours && <span className="text-cyan"> · {q.honours}</span>}
                    </span>
                    <span className="block text-[7pt] text-muted">{q.institution}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[7mm] rounded-[2.5mm] border border-line bg-panel/80 px-[4mm] py-[3mm]">
          <p className="font-mono text-[6.5pt] text-muted">
            <span className="text-cyan">$</span> cat interests.txt
          </p>
          <p className="mt-[1mm] text-[8.6pt]">{INTERESTS}</p>
        </div>
      </Sheet>
    </div>
  );
}
