import type { TuiPluginApi } from "@opencode-ai/plugin/tui"
import { createMemo, For, type Accessor } from "solid-js"
import { DEFAULT_THEMES, useTheme } from "../../context/theme"
import { useCommandShortcut } from "../../keymap"
import { en, t } from "../../util/i18n"

const themeCount = Object.keys(DEFAULT_THEMES).length

type TipPart = { text: string; highlight: boolean }
type TipShortcut = Accessor<string>
type Shortcuts = {
  agentCycle: TipShortcut
  childFirst: TipShortcut
  childNext: TipShortcut
  childPrevious: TipShortcut
  commandList: TipShortcut
  editorOpen: TipShortcut
  helpShow: TipShortcut
  inputClear: TipShortcut
  inputNewline: TipShortcut
  inputPaste: TipShortcut
  inputUndo: TipShortcut
  leader: TipShortcut
  messagesCopy: TipShortcut
  messagesFirst: TipShortcut
  messagesLast: TipShortcut
  messagesPageDown: TipShortcut
  messagesPageUp: TipShortcut
  messagesToggleConceal: TipShortcut
  modelCycleRecent: TipShortcut
  modelList: TipShortcut
  sessionExport: TipShortcut
  sessionInterrupt: TipShortcut
  sessionList: TipShortcut
  sessionNew: TipShortcut
  sessionParent: TipShortcut
  sessionPinToggle: TipShortcut
  sessionQuickSwitch1: TipShortcut
  sessionQuickSwitch9: TipShortcut
  sessionSidebarToggle: TipShortcut
  sessionTimeline: TipShortcut
  statusView: TipShortcut
  terminalSuspend: TipShortcut
  themeList: TipShortcut
}
type Tip = string | ((shortcuts: Shortcuts) => string | undefined)

function parse(tip: string): TipPart[] {
  const parts: TipPart[] = []
  const regex = /\{highlight\}(.*?)\{\/highlight\}/g
  const found = Array.from(tip.matchAll(regex))
  const state = found.reduce(
    (acc, match) => {
      const start = match.index ?? 0
      if (start > acc.index) {
        acc.parts.push({ text: tip.slice(acc.index, start), highlight: false })
      }
      acc.parts.push({ text: match[1], highlight: true })
      acc.index = start + match[0].length
      return acc
    },
    { parts, index: 0 },
  )

  if (state.index < tip.length) {
    parts.push({ text: tip.slice(state.index), highlight: false })
  }

  return parts
}

const NO_MODELS_PARTS = parse(t("tip.noModels"))

function shortcutText(value: string) {
  return `{highlight}${value}{/highlight}`
}

function commandText(command: string, shortcut: string) {
  if (!shortcut) return shortcutText(command)
  return `${shortcutText(command)} or ${shortcutText(shortcut)}`
}

function keyTip(shortcut: string, key: keyof typeof en): string | undefined {
  if (!shortcut) return undefined
  return t(key, { key: shortcutText(shortcut) })
}

function cmdTip(
  shortcut: string,
  command: string,
  key: keyof typeof en,
  vars?: Record<string, string | number>,
): string | undefined {
  if (!shortcut) return undefined
  return t(key, { ...vars, cmd: commandText(`/${command}`, shortcut) })
}

function configShortcut(api: TuiPluginApi, command: string): TipShortcut {
  return () =>
    api.tuiConfig.keybinds
      .get(command)
      .map((binding) => api.keys.formatSequence(Array.from(api.keymap.parseKeySequence(binding.key))))
      .filter(Boolean)
      .join(", ")
}

