import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768],
    minimumCacheTTL: 2678400, // 31 days
    qualities: [25, 50, 75, 90, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/**',
      },
    ],
    // Enable local patterns for timeline images
    localPatterns: [
      {
        pathname: '/images/timeline/**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    // Optimize for full-screen modal display
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
