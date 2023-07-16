/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
