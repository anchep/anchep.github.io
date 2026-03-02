---
title: 使用指南
tags: [指南, 操作]
---

# Quartz + Obsidian 数字花园使用指南

## 项目结构

```
├── content/           # 内容目录（Obsidian库）
│   ├── index.md       # 首页
│   ├── docs/          # 文档目录
│   └── ...            # 其他内容目录
├── public/            # 生成的静态网站
├── quartz/            # Quartz核心代码
├── quartz.config.ts   # Quartz配置文件
├── quartz.layout.ts   # 布局配置文件
├── package.json       # 项目依赖
└── README.md          # 项目说明
```

## 核心目录说明

### content/ 目录
- **用途**：存放所有Markdown内容，是Obsidian库的根目录
- **结构**：可以按照任意目录结构组织内容
- **文件**：所有Markdown文件都会被Quartz处理并生成对应的网页

### public/ 目录
- **用途**：Quartz生成的静态网站文件
- **自动生成**：每次运行`build`命令时自动生成
- **无需修改**：不要手动修改此目录中的文件

### quartz/ 目录
- **用途**：Quartz的核心代码
- **无需修改**：除非你需要定制Quartz的功能

## 如何与Obsidian配合使用

### 1. 设置Obsidian库

1. **打开Obsidian**
2. **创建新库**：点击"打开文件夹作为库"
3. **选择目录**：选择`content`目录
4. **确认**：点击"打开"

### 2. 在Obsidian中编辑内容

- **创建新笔记**：在Obsidian中创建新的Markdown文件
- **组织内容**：使用Obsidian的文件夹和标签功能组织内容
- **添加链接**：使用Obsidian的链接功能创建笔记之间的连接
- **使用标签**：为笔记添加标签，Quartz会自动生成标签页

### 3. 同步内容到网站

当你在Obsidian中编辑内容后，需要将更改同步到网站：

1. **保存Obsidian中的更改**
2. **打开终端**：在项目根目录打开终端
3. **运行构建命令**：
   ```bash
   node quartz/bootstrap-cli.mjs build
   ```
4. **预览更改**：运行以下命令启动本地服务器：
   ```bash
   node quartz/bootstrap-cli.mjs build --serve
   ```
5. **访问**：打开浏览器访问 http://localhost:8080

## 内容管理

### 添加新内容

1. **在Obsidian中创建新笔记**
2. **添加Front Matter**：在文件开头添加元数据，例如：
   ```yaml
   ---
title: 文章标题
tags: [标签1, 标签2]
date: 2026-03-02
---
   ```
3. **编写内容**：使用Markdown语法编写内容
4. **保存文件**：Obsidian会自动保存到`content`目录

### 组织内容

- **使用文件夹**：在Obsidian中创建文件夹来组织内容
- **使用标签**：为内容添加标签，Quartz会自动生成标签云
- **使用链接**：创建笔记之间的链接，形成知识网络

### 常用Markdown语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

- 无序列表项
- 无序列表项

1. 有序列表项
2. 有序列表项

[链接文本](https://example.com)

![图片描述](image.jpg)

> 引用文本

```代码块
const hello = "world";
```
```

## 部署到GitHub Pages

### 1. 配置GitHub仓库

1. **创建GitHub仓库**：如果还没有仓库，创建一个新的仓库
2. **设置GitHub Pages**：
   - 进入仓库设置
   - 找到"Pages"选项
   - 选择分支：`main`
   - 选择目录：`/ (root)`
   - 保存设置

### 2. 部署流程

1. **构建网站**：
   ```bash
   node quartz/bootstrap-cli.mjs build
   ```
2. **添加更改**：
   ```bash
   git add .
   ```
3. **提交更改**：
   ```bash
   git commit -m "更新内容"
   ```
4. **推送更改**：
   ```bash
   git push
   ```
5. **等待构建**：GitHub Pages会自动构建和部署网站
6. **访问网站**：访问 `https://username.github.io`（替换为你的GitHub用户名）

## 常用命令

### 构建网站
```bash
node quartz/bootstrap-cli.mjs build
```

### 启动本地服务器（实时预览）
```bash
node quartz/bootstrap-cli.mjs build --serve
```

### 清理生成的文件
```bash
node quartz/bootstrap-cli.mjs clean
```

## 定制配置

### 修改网站配置
编辑 `quartz.config.ts` 文件，可以修改：
- 网站标题和描述
- 导航菜单
- 主题设置
- 插件配置

### 修改布局
编辑 `quartz.layout.ts` 文件，可以修改：
- 页面布局
- 组件位置
- 侧边栏设置

## 常见问题

### 1. 网站没有更新
- **检查**：确认已经运行了 `build` 命令
- **检查**：确认已经推送到GitHub
- **等待**：GitHub Pages构建可能需要几分钟时间

### 2. 本地服务器无法启动
- **检查**：确认Node.js版本 >= 22
- **检查**：确认依赖已经安装（运行 `npm install`）
- **检查**：确认端口8080没有被占用

### 3. 内容没有显示
- **检查**：确认文件在 `content` 目录中
- **检查**：确认文件是Markdown格式（.md后缀）
- **检查**：确认文件有正确的Front Matter

## 最佳实践

1. **定期备份**：使用Git版本控制，定期提交更改
2. **组织良好**：使用文件夹和标签合理组织内容
3. **保持更新**：定期添加新内容，保持数字花园的活力
4. **使用链接**：创建笔记之间的链接，形成知识网络
5. **预览更改**：在部署前使用本地服务器预览更改

## 资源

- [Quartz官方文档](https://quartz.jzhao.xyz/)
- [Obsidian官方文档](https://help.obsidian.md/)
- [GitHub Pages文档](https://docs.github.com/en/pages)