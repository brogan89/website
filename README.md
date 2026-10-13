# broganking.com

Personal projects site: a glitchy cyberpunk hero followed by showcase panels for what I'm building right now (Speed Golf Royale, Mainframe Engine, Dolphin Drive, Demoify).

Built with **Next.js 16** (App Router, static export), **React 19**, **Tailwind v4** and **Motion** for animation. Deployed to GitHub Pages at [broganking.com](https://broganking.com).

## Running locally

```sh
npm install
npm run dev
```

This opens http://localhost:3000/ in your browser once the server is ready ([`scripts/dev.mjs`](scripts/dev.mjs)).

Other scripts: `npm run build` (static export into `out/`), `npm run lint`, `npm run typecheck`.

## Structure

- [`lib/projects.ts`](lib/projects.ts) holds the content: `SOCIALS` (header icons) and `PROJECTS` (rendered top to bottom in array order). Each project has a title, kicker, status, description, tags, link, CTA label and an `accent` colour that drives its glow, border trace and buttons.
- [`app/`](app) has the root layout (fonts and global background layers: grid, scanlines, noise, cursor glow), the page and [`globals.css`](app/globals.css), which holds the theme tokens, glitch, panel border-trace keyframes and the reduced-motion overrides.
- [`components/Hero.tsx`](components/Hero.tsx) and [`components/hero/`](components/hero) build the hero: the boot log, the scramble/glitch title, typed roles, and the backdrop. The backdrop is made of animated SVG circuit traces, searchlights, flying cars, a generated neon city skyline ([`Skyline.tsx`](components/hero/Skyline.tsx)), the synthwave floor and rain. The project marquee runs along the bottom.
- [`components/ProjectPanel.tsx`](components/ProjectPanel.tsx) is the shared panel shell. It alternates sides, reveals on scroll, tilts in 3D with the pointer, and shows a glare and a conic border trace. It passes `active` (hovered, or on screen for touch devices) and `inView` to the project's art.
- [`components/art/`](components/art) holds one art component per project:
  - `SgrArt` cycles through gameplay loops, and the key-art crew bursts out of the frame.
  - `EngineArt` shows the editor in a window frame, with a boot terminal on hover.
  - `DolphinArt` puts the band photo in duotone, with a flickering hand-drawn logo and an equaliser.
  - `DemoifyArt` animates a waveform player, version cards and a timestamped comment.
- `public/media/<project>/` holds graphics copied from each project's own repo and compressed to WebP. Plain `<img>`/`<video>` srcs go through [`lib/asset.ts`](lib/asset.ts), so they still resolve if the site is ever built with a `BASE_PATH`.

Everything respects `prefers-reduced-motion`: glitch, tilt, typing and video autoplay switch off.

## Adding or editing a project

1. Add an entry to `PROJECTS` in `lib/projects.ts`.
2. Add an art component in `components/art/`.
3. Register the art component in the `ART` map in [`components/Projects.tsx`](components/Projects.tsx).

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the static export on every push to `main` and publishes `out/` with GitHub Pages. [`public/.nojekyll`](public/.nojekyll) stops Jekyll from processing the output.

### Custom domain (broganking.com)

1. **Repo settings.** In **Settings → Pages**, set **Source** to **GitHub Actions** and set **Custom domain** to `broganking.com`. With Actions deploys the setting is what counts; [`public/CNAME`](public/CNAME) is kept in sync for reference.
2. **DNS at the registrar.** Set these records:

   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `brogan89.github.io` |

   Remove any default parking A, AAAA or CNAME records on `@` or `www`.
3. **Domain verification (recommended).** Under **GitHub profile → Settings → Pages → Add a domain**, add `broganking.com` and create the TXT record GitHub shows you. This stops anyone else from claiming the domain for their Pages site.
4. **HTTPS.** Once DNS has propagated and GitHub has issued the certificate, tick **Enforce HTTPS** in the repo's Pages settings.

To serve from a sub-path instead (e.g. `brogan89.github.io/website`), build with `BASE_PATH=/website`.
