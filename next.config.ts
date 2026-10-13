import type { NextConfig } from "next";

// Served from GitHub Pages at brogan89.github.io/website. Set BASE_PATH="" to serve from the root.
const basePath = process.env.BASE_PATH ?? "/website";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
