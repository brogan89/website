"use client";

import type { ComponentType } from "react";
import { PROJECTS, type ArtKind } from "@/lib/projects";
import { DemoifyArt } from "./art/DemoifyArt";
import { DolphinArt } from "./art/DolphinArt";
import { EngineArt } from "./art/EngineArt";
import { SgrArt } from "./art/SgrArt";
import { ProjectPanel, type ArtProps } from "./ProjectPanel";

const ART: Record<ArtKind, ComponentType<ArtProps>> = {
  sgr: SgrArt,
  engine: EngineArt,
  dolphin: DolphinArt,
  demoify: DemoifyArt,
};

export function Projects() {
  return (
    <div id="projects" className="relative scroll-mt-4 pt-20 pb-10">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <p className="font-mono text-sm text-cyan">{"// currently building"}</p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase sm:text-4xl">
          Active <span className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent">projects</span>
        </h2>
      </div>
      {PROJECTS.map((p, i) => (
        <ProjectPanel key={p.id} project={p} Art={ART[p.id]} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
