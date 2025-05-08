const fs = require('fs');
const path = require('path');

// 检查是否使用自定义域名
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

// 基础路径
const basePath = isCustomDomain ? '' : '/italianbrainrot.github.io';

// 递归遍历目录
function traverseDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 递归处理子目录
      traverseDirectory(fullPath);
    } else if (file.endsWith('.html')) {
      // 处理HTML文件
      fixHtmlFile(fullPath);
    }
  }
}

// 修复HTML文件中的路径
function fixHtmlFile(filePath) {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');

  // 修复图片和资源路径
  if (isCustomDomain) {
    // 对于自定义域名，我们需要移除所有的 /italianbrainrot.github.io 前缀
    content = content.replace(/src="\/italianbrainrot\.github\.io\//g, 'src="/');
    content = content.replace(/href="\/italianbrainrot\.github\.io\//g, 'href="/');
  } else {
    // 对于GitHub Pages默认域名，我们需要添加 /italianbrainrot.github.io 前缀
    content = content.replace(/src="\/(?!italianbrainrot\.github\.io\/|http|\/)/g, `src="${basePath}/`);
    content = content.replace(/href="\/(?!italianbrainrot\.github\.io\/|http|\/)/g, `href="${basePath}/`);
  }

  // 写回文件
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

// 开始处理
console.log('Starting to fix HTML paths...');
traverseDirectory('./out');
console.log('All HTML paths fixed!');
