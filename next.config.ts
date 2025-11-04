import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // SEO 최적화를 위한 설정
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
