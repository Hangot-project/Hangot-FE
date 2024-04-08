/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/:path*",
//         destination: `${process.env.NEXT_PUBLIC_SERVER_API}/:path*`,
//       },
//     ];
//   },
// };
