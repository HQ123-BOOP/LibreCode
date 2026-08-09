import { effectCmd } from "../effect-cmd"
import { Effect } from "effect"
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

export const ServerPasswordCommand = effectCmd({
  command: "server-password",
  builder: (yargs) =>
    yargs.option("clear", {
      type: "boolean",
      describe: "Clear the stored server password",
    }),
  describe: "set or clear the persisted server password",
  instance: false,
  handler: Effect.fn("Cli.serverPassword")(function* (args) {
    if (args.clear) {
      PasswordStore.clear()
      console.log("Stored server password cleared. The next serve will be unsecured until you set a new one.")
      return
    }
    if (Flag.OPENCODE_SERVER_PASSWORD) {
      console.log("OPENCODE_SERVER_PASSWORD is set; the environment variable takes precedence over the stored password.")
    }
    const password = yield* Effect.promise(() => promptPassword("New server password: "))
    if (!password) {
      console.log("Password cannot be empty.")
      return
    }
    PasswordStore.save(password)
    console.log(`Server password saved to ${PasswordStore.file()}.`)
  }),
})
