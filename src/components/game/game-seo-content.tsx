"use client";
import React, { useEffect } from "react";

export interface VideoContent {
  // === 基础信息 ===
  name: string;
  description: string;
  thumbnailUrl: string;

  // === 时间信息 ===
  uploadDate?: string; // ISO 8601 format (e.g., "2024-01-15T10:30:00Z")
  datePublished?: string; // ISO 8601 format
  duration?: string; // ISO 8601 duration format (e.g., "PT2M30S")

  // === URL 信息 ===
  embedUrl?: string;
  contentUrl?: string;
  url?: string; // 视频主页URL

  // === 技术规格 ===
  encodingFormat?: string; // MIME类型 (e.g., "video/mp4", "video/webm")
  videoFrameSize?: string; // 分辨率 (e.g., "1920x1080")
  videoQuality?: string; // 质量描述 (e.g., "HD", "4K", "1080p")
  width?: number; // 宽度(像素)
  height?: number; // 高度(像素)
  bitrate?: string; // 比特率 (e.g., "1000kbps")

  // === 内容分类 ===
  genre?: string | string[]; // 类型/流派
  keywords?: string | string[]; // 关键词
  inLanguage?: string; // 语言代码 (e.g., "zh-CN", "en-US")

  // === 创作者信息 ===
  author?: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  };
  creator?: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };

  // === 互动统计 ===
  interactionStatistic?: Array<{
    "@type": "InteractionCounter";
    interactionType:
      | "https://schema.org/WatchAction"
      | "https://schema.org/LikeAction"
      | "https://schema.org/CommentAction";
    userInteractionCount: number;
  }>;

  // === 可访问性 ===
  caption?: string; // 字幕URL或内容
  transcript?: string; // 转录文本URL或内容

  // === 章节信息 (用于长视频) ===
  hasPart?: Array<{
    "@type": "Clip";
    name: string;
    startOffset: string; // ISO 8601 duration (e.g., "PT1M30S")
    endOffset?: string;
    url?: string;
  }>;

  // === 系列信息 ===
  isPartOf?: {
    "@type": "VideoObjectSeries" | "CreativeWorkSeries";
    name: string;
    url?: string;
  };

  // === 许可和使用权限 ===
  license?: string; // 许可证URL
  copyrightHolder?: {
    "@type": "Person" | "Organization";
    name: string;
  };

  // === 地理和受众 ===
  contentLocation?: {
    "@type": "Place";
    name: string;
    address?: string;
  };
  audience?: {
    "@type": "Audience";
    audienceType: string; // e.g., "Children", "Adults"
    geographicArea?: string;
  };

  // === 内容评级 ===
  contentRating?: {
    "@type": "Rating";
    ratingValue: string; // e.g., "PG", "PG-13", "R"
    ratingSystem?: string; // e.g., "MPAA", "ESRB"
  };

  // === 商业信息 ===
  offers?: {
    "@type": "Offer";
    price?: string;
    priceCurrency?: string; // ISO 4217 currency code (e.g., "USD", "CNY")
    availability?: string; // https://schema.org/InStock, etc.
  };
}

export interface RatingContent {
  ratingValue: number; // 评分值 (例如: 4.5)
  bestRating?: number; // 最高评分 (默认: 5)
  worstRating?: number; // 最低评分 (默认: 1)
  ratingCount?: number; // 评分人数
  reviewCount?: number; // 评论数量
}

interface GameSeoContentProps {
  seoContent: string;
  faqContent?: {
    question: string;
    answer: string;
  }[];
  videoContent?: VideoContent;
  ratingContent?: RatingContent;
  gameName?: string; // 游戏名称，用于结构化数据
  gameUrl?: string; // 游戏URL，用于结构化数据
}

