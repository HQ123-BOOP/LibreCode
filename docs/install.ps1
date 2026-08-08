# LibreCode installer for Windows
# Usage: irm https://hq123-boop.github.io/LibreCode/install.ps1 | iex
$ErrorActionPreference = "Stop"

$Version = if ($env:LIBRECODE_VERSION) { $env:LIBRECODE_VERSION } else { "latest" }
$Repo = "HQ123-BOOP/LibreCode"

function Get-Platform {
  $arch = $env:PROCESSOR_ARCHITECTURE
  if ($arch -eq "AMD64") { return "windows-x64" }
  if ($arch -eq "ARM64") { return "windows-arm64" }
  throw "Unsupported architecture: $arch"
}

function Resolve-Version {
  if ($Version -ne "latest") { return $Version }
  $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest" -Headers @{ "User-Agent" = "librecode-installer" }
  return $release.tag_name.TrimStart("v")
}

$platform = Get-Platform
$resolved = Resolve-Version
$url = "https://github.com/$Repo/releases/download/v${resolved}/librecode-${platform}.zip"

Write-Host "LibreCode v$resolved ($platform)"
Write-Host "Downloading $url"

$installDir = if ($env:LIBRECODE_INSTALL_DIR) { $env:LIBRECODE_INSTALL_DIR } else { Join-Path $env:LOCALAPPDATA "librecode" }
New-Item -ItemType Directory -Path $installDir -Force | Out-Null

$tmp = Join-Path $env:TEMP "librecode-$([guid]::NewGuid().ToString('N'))"
New-Item -ItemType Directory -Path $tmp -Force | Out-Null

try {
  $zip = Join-Path $tmp "librecode.zip"
  Invoke-WebRequest -Uri $url -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $tmp -Force
  Copy-Item (Join-Path $tmp "librecode.exe") (Join-Path $installDir "librecode.exe") -Force
} finally {
  Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Installed to $installDir\librecode.exe"
Write-Host "Add it to your PATH or run: & '$installDir\librecode.exe' --version"
