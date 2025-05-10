const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico'); // 需要安装: npm install to-ico

// 源图片路径
const sourceImagePath = path.join(__dirname, '../src/app/logo.png');
// 输出目录
const outputDir = path.join(__dirname, '../public/favicon');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 要生成的标准尺寸列表
const standardSizes = [16, 32, 48, 64, 128, 192, 256, 384, 512];

// 要生成的额外图标
const specialIcons = [
  { name: 'android-chrome-192x192.png', width: 192, height: 192 },
  { name: 'android-chrome-512x512.png', width: 512, height: 512 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'mstile-150x150.png', width: 150, height: 150 },
];

// 要生成的苹果启动屏尺寸
const appleSplashSizes = [
  { name: 'apple-splash-640-1136.png', width: 640, height: 1136 },
  { name: 'apple-splash-750-1334.png', width: 750, height: 1334 },
  { name: 'apple-splash-1125-2436.png', width: 1125, height: 2436 },
  { name: 'apple-splash-1536-2048.png', width: 1536, height: 2048 },
  { name: 'apple-splash-1668-2388.png', width: 1668, height: 2388 },
  { name: 'apple-splash-2048-2732.png', width: 2048, height: 2732 },
];

// 生成不同尺寸的PNG和favicon.ico
async function generateFavicons() {
  try {
    console.log('开始生成favicon...');
    
    // 读取源图片
    const sourceImage = sharp(sourceImagePath);
    
    // 生成所有标准尺寸的PNG
    const pngPromises = standardSizes.map(async (size) => {
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sourceImage
        .clone()
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`生成了 ${outputPath}`);
      
      // 返回16和32尺寸的Buffer用于生成ico
      if (size === 16 || size === 32) {
        return sharp(outputPath).toBuffer();
      }
    });
    
    // 生成特殊图标
    const specialIconPromises = specialIcons.map(async (icon) => {
      const outputPath = path.join(outputDir, icon.name);
      await sourceImage
        .clone()
        .resize(icon.width, icon.height)
        .png()
        .toFile(outputPath);
      console.log(`生成了 ${outputPath}`);
    });
    
    // 生成苹果启动屏图标
    const appleSplashPromises = appleSplashSizes.map(async (splash) => {
      const outputPath = path.join(outputDir, splash.name);
      
      // 创建一个带背景的画布
      const canvas = Buffer.from(
        `<svg width="${splash.width}" height="${splash.height}" 
         viewBox="0 0 ${splash.width} ${splash.height}" 
         xmlns="http://www.w3.org/2000/svg">
         <rect width="100%" height="100%" fill="#ffffff"/>
         </svg>`
      );
      
      // 计算居中位置，确保logo处于屏幕中央
      const logoSize = Math.min(splash.width, splash.height) * 0.5; // logo尺寸为屏幕较小尺寸的50%
      
      // 使用sharp创建背景
      await sharp(canvas)
        .composite([
          {
            input: await sourceImage
              .clone()
              .resize(Math.round(logoSize), Math.round(logoSize))
              .toBuffer(),
            gravity: 'centre', // 确保logo居中
          }
        ])
        .png()
        .toFile(outputPath);
      
      console.log(`生成了 ${outputPath}`);
    });
    
    // 等待所有PNG生成完成
    const results = await Promise.all([
      ...pngPromises,
      ...specialIconPromises,
      ...appleSplashPromises
    ]);
    
    // 过滤出16和32尺寸的Buffer
    const buffers = results.filter(Boolean);
    
    // 使用to-ico生成favicon.ico
    const icoBuffer = await toIco(buffers);
    
    // 写入favicon.ico
    const faviconPath = path.join(outputDir, 'favicon.ico');
    fs.writeFileSync(faviconPath, icoBuffer);
    console.log(`生成了 ${faviconPath}`);
    
    // 复制favicon.ico到public目录根
    const rootFaviconPath = path.join(__dirname, '../public/favicon.ico');
    fs.copyFileSync(faviconPath, rootFaviconPath);
    console.log(`复制favicon.ico到 ${rootFaviconPath}`);
    
    console.log('所有favicon生成完毕！');
  } catch (error) {
    console.error('生成favicon时出错:', error);
  }
}

generateFavicons(); 