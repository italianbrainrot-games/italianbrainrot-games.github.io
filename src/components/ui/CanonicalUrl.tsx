'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getSiteInfo } from '@/lib/site-config';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const siteInfo = getSiteInfo();
  const [canonicalUrl, setCanonicalUrl] = useState('');

  useEffect(() => {
    // 构建规范URL - 使用配置文件中的URL作为基础，并添加当前路径
    const baseUrl = siteInfo.url;
    const path = pathname || '';
    // 移除URL末尾的斜杠以避免重复
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    // 确保路径以斜杠开头
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    setCanonicalUrl(`${formattedBaseUrl}${formattedPath}`);
  }, [pathname, siteInfo.url]);

  // 如果在服务器端或者还没有计算出规范URL，则不渲染任何内容
  if (!canonicalUrl) {
    return null;
  }

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
} 