export function Tips(props: { api: TuiPluginApi; connected?: boolean }) {
  const theme = useTheme().theme
  const tipOffset = Math.random()
  const shortcuts: Shortcuts = {
    agentCycle: useCommandShortcut("agent.cycle"),
    childFirst: configShortcut(props.api, "session.child.first"),
    childNext: configShortcut(props.api, "session.child.next"),
    childPrevious: configShortcut(props.api, "session.child.previous"),
    commandList: useCommandShortcut("command.palette.show"),
    editorOpen: useCommandShortcut("prompt.editor"),
    helpShow: useCommandShortcut("help.show"),
    inputClear: useCommandShortcut("prompt.clear"),
    inputNewline: useCommandShortcut("input.newline"),
    inputPaste: useCommandShortcut("prompt.paste"),
    inputUndo: useCommandShortcut("input.undo"),
    leader: configShortcut(props.api, "leader"),
    messagesCopy: configShortcut(props.api, "messages.copy"),
    messagesFirst: configShortcut(props.api, "session.first"),
    messagesLast: configShortcut(props.api, "session.last"),
    messagesPageDown: configShortcut(props.api, "session.page.down"),
    messagesPageUp: configShortcut(props.api, "session.page.up"),
    messagesToggleConceal: configShortcut(props.api, "session.toggle.conceal"),
    modelCycleRecent: useCommandShortcut("model.cycle_recent"),
    modelList: useCommandShortcut("model.list"),
    sessionExport: configShortcut(props.api, "session.export"),
    sessionInterrupt: configShortcut(props.api, "session.interrupt"),
    sessionList: useCommandShortcut("session.list"),
    sessionNew: useCommandShortcut("session.new"),
    sessionParent: configShortcut(props.api, "session.parent"),
    sessionPinToggle: configShortcut(props.api, "session.pin.toggle"),
    sessionQuickSwitch1: useCommandShortcut("session.quick_switch.1"),
    sessionQuickSwitch9: useCommandShortcut("session.quick_switch.9"),
    sessionSidebarToggle: configShortcut(props.api, "session.sidebar.toggle"),
    sessionTimeline: configShortcut(props.api, "session.timeline"),
    statusView: useCommandShortcut("opencode.status"),
    terminalSuspend: useCommandShortcut("terminal.suspend"),
    themeList: useCommandShortcut("theme.switch"),
  }
  const tip = createMemo(() => {
    if (props.connected === false) return t("tip.noModels")
    const tips = [...TIPS, process.platform !== "win32" ? TERMINAL_SUSPEND_TIP : INPUT_UNDO_TIP].flatMap((item) => {
      const value = typeof item === "string" ? item : item(shortcuts)
      return value ? [value] : []
    })
    return tips[Math.floor(tipOffset * tips.length)] ?? t("tip.noModels")
  }, t("tip.noModels"))
  // Solid can expose a memo's initial value while a pure computation is pending.
  const parts = createMemo(() => {
    const value = tip()
    if (typeof value === "string") return parse(value)
    return NO_MODELS_PARTS
  }, NO_MODELS_PARTS)

  return (
    <box flexDirection="row" maxWidth="100%">
      <text flexShrink={0} style={{ fg: theme.warning }}>
        ● Tip{" "}
      </text>
      <text flexShrink={1} wrapMode="word">
        <For each={parts()}>
          {(part) => <span style={{ fg: part.highlight ? theme.text : theme.textMuted }}>{part.text}</span>}
        </For>
      </text>
    </box>
  )
}

