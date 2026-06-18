import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jfunki.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.jfunki.com', // Whitelists your new Hostinger subdomain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;