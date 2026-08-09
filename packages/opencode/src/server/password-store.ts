export * as PasswordStore from "./password-store"

import { Global } from "@opencode-ai/core/global"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import path from "path"

export type StoredPassword = {
  salt: string
  hash: string
}

const FILE = path.join(Global.Path.state, "server-password.json")

export function file() {
  return FILE
}

export function load(): StoredPassword | undefined {
  try {
    const data = JSON.parse(readFileSync(FILE, "utf8")) as Partial<StoredPassword>
    if (!data || typeof data.salt !== "string" || typeof data.hash !== "string") return undefined
    return { salt: data.salt, hash: data.hash }
  } catch {
    return undefined
  }
}

export function verify(password: string, stored: StoredPassword): boolean {
  if (!password) return false
  const expected = Buffer.from(stored.hash, "base64")
  const actual = scryptSync(password, Buffer.from(stored.salt, "base64"), expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

export function save(password: string) {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, 32)
  mkdirSync(Global.Path.state, { recursive: true })
  writeFileSync(FILE, JSON.stringify({ salt: salt.toString("base64"), hash: hash.toString("base64") }), {
    mode: 0o600,
  })
}

export function clear() {
  rmSync(FILE, { force: true })
}

export function exists(): boolean {
  return load() !== undefined
}
