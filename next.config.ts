// next.config.ts
import type { NextConfig } from "next";

const repo = "shreshth-portfolio";            // ← change if your repo name differs
const isPages = process.env.GITHUB_PAGES === "true"; // set in CI

const config: NextConfig = {
  output: "export",               // write static site to /out
  images: { unoptimized: true },  // no next/image optimization on Pages
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,
};

export default config;