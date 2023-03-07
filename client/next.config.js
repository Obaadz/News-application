/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: "http://192.168.1.11:5000",
  },
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
  },
};

module.exports = nextConfig;
