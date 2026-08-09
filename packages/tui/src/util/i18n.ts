import { createSignal } from "solid-js"

export const en = {
  "dialog.confirm": "Confirm",
  "dialog.cancel": "Cancel",
  "dialog.search": "Search",
  "sidebar.newSession": "New session",
  "sidebar.gettingStarted": "Getting started",
  "sidebar.connectProvider": "Connect provider",
  "sidebar.noProvider": "LibreCode includes free models so you can start immediately.",
  "sidebar.providerHint": "Connect from 75+ providers to use other models, including Claude, GPT, Gemini etc",
  "sidebar.commandHint": "/connect",
  "prompt.ask": "Ask anything...",
  "prompt.run": "Run a command...",
  "language.title": "Languages",
  "language.switch": "Switch language",
  "mobile.title": "Mobile devices",
  "mobile.hint": "Scan with the LibreCode mobile app to connect.",
  "mobile.loopbackHint": "Server is bound to loopback. Restart with --hostname 0.0.0.0 and scan again.",
  "mobile.appHint": "Or type this config manually in the app.",
} as const

export const zh: Record<keyof typeof en, string> = {
  "dialog.confirm": "确认",
  "dialog.cancel": "取消",
  "dialog.search": "搜索",
  "sidebar.newSession": "新建会话",
  "sidebar.gettingStarted": "快速开始",
  "sidebar.connectProvider": "连接服务商",
  "sidebar.noProvider": "LibreCode 内置免费模型,可直接开始使用。",
  "sidebar.providerHint": "可连接 75+ 服务商使用其他模型,如 Claude、GPT、Gemini 等",
  "sidebar.commandHint": "/connect",
  "prompt.ask": "随便问点什么...",
  "prompt.run": "运行命令...",
  "language.title": "语言",
  "language.switch": "切换语言",
  "mobile.title": "移动设备",
  "mobile.hint": "用 LibreCode 手机 APP 扫描二维码即可连接。",
  "mobile.loopbackHint": "服务器仅监听本机回环地址。请用 --hostname 0.0.0.0 重启后再扫码。",
  "mobile.appHint": "或在 APP 中手动输入此配置。",
}

export type Lang = "en" | "zh"
export const languages: Lang[] = ["en", "zh"]

function detectLanguage(): Lang {
  const env = process.env.LANG?.toLowerCase() ?? ""
  if (env.startsWith("zh")) return "zh"
  return "en"
}

const [langSignal, setLangSignal] = createSignal<Lang>(detectLanguage())

export function setLanguage(lang: Lang) {
  setLangSignal(lang)
}

export function getLanguage(): Lang {
  return langSignal()
}

export function t(key: keyof typeof en, vars?: Record<string, string | number>): string {
  const lang = langSignal()
  let value: string = lang === "zh" ? zh[key] : en[key]
  if (value === undefined) value = en[key]
  if (value === undefined) return key
  if (vars) {
    for (const [name, val] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, String(val))
    }
  }
  return value
}

export const tAll = () => ({ en, zh })
