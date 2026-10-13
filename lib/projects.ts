export type Status = "live" | "building";
export type ArtKind = "sgr" | "engine" | "dolphin" | "demoify";

export type Project = {
  id: ArtKind;
  index: string;
  title: string;
  kicker: string;
  status: Status;
  description: string;
  tags: string[];
  link: string;
  cta: string;
  /** Accent colour used for the panel's glow, border trace and status pill. */
  accent: string;
};

// Icon-only social buttons shown in the header. Leave url as "" to hide one.
export const SOCIALS: { platform: SocialPlatform; url: string }[] = [
  { platform: "github", url: "https://github.com/brogan89" },
  { platform: "instagram", url: "https://www.instagram.com/brogan.king/" },
  { platform: "youtube", url: "https://www.youtube.com/@mainframegamez" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/brogan-king-6a985a215/" },
];

export type SocialPlatform = "github" | "twitter" | "instagram" | "youtube" | "linkedin" | "email";

// Rendered top to bottom in this order.
export const PROJECTS: Project[] = [
  {
    id: "sgr",
    index: "01",
    title: "Speed Golf Royale",
    kicker: "multiplayer game // mainframe games",
    status: "building",
    description:
      "Golf is a race. Tee off with a lobby of rivals at once, whack the ball, sprint after it and hole out first. Scored on shots taken and how fast you reach the flag — chaotic, fast-paced scramble golf.",
    tags: ["game", "godot", "multiplayer", "steam"],
    link: "https://speedgolfroyale.com/",
    cta: "play the demo",
    accent: "#3cff8f",
  },
  {
    id: "engine",
    index: "02",
    title: "Mainframe Engine",
    kicker: "game engine // open source",
    status: "live",
    description:
      "A modular C# game engine and Godot-style editor built on Vulkan. Node/scene system, cascaded shadows, physics, audio, server-authoritative multiplayer and an editor built with the engine's own UI.",
    tags: ["c#", ".net 10", "vulkan", "mit"],
    link: "https://mainframe-games.github.io/mainframe-engine/",
    cta: "explore the engine",
    accent: "#38bdf8",
  },
  {
    id: "dolphin",
    index: "03",
    title: "Dolphin Drive",
    kicker: "rock band // hamilton, nz",
    status: "live",
    description: "Loud guitars, big choruses. A rock band from Hamilton, New Zealand — catch us live or spin the latest tracks.",
    tags: ["band", "music", "live"],
    link: "https://dolphindrive.band/",
    cta: "hear the band",
    accent: "#2ee6c8",
  },
  {
    id: "demoify",
    index: "04",
    title: "Demoify",
    kicker: "web app // github for songs",
    status: "live",
    description:
      "Versioned demo sharing for musicians. Share a track under one permanent link, push new versions without breaking it, and collect timestamped feedback from your band.",
    tags: ["webapp", "music", "cloudflare"],
    link: "https://demoify.app/",
    cta: "try demoify",
    accent: "#ff2fa6",
  },
];
