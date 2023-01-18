/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    domains: JSON.parse(process.env.ALLOWED_IMAGE_URLS),
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
