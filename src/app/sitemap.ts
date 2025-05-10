import { MetadataRoute } from 'next';
import blogData from '@/data/blog.json';
import gamesData from '@/data/games.json';
import { getSiteInfo, getSitemapConfig } from '@/lib/site-config';

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never';

// 添加这些行来确保静态导出
export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteInfo = getSiteInfo();
  const sitemapConfig = getSitemapConfig();
  const baseUrl = siteInfo.url;

  // 静态路由
  const staticRoutes: MetadataRoute.Sitemap = sitemapConfig.staticRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as ChangeFrequency,
    priority: route.priority,
  }));

  // 博客路由
  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: sitemapConfig.dynamicRoutes.blog.changeFrequency as ChangeFrequency,
    priority: sitemapConfig.dynamicRoutes.blog.priority,
  }));

  // 游戏路由
  const gameRoutes = gamesData.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: sitemapConfig.dynamicRoutes.games.changeFrequency as ChangeFrequency,
    priority: sitemapConfig.dynamicRoutes.games.priority,
  }));

  return [...staticRoutes, ...blogRoutes, ...gameRoutes];
}

