import { MetadataRoute } from 'next';
import { getSiteInfo, getRobotsConfig } from '@/lib/site-config';

// 添加这些行来确保静态导出
export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  const siteInfo = getSiteInfo();
  const robotsConfig = getRobotsConfig();
  
  return {
    rules: robotsConfig.rules,
    sitemap: `${siteInfo.url}/sitemap.xml`,
  };
}

