/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
const CustomMarkdown: React.FC<CustomMarkdownProps> = ({ content }) => {
  // 使用useMemo来缓存组件配置，避免每次渲染都重新创建
  const components = useMemo(() => {
    const markdownComponents: Components = {
      // 处理标题
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold mt-6 mb-4 text-white">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold mt-4 mb-3 text-white">{children}</h3>
      ),
      
      // 段落
      p: ({ children }) => {
        // @ts-ignore
        const childrenArray = React.Children.toArray(children);
        
        // 检查是否为单个图片，如果是则不添加段落样式
        if (childrenArray.length === 1 && React.isValidElement(childrenArray[0]) && 
            // @ts-ignore
            (childrenArray[0].type === 'img' || childrenArray[0].props?.node?.tagName === 'img')) {
          return <>{children}</>;
        }
        
        return (
          <p className="my-4 leading-relaxed text-base md:text-lg text-gray-100">
            {/* 处理可能包含的链接，例如带有🔗符号的文本 */}
            {typeof children === 'string' ? findAndMakeClickable(children) : children}
          </p>
        );
      },
      
      // 列表项
      li: ({ children }) => (
        <li className="my-1 ml-2">{children}</li>
      ),
      
      // 强调
      strong: ({ children }) => (
        <strong className="font-bold text-orange-300">{children}</strong>
      ),
      
      em: ({ children }) => (
        <em className="italic text-orange-200">{children}</em>
      ),
      
      // 列表
      ul: ({ children }) => (
        <ul className="list-disc pl-6 my-4 text-gray-100">{children}</ul>
      ),
      
      ol: ({ children }) => (
        <ol className="list-decimal pl-6 my-4 text-gray-100">{children}</ol>
      ),
      
      // 图片处理
      // @ts-ignore
      img: ({ src, alt }) => {
        if (!src) return null;
        
        return (
          <div className="my-8 flex justify-center">
            <div className="relative max-w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={typeof src === 'string' ? src : ''}
                alt={alt || '博客图片'}
                width={800}
                height={450}
                className="w-full h-auto"
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
              />
            </div>
          </div>
        );
      },
      
      // 水平线
      hr: () => <hr className="my-8 border-gray-700" />,
      
      // 引用块
      blockquote: ({ children }) => (
        <blockquote className="pl-4 my-4 border-l-4 border-orange-500 text-gray-300 italic">
          {children}
        </blockquote>
      ),
      
      // 代码块
      // @ts-ignore
      code: ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';
        
        if (!inline) {
          // 代码块
          return (
            <div className="my-6 overflow-hidden rounded-lg bg-gray-900 shadow-lg">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <span className="text-sm font-medium text-gray-300">
                  {language || 'Code'}
                </span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className={`language-${language || 'text'} text-sm`} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          );
        }
        
        // 内联代码
        return (
          <code 
            className="px-1.5 py-0.5 mx-0.5 rounded bg-gray-800 text-orange-300 font-mono text-sm" 
            {...props}
          >
            {children}
          </code>
        );
      },
      
      // 处理链接
      a: CustomLink,
    };
  
    return markdownComponents;
  }, []);

  // 渲染Markdown内容
  return (
    <div className="prose-dark prose-lg max-w-none">
      {/* @ts-ignore */}
      <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default CustomMarkdown;




