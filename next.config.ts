import type { NextConfig } from "next";

// Static export: Cloudflare serves the generated `out/` folder directly,
// no server runtime or adapter needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
