// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // IMPORTANT: no basePath / assetPrefix for user sites
};

export default config;