import { TextAttributes } from "@opentui/core"
import { createMemo, For } from "solid-js"
import { useTheme } from "../context/theme"
import { useDialog } from "../ui/dialog"
import { useSDK } from "../context/sdk"
import { renderQr } from "../util/qr"
import { t } from "../util/i18n"

export function DialogMobile() {
  const dialog = useDialog()
  const { theme } = useTheme()
  const sdk = useSDK()

  const payload = createMemo(() => {
    const url = new URL(sdk.url)
    let password = ""
    const headers = (sdk.headers ?? {}) as Record<string, string | undefined>
    const authorization =
      headers["authorization"] ?? headers["Authorization"] ?? headers["x-opencode-token"]
    if (authorization?.startsWith("Basic ")) {
      const decoded = atob(authorization.slice(6))
      const separator = decoded.indexOf(":")
      password = separator === -1 ? decoded : decoded.slice(separator + 1)
    }
    const host = url.hostname
    const loopback = host === "127.0.0.1" || host === "0.0.0.0" || host === "::1" || host === "localhost"
    const port = url.port || (url.protocol === "https:" ? "443" : "80")
    const token = btoa(`user:${password}`)
    const displayHost = loopback ? "<your-lan-ip>" : host
    return {
      qr: `librecode://${host}:${port}?token=${token}`,
      loopback,
      display: `librecode://${displayHost}:${port}?token=...`,
      hint: loopback ? t("mobile.loopbackHint") : t("mobile.hint"),
    }
  })

  const qrLines = createMemo(() => renderQr(payload().qr))

  return (
    <box paddingLeft={2} paddingRight={2} gap={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          {t("mobile.title")}
        </text>
        <text fg={theme.textMuted} onMouseUp={() => dialog.clear()}>
          esc
        </text>
      </box>
      <box flexDirection="column" gap={0}>
        <For each={qrLines()}>{(line) => <text fg={theme.text}>{line}</text>}</For>
      </box>
      <box flexDirection="column" gap={0} paddingBottom={1}>
        <text fg={theme.textMuted}>{payload().hint}</text>
        <text fg={theme.textMuted}>{payload().display}</text>
        <text fg={theme.textMuted}>{t("mobile.appHint")}</text>
      </box>
    </box>
  )
}
