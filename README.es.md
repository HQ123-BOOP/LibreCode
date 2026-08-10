<p align="center">El agente de programación con IA de código abierto.</p>
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

### Instalación

```bash
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# Gestores de paquetes









```

> [!TIP]
> Elimina versiones anteriores a 0.1.x antes de instalar.

### Aplicación de escritorio

LibreCode también está disponible como aplicación de escritorio. Descargue instaladores desde la [página de releases](https://github.com/HQ123-BOOP/LibreCode/releases) (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`).

Para compilarla usted mismo:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

Los artefactos se escriben en `packages/desktop/dist`.

#### Aplicación móvil

LibreCode también está disponible como aplicación Android. Descargue el APK desde la [página de releases](https://github.com/HQ123-BOOP/LibreCode/releases). La aplicación se conecta a una instancia de `librecode serve` en su computadora a través de LAN o Tailscale y admite emparejamiento por código QR con el comando `/mobile devices` en la TUI.

#### Directorio de instalación

El script de instalación respeta el siguiente orden de prioridad para la ruta de instalación:

1. `$OPENCODE_INSTALL_DIR` - Directorio de instalación personalizado
2. `$XDG_BIN_DIR` - Ruta compatible con la especificación XDG Base Directory
3. `$HOME/bin` - Directorio binario estándar del usuario (si existe o se puede crear)
4. `$HOME/.opencode/bin` - Alternativa por defecto

```bash
# Ejemplos
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agentes

OpenCode incluye dos agentes integrados que puedes alternar con la tecla `Tab`.

- **build** - Por defecto, agente con acceso completo para tareas de desarrollo
- **plan** - Agente de solo lectura para análisis y exploración de código
  - Deniega ediciones de archivos por defecto
  - Pide permiso antes de ejecutar comandos bash
  - Ideal para explorar codebases desconocidas o planificar cambios

Además, incluye un subagente **general** para búsquedas complejas y tareas de varios pasos.
Se usa internamente y se puede invocar con `@general` en los mensajes.

Más información sobre [agentes](https://opencode.ai/docs/agents).


**LibreCode es un fork de OpenCode. Este proyecto no está desarrollado por el equipo oficial de OpenCode y no existe ninguna relación de afiliación, patrocinio, autorización o respaldo con ellos. Todos los nombres de productos, marcas comerciales, marcas de servicio y marcas registradas mencionados aquí son propiedad de sus respectivos dueños. El proyecto se proporciona "TAL CUAL" (AS-IS) y, en la máxima medida permitida por la ley, no se otorgan garantías de ningún tipo.**

