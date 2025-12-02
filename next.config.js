/** @type {import('next').NextConfig} */

// Detect hosting platform
const isVercel = !!process.env.VERCEL; // Vercel sets this automatically
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // needed for GitHub Pages
  basePath: !isVercel && isProd ? "/next-portfolio-fixed" : "",
  assetPrefix: !isVercel && isProd ? "/next-portfolio-fixed/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
