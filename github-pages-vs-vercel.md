# GitHub Pages 与 Vercel 部署对比及项目部署方案

## GitHub Pages 与 Vercel 的区别

### 1. 部署流程差异

#### GitHub Pages
- **静态站点托管**：只支持静态内容（HTML、CSS、JavaScript）
- **构建限制**：仅支持简单的Jekyll构建或预构建的静态文件
- **部署流程**：需手动配置，通常通过gh-pages分支或Actions工作流
- **自定义域**：支持但配置相对复杂
- **部署频率**：适合更新频率较低的项目
- **CDN**：基本的GitHub CDN支持

#### Vercel
- **全栈部署**：支持静态内容和serverless函数
- **构建检测**：自动检测并优化流行框架（Next.js、React等）
- **部署流程**：一键连接仓库，自动部署
- **自动预览**：每个PR自动生成预览环境
- **集成功能**：内置分析、性能监控、A/B测试等
- **全球CDN**：高性能边缘网络

### 2. Next.js项目支持

#### GitHub Pages
- **需要特别配置**：Next.js需要额外配置才能在GitHub Pages上工作
- **SSR限制**：不支持服务器端渲染功能，只能使用静态导出
- **API路由**：不支持Next.js的API路由功能
- **图像优化**：Next.js的图像优化功能受限

#### Vercel
- **原生支持**：由Vercel开发Next.js，提供最佳支持
- **全功能支持**：支持SSR、ISR、API路由等所有Next.js特性
- **零配置**：自动检测Next.js项目并应用最佳实践
- **增量静态再生**：支持ISR功能，静态内容可按需更新

### 3. 性能和扩展性

#### GitHub Pages
- **基本缓存**：提供基础CDN，但缓存控制有限
- **无扩展函数**：无法运行后端逻辑
- **限制**：带宽和存储空间有一定限制
- **CI/CD**：需结合GitHub Actions自行实现

#### Vercel
- **智能缓存**：先进的缓存策略和失效控制
- **自动扩展**：无需配置即可处理流量峰值
- **边缘函数**：支持在CDN边缘执行代码
- **集成CI/CD**：全自动部署流程

## 本项目GitHub Pages部署配置

本项目采用了GitHub Pages进行部署，通过以下配置实现：

### 1. Next.js配置（next.config.js）

```javascript
// 检测是否在GitHub Pages环境
const isGithubPages = process.env.GITHUB_ACTIONS || process.env.NODE_ENV === 'production';

// 设置GitHub Pages的资源前缀和基础路径
let assetPrefix = '';
let basePath = '';

if (isGithubPages) {
  // 针对GitHub Pages部署在italianbrainrot-games.github.io
  // 由于部署在根域名，不需要仓库特定路径
  assetPrefix = '/';
  basePath = '';
}

const nextConfig = {
  assetPrefix,
  basePath,
  output: 'export', // 关键配置：生成静态HTML导出
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true, // 图像不优化，适应静态部署
  },
  // 确保尾部斜杠以获得更好的资源路径解析
  trailingSlash: true,
};
```

### 2. 部署脚本（package.json）

项目使用`gh-pages`包管理部署流程：

```json
"scripts": {
  "predeploy": "next build && touch out/.nojekyll",
  "deploy": "gh-pages -d out --dotfiles"
}
```

部署过程包含以下步骤：

1. **预部署阶段**：
   - 执行`next build`生成静态导出文件
   - 创建`.nojekyll`文件禁用GitHub Pages的Jekyll处理

2. **部署阶段**：
   - 使用`gh-pages`工具将`out`目录内容部署到GitHub Pages
   - `--dotfiles`参数确保包含以点开头的文件（如`.nojekyll`）

### 3. Next.js静态导出适配

为适配GitHub Pages静态托管特性，项目做了以下Next.js调整：

1. **静态导出**：设置`output: 'export'`生成纯静态HTML文件
2. **图像处理**：配置`unoptimized: true`关闭Next.js图像优化
3. **路径处理**：设置`trailingSlash: true`确保正确的资源引用

