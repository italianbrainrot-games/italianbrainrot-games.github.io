import type { Metadata } from 'next';

interface GameSEOProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  canonicalUrl: string;
}

/**
 * 生成游戏详情页的SEO元数据
 */
export function generateGameSEO({
  title,
  description,
  category,
  imageUrl = '/images/default-game-image.jpg',
  canonicalUrl,
}: GameSEOProps): Metadata {
  const formattedTitle = `${title} - Italian Brainrot 游戏门户`;

  return {
    title: formattedTitle,
    description,
    keywords: [`Italian Brainrot`, `游戏`, category, title, `在线游戏`],
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: 'Italian Brainrot 游戏门户',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 生成游戏目录页的SEO元数据
 */
export function generateGamesCatalogSEO(
  category?: string,
  page: number = 1
): Metadata {
  const baseTitle = 'Italian Brainrot 游戏目录';
  const title = category
    ? `${category}类游戏 - ${baseTitle}`
    : baseTitle;

  const description = category
    ? `浏览我们的${category}类 Italian Brainrot 游戏集合，找到您喜欢的游戏并立即开始游玩。`
    : '浏览我们完整的 Italian Brainrot 游戏集合，找到您喜欢的游戏并立即开始游玩。';

  const canonicalUrl = category
    ? `https://italianbrainrot-games.github.io/games/category/${category}${page > 1 ? `?page=${page}` : ''}`
    : `https://italianbrainrot-games.github.io/games${page > 1 ? `?page=${page}` : ''}`;

  return {
    title,
    description,
    keywords: ['Italian Brainrot', '游戏', '游戏目录', ...(category ? [category] : [])],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Italian Brainrot 游戏门户',
      images: [
        {
          url: '/images/games-catalog-og.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/games-catalog-og.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

