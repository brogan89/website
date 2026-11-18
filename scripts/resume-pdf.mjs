// Prints /resume from the static export (out/) to a themed A4 PDF with headless Chrome.
// Usage: `npm run resume:pdf` (builds first). Writes public/brogan-king-resume.pdf so the
// committed copy stays current, and out/brogan-king-resume.pdf so a fresh build ships it.
// Set CHROME_PATH if Chrome isn't in the usual place.
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const OUT_DIR = resolve("out");
const FILE = "brogan-king-resume.pdf";
const basePath = process.env.BASE_PATH ?? "";

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) throw new Error(`Chrome not found. Set CHROME_PATH. Tried:\n${CHROME_CANDIDATES.join("\n")}`);
if (!existsSync(join(OUT_DIR, "resume", "index.html"))) throw new Error("out/resume/index.html missing. Run `next build` first.");

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".txt": "text/plain", ".json": "application/json" };

// Minimal static server for out/ (mirrors GitHub Pages: trailing-slash dirs serve index.html).
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length) || "/";
  let file = join(OUT_DIR, path);
  if (!file.startsWith(OUT_DIR)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}${basePath}/resume/`;

const target = resolve("public", FILE);
// Async spawn: a sync call would block this process's event loop and the server above.
const print = (args) =>
  new Promise((ok, fail) => {
    const p = spawn(chrome, args, { stdio: ["ignore", "ignore", "inherit"] });
    const timer = setTimeout(() => p.kill(), 60_000);
    p.on("error", fail);
    p.on("exit", (code) => (clearTimeout(timer), code === 0 ? ok() : fail(new Error(`Chrome exited with ${code}`))));
  });
try {
  await print(
    [
      "--headless",
      "--disable-gpu",
      ...(process.platform === "linux" ? ["--no-sandbox"] : []),
      "--no-pdf-header-footer",
      "--hide-scrollbars",
      "--virtual-time-budget=10000",
      `--print-to-pdf=${target}`,
      url,
    ],
  );
} finally {
  server.close();
}
copyFileSync(target, join(OUT_DIR, FILE));
console.log(`✓ ${FILE} written to public/ and out/ (${(statSync(target).size / 1024).toFixed(0)} KB)`);
