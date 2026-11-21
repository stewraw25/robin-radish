import type { NextConfig } from "next";

/** Apex domain. Empty so pages and assets are served from /, not a project path. */
const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // The dev server is opened at 127.0.0.1. Next blocks that host unless it is listed,
  // which stops the client bundle from hydrating and leaves forms and the menu inert.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