const GameSeoContent: React.FC<GameSeoContentProps> = ({
  seoContent,
  faqContent,
  videoContent,
  ratingContent,
  gameName,
  gameUrl,
}) => {
  // 生成 FAQ JSON-LD
  const generateFaqJsonLd = () => {
    if (!faqContent || faqContent.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqContent.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  };

  // 生成 Video JSON-LD
  const generateVideoJsonLd = () => {
    if (!videoContent) return null;
    console.log(videoContent);
    const videoData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: videoContent.name,
      description: videoContent.description,
      thumbnailUrl: videoContent.thumbnailUrl,
    };

    if (videoContent.uploadDate) {
      videoData.uploadDate = videoContent.uploadDate;
    }
    if (videoContent.datePublished) {
      videoData.datePublished = videoContent.datePublished;
    }
    if (videoContent.duration) {
      videoData.duration = videoContent.duration;
    }
    if (videoContent.embedUrl) {
      videoData.embedUrl = videoContent.embedUrl;
    }
    if (videoContent.contentUrl) {
      videoData.contentUrl = videoContent.contentUrl;
    }
    if (videoContent.url) {
      videoData.url = videoContent.url;
    }
    if (videoContent.encodingFormat) {
      videoData.encodingFormat = videoContent.encodingFormat;
    }
    if (videoContent.videoFrameSize) {
      videoData.videoFrameSize = videoContent.videoFrameSize;
    }
    if (videoContent.videoQuality) {
      videoData.videoQuality = videoContent.videoQuality;
    }
    if (videoContent.width) {
      videoData.width = videoContent.width.toString();
    }
    if (videoContent.height) {
      videoData.height = videoContent.height.toString();
    }
    if (videoContent.bitrate) {
      videoData.bitrate = videoContent.bitrate;
    }
    if (videoContent.genre) {
      videoData.genre = videoContent.genre;
    }
    if (videoContent.keywords) {
      videoData.keywords = videoContent.keywords;
    }
    if (videoContent.inLanguage) {
      videoData.inLanguage = videoContent.inLanguage;
    }
    if (videoContent.author) {
      videoData.author = videoContent.author;
    }
    if (videoContent.creator) {
      videoData.creator = videoContent.creator;
    }
    if (videoContent.publisher) {
      videoData.publisher = videoContent.publisher;
    }
    if (videoContent.interactionStatistic) {
      videoData.interactionStatistic = videoContent.interactionStatistic;
    }
    if (videoContent.caption) {
      videoData.caption = videoContent.caption;
    }
    if (videoContent.transcript) {
      videoData.transcript = videoContent.transcript;
    }
    if (videoContent.hasPart) {
      videoData.hasPart = videoContent.hasPart;
    }
    if (videoContent.isPartOf) {
      videoData.isPartOf = videoContent.isPartOf;
    }
    if (videoContent.license) {
      videoData.license = videoContent.license;
    }
    if (videoContent.copyrightHolder) {
      videoData.copyrightHolder = videoContent.copyrightHolder;
    }
    if (videoContent.contentLocation) {
      videoData.contentLocation = videoContent.contentLocation;
    }
    if (videoContent.audience) {
      videoData.audience = videoContent.audience;
    }
    if (videoContent.contentRating) {
      videoData.contentRating = videoContent.contentRating;
    }
    if (videoContent.offers) {
      videoData.offers = videoContent.offers;
    }

    return videoData;
  };

  // 生成 Rating JSON-LD (作为 Game/SoftwareApplication)
  const generateRatingJsonLd = () => {
    if (!ratingContent || !gameName) return null;

    const ratingData: unknown = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: gameName,
      applicationCategory: "Game",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingContent.ratingValue?.toString() || "4.7",
        bestRating: (ratingContent.bestRating || 5).toString(),
        worstRating: (ratingContent.worstRating || 1).toString(),
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        category: "Free",
      },
    };
    if (gameUrl) {
      (ratingData as { url: string }).url = gameUrl;
    }
    if (ratingContent.ratingCount) {
      console.log(ratingContent.ratingCount);
      (
        ratingData as { aggregateRating: { ratingCount: string } }
      ).aggregateRating.ratingCount = ratingContent.ratingCount.toString();
    }
    if (ratingContent.reviewCount) {
      console.log(ratingContent.reviewCount);
      (
        ratingData as { aggregateRating: { reviewCount: string } }
      ).aggregateRating.reviewCount = ratingContent.reviewCount.toString();
    }

    return ratingData;
  };

  // 生成 Game JSON-LD (用于没有评分但需要标识免费游戏的情况)
  const generateGameJsonLd = () => {
    // 如果已经有了评分数据，就不需要单独的游戏数据了
    if (!gameName || ratingContent) return null;

    const gameData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: gameName,
      applicationCategory: "Game",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        category: "Free",
      },
    };

    if (gameUrl) {
      (gameData as { url: string }).url = gameUrl;
    }

    return gameData;
  };

  // 使用 useEffect 动态添加 JSON-LD 到页面头部
  useEffect(() => {
    const jsonLdData = [
      generateFaqJsonLd(),
      generateVideoJsonLd(),
      generateRatingJsonLd(),
      generateGameJsonLd(),
    ].filter(Boolean);

    if (jsonLdData.length === 0) return;

    // 清理之前添加的 JSON-LD 脚本
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-game-seo]'
    );
    existingScripts.forEach((script) => script.remove());

    // 添加新的 JSON-LD 脚本
    jsonLdData.forEach((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-game-seo", "true");
      script.textContent = JSON.stringify(data, null, 2);
      document.head.appendChild(script);
    });

    // 清理函数：组件卸载时移除脚本
    return () => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"][data-game-seo]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, [faqContent, videoContent, ratingContent, gameName, gameUrl]);

  if (!seoContent) return null;

  return (
    <div className="my-8 bg-black/40 backdrop-blur-md rounded-none sm:rounded-xl p-4 sm:p-6 mx-0 border border-white/10">
      <h2 className="text-2xl font-bold text-white uppercase mb-6">
        Game Details
      </h2>

      <style jsx global>{`
        .seo-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f59e0b;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .seo-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f59e0b;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .seo-content strong {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }
        .seo-content em {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }
        .seo-content ul,
        .seo-content ol {
          margin-top: 0.75rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .seo-content ul {
          list-style-type: disc;
        }
        .seo-content ol {
          list-style-type: decimal;
        }
        .seo-content li {
          margin-bottom: 0.5rem;
        }
        .seo-content a {
          color: #fb923c;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .seo-content a:hover {
          color: #f97316;
        }
        .seo-content p {
          margin-bottom: 1rem;
        }
        .seo-content table {
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 1rem;
          border-collapse: collapse;
        }
        .seo-content th,
        .seo-content td {
          padding: 0.5rem 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .seo-content th {
          background-color: rgba(0, 0, 0, 0.3);
          font-weight: 600;
        }
        .seo-content tr:nth-child(even) {
          background-color: rgba(0, 0, 0, 0.15);
        }
        .seo-content dl {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .seo-content dt {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 0.75rem;
        }
        .seo-content dd {
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
      <div
        className="text-white/80 prose prose-invert max-w-none seo-content"
        dangerouslySetInnerHTML={{ __html: seoContent }}
        style={
          {
            "--tw-prose-headings": "theme(colors.amber.400)",
            "--tw-prose-links": "theme(colors.orange.400)",
            "--tw-prose-bold": "theme(colors.white)",
            "--tw-prose-counters": "theme(colors.orange.500)",
            "--tw-prose-bullets": "theme(colors.orange.500)",
            "--tw-prose-hr": "theme(colors.white/20)",
            "--tw-prose-quotes": "theme(colors.amber.400)",
            "--tw-prose-quote-borders": "theme(colors.orange.500)",
            "--tw-prose-th-borders": "theme(colors.white/20)",
            "--tw-prose-td-borders": "theme(colors.white/10)",
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default GameSeoContent;
