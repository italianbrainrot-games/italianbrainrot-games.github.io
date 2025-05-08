
/** @type {import('next').NextConfig} */

// Check if we're in GitHub Pages environment
const isGithubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';

// Set the correct asset prefix and base path for GitHub Pages
let assetPrefix = '';
let basePath = '';

if (isGithubPages) {
  // For GitHub Pages deployment at italianbrainrot-games.github.io
  // We don't need a repo-specific path since this is deployed at the root
  assetPrefix = '/';
  basePath = '';
}

const nextConfig = {
  assetPrefix,
  basePath,
  output: 'export',
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // Ensure trailing slash for better asset path resolution
  trailingSlash: true,
};

module.exports = nextConfig;
