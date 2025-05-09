"use client";

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
// 引入常用的图标库
import { FaYoutube, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaReddit, FaTiktok, FaDiscord, FaExternalLinkAlt, FaLink } from 'react-icons/fa';

// 添加必要的链接和视频处理组件
interface VideoEmbedProps {
  url: string;
  title?: string;
}

// 使用React.memo包装视频嵌入组件，避免滚动时重新渲染
const VideoEmbed = React.memo(({ url, title }: VideoEmbedProps) => {
  // 识别YouTube链接
  const isYouTubeVideo = /youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\//.test(url);
  
  if (isYouTubeVideo) {
    // 提取YouTube视频ID
    let videoId = '';
    if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    return (
      <div className="relative w-full pt-[56.25%] my-8 rounded-lg overflow-hidden shadow-lg">
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "YouTube视频"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  // 其他视频平台可以添加在这里
  
  // 默认返回链接
  return <a href={url} target="_blank" rel="noopener noreferrer">{title || url}</a>;
});

// 为React.memo组件添加displayName，避免React开发工具中显示为Anonymous
VideoEmbed.displayName = 'VideoEmbed';

// 获取链接中实际的URL（可能会被文本描述包围）
const extractUrl = (text: string): string => {
  // 尝试匹配URL模式
  const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
  return urlMatch ? urlMatch[0] : text;
};

// 平台图标组件
const LinkIcon = React.memo(({ url }: { url: string }) => {
  // 提取实际URL
  const actualUrl = extractUrl(url);
  
  // 根据URL确定平台
  if (/youtube\.com|youtu\.be/.test(actualUrl)) {
    return <FaYoutube className="mr-1 text-red-500" size={16} />;
  } else if (/twitter\.com|x\.com/.test(actualUrl)) {
    return <FaTwitter className="mr-1 text-gray-200" size={16} />;
  } else if (/facebook\.com/.test(actualUrl)) {
    return <FaFacebook className="mr-1 text-blue-500" size={16} />;
  } else if (/instagram\.com/.test(actualUrl)) {
    return <FaInstagram className="mr-1 text-pink-500" size={16} />;
  } else if (/github\.com/.test(actualUrl)) {
    return <FaGithub className="mr-1 text-white" size={16} />;
  } else if (/reddit\.com/.test(actualUrl)) {
    return <FaReddit className="mr-1 text-orange-500" size={16} />;
  } else if (/tiktok\.com/.test(actualUrl)) {
    return <FaTiktok className="mr-1 text-white" size={16} />;
  } else if (/discord\.com|discord\.me|discord\.gg/.test(actualUrl)) {
    return <FaDiscord className="mr-1 text-indigo-400" size={16} />;
  }
  
  // 如果文本中包含链接符号，返回链接图标
  if (url.includes('🔗') || url.includes('http')) {
    return <FaLink className="mr-1 text-white/70" size={14} />;
  }
  
  // 默认外部链接图标
  return <FaExternalLinkAlt className="mr-1 text-white/70" size={14} />;
});

LinkIcon.displayName = 'LinkIcon';

// 链接处理函数
const isVideoLink = (url: string): boolean => {
  const actualUrl = extractUrl(url);
  return /youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\//.test(actualUrl);
};

// 解析链接文本，找出URL
const findAndMakeClickable = (text: string) => {
  if (!text) return text;
  
  // 处理带有🔗符号的链接
  if (text.includes('🔗') && text.includes('http')) {
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      const url = urlMatch[0];
      const parts = text.split(url);
      return (
        <>
          {parts[0]}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-400 font-medium hover:text-orange-300 transition-colors"
          >
            {url}
          </a>
          {parts[1]}
        </>
      );
    }
  }
  
  return text;
};

interface CustomMarkdownProps {
  content: string;
}

// 创建一个包装好的链接组件，避免重渲染
const CustomLink = React.memo(({ href, children, ...props }: React.ComponentPropsWithoutRef<'a'> & { href?: string }) => {
  if (!href) return <span {...props}>{children}</span>;
  
  // 处理视频链接 - 视频处理会在组件中处理，这里只需要传递props
  if (isVideoLink(href)) {
    return <VideoEmbed url={href} title={children?.toString() || ''} />;
  }
  
  // 普通链接带图标
  return (
    <a
      className="text-orange-400 font-medium hover:text-orange-300 transition-colors no-underline inline-flex items-center"
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      {...props}
    >
      <LinkIcon url={href} />
      <span>{children}</span>
    </a>
  );
});

CustomLink.displayName = 'CustomLink';

// 为ReactMarkdown node对象定义接口
interface MarkdownNode {
  type: string;
  tagName?: string;
  properties?: {
    href?: string;
    [key: string]: unknown;
  };
  children?: MarkdownNode[];
  value?: string;
}

// 定义组件属性类型
interface HeadingProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface ParagraphProps {
  node?: MarkdownNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface ListItemProps {
  node?: MarkdownNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface ImageProps {
  src?: string;
  alt?: string;
  [key: string]: unknown;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

// 使用React.memo包装整个CustomMarkdown组件
const CustomMarkdown = React.memo(({ content }: CustomMarkdownProps) => {
  // 使用useMemo来缓存组件配置，避免每次渲染都重新创建
  const components = useMemo(() => {
    const config: Components = {
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      h1: ({ children, ...props }) => (
        <h1
          className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-white border-b border-orange-500/30 pb-4"
          {...props}
        >
          {children}
        </h1>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      h2: ({ children, ...props }) => (
        <h2
          className="text-2xl md:text-3xl font-bold mt-10 mb-6 text-white"
          {...props}
        >
          {children}
        </h2>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      h3: ({ children, ...props }) => (
        <h3
          className="text-xl md:text-2xl font-bold mt-8 mb-4 text-white"
          {...props}
        >
          {children}
        </h3>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      p: ({ node, children, ...props }) => {
        // 检查段落的子元素是否只包含一个链接，且该链接是视频链接
        if (
          node && 
          'children' in node && 
          Array.isArray(node.children) && 
          node.children.length === 1 && 
          node.children[0]?.type === 'element' && 
          node.children[0]?.tagName === 'a' && 
          node.children[0]?.properties && 
          typeof node.children[0]?.properties?.href === 'string' && 
          isVideoLink(node.children[0]?.properties?.href as string)
        ) {
          const href = node.children[0]?.properties?.href as string;
          const title = node.children[0]?.children?.[0]?.type === 'text' ? 
                      node.children[0]?.children?.[0]?.value || '' : '';
          
          return <VideoEmbed url={href} title={title} />;
        }
        
        return (
          <p
            className="text-white/90 text-lg leading-relaxed my-6"
            {...props}
          >
            {children}
          </p>
        );
      },
      a: CustomLink,
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      li: ({ node, children, ...props }) => {
        // 特殊处理列表项中的链接图标问题
        let hasLinkWithIcon = false;
        let hasSpecialLink = false;
        
        if (node && 'children' in node && Array.isArray(node.children)) {
          // 检查是否有常规链接
          hasLinkWithIcon = node.children.some((child) => 
            child.type === 'element' && 
            child.tagName === 'a' && 
            child.properties && 
            typeof child.properties.href === 'string'
          );
          
          // 检查是否有带🔗符号的特殊链接格式
          hasSpecialLink = node.children.some((child) => 
            child.type === 'text' && 
            typeof child.value === 'string' && 
            child.value.includes('🔗') && 
            child.value.includes('http')
          );
        }
        
        // 如果包含特殊链接格式，需要额外处理
        if (hasSpecialLink) {
          // 找到包含特殊链接的文本节点
          const processedChildren = React.Children.map(children, (child) => {
            if (typeof child === 'string' && child.includes('🔗') && child.includes('http')) {
              return findAndMakeClickable(child);
            }
            return child;
          });
          
          return (
            <li className="my-2 text-white/90 text-lg" {...props}>
              {processedChildren}
            </li>
          );
        }
        
        const className = hasLinkWithIcon ? 
          "my-2 text-white/90 text-lg flex flex-col space-y-2" : 
          "my-2 text-white/90 text-lg";
        
        return (
          <li className={className} {...props}>
            {children}
          </li>
        );
      },
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      strong: ({ children, ...props }) => (
        <strong
          className="text-white font-bold"
          {...props}
        >
          {children}
        </strong>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      em: ({ children, ...props }) => (
        <em
          className="text-white/80 italic"
          {...props}
        >
          {children}
        </em>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      ul: ({ children, ...props }) => (
        <ul
          className="list-disc pl-6 my-6 text-white/90"
          {...props}
        >
          {children}
        </ul>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      ol: ({ children, ...props }) => (
        <ol
          className="list-decimal pl-6 my-6 text-white/90"
          {...props}
        >
          {children}
        </ol>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      img: ({ src, alt, ...props }) => {
        return (
          <div className="my-8 mx-auto relative">
            {src && typeof src === 'string' ? (
              <div className="relative w-full" style={{ maxWidth: '100%', height: 'auto', minHeight: '300px' }}>
                <Image
                  src={src}
                  alt={typeof alt === 'string' ? alt : ''}
                  fill
                  className="rounded-lg shadow-lg object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            ) : (
              // Fallback to regular img if src is not a string
              <Image
                src={src?.toString() || ''}
                alt={typeof alt === 'string' ? alt : ''}
                className="rounded-lg shadow-lg max-w-full mx-auto"
              />
            )}
          </div>
        );
      },
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      hr: ({ ...props }) => (
        <hr
          className="my-10 border-white/10"
          {...props}
        />
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      blockquote: ({ children, ...props }) => (
        <blockquote
          className="border-l-4 border-orange-500 pl-6 py-1 my-8 bg-white/5 rounded-r-lg pr-4 italic text-white/80"
          {...props}
        >
          {children}
        </blockquote>
      ),
      // @ts-ignore react-markdown类型定义不完全兼容，但功能正常
      code: ({ inline, className, children, ...props }) => {
        return inline ? (
          <code
            className="text-orange-300 bg-white/10 px-1 py-0.5 rounded font-mono"
            {...props}
          >
            {children}
          </code>
        ) : (
          <code
            className="block bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto my-8 font-mono text-orange-300"
            {...props}
          >
            {children}
          </code>
        );
      }
    };
    
    return config;
  }, []);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
});

CustomMarkdown.displayName = 'CustomMarkdown';

export default CustomMarkdown;




