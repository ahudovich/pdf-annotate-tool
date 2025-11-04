import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
