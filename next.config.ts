import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPagesBuild
  ? (process.env.PAGES_BASE_PATH ?? "/cybersecurity101")
  : "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild ? { output: "export" as const } : {}),
  outputFileTracingRoot: process.cwd(),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