### 4. 部署限制与解决方案

由于GitHub Pages限制，本项目：

1. **不使用SSR**：完全使用静态生成（SSG）
2. **无API路由**：不能使用Next.js的API Routes功能
3. **手动部署**：需执行`npm run deploy`触发部署流程
4. **图像优化**：必须在构建时处理图像优化，而非使用Next.js的动态优化

## 部署到GitHub Pages根域名（username.github.io）

如果您想将Next.js项目部署到GitHub Pages的根域名（例如`xxxx-games.github.io`），而非项目子目录，请按照以下步骤操作：

### 1. 创建特殊命名的仓库

GitHub Pages有一个特殊规则：如果您创建一个名为`<username>.github.io`的仓库，它将自动发布到根域名。

步骤如下：
1. 登录GitHub账户（如`xxxx-games`）
2. 创建一个新仓库，命名为`xxxx-games.github.io`（严格匹配您的用户名）
3. 初始化仓库并推送您的Next.js项目代码

### 2. 配置Next.js项目

对于根域名部署，Next.js配置需要特别注意：

```javascript
// next.config.js
const nextConfig = {
  // 根域名部署时，basePath应为空
  basePath: '',
  // 根域名部署时，assetPrefix通常可以为空或'/'
  assetPrefix: '/',
  output: 'export',
  images: {
    // 必要的图像配置
    unoptimized: true,
    // 其他图像配置...
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### 3. 部署方式选择

有两种主要部署方式：

#### 方式1：使用gh-pages包（推荐）

1. 安装gh-pages：
   ```bash
   npm install --save-dev gh-pages
   ```

2. 在package.json中添加部署脚本：
   ```json
   "scripts": {
     "predeploy": "next build && touch out/.nojekyll",
     "deploy": "gh-pages -d out --dotfiles"
   }
   ```

3. 执行部署命令：
   ```bash
   npm run deploy
   ```

这将自动构建项目并将`out`目录的内容推送到`gh-pages`分支。

#### 方式2：直接推送到main分支

对于用户名仓库（`<username>.github.io`），也可以直接从main分支发布：

1. 在GitHub仓库设置中，转到Pages设置
2. 选择从"main"分支构建
3. 确保网站目录设置正确（通常是`/`或`/docs`）

### 4. 配置GitHub Pages设置

无论采用哪种方式，都需要在GitHub仓库设置中进行配置：

1. 转到仓库设置：`Settings > Pages`
2. 确认Source分支（取决于您的部署方式）：
   - 使用gh-pages包：选择`gh-pages`分支
   - 直接推送：选择`main`分支
3. 确保构建目录正确设置

### 5. .nojekyll文件

创建一个名为`.nojekyll`的空文件添加到您的输出目录，以防止GitHub Pages使用Jekyll处理您的站点：

```bash
touch out/.nojekyll
```

确保您的部署脚本包含`--dotfiles`参数，以便包含这类隐藏文件。

### 6. 自定义域名（可选）

如果想使用自定义域名而非`xxxx-games.github.io`：

1. 在DNS提供商处添加CNAME记录，指向`xxxx-games.github.io`
2. 在GitHub Pages设置中添加自定义域名
3. 勾选"Enforce HTTPS"选项（推荐）
4. 在项目输出目录中创建`CNAME`文件，内容为您的自定义域名

### 7. 验证部署

部署完成后：

1. 访问`https://xxxx-games.github.io`确认站点是否正常运行
2. 检查控制台是否有资源加载错误（可能表明路径配置问题）
3. 测试站内链接和导航是否正常工作

## 部署到非根域名（username.github.io/project-name）

如果您想将Next.js项目部署到GitHub Pages的非根域名（例如`xxxx-games.github.io/game-project`），需要进行特定的配置调整，这种情况更为常见，也需要更多的路径配置。

### 1. 仓库设置

非根域名部署通常使用普通命名的仓库：

