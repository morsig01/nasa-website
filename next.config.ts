/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        pathname: '/apod/image/**',
      },
    ],
  },
};

module.exports = nextConfig;