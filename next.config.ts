import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Dockerfile-based Cloud Run deployment
  output: "standalone",
};

export default nextConfig;
