import { TextAttributes } from "@opentui/core"
import { createStore } from "solid-js/store"
import { For, Show } from "solid-js"
import { useTheme } from "../context/theme"
import { useDialog } from "../ui/dialog"
import { useBindings } from "../keymap"
import { useKV } from "../context/kv"
import { Link } from "../ui/link"
import { t } from "../util/i18n"
import { daysSince, type ChangelogEntry } from "../util/changelog"

const CONTRIBUTE_URL = "https://github.com/HQ123-BOOP/LibreCode"

export function DialogWhatsNew(props: { version: string; entry?: ChangelogEntry }) {
  const dialog = useDialog()
  const kv = useKV()
  const { theme } = useTheme()
  const [store, setStore] = createStore<{ active: "dismiss" | "close" }>({ active: "close" })

  const markSeen = (dismiss: boolean) => {
    if (dismiss) kv.set("whatsnew.dismissed", true)
    kv.set("last_seen_version", props.version)
  }

  useBindings(() => ({
    bindings: [
      {
        key: "return",
        desc: "Close dialog",
        group: "Dialog",
        cmd: () => {
          markSeen(store.active === "dismiss")
          dialog.clear()
        },
      },
      {
        key: "left",
        desc: "Previous dialog option",
        group: "Dialog",
        cmd: () => setStore("active", store.active === "dismiss" ? "close" : "dismiss"),
      },
      {
        key: "right",
        desc: "Next dialog option",
        group: "Dialog",
        cmd: () => setStore("active", store.active === "dismiss" ? "close" : "dismiss"),
      },
    ],
  }))

  const days = props.entry?.previousDate ? daysSince(props.entry.previousDate) : undefined
  const thanks = days === undefined ? t("whatsnew.thanksNoDays") : t("whatsnew.thanks", { days })

  return (
    <box paddingLeft={2} paddingRight={2} gap={1} width={70}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          {t("whatsnew.title", { version: props.version })}
        </text>
        <text fg={theme.textMuted} onMouseUp={() => {
          markSeen(false)
          dialog.clear()
        }}>
          esc
        </text>
      </box>
      <box paddingBottom={1}>
        <text fg={theme.textMuted} wrapMode="word">
          {thanks}
        </text>
      </box>
      <Show when={props.entry}>
        <box flexDirection="column" gap={0} paddingBottom={1}>
          <For each={(props.entry!.entry.split("\n")).map((line) => line.trimStart())}>
            {(line) =>
              line.startsWith("-") ? (
                <text fg={theme.text} wrapMode="word">
                  {"  " + line}
                </text>
              ) : (
                <text fg={theme.textMuted} wrapMode="word">
                  {line}
                </text>
              )
            }
          </For>
        </box>
      </Show>
      <box flexDirection="row" gap={1} paddingBottom={1}>
        <text fg={theme.textMuted}>{t("whatsnew.contribute").split("{link}")[0]}</text>
        <Link href={CONTRIBUTE_URL} fg={theme.success}>
          {t("whatsnew.contributeLink")}
        </Link>
        <text fg={theme.textMuted}>{t("whatsnew.contribute").split("{link}")[1]}</text>
      </box>
      <box flexDirection="row" justifyContent="flex-end" paddingBottom={1} gap={1}>
        <For each={["close", "dismiss"] as const}>
          {(key) => (
            <box
              paddingLeft={1}
              paddingRight={1}
              backgroundColor={key === store.active ? theme.primary : undefined}
              onMouseUp={() => {
                markSeen(key === "dismiss")
                dialog.clear()
              }}
            >
              <text fg={key === store.active ? theme.selectedListItemText : theme.textMuted}>
                {key === "close" ? t("whatsnew.close") : t("whatsnew.dismissClose")}
              </text>
            </box>
          )}
        </For>
      </box>
    </box>
  )
}
