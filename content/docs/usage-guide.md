---
title: 使用指南
tags: [指南, 操作]
---

# Quartz + Obsidian 数字花园使用指南

## 项目结构

```
├── content/           # 内容目录（Obsidian 库）
│   ├── index.md       # 网站首页
│   ├── docs/          # 文档目录
│   ├── tech/          # 技术文章目录
│   └── game/          # 游戏相关目录
├── public/            # 生成的静态网站（由 GitHub Actions 自动生成）
├── quartz/            # Quartz 核心代码
├── quartz.config.ts   # Quartz 配置文件
├── quartz.layout.ts   # 布局配置文件
├── package.json       # 项目依赖
└── README.md          # 项目说明（GitHub 仓库首页）
```

## 核心规则与注意事项 (重要)

### 1. 目录索引文件
每个子目录（如 `docs/`, `tech/`, `game/`）**必须包含一个 `index.md` 文件**。
- **作用**：`index.md` 会被 Quartz 识别为该目录的主页。
- **命名**：请勿使用 `README.md` 作为目录主页，Quartz 4 优先识别 `index.md`。如果使用 `README.md`，可能会导致侧边栏菜单（Explorer）显示不完整或路径错误。
- **示例**：`content/tech/index.md` 的内容将显示在 `yourdomain.com/tech/`。

### 2. 侧边栏菜单显示
侧边栏的 **Explorer** 组件会自动根据 `content/` 目录的结构生成菜单。
- 如果某个文件夹在菜单中不显示，请检查：
  - 该文件夹下是否有 `index.md`。
  - 该文件夹下是否至少有一个普通 Markdown 文件。
  - 文件 Front Matter 中的 `title` 是否已设置。

## 如何与 Obsidian 配合使用

1. **设置 Obsidian 库**：打开 Obsidian，选择“打开文件夹作为库”，然后选择本项目根目录下的 `content` 文件夹。
2. **编辑内容**：在 Obsidian 中创建、移动或编辑 Markdown 文件。
3. **Front Matter**：每个文件开头建议包含元数据：
   ```yaml
   ---
   title: 页面标题
   tags: [标签1, 标签2]
   ---
   ```

## 同步与部署

本项目已配置 GitHub Actions 自动部署。

1. **本地预览** (可选)：
   ```bash
   npx quartz build --serve
   ```
   访问 `http://localhost:8080` 预览。

2. **推送更新**：
   在项目根目录下执行：
   ```bash
   git add .
   git commit -m "更新内容"
   git push
   ```
   推送后，GitHub Actions 会在几分钟内自动构建并发布到 GitHub Pages。

## 常见问题修复记录

### 菜单显示不完整？
**原因**：之前部分目录使用了 `README.md` 而非 `index.md`，导致 Quartz 索引异常。
**修复**：已将所有目录下的 `README.md` 重命名为 `index.md`，并更新了首页链接。请在后续添加新分类时遵循此命名规则。

## 资源
- [Quartz 官方文档](https://quartz.jzhao.xyz/)
- [GitHub Pages 部署状态](https://github.com/anchep/anchep.github.io/actions)