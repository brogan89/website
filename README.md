# brogan.dev

A personal projects site — a living list of things Brogan is building, shipping, or prototyping. Deployed as a static site via GitHub Pages.

## Overview

This is a single-page, vanilla HTML/CSS/JS site with no build step, no framework, and no dependencies. It renders a header, hero section, status filters, and a responsive grid of project cards, each sourced from a plain JS data file.

The visual style is a dark, glowing "terminal/cyberpunk" aesthetic — `JetBrains Mono` for technical labels, `Space Grotesk` for display text, a cyan/violet/magenta accent palette, a faint animated grid background, and soft blurred glow orbs.

## How it works

- **[`index.html`](index.html)** — the page shell. Contains the header, hero copy, and two empty containers (`#filters` and `#projects`) that get populated at runtime. Loads `projects.js` then `script.js` as plain `<script>` tags (no modules/bundler).
- **[`projects.js`](projects.js)** — the content. A single `PROJECTS` array of plain objects; this is the only file you need to edit to add, remove, or update a project. Each entry has:
  - `icon` — an emoji shown in the card's icon badge
  - `title` — project name
  - `status` — one of `"live"`, `"building"`, `"prototype"`, `"idea"` (drives the colored status pill and the filter buttons)
  - `description` — a sentence or two of body copy
  - `tags` — an array of short strings rendered as pills
  - `link` — a URL to the project, or `""` to render a disabled "coming soon" button instead
- **[`script.js`](script.js)** — all rendering logic, wrapped in an IIFE:
  - Renders the year in the footer
  - Builds the filter button row from the distinct `status` values present in `PROJECTS` (always prepending an "All" filter)
  - Renders project cards into `#projects` via template strings + `innerHTML`
  - Filtering is handled by re-rendering the list on filter-button click (event delegation on `#filters`)
  - The "view project" / "coming soon" control is a real `<button>` (not an anchor) so it has correct semantics and a visible disabled state; clicking a non-disabled button opens its `link` via `window.open(..., "_blank", "noopener")` (event delegation on `#projects`)
- **[`styles.css`](styles.css)** — all styling, including:
  - CSS custom properties on `:root` for the color palette and corner radius
  - Decorative fixed-position grid background and blurred "glow" orbs (`.grid-bg`, `.glow-1`, `.glow-2`), all `pointer-events: none` so they never intercept clicks
  - Card entrance animation (`@keyframes rise`) and a `prefers-reduced-motion` override that disables all animation
  - A hover glow effect on cards via `.card::before` (also `pointer-events: none` — this overlay sits in front of in-flow card content in paint order, so it must stay click-through)

There is no client-side router, no state management, and no network calls beyond loading Google Fonts — `PROJECTS` is the entire data layer.

## Running locally

This repo includes a [`Justfile`](Justfile) (requires [`just`](https://github.com/casey/just)) with a single recipe:

```sh
just run
```

This frees up port `8000` if anything is already bound to it, starts `python3 -m http.server 8000` in the background, and opens `http://localhost:8000` in your default browser with a cache-busting query param (so it's always a fresh navigation, not a stale reused tab). Press `Ctrl+C` to stop the server.

No `just`? Any static file server works, e.g. `python3 -m http.server 8000`, then open `http://localhost:8000` manually.

## Deployment

The site is deployed via **GitHub Pages**, served directly from this repo with no build step. [`.nojekyll`](.nojekyll) disables GitHub's default Jekyll processing so files (e.g. anything prefixed with `_`) are served as-is.

## Adding or editing a project

Edit the `PROJECTS` array in [`projects.js`](projects.js) — no other file needs to change. Leave `link` as `""` to show a disabled "coming soon" state until the project has somewhere to link to.
