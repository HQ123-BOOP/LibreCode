import { DialogSelect, type DialogSelectRef } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"
import { onCleanup } from "solid-js"
import { setLanguage, getLanguage, t, type Lang } from "../util/i18n"
import { useKV } from "../context/kv"

export function DialogLanguageList() {
  const dialog = useDialog()
  const kv = useKV()
  const options: { title: string; value: Lang }[] = [
    { title: "English", value: "en" },
    { title: "中文", value: "zh" },
  ]
  const initial = getLanguage()
  let confirmed = false
  let ref: DialogSelectRef<Lang>

  onCleanup(() => {
    if (!confirmed) setLanguage(initial)
  })

  return (
    <DialogSelect
      title={t("language.title")}
      options={options}
      current={initial}
      onMove={(opt) => {
        setLanguage(opt.value)
      }}
      onSelect={(opt) => {
        setLanguage(opt.value)
        kv.set("locale", opt.value)
        confirmed = true
        dialog.clear()
      }}
      ref={(r) => {
        ref = r
      }}
      onFilter={(query) => {
        if (query.length === 0) {
          setLanguage(initial)
          return
        }
        const first = ref.filtered[0]
        if (first) setLanguage(first.value)
      }}
    />
  )
}
