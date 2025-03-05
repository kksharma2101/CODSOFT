/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2026",
        pathname: "/api/product/image/**",
      },
    ],
  },
};

export default nextConfig;
