// Content for /resume and its PDF. Kept public-safe: no phone number, street address or
// date of birth (NZ/AU CV guidance is to leave those off anyway).
//
// Facts here are checked against public sources (Steam pages, press about BRUTAL, the
// engine docs). Add numbers you know (team sizes, player counts, perf wins) as you go:
// quantified results are what make a CV bullet land.

export type Link = { label: string; url: string };

export type Job = {
  company: string;
  role: string;
  /** Extra detail shown after the role, e.g. the team or specialty. */
  detail?: string;
  start: string;
  end: string;
  current?: boolean;
  /** The title worked on, shown as a chip. url is optional (some store pages are gone). */
  game?: { title: string; url?: string; meta: string };
  bullets: string[];
  links?: Link[];
  accent: string;
};

export type IndieProject = { title: string; kicker: string; blurb: string; tech: string[]; url: string; accent: string };
export type Qualification = { title: string; honours?: string; institution: string; year: string };

export const RESUME = {
  name: "Brogan King",
  headline: "Game Developer · Technical Director",
  location: "Hamilton, New Zealand",
  email: "brogan.king@outlook.com",
  website: "https://broganking.com",
  /** Served from /public. */
  photo: "/media/resume/brogan.jpg",
  /** Cycled by the typed line under the title. */
  roles: ["technical director", "game developer", "engine builder", "technical producer", "always shipping"],
  summary:
    "Game developer with ten years in the industry, from Unity developer to Senior Technical Director at RocketWerkz. I led technical production on BRUTAL, the C# framework behind Kitten Space Agency and RimWorld's new Waylith engine, and I've shipped and supported live games on Steam across Unity, Godot and custom tech. Outside the day job I build original IP and engine technology under my own studio, Mainframe Games.",
};

export const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 10, label: "years in games" },
  { value: 4, label: "studio titles" },
  { value: 2, label: "engine projects" },
  { value: 1600, suffix: "+", label: "tests in my engine" },
];

export const BRUTAL = {
  title: "BRUTAL",
  kicker: "featured // rocketwerkz",
  blurb:
    "A C# game framework built from the ground up at RocketWerkz and now open source. It powers Kitten Space Agency and is the foundation of Ludeon Studios' Waylith engine, which moved RimWorld off Unity.",
  links: [
    { label: "studio video", url: "https://www.instagram.com/p/DVwag-mEvWD/" },
    {
      label: "press: BRUTAL goes public",
      url: "https://www.gamedeveloper.com/programming/rocketwerkz-c-framework-brutal-is-now-available-for-all-developers",
    },
  ] satisfies Link[],
};

export const JOBS: Job[] = [
  {
    company: "Company X",
    role: "Senior XR Developer (Contractor)",
    detail: "Simulation and Training",
    start: "May 2026",
    end: "Current",
    current: true,
    bullets: ["Building XR simulation and training software as a senior contract developer."],
    accent: "#3cff8f",
  },
  {
    company: "RocketWerkz",
    role: "Senior Technical Director",
    start: "Dec 2024",
    end: "May 2026",
    game: { title: "Kitten Space Agency", url: "https://ahwoo.com/app/100000/kitten-space-agency", meta: "BRUTAL · PC" },
    bullets: [
      "Led technical production on BRUTAL, RocketWerkz's C# game framework built from the ground up, now open source.",
      "BRUTAL powers Kitten Space Agency, a real-scale spaceflight sim, and underpins Ludeon Studios' Waylith engine, which took RimWorld off Unity.",
      "Balanced the needs of the internal Kitten Space Agency team and external partner studios, turning developer requirements into priorities, milestones and a roadmap in Jira.",
      "Coordinated with partners across time zones and kept stakeholders clear on progress, risk and trade-offs.",
    ],
    links: [{ label: "studio video", url: "https://www.instagram.com/p/DVwag-mEvWD/" }],
    accent: "#22e0d6",
  },
  {
    company: "Flightless",
    role: "Senior Unity Developer",
    start: "Dec 2022",
    end: "Dec 2024",
    game: { title: "Monster Racing League", meta: "Unity · Steam · Win/Mac" },
    bullets: [
      "Senior developer on Monster Racing League, a cross-platform multiplayer combat racer launched into Steam Early Access in March 2023 (Very Positive reviews).",
      "Developed and supported the game through its Early Access updates on Windows and macOS.",
    ],
    accent: "#8b6bff",
  },
  {
    company: "RocketWerkz",
    role: "Senior Unity Programmer",
    start: "Oct 2021",
    end: "Dec 2022",
    game: { title: "Stationeers", url: "https://store.steampowered.com/app/544550/Stationeers", meta: "Unity · Steam" },
    bullets: [
      "Programmer on Stationeers, a deep space-station construction and survival sim with 6,000+ Very Positive Steam reviews.",
      "Shipped regular updates to a live game with a large, vocal community, using player feedback to set priorities.",
    ],
    accent: "#ff4dd8",
  },
  {
    company: "Blackout Games",
    role: "Unity Developer",
    start: "Dec 2016",
    end: "Oct 2021",
    game: {
      title: "Blackout Rugby",
      url: "https://store.steampowered.com/app/1157960/Blackout_Rugby_Manager",
      meta: "Unity · Steam · F2P",
    },
    bullets: [
      "Nearly five years building Blackout Rugby, a free-to-play online multiplayer rugby management game.",
      "Took it through its Steam Early Access launch in December 2019 on Windows, macOS and Linux, then supported it as a live service.",
    ],
    accent: "#f5f05a",
  },
];

