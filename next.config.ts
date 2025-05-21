/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        pathname: '/apod/image/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nasa.gov',
        pathname: '/sites/**',
      },
      {
        protocol: 'https',
        hostname: '*.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'voyager.jpl.nasa.gov',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
        pathname: '/system/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      }
    ],
  },
};

module.exports = nextConfig;
