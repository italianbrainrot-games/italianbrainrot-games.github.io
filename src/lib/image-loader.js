export default function customImageLoader({ src }) {
  // 检查src是否是绝对URL
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // 检查是否在开发环境中
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 检查是否在 GitHub Pages 环境中
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  // 根据环境设置basePath
  const basePath = isGitHubPages ? '/italianbrainrot.github.io' : '';

  // 如果在开发环境中或不是GitHub Pages环境，直接返回原始src
  if (isDevelopment || !isGitHubPages) {
    return src;
  }

  // 检查src是否已经包含basePath
  if (src.startsWith(basePath)) {
    return src;
  }

  // 添加basePath到src
  return `${basePath}${src}`;
}
