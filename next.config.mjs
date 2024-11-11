/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    EDGE_CONFIG: process.env.EDGE_CONFIG,
    EDGE_CONFIG_ID: process.env.EDGE_CONFIG_ID,
    EDGE_CONFIG_TOKEN: process.env.EDGE_CONFIG_TOKEN,
  },
};

export default nextConfig; 