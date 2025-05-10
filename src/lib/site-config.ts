import siteConfig from '@/data/site-config.json';

export type SiteConfig = typeof siteConfig;

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getSiteInfo() {
  return siteConfig.siteInfo;
}

export function getSeoConfig() {
  return siteConfig.seo;
}

export function getManifestConfig() {
  return siteConfig.manifest;
}

export function getRobotsConfig() {
  return siteConfig.robots;
}

export function getSitemapConfig() {
  return siteConfig.sitemap;
}

/**
 * 根据路径获取关键词
 * @param path 路径，如 '/' 或 '/games' 或 '/blog/my-post-slug'
 * @param itemTitle 对于动态路由，可以提供项目标题以添加到关键词中
 * @returns 对应路径的关键词
 */
export function getKeywordsByPath(path: string, itemTitle?: string): string {
  // 首先检查是否是静态路由
  const staticRoute = siteConfig.sitemap.staticRoutes.find(route => route.path === path);
  if (staticRoute && staticRoute.keywords) {
    return staticRoute.keywords;
  }
  
  // 检查是否是动态路由（博客或游戏）
  if (path.startsWith('/blog/') && itemTitle) {
    const blogKeywordsPrefix = siteConfig.sitemap.dynamicRoutes.blog.keywordsPrefix || '';
    return `${blogKeywordsPrefix}${itemTitle}, blog`;
  }
  
  if (path.startsWith('/games/') && itemTitle) {
    const gamesKeywordsPrefix = siteConfig.sitemap.dynamicRoutes.games.keywordsPrefix || '';
    return `${gamesKeywordsPrefix}${itemTitle}, game`;
  }
  
  // 默认返回网站全局关键词
  return siteConfig.siteInfo.keywords;
}

export default siteConfig; 