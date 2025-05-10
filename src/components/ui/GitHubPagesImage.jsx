'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function GitHubPagesImage(props) {
  const pathname = usePathname();

  // 处理src属性
  let src = props.src;

  // 检查是否在 GitHub Pages 环境中
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  // 如果src是绝对路径但不是绝对URL，并且我们在GitHub Pages环境中，则转换为相对路径
  if (isGitHubPages && src.startsWith('/') && !src.startsWith('//') && !src.startsWith('http')) {
    // 将绝对路径转换为相对路径，确保在不同域名下都能正确加载
    src = src.startsWith('./') ? src : `.${src}`;
  }

  // 返回带有修改后src的Image组件
  return <Image {...props} src={src} />;
}
