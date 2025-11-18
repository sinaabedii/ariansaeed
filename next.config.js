/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Transpile Packages
  transpilePackages: ['three'],
  
  // Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // SWC Minification (Faster)
  swcMinify: true,
  
  // Production Optimizations
  poweredByHeader: false,
  compress: true,
  
  // Experimental Features for Better Performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
}

module.exports = nextConfig
