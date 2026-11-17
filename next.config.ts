import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened at 127.0.0.1. Next blocks that host unless it is listed,
  // which stops the client bundle from hydrating and leaves forms and the menu inert.
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default nextConfig;
