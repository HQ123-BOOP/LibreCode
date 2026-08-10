<p align="center">开源的 AI Coding Agent。</p>
<p align="center">
  <a href="https://github.com/HQ123-BOOP/LibreCode/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/HQ123-BOOP/LibreCode?style=flat-square" /></a>
  <a href="https://github.com/HQ123-BOOP/LibreCode/releases"><img alt="Releases" src="https://img.shields.io/github/v/release/HQ123-BOOP/LibreCode?style=flat-square" /></a>
  <a href="https://github.com/HQ123-BOOP/LibreCode/actions/workflows/release.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/HQ123-BOOP/LibreCode/release.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![LibreCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/HQ123-BOOP/LibreCode)

---

### 安装

```bash
# 直接安装 (YOLO)
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# 软件包管理器









```

> [!TIP]
> 安装前请先移除 0.1.x 之前的旧版本。

### 桌面应用

LibreCode 也提供桌面应用。可从[发布页](https://github.com/HQ123-BOOP/LibreCode/releases)下载安装包(`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`)。

自行构建桌面应用:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

产物输出到 `packages/desktop/dist`。

#### 移动应用

LibreCode 也提供 Android 应用。可从[发布页](https://github.com/HQ123-BOOP/LibreCode/releases)下载 APK。应用通过局域网或 Tailscale 连接电脑上的 `librecode serve`,并支持 TUI 中 `/mobile devices` 命令的二维码配对。

#### 安装目录

安装脚本按照以下优先级决定安装路径：

1. `$OPENCODE_INSTALL_DIR` - 自定义安装目录
2. `$XDG_BIN_DIR` - 符合 XDG 基础目录规范的路径
3. `$HOME/bin` - 如果存在或可创建的用户二进制目录
4. `$HOME/.opencode/bin` - 默认备用路径

```bash
# 示例
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agents

OpenCode 内置两种 Agent，可用 `Tab` 键快速切换：

- **build** - 默认模式，具备完整权限，适合开发工作
- **plan** - 只读模式，适合代码分析与探索
  - 默认拒绝修改文件
  - 运行 bash 命令前会询问
  - 便于探索未知代码库或规划改动

另外还包含一个 **general** 子 Agent，用于复杂搜索和多步任务，内部使用，也可在消息中输入 `@general` 调用。

了解更多 [Agents](https://opencode.ai/docs/agents) 相关信息。


**LibreCode 是 OpenCode 的分支。本项目并非由 OpenCode 官方团队开发,与其不存在任何关联、赞助、授权或认可关系。本文提及的所有产品名称、商标、服务标志及注册商标均归其各自所有者所有。本项目按“现状”(AS-IS)提供,在法律允许的最大范围内,不作任何形式的保证。**

