/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose'],
    appDir: true,
  },
  images: {
    domains: ['m.media-amazon.com']
  }
}

module.exports = nextConfig