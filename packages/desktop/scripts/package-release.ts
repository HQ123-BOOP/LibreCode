#!/usr/bin/env bun
/**
 * Builds and packages the LibreCode desktop app for one platform.
 *
 * Usage: bun scripts/package-release.ts <mac|win|linux>
 *
 * Runs prebuild + electron-vite build + electron-builder for the given
 * target. Artifacts are written to packages/desktop/dist and printed to
 * stdout (one path per line) for CI to collect.
 */
import { $ } from "bun"
import path from "node:path"
import { fileURLToPath } from "node:url"

const targets = ["mac", "win", "linux"] as const
const target = process.argv[2] as (typeof targets)[number] | undefined
if (!target || !targets.includes(target)) {
  console.error(`Usage: bun scripts/package-release.ts <${targets.join("|")}>`)
  process.exit(1)
}

process.env.OPENCODE_CHANNEL ??= "prod"

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dist = path.join(dir, "dist")

await $`bun ./scripts/prebuild.ts`.cwd(dir)
await $`bun run build`.cwd(dir)
await $`bunx electron-builder --config electron-builder.config.ts --${target}`.cwd(dir)

const artifacts = (await Array.fromAsync(new Bun.Glob("*.{dmg,zip,exe,AppImage,deb,rpm}").scan({ cwd: dist }))).sort()
if (artifacts.length === 0) {
  console.error("No artifacts produced in dist/")
  process.exit(1)
}
for (const artifact of artifacts) {
  console.log(path.join(dist, artifact))
}
