import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages on the apex custom domain decidefootball.com.
 * No basePath / assetPrefix — those are only for project-site URLs like
 * username.github.io/repo. Middleware, rewrites, and route handlers are not used.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            {
              source: "/is-:player-playing-today",
              destination: "/is-playing/:player",
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
