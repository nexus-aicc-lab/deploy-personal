import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: '/personal',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webdev-199.nexuscommunity.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ucti186.nexuscommunity.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },

};

export default nextConfig;