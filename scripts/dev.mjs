// Runs `next dev` and opens the site in the default browser once the server is ready.
// Picks up the real port from Next's output, so it still works if 3000 is taken.
import { spawn } from "node:child_process";

const basePath = process.env.BASE_PATH ?? "";
const opener = { darwin: "open", win32: "start" }[process.platform] ?? "xdg-open";

const next = spawn("npx", ["next", "dev", ...process.argv.slice(2)], {
  stdio: ["inherit", "pipe", "inherit"],
  shell: process.platform === "win32",
});

let url;
let opened = false;
next.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  const text = chunk.toString();
  url ??= text.match(/Local:\s+(http:\/\/\S+)/)?.[1];
  if (!opened && url && /Ready in/.test(text)) {
    opened = true;
    spawn(opener, [`${url}${basePath}/`], { stdio: "ignore", detached: true, shell: process.platform === "win32" }).unref();
  }
});

for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => next.kill(sig));
next.on("exit", (code) => process.exit(code ?? 0));
