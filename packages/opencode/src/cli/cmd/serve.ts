import { Effect } from "effect"
import { effectCmd } from "../effect-cmd"
import { withNetworkOptions, resolveNetworkOptions } from "../network"
import { Flag } from "@opencode-ai/core/flag/flag"
import { PasswordStore } from "../../server/password-store"
import { createInterface } from "node:readline"

const promptPassword = (question: string) =>
  new Promise<string>((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stderr })
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })

export const ServeCommand = effectCmd({
  command: "serve",
  builder: (yargs) => withNetworkOptions(yargs),
  describe: "starts a headless opencode server",
  // Server loads instances per-request via x-opencode-directory header — no
  // need for an ambient project InstanceContext at startup.
  instance: false,
  handler: Effect.fn("Cli.serve")(function* (args) {
    const { Server } = yield* Effect.promise(() => import("../../server/server"))
    const stored = PasswordStore.load()
    if (!Flag.OPENCODE_SERVER_PASSWORD && !stored) {
      if (process.stdin.isTTY && process.stdout.isTTY) {
        const password = yield* Effect.promise(() => promptPassword("Set a server password (leave empty for none): "))
        if (password) {
          PasswordStore.save(password)
          console.log(`Password saved to ${PasswordStore.file()}. Use "librecode server-password --clear" to reset.`)
        } else {
          console.log("Warning: no password set; server is unsecured.")
        }
      } else {
        console.log("Warning: OPENCODE_SERVER_PASSWORD is not set; server is unsecured.")
      }
    }
    const opts = yield* resolveNetworkOptions(args)
    const server = yield* Effect.promise(() => Server.listen(opts))
    console.log(`opencode server listening on http://${server.hostname}:${server.port}`)

    yield* Effect.never
  }),
})
