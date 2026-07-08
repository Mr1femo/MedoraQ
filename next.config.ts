import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instagram.fbgw62-1.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
