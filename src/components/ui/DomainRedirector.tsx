'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getSiteInfo } from '@/lib/site-config';

/**
 * 此组件用于处理域名重定向
 * 如果用户访问的不是规范URL域名，会重定向到规范URL
 * 注意：仅在开发者需要强制使用规范URL时启用此功能
 */
export default function DomainRedirector({ enabled = false }) {
  const pathname = usePathname();
  const siteInfo = getSiteInfo();

  useEffect(() => {
    // 如果功能被禁用，则不执行任何操作
    if (!enabled) return;

    // 仅在浏览器环境中执行
    if (typeof window === 'undefined') return;

    // 获取当前URL和规范URL
    const currentHostname = window.location.hostname;
    const canonicalHostname = new URL(siteInfo.url).hostname;

    // 如果当前域名不是规范域名，则重定向
    if (currentHostname !== canonicalHostname) {
      const targetUrl = `${siteInfo.url}${pathname}`;
      window.location.replace(targetUrl);
    }
  }, [pathname, siteInfo.url, enabled]);

  // 此组件不渲染任何内容
  return null;
} 