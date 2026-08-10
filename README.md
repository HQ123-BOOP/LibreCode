<p align="center">The open source AI coding agent.</p>
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

### Installation

```bash
# Recommended
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

Or download a prebuilt binary from the [releases page](https://github.com/HQ123-BOOP/LibreCode/releases) (`librecode-<platform>.tar.gz` / `.zip`) and add it to your `PATH`.

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Desktop App

LibreCode is also available as a desktop application. Download installers from the [releases page](https://github.com/HQ123-BOOP/LibreCode/releases) (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`).

To build the desktop app yourself:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

Artifacts are written to `packages/desktop/dist`.

#### Mobile App

LibreCode is also available as an Android app. Download the APK from the [releases page](https://github.com/HQ123-BOOP/LibreCode/releases). The app connects to a `librecode serve` instance on your computer over your LAN or Tailscale, and supports QR-code pairing via the `/mobile devices` command in the TUI.

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$OPENCODE_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.opencode/bin` - Default fallback

```bash
# Examples
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agents

LibreCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://opencode.ai/docs/agents).


**LibreCode is a fork of OpenCode. This project is not developed by the official OpenCode team, and there is no affiliation, sponsorship, authorization, or endorsement relationship with them. All product names, trademarks, service marks, and registered trademarks mentioned herein are the property of their respective owners. The project is provided on an "AS-IS" basis, and to the fullest extent permitted by law, no warranties of any kind are made.**

