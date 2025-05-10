# Favicon 生成脚本

这个目录包含了使用Sharp库从源logo生成各种尺寸favicon的脚本。

## 可用脚本

### 1. generate-favicons.js

这个脚本使用Sharp生成PNG图标，并尝试使用ImageMagick生成favicon.ico文件。
如果您的系统上安装了ImageMagick，它将完全工作。

```bash
npm run generate-favicons
```

### 2. generate-favicons-pure-js.js

这个脚本使用Sharp生成PNG图标，并使用to-ico库生成favicon.ico文件。
这个方法不依赖于外部命令，但需要额外安装to-ico库。

```bash
# 首先安装依赖
npm install to-ico

# 然后运行脚本
npm run generate-favicons-js
```

### 3. generate-png-favicons.js

这个脚本只生成PNG格式的favicon图标，不生成.ico文件。它只依赖于Sharp库。

```bash
npm run generate-png-favicons
```

### 4. generate-favicons-with-sharplico.js

这个脚本使用Sharp生成PNG图标，并使用sharp-ico库生成favicon.ico文件。

```bash
# 首先安装依赖
npm install sharp-ico

# 然后手动运行脚本
node scripts/generate-favicons-with-sharplico.js
```

## 生成的图标

所有脚本都会在`public/favicon`目录中生成以下文件：

- favicon-16x16.png
- favicon-32x32.png 
- favicon-48x48.png
- favicon-64x64.png
- favicon-128x128.png
- favicon-192x192.png
- favicon-256x256.png
- favicon-384x384.png
- favicon-512x512.png
- apple-touch-icon.png (180x180)
- favicon.ico (包含16x16和32x32尺寸的图标，除了generate-png-favicons.js)

## 源图像

所有脚本都使用`src/app/logo.png`作为源图像。 