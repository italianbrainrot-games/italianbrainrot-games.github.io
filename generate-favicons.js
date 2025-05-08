const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 确保目标目录存在
const faviconDir = path.join(__dirname, 'public', 'favicon');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// 源图像路径
const sourceIcon = path.join(__dirname, 'src', 'app', 'logo.png');

// 定义需要生成的图像尺寸
const sizes = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'android-chrome-192x192.png', width: 192, height: 192 },
  { name: 'android-chrome-512x512.png', width: 512, height: 512 },
  { name: 'mstile-150x150.png', width: 150, height: 150 },
];

// 定义iOS启动屏幕尺寸
const iosSplashScreens = [
  { name: 'apple-splash-2048-2732.png', width: 2048, height: 2732 }, // iPad Pro 12.9"
  { name: 'apple-splash-1668-2388.png', width: 1668, height: 2388 }, // iPad Pro 11"
  { name: 'apple-splash-1536-2048.png', width: 1536, height: 2048 }, // iPad Air, iPad Mini
  { name: 'apple-splash-1125-2436.png', width: 1125, height: 2436 }, // iPhone X/XS
  { name: 'apple-splash-750-1334.png', width: 750, height: 1334 },   // iPhone 8, 7, 6s, 6
  { name: 'apple-splash-640-1136.png', width: 640, height: 1136 },   // iPhone 5
];

// 生成不同尺寸的图像
async function generateFavicons() {
  try {
    // 读取源图像
    const sourceBuffer = fs.readFileSync(sourceIcon);

    // 使用sharp处理ICO文件
    const image = sharp(sourceBuffer, { page: 0 });

    // 生成各种尺寸的图像
    for (const size of sizes) {
      const outputPath = path.join(faviconDir, size.name);
      await image
        .resize(size.width, size.height)
        .png()
        .toFile(outputPath);

      console.log(`Generated ${size.name} (${size.width}x${size.height})`);
    }

    // 生成iOS启动屏幕图像
    for (const screen of iosSplashScreens) {
      const outputPath = path.join(faviconDir, screen.name);

      // 创建一个新的黑色背景图像
      const splashImage = sharp({
        create: {
          width: screen.width,
          height: screen.height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 1 }
        }
      });

      // 调整logo大小
      const logoWidth = Math.floor(screen.width * 0.5);
      const resizedLogo = await image
        .clone()
        .resize(logoWidth)
        .toBuffer();

      // 获取调整后的logo尺寸
      const logoMetadata = await sharp(resizedLogo).metadata();

      // 计算logo在屏幕上的位置（居中）
      const x = Math.floor((screen.width - logoMetadata.width) / 2);
      const y = Math.floor((screen.height - logoMetadata.height) / 2);

      // 将logo合成到背景上
      await splashImage
        .composite([
          {
            input: resizedLogo,
            top: y,
            left: x
          }
        ])
        .png()
        .toFile(outputPath);

      console.log(`Generated iOS splash screen ${screen.name} (${screen.width}x${screen.height})`);
    }

    console.log('All favicons and splash screens generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

generateFavicons();