export const INDIE: IndieProject[] = [
  {
    title: "Speed Golf Royale",
    kicker: "mainframe games · original ip",
    blurb: "Racing golf for up to 20 players at once: scored on strokes plus seconds. Free demo on Steam, full release planned for 2027.",
    tech: ["Godot", "C#", "Online + LAN", "Steam"],
    url: "https://speedgolfroyale.com/",
    accent: "#3cff8f",
  },
  {
    title: "Mainframe Engine",
    kicker: "open source · mit",
    blurb: "A C# engine on Vulkan and .NET 10 with a Godot-style editor, PBR rendering, physics, multiplayer and a built-in DAW. 1,600+ tests.",
    tech: ["C#", ".NET 10", "Vulkan", "ENet"],
    url: "https://mainframe-games.github.io/mainframe-engine/",
    accent: "#38bdf8",
  },
  {
    title: "Demoify",
    kicker: "web app",
    blurb: "Versioned demo sharing for musicians: one permanent link per track, new versions without breaking it, timestamped feedback.",
    tech: ["TypeScript", "Cloudflare"],
    url: "https://demoify.app/",
    accent: "#ff2fa6",
  },
];

export const SKILLS: { label: string; items: string[] }[] = [
  { label: "engines", items: ["Unity", "Godot", "BRUTAL", "Custom (Mainframe Engine)"] },
  { label: "languages", items: ["C#", "JavaScript / TypeScript", "Bash"] },
  { label: "tech", items: ["Vulkan", ".NET", "Multiplayer networking", "Steamworks", "XR"] },
  { label: "production", items: ["Jira", "Roadmaps & milestones", "Stakeholder updates", "Live-game support"] },
  { label: "tools", items: ["Git", "SVN", "Plastic SCM", "GitHub", "Rider", "VS Code"] },
];

export const QUALIFICATIONS: Qualification[] = [
  { title: "Graduate Diploma in Information Technology", institution: "Waikato Institute of Technology", year: "2016" },
  { title: "Master of Arts (Music)", honours: "with Distinction", institution: "Waikato Institute of Technology", year: "2015" },
  {
    title: "Bachelor of Media Arts (Honours)",
    honours: "Second Class Honours (First Division)",
    institution: "Waikato Institute of Technology",
    year: "2013",
  },
  { title: "Bachelor of Media Arts (Commercial Music)", institution: "Waikato Institute of Technology", year: "2011" },
  { title: "Certificate of Media Arts (Level 4)", institution: "Waikato Institute of Technology", year: "2007" },
];

export const INTERESTS = "Guitarist in Hamilton rock band Dolphin Drive. Still builds engines and tools for fun.";

/** Served from /public; regenerate with `npm run resume:pdf`. */
export const RESUME_PDF = "/brogan-king-resume.pdf";
