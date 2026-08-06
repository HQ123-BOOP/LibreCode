const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://opencode.ai" : `https://${stage}.opencode.ai`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/anomalyco/opencode",
  discord: "https://opencode.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
