const CHANGELOG_URL = "https://hq123-boop.github.io/LibreCode/CHANGELOG.txt"

export type ChangelogEntry = {
  entry: string
  previousDate: Date | undefined
}

export async function fetchChangelog(): Promise<string | undefined> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    const response = await fetch(CHANGELOG_URL, { signal: controller.signal })
    clearTimeout(timer)
    if (!response.ok) return undefined
    return await response.text()
  } catch {
    return undefined
  }
}

export function parseChangelog(text: string, version: string): ChangelogEntry | undefined {
  const sections = text.split(/\n(?=##\s+v)/)
  const header = new RegExp(`^##\\s+v${version}(?:\\s+\\((\\d{4}-\\d{2}-\\d{2})\\))?`)
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    const match = header.exec(section)
    if (!match) continue
    const body = section.slice(match[0].length).trim()
    if (!body) continue
    let previousDate: Date | undefined
    for (let j = i + 1; j < sections.length; j++) {
      const prev = /##\s+v[\d.]+[^(]*\((\d{4}-\d{2}-\d{2})\)/.exec(sections[j])
      if (prev) {
        const parsed = new Date(prev[1])
        if (!Number.isNaN(parsed.getTime())) previousDate = parsed
        break
      }
    }
    return { entry: body, previousDate }
  }
  return undefined
}

export function daysSince(date: Date): number {
  const now = Date.now()
  const diff = now - date.getTime()
  if (diff <= 0) return 0
  return Math.floor(diff / 86400000)
}
