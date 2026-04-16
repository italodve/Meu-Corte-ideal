/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config) => {
    // face-api.js references `fs` / `encoding` in ways that are only relevant
    // in Node; stub them out on the client build.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      encoding: false,
    };
    return config;
  },
};

export default nextConfig;
