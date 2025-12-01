import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com', // Libera imagens deste site
      },
    ],
  },
};

export default nextConfig;
