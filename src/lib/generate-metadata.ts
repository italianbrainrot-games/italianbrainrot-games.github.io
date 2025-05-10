import { Metadata } from 'next';
import { getSiteInfo, getSeoConfig, getKeywordsByPath } from './site-config';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path: string;
  image?: string;
}

/**
 * 为动态页面生成元数据
 */
export function generateMetadata({
  title,
  description,
  path,
  image,
}: GenerateMetadataOptions): Metadata {
  const siteInfo = getSiteInfo();
  const seoConfig = getSeoConfig();
  
  const pageTitle = title ? `${title} | ${siteInfo.siteName}` : siteInfo.title;
  const pageDescription = description || siteInfo.description;
  const keywords = getKeywordsByPath(path, title);
  const ogImage = image ? [{ url: image, width: 1200, height: 630, alt: pageTitle }] : seoConfig.openGraph.images;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteInfo.url}${path}`,
      siteName: siteInfo.siteName,
      images: ogImage,
      locale: siteInfo.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: image ? [image] : seoConfig.twitter.images,
      creator: siteInfo.creator,
    },
  };
} 