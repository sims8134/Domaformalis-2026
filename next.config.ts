import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.domaformalis.com" }],
        destination: "https://domaformalis.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;