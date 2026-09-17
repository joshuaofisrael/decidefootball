import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/is-:player-playing-today",
        destination: "/is-playing/:player",
      },
      {
        source: "/week-:week/:pos-rankings",
        destination: "/rankings/:week/:pos",
      },
    ];
  },
};

export default nextConfig;
