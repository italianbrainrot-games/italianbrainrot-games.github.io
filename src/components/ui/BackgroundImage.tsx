'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundImage() {
  const pathname = usePathname();

  useEffect(() => {
    // 检查是否在 GitHub Pages 环境中
    const isGitHubPages = window.location.hostname.includes('github.io');
    // 检查是否在开发环境中 - 开发环境使用相对路径
    const isDevelopment = process.env.NODE_ENV === 'development';

    // 设置正确的背景图片路径
    let bgImagePath = '/bg-body.png';

    if (isGitHubPages) {
      bgImagePath = '/italianbrainrot.github.io/bg-body.png';
    } else if (isDevelopment) {
      // 在开发环境中，尝试使用相对路径
      bgImagePath = 'bg-body.png';
    }

    // 尝试加载图片，如果失败则尝试其他路径
    const testImage = new Image();
    testImage.onerror = () => {
      console.warn(`Failed to load background image from ${bgImagePath}, trying alternative path`);
      // 尝试相对路径
      const altPath = 'bg-body.png';
      document.body.style.backgroundImage = `url(${altPath})`;
    };
    testImage.onload = () => {
      // 图片加载成功，应用背景
      document.body.style.backgroundImage = `url(${bgImagePath})`;
    };
    testImage.src = bgImagePath;

    // 设置其他背景属性
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = 'auto';
    document.body.style.backgroundAttachment = 'fixed';
  }, [pathname]);

  return null;
}
