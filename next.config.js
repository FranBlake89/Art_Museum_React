/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'images.metmuseum.org'],
  },
}

module.exports = nextConfig
