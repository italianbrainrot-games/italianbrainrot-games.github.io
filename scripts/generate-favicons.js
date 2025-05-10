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
    console.log('开始生成favicon...');
    
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
    
    // 生成favicon.ico (包含16x16和32x32两种尺寸)
    const faviconPath = path.join(outputDir, 'favicon.ico');
    
    // 创建16x16的PNG作为临时文件
    const temp16Path = path.join(outputDir, 'temp-16.png');
    const temp32Path = path.join(outputDir, 'temp-32.png');
    
    await sourceImage.clone().resize(16, 16).png().toFile(temp16Path);
    await sourceImage.clone().resize(32, 32).png().toFile(temp32Path);
    
    // 使用sharp来创建ico文件 (favicon.ico)
    // 由于sharp不直接支持.ico格式，我们用另一种方式
    const { execSync } = require('child_process');
    try {
      // 如果已安装了imagemagick，可以使用如下命令
      execSync(`magick convert ${temp16Path} ${temp32Path} ${faviconPath}`);
      console.log(`生成了 ${faviconPath}`);
    } catch (error) {
      console.log('未能创建favicon.ico文件，可能需要安装ImageMagick');
      console.log('请使用下面的命令生成favicon.ico:');
      console.log(`magick convert ${temp16Path} ${temp32Path} ${faviconPath}`);
    }
    
    // 等待所有PNG生成完成
    await Promise.all(pngPromises);
    
    // 清理临时文件
    try {
      fs.unlinkSync(temp16Path);
      fs.unlinkSync(temp32Path);
    } catch (e) {
      // 忽略删除临时文件的错误
    }
    
    // 生成apple-touch-icon.png (180x180)
    const appleTouchIconPath = path.join(outputDir, 'apple-touch-icon.png');
    await sourceImage
      .clone()
      .resize(180, 180)
      .png()
      .toFile(appleTouchIconPath);
    console.log(`生成了 ${appleTouchIconPath}`);
    
    console.log('所有favicon生成完毕！');
  } catch (error) {
    console.error('生成favicon时出错:', error);
  }
}

generateFavicons(); 