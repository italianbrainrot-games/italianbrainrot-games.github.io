import type { Metadata } from 'next';

/**
 * 生成结构化的JSON-LD数据
 */
export function generateJsonLd(data: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * 生成游戏的JSON-LD结构化数据
 */
export function generateGameJsonLd({
  title,
  description,
  imageUrl,
  url,
  releaseDate,
  developer,
  rating,
}: {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  releaseDate: string;
  developer: string;
  rating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: title,
    description,
    image: imageUrl,
    url,
    datePublished: releaseDate,
    author: {
      '@type': 'Organization',
      name: developer,
    },
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1',
      },
    }),
    genre: 'Italian Brainrot',
    playMode: 'SinglePlayer',
    applicationCategory: 'Game',
  };
}

/**
 * 合并元数据对象
 */
export function mergeMetadata(
  defaultMetadata: Metadata,
  pageMetadata: Metadata
): Metadata {
  return {
    ...defaultMetadata,
    ...pageMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...pageMetadata.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...pageMetadata.twitter,
    },
  };
}

/**
 * 生成动态Sitemap条目
 */
export function generateSitemapEntry(url: string, lastModified: string, priority: number) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <priority>${priority}</priority>
    </url>
  `;
}
