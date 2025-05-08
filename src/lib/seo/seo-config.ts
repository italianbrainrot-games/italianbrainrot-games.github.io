import type { Metadata } from 'next';
import { generateJsonLd, generateGameJsonLd } from '@/lib/metadata';
import blogData from '@/data/blog.json';
import gamesData from '@/data/games.json';

// 网站基本信息
const SITE_NAME = 'Italian Brainrot Game Portal';
const BASE_URL = 'https://italianbrainrot.com';
const DEFAULT_DESCRIPTION = 'Discover, experience and share various Italian Brainrot games on our portal';
const DEFAULT_IMAGE = '/images/share.png';

// 通用SEO配置
const defaultSEO: Metadata = {
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  keywords: ['Italian Brainrot', 'games', 'online games', 'free games', 'browser games'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ItalianBrainrot',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

/**
 * 首页SEO配置
 */
export function getHomeSEO(): Metadata {
  return {
    title: `${SITE_NAME} - Play Free Online Games`,
    description: "Discover and play the best Italian Brainrot games for free. Enjoy a collection of casual, puzzle, and action games with unique gameplay and meme culture references.",
    keywords: ["Italian Brainrot", "online games", "free games", "browser games", "meme games", "casual games"],
    openGraph: {
      title: `${SITE_NAME} - Play Free Online Games`,
      description: "Discover and play the best Italian Brainrot games for free. Enjoy a collection of casual, puzzle, and action games with unique gameplay and meme culture references.",
      url: BASE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: "/images/share.png",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Play Free Online Games`,
      description: "Discover and play the best Italian Brainrot games for free. Enjoy a collection of casual, puzzle, and action games with unique gameplay and meme culture references.",
      images: ["/images/share.png"],
      creator: "@ItalianBrainrot",
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}

/**
 * 游戏目录页SEO配置
 */
export function getGamesCatalogSEO(
  category?: string,
  page: number = 1
): Metadata {
  const baseTitle = `${SITE_NAME} Game Catalog`;
  const title = category
    ? `${category} Games - ${baseTitle}`
    : baseTitle;

  const description = category
    ? `Browse our collection of ${category} Italian Brainrot games, find your favorite and start playing now.`
    : 'Browse our complete collection of Italian Brainrot games, find your favorite and start playing now.';

  const canonicalUrl = category
    ? `${BASE_URL}/games/category/${category}${page > 1 ? `?page=${page}` : ''}`
    : `${BASE_URL}/games${page > 1 ? `?page=${page}` : ''}`;

  return {
    title,
    description,
    keywords: ['Italian Brainrot', 'games', 'game catalog', category].filter(Boolean) as string[],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: '/images/share.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/share.png'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 游戏详情页SEO配置
 */
export function getGameSEO({
  title,
  description,
  category,
  imageUrl = '/images/share.png',
  canonicalUrl,
}: {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  canonicalUrl: string;
}): Metadata {
  const formattedTitle = `${title} - ${SITE_NAME}`;

  return {
    title: formattedTitle,
    description,
    keywords: [`Italian Brainrot`, `games`, category, title, `online games`],
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
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
 * 游戏详情页Metadata生成函数
 */
export async function generateGameMetadata({
  params
}: {
  params: Promise<{ gameName: string }>
}): Promise<Metadata> {
  const { gameName } = await params
  const gameData = gamesData.find(game => game.slug === gameName);

  if (!gameData) {
    return {
      title: `Game Not Found - ${SITE_NAME}`,
      description: 'The requested game could not be found',
    };
  }

  const canonicalUrl = `${BASE_URL}/games/${gameName}`;
  const category = gameData.category[0] || 'Game';

  return getGameSEO({
    title: gameData.name,
    description: gameData.description,
    category: category,
    imageUrl: gameData.iconUrl,
    canonicalUrl: canonicalUrl,
  });
}

/**
 * 游戏详情页JSON-LD结构化数据生成函数
 */
export function generateGameJsonLdData({
  params
}: {
  params: { gameName: string }
}) {
  const gameData = gamesData.find(game => game.slug === params.gameName);

  if (!gameData) {
    return null;
  }

  const canonicalUrl = `${BASE_URL}/games/${params.gameName}`;

  const jsonLd = generateGameJsonLd({
    title: gameData.name,
    description: gameData.description,
    imageUrl: gameData.iconUrl,
    url: canonicalUrl,
    releaseDate: '2023-01-15', // Use actual release date if available
    developer: 'Brainrot Studios',
    rating: gameData.rating,
  });

  return generateJsonLd(jsonLd);
}

/**
 * 博客列表页SEO配置
 */
export { getBlogSEO } from './blog-seo-config';

