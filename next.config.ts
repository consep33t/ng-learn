import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Dockerfile-based Cloud Run deployment
  output: "standalone",
  // Don't fail build on ESLint/TS warnings in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
