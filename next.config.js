/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fl-platform-staging.s3.eu-west-2.amazonaws.com',
        pathname: '/users/profile-images/**',
      },
      {
        protocol: 'https',
        hostname: 'fl-platform-backup.s3.eu-west-2.amazonaws.com',
        pathname: '/users/profile-images/**',
      },
      {
        protocol: 'https',
        hostname: 'fl-platform-production.s3.eu-west-2.amazonaws.com',
        pathname: '/users/profile-images/**',
      },
    ],
  },
}

module.exports = nextConfig
