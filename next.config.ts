/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        pathname: "/apod/image/**",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
        pathname: "/sites/**",
      },
      {
        protocol: "https",
        hostname: "*.nasa.gov",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      }
    ],
  },
};

module.exports = nextConfig;
