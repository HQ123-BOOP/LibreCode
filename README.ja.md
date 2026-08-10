<p align="center">オープンソースのAIコーディングエージェント。</p>
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

### インストール

```bash
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# パッケージマネージャー









```

> [!TIP]
> インストール前に 0.1.x より古いバージョンを削除してください。

### デスクトップアプリ

LibreCode はデスクトップアプリケーションとしても利用できます。[リリースページ](https://github.com/HQ123-BOOP/LibreCode/releases)からインストーラ(`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`)をダウンロードしてください。

自分でビルドする場合:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

成果物は `packages/desktop/dist` に出力されます。

#### モバイルアプリ

LibreCode は Android アプリとしても利用できます。[リリースページ](https://github.com/HQ123-BOOP/LibreCode/releases)から APK をダウンロードしてください。アプリは LAN または Tailscale 経由でコンピュータ上の `librecode serve` に接続し、TUI の `/mobile devices` コマンドによる QR コードペアリングに対応しています。

#### インストールディレクトリ

インストールスクリプトは、インストール先パスを次の優先順位で決定します。

1. `$OPENCODE_INSTALL_DIR` - カスタムのインストールディレクトリ
2. `$XDG_BIN_DIR` - XDG Base Directory Specification に準拠したパス
3. `$HOME/bin` - 標準のユーザー用バイナリディレクトリ（存在する場合、または作成できる場合）
4. `$HOME/.opencode/bin` - デフォルトのフォールバック

```bash
# 例
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agents

OpenCode には組み込みの Agent が2つあり、`Tab` キーで切り替えられます。

- **build** - デフォルト。開発向けのフルアクセス Agent
- **plan** - 分析とコード探索向けの読み取り専用 Agent
  - デフォルトでファイル編集を拒否
  - bash コマンド実行前に確認
  - 未知のコードベース探索や変更計画に最適

また、複雑な検索やマルチステップのタスク向けに **general** サブ Agent も含まれています。
内部的に使用されており、メッセージで `@general` と入力して呼び出せます。

[agents](https://opencode.ai/docs/agents) の詳細はこちら。


**LibreCode は OpenCode のフォークです。本プロジェクトは OpenCode 公式チームによって開発されたものではなく、彼らとの提携、スポンサー、承認、推奨の関係は一切ありません。本書に記載されているすべての製品名、商標、サービスマーク、登録商標は、それぞれの所有者に帰属します。本プロジェクトは「現状有姿」(AS-IS)で提供され、法律で認められる最大限の範囲で、いかなる種類の保証も行われません。**