1. 创建一个常规命名的仓库（例如`game-project`）
2. 推送Next.js项目代码到该仓库
3. 该项目将自动发布在`xxxx-games.github.io/game-project`路径下

### 2. Next.js项目特殊配置

对于**非根域名部署**，Next.js配置需要特别注意以下内容：

```javascript
// next.config.js
const repoName = 'game-project'; // 替换为您的仓库名称

const nextConfig = {
  // 关键区别：设置basePath为仓库名称
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  
  // 设置资源前缀
  assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
  
  // 静态导出
  output: 'export',
  
  // 图像配置
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  
  // 确保尾部斜杠（对非根域名部署尤为重要）
  trailingSlash: true,
};

module.exports = nextConfig;
```

### 3. 路径处理的关键点

非根域名部署最关键的是正确处理路径：

1. **设置正确的basePath**：必须与仓库名称完全一致
2. **调整内部链接**：所有应用内链接要考虑basePath
3. **静态资源路径**：确保所有静态资源正确引用

例如，在组件中使用Next.js的Link组件：

```jsx
import Link from 'next/link';

// 正确的做法：Next.js会自动处理basePath
<Link href="/about">关于我们</Link>

// 图片引用也需注意
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={100} height={50} />
```

### 4. 部署过程

非根域名部署的过程与根域名类似，但脚本需要调整：

```json
"scripts": {
  "predeploy": "next build && touch out/.nojekyll",
  "deploy": "gh-pages -d out --dotfiles"
}
```

执行`npm run deploy`会将构建文件推送到gh-pages分支。

### 5. 部署配置常见问题及解决方案

#### 1. 资源404错误

如果部署后发现资源404，请检查：

```javascript
// 确认basePath和assetPrefix配置正确
basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
assetPrefix: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '',
```

#### 2. 图片加载问题

对于Next.js的Image组件，确保配置：

```javascript
images: {
  unoptimized: true, // 必须设置为true
}
```

#### 3. 路由问题

如果出现路由问题，检查：

```javascript
// 确保开启trailingSlash
trailingSlash: true,
```

#### 4. 本地开发与生产环境差异

使用条件配置，让开发和生产环境有不同的设置：

```javascript
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? `/${repoName}` : '';
const assetPrefix = isProd ? `/${repoName}/` : '';
```

### 6. 自动化部署（可选）

对于非根域名部署，可以使用GitHub Actions自动化部署流程：

1. 创建`.github/workflows/deploy.yml`文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: out
          clean: true
```

2. 推送到GitHub后，Actions会自动构建并部署项目

### 7. 与根域名部署的对比

| 特性 | 根域名部署 | 非根域名部署 |
|------|-----------|------------|
| URL | `xxxx-games.github.io` | `xxxx-games.github.io/project-name` |
| 仓库名 | 必须是`xxxx-games.github.io` | 可以是任意名称 |
| 配置复杂度 | 较简单 | 需要额外的路径配置 |
| basePath设置 | 空字符串 | 必须是`/仓库名` |
| 多项目部署 | 一个账户只能有一个 | 一个账户可以有多个 |

## 总结

本项目选择GitHub Pages作为部署方案，主要考虑其对静态内容的良好支持及与GitHub仓库的无缝集成。尽管Vercel提供更多Next.js原生功能，但对于纯静态展示型网站，GitHub Pages仍是一个高效、简单的选择。

如需项目完整功能支持（如SSR、API路由等），迁移到Vercel将是更合适的选择。

采用根域名部署（`xxxx-games.github.io`）能为用户提供更简洁的URL，提高品牌辨识度，并且简化路径配置，避免子目录部署可能带来的路径问题。无论您选择哪种部署方式，确保正确配置Next.js的静态导出选项以确保最佳兼容性。

而非根域名部署（`xxxx-games.github.io/project-name`）则更灵活，允许一个GitHub账户部署多个项目，但需要更仔细地配置路径以确保资源正确加载和链接正确跳转。 