# brogan.king

Personal projects site: a glitchy cyberpunk hero followed by showcase panels for what I'm building right now (Speed Golf Royale, Mainframe Engine, Dolphin Drive, Demoify).

Built with **Next.js 16** (App Router, static export), **React 19**, **Tailwind v4** and **Motion** for animation. Deployed to GitHub Pages at `brogan89.github.io/website`.

## Running locally

```sh
npm install
npm run dev
```

Then open http://localhost:3000/website/. The `/website` prefix is the GitHub Pages basePath.

Other scripts: `npm run build` (static export into `out/`), `npm run lint`, `npm run typecheck`.

## Structure

- [`lib/projects.ts`](lib/projects.ts) holds the content: `SOCIALS` (header icons) and `PROJECTS` (rendered top to bottom in array order). Each project has a title, kicker, status, description, tags, link, CTA label and an `accent` colour that drives its glow, border trace and buttons.
- [`app/`](app) has the root layout (fonts and global background layers: grid, scanlines, noise, cursor glow), the page and [`globals.css`](app/globals.css), which holds the theme tokens, glitch, panel border-trace keyframes and the reduced-motion overrides.
- [`components/Hero.tsx`](components/Hero.tsx) and [`components/hero/`](components/hero) build the hero: the boot log, the scramble/glitch title, typed roles, the animated SVG circuit traces with the synthwave floor, and the project marquee.
- [`components/ProjectPanel.tsx`](components/ProjectPanel.tsx) is the shared panel shell. It alternates sides, reveals on scroll, tilts in 3D with the pointer, and shows a glare and a conic border trace. It passes `active` (hovered, or on screen for touch devices) and `inView` to the project's art.
- [`components/art/`](components/art) holds one art component per project:
  - `SgrArt` cycles through gameplay loops, and the key-art crew bursts out of the frame.
  - `EngineArt` shows the editor in a window frame, with a boot terminal on hover.
  - `DolphinArt` puts the band photo in duotone, with a flickering logo and an equaliser.
  - `DemoifyArt` animates a waveform player, version cards and a timestamped comment.
- `public/media/<project>/` holds graphics copied from each project's own repo and compressed to WebP. Plain `<img>`/`<video>` srcs go through [`lib/asset.ts`](lib/asset.ts) to get the basePath prefix.

Everything respects `prefers-reduced-motion`: glitch, tilt, typing and video autoplay switch off.

## Adding or editing a project

1. Add an entry to `PROJECTS` in `lib/projects.ts`.
2. Add an art component in `components/art/`.
3. Register the art component in the `ART` map in [`components/Projects.tsx`](components/Projects.tsx).

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the static export on every push to `main` and publishes `out/` with GitHub Pages. In the repo settings, **Settings → Pages → Source** must be set to **GitHub Actions**. [`public/.nojekyll`](public/.nojekyll) stops Jekyll from processing the output. To serve from a domain root instead, build with `BASE_PATH=""`.
