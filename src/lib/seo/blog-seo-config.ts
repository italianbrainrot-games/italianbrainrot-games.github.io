import type { Metadata } from 'next';
import blogData from '@/data/blog.json';
import { generateJsonLd } from '@/lib/metadata';

// 网站基本信息
const SITE_NAME = 'Italian Brainrot Game Portal';
const BASE_URL = 'https://italianbrainrot-games.github.io';

// Define the types for our blog post
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  author_icon?: string;
  author_desc?: string;
  author_twitter_link?: string;
  author_instgram_link?: string;
  author_facebook_link?: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  categories: string[];
}

// Generate JSON-LD structured data for blog article
function generateBlogJsonLd(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/share.png`,
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: [...post.tags, ...post.categories].join(', '),
  };
}

/**
 * 博客列表页SEO配置
 */
export function getBlogSEO(): Metadata {
  return {
    title: `Blog - ${SITE_NAME}`,
    description: 'Explore the latest blog posts about Italian Brainrot games, internet culture, and related trends',
    keywords: ['Italian Brainrot', 'blog', 'gaming blog', 'internet culture', 'memes'],
    openGraph: {
      title: `Blog - ${SITE_NAME}`,
      description: 'Explore the latest blog posts about Italian Brainrot games, internet culture, and related trends',
      url: `${BASE_URL}/blog`,
      siteName: SITE_NAME,
      images: [
        {
          url: '/images/share.png',
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Blog`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog - ${SITE_NAME}`,
      description: 'Explore the latest blog posts about Italian Brainrot games, internet culture, and related trends',
      images: ['/images/share.png'],
    },
    alternates: {
      canonical: `${BASE_URL}/blog`,
    },
  };
}

/**
 * 博客文章页SEO配置生成函数
 */
export async function generateBlogPostMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogData.find((post) => post.slug === params.slug) as BlogPost | undefined;

  if (!post) {
    return {
      title: `Blog Post Not Found - ${SITE_NAME}`,
      description: 'The requested blog post could not be found',
    };
  }

  // Create canonical URL
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  // Generate keywords from tags and categories
  const keywords = [...post.tags, ...post.categories, 'Italian Brainrot', 'Games', 'Blog'];

  return {
    title: `${post.title} - ${SITE_NAME}`,
    description: post.excerpt,
    keywords: keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      creator: '@ItalianBrainrot',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.categories[0] || 'Blog',
      'article:tag': post.tags.join(','),

      // Social sharing meta tags
      'og:site_name': SITE_NAME,
      'og:locale': 'en_US',
      'og:type': 'article',
      'og:title': post.title,
      'og:description': post.excerpt,
      'og:image': post.coverImage,
      'og:url': canonicalUrl,
      'og:image:width': '1200',
      'og:image:height': '630',

      // Twitter specific
      'twitter:card': 'summary_large_image',
      'twitter:site': '@ItalianBrainrot',
      'twitter:title': post.title,
      'twitter:description': post.excerpt,
      'twitter:image': post.coverImage,

      // For mobile browsers
      'theme-color': '#f97316',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'format-detection': 'telephone=no',
    },
  };
}

/**
 * 博客文章页JSON-LD结构化数据生成函数
 */
export function generateBlogJsonLdData({
  slug
}: {
  slug: string;
}) {
  // const { slug } = await params;
  const post = blogData.find((post) => post.slug === slug) as BlogPost | undefined;

  if (!post) {
    return null;
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const jsonLd = generateBlogJsonLd(post, canonicalUrl);

  return generateJsonLd(jsonLd);
}
