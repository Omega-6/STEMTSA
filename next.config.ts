import type { NextConfig } from "next";

/* GitHub Pages serves this repo from https://omega-6.github.io/STEMTSA/, so the
   build needs a base path. It is set only in CI (see .github/workflows/deploy.yml)
   so `npm run dev` still serves from / locally.

   Point a custom domain at the site later? Drop PAGES_BASE_PATH from the workflow
   and add a public/CNAME file instead. */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Emit a plain folder of HTML/CSS/JS. No Node server involved.
  output: "export",

  // Produces /compete/index.html rather than /compete.html, which is what
  // GitHub Pages resolves most reliably.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  // The Pages CDN cannot run Next's image optimiser.
  images: { unoptimized: true },
};

export default nextConfig;
