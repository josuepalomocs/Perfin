/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_VERSION: process.env.PLAID_VERSION,
  },
};

module.exports = nextConfig;
