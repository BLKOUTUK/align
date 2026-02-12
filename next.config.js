/** @type {import("next").NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  basePath: isProd ? '/align' : '',
  assetPrefix: isProd ? '/align/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
