# Games.json 结构化数据配置指南

本文档说明如何在 `games.json` 中配置数据以生成丰富的 JSON-LD 结构化数据，用于提升游戏页面的 SEO 效果。

## 📋 目录

- [基础结构](#基础结构)
- [FAQ 数据结构](#faq-数据结构)
- [视频数据结构](#视频数据结构)
- [评分数据结构](#评分数据结构)
- [完整示例](#完整示例)
- [字段说明](#字段说明)

## 🏗️ 基础结构

在 `games.json` 中，每个游戏对象需要添加以下 SEO 相关字段：

```json
{
  "games": [
    {
      "id": "game-1",
      "title": "游戏名称",
      "url": "/games/game-1",
      
      // === 现有字段保持不变 ===
      "description": "游戏描述...",
      "category": "action",
      
      // === 新增 SEO 结构化数据字段 ===
      "seoContent": "详细的HTML游戏介绍内容...",
      "gameName": "游戏完整名称",
      "gameUrl": "https://yourdomain.com/games/game-1",
      
      // === 可选的结构化数据 ===
      "faqContent": [.11..],      // FAQ数据 (可选)
      "videoContent": {...},    // 视频数据 (可选)
      "ratingContent": {...}    // 评分数据 (可选)
    }
  ]
}
```

## ❓ FAQ 数据结构

FAQ 数据用于生成 Schema.org FAQPage 结构化数据：

```json
{
  "faqContent": [
    {
      "question": "这个游戏怎么玩？",
      "answer": "这是一个<strong>策略游戏</strong>，玩家需要通过合理的布局和策略来获得胜利。支持HTML格式。"
    },
    {
      "question": "游戏支持哪些平台？",
      "answer": "支持所有现代浏览器，包括 Chrome、Firefox、Safari 和 Edge。"
    },
    {
      "question": "游戏是免费的吗？",
      "answer": "是的，这个游戏完全免费，无需注册即可开始游戏。"
    }
  ]
}
```

### FAQ 字段说明：
- `question` (必需): 问题文本
- `answer` (必需): 答案内容，支持 HTML 标签

## 🎥 视频数据结构

视频数据用于生成 Schema.org VideoObject 结构化数据：

### 基础视频配置
```json
{
  "videoContent": {
    // === 基础信息 (必需) ===
    "name": "游戏预告片：终极战争",
    "description": "体验最刺激的战略游戏，观看精彩的游戏预告片",
    "thumbnailUrl": "https://yourdomain.com/videos/thumbnails/game-1-thumb.jpg",
    
    // === 时间信息 ===
    "uploadDate": "2024-01-15T10:30:00Z",
    "datePublished": "2024-01-15T08:00:00Z",
    "duration": "PT2M30S",  // 2分30秒
    
    // === URL 信息 ===
    "embedUrl": "https://yourdomain.com/embed/game-1-trailer",
    "contentUrl": "https://yourdomain.com/videos/game-1-trailer.mp4",
    "url": "https://yourdomain.com/videos/game-1-trailer"
  }
}
```

### 高级视频配置
```json
{
  "videoContent": {
    // === 基础信息 ===
    "name": "游戏完整攻略指南",
    "description": "从新手到专家，完整的游戏攻略教程",
    "thumbnailUrl": "https://yourdomain.com/videos/thumbnails/tutorial.jpg",
    
    // === 技术规格 ===
    "encodingFormat": "video/mp4",
    "videoFrameSize": "1920x1080",
    "videoQuality": "1080p",
    "width": 1920,
    "height": 1080,
    "bitrate": "2000kbps",
    
    // === 内容分类 ===
    "genre": ["Gaming", "Tutorial", "Strategy"],
    "keywords": ["游戏攻略", "策略指南", "新手教程"],
    "inLanguage": "zh-CN",
    
    // === 创作者信息 ===
    "author": {
      "@type": "Person",
      "name": "游戏大师李明",
      "url": "https://yourdomain.com/authors/liming"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "游戏工作室",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdomain.com/logo.png"
      }
    },
    
    // === 互动统计 ===
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WatchAction",
        "userInteractionCount": 25000
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction", 
        "userInteractionCount": 1200
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": 340
      }
    ],
    
    // === 可访问性 ===
    "caption": "https://yourdomain.com/videos/captions/game-1.vtt",
    "transcript": "视频完整转录文本...",
    
    // === 章节信息 ===
    "hasPart": [
      {
        "@type": "Clip",
        "name": "游戏介绍",
        "startOffset": "PT0S",
        "endOffset": "PT1M30S",
        "url": "https://yourdomain.com/videos/game-1#t=0,90"
      },
      {
        "@type": "Clip",
        "name": "基础操作教学", 
        "startOffset": "PT1M30S",
        "endOffset": "PT5M",
        "url": "https://yourdomain.com/videos/game-1#t=90,300"
      },
      {
        "@type": "Clip",
        "name": "高级策略",
        "startOffset": "PT5M",
        "endOffset": "PT10M"
      }
    ],
    
    // === 系列信息 ===
    "isPartOf": {
      "@type": "VideoObjectSeries",
      "name": "游戏攻略系列",
      "url": "https://yourdomain.com/video-series/game-tutorials"
    },
    
    // === 内容评级 ===
    "contentRating": {
      "@type": "Rating",
      "ratingValue": "E",
      "ratingSystem": "ESRB"
    },
    
    // === 地理和受众 ===
    "audience": {
      "@type": "Audience",
      "audienceType": "Gaming Enthusiasts",
      "geographicArea": "Global"
    }
  }
}
```

## ⭐ 评分数据结构

评分数据用于生成 Schema.org AggregateRating 结构化数据：

```json
{
  "ratingContent": {
    "ratingValue": 4.5,        // 当前评分 (必需)
    "bestRating": 5,           // 最高评分 (默认: 5)
    "worstRating": 1,          // 最低评分 (默认: 1)
    "ratingCount": 1248,       // 评分人数
    "reviewCount": 892         // 评论数量
  }
}
```

## 📖 完整示例

以下是一个完整的游戏数据示例：

```json
{
  "games": [
    {
      "id": "strategy-master",
      "title": "策略大师",
      "description": "一款考验智慧的策略游戏",
      "category": "strategy",
      "image": "/images/games/strategy-master.jpg",
      
      // === SEO 结构化数据 ===
      "seoContent": "<h2>游戏特色</h2><p>《策略大师》是一款融合了<strong>经典策略</strong>和<em>现代创新</em>的游戏...</p>",
      "gameName": "策略大师 - 终极版",
      "gameUrl": "https://yourdomain.com/games/strategy-master",
      
      // === FAQ 数据 ===
      "faqContent": [
        {
          "question": "游戏难度如何？",
          "answer": "游戏提供<strong>三个难度等级</strong>：简单、中等、困难。新手建议从简单模式开始。"
        },
        {
          "question": "是否需要联网？",
          "answer": "不需要，这是一款<em>完全离线</em>的单机游戏。"
        },
        {
          "question": "游戏时长多久？",
          "answer": "单局游戏约 15-30 分钟，适合碎片化时间游玩。"
        }
      ],
      
      // === 视频数据 ===
      "videoContent": {
        "name": "策略大师 - 游戏演示",
        "description": "观看策略大师的精彩游戏演示，了解核心玩法",
        "thumbnailUrl": "https://yourdomain.com/videos/strategy-master-thumb.jpg",
        "uploadDate": "2024-01-20T14:30:00Z",
        "duration": "PT3M45S",
        "embedUrl": "https://yourdomain.com/embed/strategy-master-demo",
        "encodingFormat": "video/mp4",
        "videoQuality": "1080p",
        "width": 1920,
        "height": 1080,
        "genre": ["Gaming", "Strategy"],
        "keywords": ["策略游戏", "演示", "教程"],
        "inLanguage": "zh-CN",
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/WatchAction",
            "userInteractionCount": 15000
          }
        ]
      },
      
      // === 评分数据 ===
      "ratingContent": {
        "ratingValue": 4.7,
        "bestRating": 5,
        "worstRating": 1,
        "ratingCount": 2456,
        "reviewCount": 1289
      }
    }
  ]
}
```

## 📚 字段说明

### 🔧 必需字段
- `seoContent`: HTML格式的游戏详细介绍
- `gameName`: 游戏完整名称 (用于结构化数据)

### 🎯 推荐字段  
- `gameUrl`: 游戏完整URL (包含域名)
- `ratingContent`: 评分信息 (提升可信度)

### 📺 视频字段优先级

**高优先级** (建议必填):
- `name`, `description`, `thumbnailUrl`
- `duration`, `uploadDate`
- `genre`, `keywords`, `inLanguage`

**中优先级** (SEO加分):
- `encodingFormat`, `videoQuality`, `width`, `height` 
- `author`, `publisher`
- `interactionStatistic`

**低优先级** (锦上添花):
- `hasPart` (章节), `isPartOf` (系列)
- `contentRating`, `audience`
- `caption`, `transcript`

## 🚀 使用方式

在 React 组件中使用：

```tsx
import GameSeoContent from '@/components/game/game-seo-content';

// 从 games.json 获取数据
const gameData = games.find(game => game.id === gameId);

// 渲染组件
<GameSeoContent
  seoContent={gameData.seoContent}
  gameName={gameData.gameName}
  gameUrl={gameData.gameUrl}
  faqContent={gameData.faqContent}
  videoContent={gameData.videoContent}
  ratingContent={gameData.ratingContent}
/>
```

## ✅ 最佳实践

1. **开始简单**: 先添加基础的 FAQ 和评分数据
2. **逐步完善**: 后续再添加详细的视频数据
3. **保持真实**: 确保统计数据的真实性
4. **定期更新**: 及时更新评分和互动数据
5. **测试验证**: 使用 Google Rich Results Test 验证结构化数据

## 🔍 SEO 收益

正确配置这些数据后，你的游戏页面可能获得：

- 🌟 **搜索结果中的评分星级显示**
- ❓ **FAQ 富文本片段**
- 🎥 **视频预览缩略图**
- 📊 **更高的搜索排名**
- 👥 **更好的用户点击率**

---

**注意**: 所有的统计数据 (观看量、点赞数、评分等) 都应该基于真实数据，避免虚假信息。 