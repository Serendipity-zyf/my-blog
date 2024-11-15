/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  env: {
    EDGE_CONFIG: process.env.EDGE_CONFIG,
    EDGE_CONFIG_ID: process.env.EDGE_CONFIG_ID,
    EDGE_CONFIG_TOKEN: process.env.EDGE_CONFIG_TOKEN,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource'
    })
    return config
  },
  publicRuntimeConfig: {
    staticFolder: '/posts/images',
  },
};

export default nextConfig; 