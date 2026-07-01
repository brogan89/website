// Icon-only social buttons shown in the header.
// platform: one of "github" | "twitter" | "instagram" | "youtube" | "linkedin" | "email"
//   (unknown platforms fall back to a generic link icon)
// url: a URL (use "mailto:you@example.com" for email), or leave as "" to hide the button.
const SOCIALS = [
  { platform: "github", url: "https://github.com/brogan89" },
  { platform: "instagram", url: "https://www.instagram.com/brogan.king/" },
  { platform: "youtube", url: "https://www.youtube.com/@mainframegamez" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/brogan-king-6a985a215/" },
];

// Edit this list to add / update your projects.
// status: "live" | "building" | "idea"
// link: a URL, or leave as "" to show a disabled placeholder.
// imagePosition: CSS background-position value, e.g. "center center", "top", "50% 30%" (default: "center top")
const PROJECTS = [
  {
    icon: "🏌️‍♂️",
    title: "Speed Golf Royale",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2294250/4bdf1539cb9ab072a11a7f254684813bd8fa768c/ss_4bdf1539cb9ab072a11a7f254684813bd8fa768c.1920x1080.jpg?t=1763756598",
    status: "building",
    description: "Ready, set, swing! Whack the ball and dash through chaotic courses. Scored on shots taken and how fast you reach the flag. Outplay your rivals in a fast-paced, fun scramble to victory!",
    tags: ["game", "godot", "mainframegames"],
    link: "https://speedgolfroyale.com/",
  },
  {
    icon: "🎸",
    title: "Dolphin Drive",
    image: "https://www.muzic.nz/wp-content/uploads/gallery/JW08714.jpg",
    imagePosition: "center 30%",
    status: "live",
    description: "Rock band from Hamilton, New Zealand!",
    tags: ["band", "music"],
    link: "https://dolphindrive.band/",
  },
  {
    icon: "🎵",
    title: "Demoify",
    status: "live",
    description: "Experiments with autonomous coding agents and prompt orchestration pipelines.",
    tags: ["webapp", "music"],
    link: "https://demoify.app/",
  },
  {
    icon: "⛳️",
    title: "Tour Pro Manager",
    status: "prototype",
    description: "A golf tour management game where you train players and compete in tournaments to and climb the ranks",
    tags: ["game", "webapp"],
    link: "",
    hide: true
  },
  {
    icon: "🧪",
    title: "Buy My Snake Oil",
    status: "prototype",
    description: "In this potion-crafting RPG adventure, step into the shoes of a naive snake oil salesman in a quirky Wild West world. Physically interact with tools and ingredients to craft phony remedies while honing your sales tactics to attract higher-paying customers and maintain your reputation.",
    tags: ["game", "godot", "mainframegames"],
    link: "https://store.steampowered.com/app/2202980/Buy_My_Snake_Oil/",
    hide: true
  }
];
