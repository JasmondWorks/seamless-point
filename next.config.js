// next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true, // Disables type checking during production builds
  },
  trailingSlash: false,
  images: {
    domains: [
      "ucarecdn.com",
      "enewerspynkvmaxulbhv.supabase.co", // <-- add this line
    ],
  },
  serverActions: {
    bodySizeLimit: "5mb", // or '10mb' — depending on your needs
  },
};
