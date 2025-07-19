/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/datastore/:path*",
        destination: `${process.env.NEXT_PUBLIC_DATASET_API}/api/datastore/:path*`
      },
      {
        source: "/api/:path((?!auth).*)",
        destination: `${process.env.NEXT_PUBLIC_SERVER_API}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
