'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function GitHubPagesImage(props) {
  const pathname = usePathname();

  // 检查是否在 GitHub Pages 环境中
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? '/italianbrainrot.github.io' : '';

  // 处理src属性
  let src = props.src;

  // 如果src不是绝对URL且不以basePath开头，并且我们在GitHub Pages环境中，则添加basePath
  if (isGitHubPages && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith(basePath)) {
    src = `${basePath}${src}`;
  }

  // 返回带有修改后src的Image组件
  return <Image {...props} src={src} />;
}
