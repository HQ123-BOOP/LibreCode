<p align="center">Der Open-Source KI-Coding-Agent.</p>
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
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# Paketmanager









```

> [!TIP]
> Entferne Versionen älter als 0.1.x vor der Installation.

### Desktop-App

LibreCode ist auch als Desktop-Anwendung verfügbar. Laden Sie Installer von der [Releases-Seite](https://github.com/HQ123-BOOP/LibreCode/releases) herunter (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`).

So bauen Sie die App selbst:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

Die Artefakte werden in `packages/desktop/dist` geschrieben.

#### Mobile App

LibreCode ist auch als Android-App verfügbar. Laden Sie die APK von der [Releases-Seite](https://github.com/HQ123-BOOP/LibreCode/releases) herunter. Die App verbindet sich über LAN oder Tailscale mit einem `librecode serve` auf Ihrem Computer und unterstützt QR-Code-Pairing über den Befehl `/mobile devices` im TUI.

#### Installationsverzeichnis

Das Installationsskript beachtet die folgende Prioritätsreihenfolge für den Installationspfad:

1. `$OPENCODE_INSTALL_DIR` - Benutzerdefiniertes Installationsverzeichnis
2. `$XDG_BIN_DIR` - XDG Base Directory Specification-konformer Pfad
3. `$HOME/bin` - Standard-Binärverzeichnis des Users (falls vorhanden oder erstellbar)
4. `$HOME/.opencode/bin` - Standard-Fallback

```bash
# Beispiele
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agents

OpenCode enthält zwei eingebaute Agents, zwischen denen du mit der `Tab`-Taste wechseln kannst.

- **build** - Standard-Agent mit vollem Zugriff für Entwicklungsarbeit
- **plan** - Nur-Lese-Agent für Analyse und Code-Exploration
  - Verweigert Datei-Edits standardmäßig
  - Fragt vor dem Ausführen von bash-Befehlen nach
  - Ideal zum Erkunden unbekannter Codebases oder zum Planen von Änderungen

Außerdem ist ein **general**-Subagent für komplexe Suchen und mehrstufige Aufgaben enthalten.
Dieser wird intern genutzt und kann in Nachrichten mit `@general` aufgerufen werden.

Mehr dazu unter [Agents](https://opencode.ai/docs/agents).


**LibreCode ist ein Fork von OpenCode. Dieses Projekt wurde nicht vom offiziellen OpenCode-Team entwickelt und steht in keiner Verbindung, Förderung, Autorisierung oder Empfehlung zu diesem. Alle hierin genannten Produktnamen, Marken, Dienstleistungsmarken und eingetragenen Marken sind Eigentum ihrer jeweiligen Inhaber. Das Projekt wird auf einer "AS-IS"-Basis bereitgestellt, und im gesetzlich zulässigen Umfang werden keinerlei Garantien gewährt.**

