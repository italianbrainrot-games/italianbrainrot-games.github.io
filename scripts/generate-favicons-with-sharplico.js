const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const sharpIco = require('sharp-ico'); // 需要安装: npm install sharp-ico

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

// 生成不同尺寸的PNG和favicon.ico
async function generateFavicons() {
  try {
    console.log('开始生成favicon...');
    
    // 读取源图片
    const sourceImage = sharp(sourceImagePath);
    const sourceBuffer = await sourceImage.toBuffer();
    
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
    
    // 使用sharp-ico生成favicon.ico (包含16x16和32x32两种尺寸)
    const sizes16and32 = [16, 32];
    const icoPath = path.join(outputDir, 'favicon.ico');
    
    // 创建ico转换的设置对象
    const icoOptions = {
      resize: true, // 自动缩放图像
      sizes: sizes16and32 // 仅包含16和32尺寸
    };
    
    // 调用sharp-ico库创建ico文件
    try {
      await sharpIco.sharplico(sourceBuffer, icoPath, icoOptions);
      console.log(`生成了 ${icoPath}`);
    } catch (error) {
      console.error('生成favicon.ico时出错:', error);
      console.log('请安装sharp-ico: npm install sharp-ico');
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