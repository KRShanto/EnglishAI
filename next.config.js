/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }], // TODO: temporary fix for now
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
