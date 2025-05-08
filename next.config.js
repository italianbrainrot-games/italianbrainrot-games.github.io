/** @type {import('next').NextConfig} */
// 自定义域名配置
// 当使用自定义域名时，不需要设置basePath和assetPrefix
// 如果使用GitHub Pages默认域名，则需要设置这些值
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
// 检查是否在开发环境中
const isDevelopment = process.env.NODE_ENV === 'development';

// 在开发环境或使用自定义域名时，不设置basePath和assetPrefix
const basePath = isDevelopment || isCustomDomain ? '' : "/italianbrainrot.github.io";
const assetPrefix = isDevelopment || isCustomDomain ? '' : "/italianbrainrot.github.io";

const nextConfig = {
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
    unoptimized: true,
  },
  // 添加自定义webpack配置，处理静态资源路径
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
