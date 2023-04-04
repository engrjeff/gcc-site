/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sqvuqvilgpdrocmzrsvw.supabase.co"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
};

module.exports = nextConfig;
