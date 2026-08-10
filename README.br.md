<p align="center">O agente de programação com IA de código aberto.</p>
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

### Instalação

```bash
# YOLO
curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash

# Gerenciadores de pacotes









```

> [!TIP]
> Remova versões anteriores a 0.1.x antes de instalar.

### Aplicativo de desktop

O LibreCode também está disponível como aplicativo de desktop. Baixe os instaladores na [página de releases](https://github.com/HQ123-BOOP/LibreCode/releases) (`librecode-desktop-*.dmg` / `.exe` / `.AppImage` / `.deb` / `.rpm`).

Para compilar você mesmo:

```bash
cd packages/desktop
bun scripts/package-release.ts mac   # or: win | linux
```

Os artefatos são gravados em `packages/desktop/dist`.

#### Aplicativo móvel

O LibreCode também está disponível como aplicativo Android. Baixe o APK na [página de releases](https://github.com/HQ123-BOOP/LibreCode/releases). O aplicativo se conecta a uma instância `librecode serve` no seu computador via LAN ou Tailscale e suporta pareamento por QR code com o comando `/mobile devices` na TUI.

#### Diretório de instalação

O script de instalação respeita a seguinte ordem de prioridade para o caminho de instalação:

1. `$OPENCODE_INSTALL_DIR` - Diretório de instalação personalizado
2. `$XDG_BIN_DIR` - Caminho compatível com a especificação XDG Base Directory
3. `$HOME/bin` - Diretório binário padrão do usuário (se existir ou puder ser criado)
4. `$HOME/.opencode/bin` - Fallback padrão

```bash
# Exemplos
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
```

### Agents

O OpenCode inclui dois agents integrados, que você pode alternar com a tecla `Tab`.

- **build** - Padrão, agent com acesso total para trabalho de desenvolvimento
- **plan** - Agent somente leitura para análise e exploração de código
  - Nega edições de arquivos por padrão
  - Pede permissão antes de executar comandos bash
  - Ideal para explorar codebases desconhecidas ou planejar mudanças

Também há um subagent **general** para buscas complexas e tarefas em várias etapas.
Ele é usado internamente e pode ser invocado com `@general` nas mensagens.

Saiba mais sobre [agents](https://opencode.ai/docs/agents).


**LibreCode é um fork do OpenCode. Este projeto não é desenvolvido pela equipe oficial do OpenCode, e não há nenhuma relação de afiliação, patrocínio, autorização ou endosso com eles. Todos os nomes de produtos, marcas comerciais, marcas de serviço e marcas registradas mencionados aqui pertencem aos seus respectivos proprietários. O projeto é fornecido "NO ESTADO EM QUE SE ENCONTRA" (AS-IS) e, na medida máxima permitida por lei, nenhuma garantia de qualquer tipo é feita.**

