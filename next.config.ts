import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enhanced image optimization
  images: {
    formats: ['image/webp', 'image/avif'], // Prefer modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 31536000, // 1 year cache for images
    unoptimized: false,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
    webVitalsAttribution: ['CLS', 'LCP'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Enhanced compression and caching
  compress: true,
  
  // Bundle analyzer setup
  env: {
    ANALYZE: process.env.ANALYZE,
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Existing webpack config
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    // Advanced bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Separate chunk for React and Next.js core
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?:react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Separate chunk for UI libraries
          lib: {
            test: /node_modules\/@radix-ui|lucide-react/,
            name: 'lib',
            priority: 30,
            chunks: 'all',
          },
          // Separate chunk for other vendor libraries
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            priority: 20,
            chunks: 'all',
          },
          // Timeline specific chunk
          timeline: {
            test: /components\/timeline/,
            name: 'timeline',
            priority: 50,
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
};

// Bundle analyzer setup
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}

export default nextConfig;
