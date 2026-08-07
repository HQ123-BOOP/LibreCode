import { TextAttributes } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme } from "../context/theme"
import { logo } from "../logo"

export function Logo() {
  const { theme } = useTheme()

  const renderLine = (line: string, bold: boolean): JSX.Element[] => {
    const attrs = bold ? TextAttributes.BOLD : undefined
    return Array.from(line).map((char) => (
      <text fg={char === "|" || char === "_" ? theme.text : theme.textMuted} attributes={attrs} selectable={false}>
        {char}
      </text>
    ))
  }

  return (
    <box>
      <For each={logo}>
        {(line) => (
          <box flexDirection="row">
            <box flexDirection="row">{renderLine(line, false)}</box>
          </box>
        )}
      </For>
    </box>
  )
}