const TIPS: Tip[] = [
  t("tip.001"),
  t("tip.002"),
  (shortcuts) => keyTip(shortcuts.agentCycle(), "tip.003"),
  t("tip.004"),
  t("tip.005"),
  t("tip.006"),
  (shortcuts) => keyTip(shortcuts.inputPaste(), "tip.007"),
  (shortcuts) => cmdTip(shortcuts.editorOpen(), "editor", "tip.008"),
  t("tip.009"),
  (shortcuts) => cmdTip(shortcuts.modelList(), "models", "tip.010"),
  (shortcuts) => cmdTip(shortcuts.themeList(), "themes", "tip.011", { n: themeCount }),
  (shortcuts) => cmdTip(shortcuts.sessionNew(), "new", "tip.012"),
  (shortcuts) => cmdTip(shortcuts.sessionList(), "sessions", "tip.013"),
  (shortcuts) => keyTip(shortcuts.sessionPinToggle(), "tip.014"),
  (shortcuts) =>
    shortcuts.sessionQuickSwitch1() && shortcuts.sessionQuickSwitch9()
      ? t("tip.015", {
          k1: shortcutText(shortcuts.sessionQuickSwitch1()),
          k2: shortcutText(shortcuts.sessionQuickSwitch9()),
        })
      : undefined,
  t("tip.016"),
  (shortcuts) => cmdTip(shortcuts.sessionExport(), "export", "tip.017"),
  (shortcuts) => keyTip(shortcuts.messagesCopy(), "tip.018"),
  (shortcuts) => keyTip(shortcuts.commandList(), "tip.019"),
  t("tip.020"),
  (shortcuts) => keyTip(shortcuts.leader(), "tip.021"),
  (shortcuts) => keyTip(shortcuts.modelCycleRecent(), "tip.022"),
  (shortcuts) => keyTip(shortcuts.sessionSidebarToggle(), "tip.023"),
  (shortcuts) =>
    shortcuts.messagesPageUp() && shortcuts.messagesPageDown()
      ? t("tip.024", {
          k1: shortcutText(shortcuts.messagesPageUp()),
          k2: shortcutText(shortcuts.messagesPageDown()),
        })
      : undefined,
  (shortcuts) => keyTip(shortcuts.messagesFirst(), "tip.025"),
  (shortcuts) => keyTip(shortcuts.messagesLast(), "tip.026"),
  (shortcuts) => keyTip(shortcuts.inputNewline(), "tip.027"),
  (shortcuts) => keyTip(shortcuts.inputClear(), "tip.028"),
  (shortcuts) => keyTip(shortcuts.sessionInterrupt(), "tip.029"),
  t("tip.030"),
  t("tip.031"),
  (shortcuts) => {
    const items = [
      shortcuts.sessionParent(),
      shortcuts.childFirst(),
      shortcuts.childPrevious(),
      shortcuts.childNext(),
    ].filter(Boolean)
    if (!items.length) return undefined
    return t("tip.032", { keys: items.map(shortcutText).join(" / ") })
  },
  t("tip.033"),
  t("tip.034"),
  t("tip.035"),
  t("tip.036"),
  t("tip.037"),
  t("tip.038"),
  t("tip.039"),
  t("tip.040"),
  t("tip.041"),
  t("tip.042"),
  t("tip.043"),
  t("tip.044"),
  t("tip.045"),
  t("tip.046"),
  t("tip.047"),
  t("tip.048"),
  t("tip.049"),
  t("tip.050"),
  t("tip.051"),
  t("tip.052"),
  t("tip.053"),
  t("tip.054"),
  t("tip.055"),
  t("tip.056"),
  t("tip.057"),
  t("tip.058"),
  t("tip.059"),
  t("tip.060"),
  t("tip.061"),
  t("tip.062"),
  t("tip.063"),
  t("tip.064"),
  t("tip.065"),
  t("tip.066"),
  t("tip.067"),
  t("tip.068"),
  t("tip.069"),
  t("tip.070"),
  t("tip.071"),
  t("tip.072"),
  t("tip.073"),
  t("tip.074"),
  t("tip.075"),
  t("tip.076"),
  t("tip.077"),
  t("tip.078"),
  t("tip.079"),
  t("tip.080"),
  t("tip.081"),
  t("tip.082"),
  t("tip.083"),
  t("tip.084"),
  (shortcuts) => cmdTip(shortcuts.sessionTimeline(), "timeline", "tip.085"),
  (shortcuts) => keyTip(shortcuts.messagesToggleConceal(), "tip.086"),
  (shortcuts) => cmdTip(shortcuts.statusView(), "status", "tip.087"),
  t("tip.088"),
  (shortcuts) =>
    shortcuts.commandList()
      ? t("tip.089", { cmd: ` (${shortcutText(shortcuts.commandList())})` })
      : t("tip.089", { cmd: "" }),
  t("tip.090"),
  t("tip.091"),
  t("tip.092"),
  (shortcuts) => cmdTip(shortcuts.helpShow(), "help", "tip.093"),
  t("tip.094"),
]

const INPUT_UNDO_TIP: Tip = (shortcuts) => keyTip(shortcuts.inputUndo(), "tip.inputUndo")
const TERMINAL_SUSPEND_TIP: Tip = (shortcuts) => keyTip(shortcuts.terminalSuspend(), "tip.terminalSuspend")

