# broganking.com

A portfolio of the things I'm building right now: games, a game engine, music, and the tools in between. Live at **[broganking.com](https://broganking.com)**.

## What's on the workbench

| Project | What it is |
|---|---|
| [**Speed Golf Royale**](https://speedgolfroyale.com/) | A multiplayer racing golf game where a whole lobby tees off at once and the first to hole out wins. Built in Godot, in development. |
| [**Dolphin Drive**](https://dolphindrive.band/) | My rock band from Hamilton, New Zealand. |
| [**Mainframe Engine**](https://mainframe-games.github.io/mainframe-engine/) | My open-source C# game engine and Godot-style editor, built on Vulkan. |
| [**Demoify**](https://demoify.app/) | "GitHub for songs": versioned demo sharing with timestamped feedback for musicians. |

## Running it locally

```sh
npm install
npm run dev
```

This opens http://localhost:3000 in your browser. The site is a Next.js static export with Tailwind and Motion. Projects live in [`lib/projects.ts`](lib/projects.ts), and each one has its own animated art in [`components/art/`](components/art).

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
