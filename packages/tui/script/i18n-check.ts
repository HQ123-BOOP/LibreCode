/**
 * i18n integrity check:
 * 1. zh must contain exactly the same keys as en.
 * 2. Every t("...") call in the TUI source must reference a key that exists in en.
 */
import { en, zh } from "../src/util/i18n"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dir, "..", "src")

const enKeys = new Set(Object.keys(en))
const zhKeys = new Set(Object.keys(zh))

let failed = false
const fail = (message: string) => {
  console.error(`✗ ${message}`)
  failed = true
}

for (const key of enKeys) if (!zhKeys.has(key)) fail(`zh is missing key: ${key}`)
for (const key of zhKeys) if (!enKeys.has(key)) fail(`zh has extra key (not in en): ${key}`)

const files: string[] = []
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (name.endsWith(".ts") || name.endsWith(".tsx")) files.push(full)
  }
}
walk(root)

const literalKey = /(?:^|[^\w$])t\(\s*["'`]([^"'`]+)["'`]/g
for (const file of files) {
  const source = readFileSync(file, "utf8")
  for (const match of source.matchAll(literalKey)) {
    const key = match[1]
    if (!enKeys.has(key)) fail(`${file.replace(root, ".")} references unknown i18n key: ${key}`)
  }
}

if (failed) {
  console.error("i18n check failed")
  process.exit(1)
}
console.log(`i18n check passed: ${enKeys.size} keys, ${files.length} files scanned`)
