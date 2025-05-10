export default function customImageLoader({ src }) {
  // 检查src是否是绝对URL
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // 检查是否在 GitHub Pages 环境中
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  // 如果在GitHub Pages环境中且src是绝对路径，转换为相对路径
  if (isGitHubPages && src.startsWith('/') && !src.startsWith('//')) {
    // 确保路径以./开头，这样在不同域名下都能正确加载
    return src.startsWith('./') ? src : `.${src}`;
  }

  // 其他情况直接返回原始src
  return src;
}
