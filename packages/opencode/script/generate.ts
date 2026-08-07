import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

const modelsUrl = process.env.OPENCODE_MODELS_URL || "https://models.dev"
const rawModelsData = process.env.MODELS_DEV_API_JSON
  ? await Bun.file(process.env.MODELS_DEV_API_JSON).text()
  : await fetch(`${modelsUrl}/api.json`).then((x) => x.text())

// Drop commercial providers (OpenCode Zen / OpenCode Go) from the embedded snapshot.
const parsed = JSON.parse(rawModelsData) as Record<string, unknown>
delete parsed["opencode"]
delete parsed["opencode-go"]
export const modelsData = JSON.stringify(parsed)
console.log("Loaded models.dev snapshot")
