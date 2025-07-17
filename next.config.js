/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/user/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_API}/api/user/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;