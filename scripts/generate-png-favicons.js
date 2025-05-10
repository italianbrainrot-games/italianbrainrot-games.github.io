const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 源图片路径
const sourceImagePath = path.join(__dirname, '../src/app/logo.png');
// 输出目录
const outputDir = path.join(__dirname, '../public/favicon');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 要生成的尺寸列表
const sizes = [16, 32, 48, 64, 128, 192, 256, 384, 512];

// 生成不同尺寸的PNG
async function generateFavicons() {
  try {
    console.log('开始生成favicon PNG...');
    
    // 读取源图片
    const sourceImage = sharp(sourceImagePath);
    
    // 生成所有尺寸的PNG
    const pngPromises = sizes.map(async (size) => {
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sourceImage
        .clone()
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`生成了 ${outputPath}`);
    });
    
    // 等待所有PNG生成完成
    await Promise.all(pngPromises);
    
    // 生成apple-touch-icon.png (180x180)
    const appleTouchIconPath = path.join(outputDir, 'apple-touch-icon.png');
    await sourceImage
      .clone()
      .resize(180, 180)
      .png()
      .toFile(appleTouchIconPath);
    console.log(`生成了 ${appleTouchIconPath}`);
    
    console.log('所有favicon PNG生成完毕！');
    console.log('注意：此脚本不生成favicon.ico文件，只生成PNG格式图标');
  } catch (error) {
    console.error('生成favicon时出错:', error);
  }
}

generateFavicons(); 