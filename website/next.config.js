const { withContentlayer } = require("next-contentlayer");

// Next.js config:
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["@typethings/ui"],
};

module.exports = withContentlayer(nextConfig);
