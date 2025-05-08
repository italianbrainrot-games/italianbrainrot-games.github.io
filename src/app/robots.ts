import { MetadataRoute } from 'next';

// 添加这些行来确保静态导出
export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://italianbrainrot-games.github.io/sitemap.xml',
  };
}

