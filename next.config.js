/** @type {import('next').NextConfig} */

// Check if we're in GitHub Pages environment
const isGithubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';

// Set the correct asset prefix and base path for GitHub Pages
let assetPrefix = '';
let basePath = '';

if (isGithubPages) {
  // 无论在哪个域名下部署，都使用相对路径
  // 这样可以确保资源在任何GitHub Pages域名下都能正确加载
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
