import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/weather',
        permanent: true,
      },
    ];
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  env: {
    API_KEY: "b5205d2d3de6e7485e6f4008f1a2d371",
    API_URL: "https://api.openweathermap.org/data/2.5"
  },
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: 'assets/images/**',
        search: ''
      }
    ]
  }
};

export default nextConfig;
