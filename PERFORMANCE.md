# Performance Optimization Guide

## Overview

This document outlines the performance optimizations implemented for the חטיבת יהודה (Judah Brigade) Next.js application. The optimizations focus on reducing bundle size, improving image loading, optimizing animations, and managing memory usage.

## Optimizations Implemented

### 1. Bundle Size Optimization

**Next.js Configuration (next.config.ts)**
- Advanced bundle splitting with custom chunk groups
- Separate chunks for React framework, UI libraries, and timeline components
- Package import optimization for Radix UI components
- Webpack chunk naming for better debugging

**Results:**
- Framework chunk: React and Next.js core
- UI Library chunk: @radix-ui and lucide-react components  
- Timeline chunk: Timeline-specific components
- Vendor chunk: Other third-party libraries

### 2. Image Loading Optimization

**Hero Carousel (components/ui/hero-background-carousel.tsx)**
- Preloading of adjacent images for smoother transitions
- Dynamic quality adjustment (90% for current, 75% for preloaded)
- Blur placeholder for better perceived performance
- Intersection Observer for lazy loading

**Features:**
- Smart preloading of next/previous images
- Reduced image quality for non-visible images
- Memory-efficient image management

### 3. Animation Performance

**Footstep Streaming (hooks/use-footstep-streaming.ts)**
- Caching of computed footsteps to avoid regeneration
- Debouncing of rapid animation calls (~60fps)
- Memory limits to prevent excessive footstep accumulation
- Pre-calculated trigonometric values

**Path Cache (utils/path-cache.ts)**
- Automatic cleanup of old cache entries
- Memory usage monitoring and reporting
- LRU (Least Recently Used) eviction strategy
- Sample point caching for SVG path calculations

### 4. Code Splitting

**Timeline Components (components/timeline/timeline.tsx)**
- Dynamic imports with webpack chunk names
- Preloading of likely-needed components based on screen size
- Optimized loading strategy for different device types

### 5. Memory Management

**Advanced Caching System**
- Time-based cache expiration (5 minutes)
- Size-based cache limits (50 entries max)
- Access count tracking for intelligent eviction
- Memory usage estimation and monitoring

## Performance Monitoring

### Development Mode

Press `Ctrl+Shift+P` in development to open the performance monitor which shows:
- Page load times
- Average image load times  
- Path cache usage
- Estimated memory consumption

### Build Analysis

```bash
# Analyze bundle size
npm run build:analyze

# Run performance test suite
node scripts/test-performance.js

# Generate Lighthouse report
npm run perf:lighthouse
```

### Available Scripts

```bash
npm run dev:turbo       # Development with Turbopack
npm run build:prod      # Production build
npm run build:analyze   # Build with bundle analyzer
npm run test:bundle     # Quick bundle size check
npm run clean          # Clean build cache
```

## Performance Metrics

### Before Optimization
- Main bundle: ~21kB
- Vendor chunk: ~218kB
- First Load JS: ~241kB

### Target Improvements
- Reduced vendor chunk size through better splitting
- Faster image loading with smart preloading
- Smoother animations with optimized calculations
- Lower memory usage through intelligent caching

## Best Practices

### Image Optimization
1. Use WebP format for all images
2. Implement lazy loading for non-critical images
3. Preload critical images in layout.tsx
4. Use appropriate image sizes with `sizes` prop

### Bundle Management
1. Use dynamic imports for large components
2. Implement chunk-based code splitting
3. Monitor bundle sizes regularly
4. Use tree shaking for unused code

### Animation Performance
1. Debounce expensive calculations
2. Use caching for repeated computations
3. Limit memory usage with cleanup strategies
4. Prefer CSS animations over JavaScript when possible

### Memory Management
1. Implement automatic cache cleanup
2. Monitor memory usage in development
3. Use weak references where appropriate
4. Clean up event listeners and timers

## Troubleshooting

### Large Bundle Sizes
- Run `npm run build:analyze` to identify large dependencies
- Check for duplicate dependencies in package.json
- Ensure tree shaking is working correctly

### Slow Image Loading
- Verify WebP format usage
- Check preloading configuration
- Monitor network requests in DevTools

### Memory Leaks
- Use the performance monitor to track memory usage
- Check for uncleaned event listeners
- Verify cache cleanup is working

### Animation Performance
- Monitor frame rates in DevTools
- Check for excessive DOM manipulations
- Verify debouncing is working correctly

## Monitoring Tools

1. **Built-in Performance Monitor** - Press Ctrl+Shift+P in development
2. **Bundle Analyzer** - `npm run build:analyze`
3. **Lighthouse** - `npm run perf:lighthouse`  
4. **Chrome DevTools** - Performance and Memory tabs
5. **Next.js Analytics** - Available in production

## Future Optimizations

### Potential Improvements
1. Service Worker implementation for caching
2. Progressive image loading
3. Intersection Observer for timeline components
4. Web Workers for heavy computations
5. CDN optimization for static assets

### Monitoring Recommendations
1. Set up performance budgets
2. Implement Core Web Vitals tracking
3. Monitor real user performance data
4. Regular bundle size audits
5. Automated performance testing in CI/CD

## Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Bundle Analyzer Documentation](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse) 