import type { NextConfig } from "next";
// 检查是否在GitHub Actions环境中
const isGithubActions = process.env.GITHUB_ACTIONS || false;
// 检查是否在开发环境中
const isDevelopment = process.env.NODE_ENV === 'development';

let assetPrefix = "";
let basePath = "";

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  // 去掉 `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}


const nextConfig: NextConfig = {
  basePath,
  assetPrefix,
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
  },
};

export default nextConfig;
