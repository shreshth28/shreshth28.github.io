// next.config.ts
import type { NextConfig } from "next";

const repo = "shreshth-portfolio";
const isPages = process.env.GITHUB_PAGES === "true";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,

  eslint: {
    ignoreDuringBuilds: true,        // ← skip ESLint in production builds
  },
};

export default config;