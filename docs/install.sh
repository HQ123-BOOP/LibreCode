#!/usr/bin/env bash
#
# LibreCode installer
# Usage: curl -fsSL https://hq123-boop.github.io/LibreCode/install.sh | bash
#
# Installs the LibreCode CLI from the LibreCode GitHub Releases.
set -euo pipefail

LIBRECODE_VERSION="${LIBRECODE_VERSION:-latest}"
LIBRECODE_REPO="HQ123-BOOP/LibreCode"
LIBRECODE_RELEASE_BASE="https://github.com/${LIBRECODE_REPO}/releases"

# Colors
if [[ -t 1 ]]; then
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  RED='\033[0;31m'
  NC='\033[0m'
else
  GREEN=''
  YELLOW=''
  RED=''
  NC=''
fi

log()  { printf "${GREEN}%s${NC}\n" "$*"; }
warn() { printf "${YELLOW}%s${NC}\n" "$*"; }
err()  { printf "${RED}%s${NC}\n" "$*" >&2; }

die() {
  err "$*"
  exit 1
}

detect_platform() {
  local os arch
  os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  arch="$(uname -m)"

  case "$os" in
    linux)   os="linux" ;;
    darwin)  os="darwin" ;;
    *)       die "Unsupported OS: $(uname -s). LibreCode currently supports Linux and macOS." ;;
  esac

  case "$arch" in
    x86_64|amd64)  arch="x64" ;;
    aarch64|arm64) arch="arm64" ;;
    *) die "Unsupported architecture: $(uname -m)" ;;
  esac

  echo "${os}-${arch}"
}

resolve_version() {
  if [[ "$LIBRECODE_VERSION" != "latest" ]]; then
    echo "$LIBRECODE_VERSION"
    return
  fi
  # Fetch the latest release tag from the GitHub API
  local tag
  tag="$(curl -fsSL "https://api.github.com/repos/${LIBRECODE_REPO}/releases/latest" | grep -o '"tag_name": *"[^"]*"' | head -1 | cut -d'"' -f4)"
  [[ -z "$tag" ]] && die "Failed to resolve the latest LibreCode version."
  echo "${tag#v}"
}

main() {
  local platform version archive_url install_dir bin_dir
  platform="$(detect_platform)"
  version="$(resolve_version)"

  install_dir="${LIBRECODE_INSTALL_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/librecode}"
  bin_dir="${LIBRECODE_BIN_DIR:-${XDG_BIN_DIR:-$HOME/.local/bin}}"

  archive_url="${LIBRECODE_RELEASE_BASE}/download/v${version}/librecode-${platform}.tar.gz"

  log "LibreCode v${version} (${platform})"
  log "Downloading ${archive_url}"

  local tmp
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT

  curl -fsSL "$archive_url" -o "$tmp/librecode.tar.gz"
  mkdir -p "$install_dir" "$bin_dir"
  tar -xzf "$tmp/librecode.tar.gz" -C "$install_dir"
  chmod +x "$install_dir/librecode"
  ln -sf "$install_dir/librecode" "$bin_dir/librecode"

  if ! echo "$PATH" | tr ':' '\n' | grep -qF "$bin_dir"; then
    warn "NOTE: $bin_dir is not in your PATH."
    warn "Add it with: export PATH=\"$bin_dir:\$PATH\" (add to your shell profile to persist)."
  fi

  log "Installed to $bin_dir/librecode"
  log "Run 'librecode --version' to verify. Docs: https://hq123-boop.github.io/LibreCode/"
}

main "$@"
