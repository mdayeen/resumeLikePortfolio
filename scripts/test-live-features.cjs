/* Behavioral checks run entirely against isolated local storage. */
const assert = require("node:assert/strict")
const crypto = require("node:crypto")
const fs = require("node:fs")
const path = require("node:path")
const ts = require("typescript")

const root = path.resolve(__dirname, "..")
const sandboxRoot = path.join(root, ".portfolio-data")
const sandbox = path.join(sandboxRoot, `test-${crypto.randomUUID()}`)
fs.mkdirSync(sandbox, { recursive: true })
delete process.env.MONGODB_URI
delete process.env.VERCEL
delete process.env.AWS_LAMBDA_FUNCTION_NAME
delete process.env.NETLIFY
process.env.PORTFOLIO_DATA_DIR = path.join(sandbox, "data")
process.env.PORTFOLIO_SESSION_SECRET = "test-only-session-secret-of-at-least-32-characters"

function compile(sourcePath, destination) {
  const source = fs.readFileSync(path.join(root, sourcePath), "utf8").replaceAll('"@/lib/', '"./')
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } })
  fs.writeFileSync(path.join(sandbox, destination), result.outputText)
}
compile("lib/live-store.ts", "live-store.js")
compile("lib/signal-game.ts", "signal-game.js")
compile("app/api/live/route.ts", "live-route.js")
compile("app/api/game/route.ts", "game-route.js")
compile("app/api/leaderboard/route.ts", "leaderboard-route.js")
const store = require(path.join(sandbox, "live-store.js"))
const game = require(path.join(sandbox, "signal-game.js"))
const liveApi = require(path.join(sandbox, "live-route.js"))
const gameApi = require(path.join(sandbox, "game-route.js"))
const scoresApi = require(path.join(sandbox, "leaderboard-route.js"))
let passed = 0

async function check(name, test) {
  await test()
  passed++
  console.log(`PASS ${name}`)
}
function failure(code) { return (error) => error instanceof store.ApiError && error.code === code }
async function together(operations) {
  const results = await Promise.allSettled(operations)
  const failed = results.find((result) => result.status === "rejected")
  if (failed) throw failed.reason
  return results.map((result) => result.value)
}
function request(endpoint, body, cookie, origin = "https://portfolio.test") {
  return new Request(`https://portfolio.test/api/${endpoint}`, {
    method: "POST", headers: { "Content-Type": "application/json", Origin: origin, ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body),
  })
}

async function main() {
  await check("visitor retries and shared-browser tabs do not inflate views/online", () => {
    const state = store.emptyState()
    assert.deepEqual(store.recordVisit(state, "session-aaaaaaaa", "view-aaaaaaaaaaa", 100_000), { views: 1, online: 1 })
    assert.deepEqual(store.recordVisit(state, "session-aaaaaaaa", "view-aaaaaaaaaaa", 120_000), { views: 1, online: 1 })
    assert.deepEqual(store.recordVisit(state, "session-aaaaaaaa", "view-bbbbbbbbbbb", 125_000), { views: 2, online: 1 })
    assert.deepEqual(store.recordVisit(state, "session-bbbbbbbb", "view-ccccccccccc", 130_000), { views: 3, online: 2 })
    assert.deepEqual(store.liveSnapshot(state, 190_000), { views: 3, online: 0 })
    store.cleanup(state, 25 * 60 * 60_000)
    assert.equal(Object.keys(state.viewed).length, 0)
    assert.equal(state.views, 3)
  })
  await check("view rate limits and inherited object keys are rejected", () => {
    const state = store.emptyState()
    for (let index = 0; index < 20; index++) store.recordVisit(state, "session-aaaaaaaa", `view-${index}`, 100_000)
    assert.throws(() => store.recordVisit(state, "session-aaaaaaaa", "excess-view", 100_001), failure("rate_limit"))
    assert.equal(store.validId("__defineGetter__"), false)
    assert.equal(store.validId(crypto.randomUUID()), true)
  })
  await check("concurrent file transactions persist every increment", async () => {
    await together(Array.from({ length: 35 }, (_, index) => store.transact((state) => store.recordVisit(state, `session-${index}`, `view-${index}`, Date.now()))))
    const { state, mode } = await store.readState()
    assert.equal(mode, "local")
    assert.equal(state.views, 35)
    const onDisk = JSON.parse(fs.readFileSync(path.join(process.env.PORTFOLIO_DATA_DIR, "state.json"), "utf8"))
    assert.equal(onDisk.views, 35)
    assert.equal(fs.existsSync(path.join(process.env.PORTFOLIO_DATA_DIR, "state.lock")), false)
  })
  await check("concurrent first game sessions never sign with a partially written local secret", async () => {
    const previousDirectory = process.env.PORTFOLIO_DATA_DIR
    const previousSecret = process.env.PORTFOLIO_SESSION_SECRET
    process.env.PORTFOLIO_DATA_DIR = path.join(sandbox, "secret-bootstrap")
    delete process.env.PORTFOLIO_SESSION_SECRET
    const filePromises = require("node:fs/promises")
    const originalWriteFile = filePromises.writeFile
    // Simulate a slow first disk write, keeping its newly created file empty.
    filePromises.writeFile = async (file, data, options) => {
      if (String(file).endsWith("session.key")) {
        const handle = await filePromises.open(file, options.flag, options.mode)
        try {
          await new Promise((resolve) => setTimeout(resolve, 150))
          await handle.writeFile(data)
        } finally { await handle.close() }
      } else return originalWriteFile(file, data, options)
    }
    try {
      const owners = await together(Array.from({ length: 12 }, () => store.gameOwner(request("game", { action: "start" }), true)))
      const secret = fs.readFileSync(path.join(process.env.PORTFOLIO_DATA_DIR, "session.key"), "utf8")
      assert.match(secret, /^[a-f0-9]{64}$/)
      for (const owner of owners) {
        const verified = await store.gameOwner(request("game", {}, owner.cookie), false)
        assert.equal(verified.id, owner.id)
      }
      assert.equal(new Set(owners.map((owner) => owner.id)).size, 12)
    } finally {
      filePromises.writeFile = originalWriteFile
      process.env.PORTFOLIO_DATA_DIR = previousDirectory
      process.env.PORTFOLIO_SESSION_SECRET = previousSecret
    }
  })
  await check("serverless hosting without a database fails honestly", async () => {
    process.env.VERCEL = "1"
    const response = await liveApi.GET()
    assert.equal(response.status, 503)
    assert.equal((await response.json()).code, "storage_unavailable")
    delete process.env.VERCEL
  })
  await check("correct answers enforce observation timing and retry idempotently", () => {
    const state = store.emptyState()
    const run = game.startRun(state, "owner", 100_000)
    assert.equal(run.pattern.length, 3)
    assert.throws(() => game.answerRun(state, run.id, "owner", run.pattern, 101_000), failure("too_early"))
    const next = game.answerRun(state, run.id, "owner", run.pattern, 102_150)
    assert.equal(next.round, 2)
    assert.equal(next.score, 100)
    assert.equal(next.pattern.length, 4)
    assert.deepEqual(game.answerRun(state, run.id, "owner", run.pattern, 103_000), next)
    assert.throws(() => game.answerRun(state, run.id, "stranger", next.pattern, 110_000), failure("run_not_found"))
    assert.throws(() => game.answerRun(state, run.id, "owner", next.pattern, 700_000), failure("run_expired"))
  })
  await check("ten rounds finish at exactly 1000 server-calculated points", () => {
    const state = store.emptyState()
    let now = 100_000
    let response = game.startRun(state, "owner", now)
    for (let round = 1; round <= 10; round++) {
      now += response.pattern.length * 600 + 350
      response = game.answerRun(state, response.id, "owner", [...response.pattern], now)
    }
    assert.equal(response.status, "finished")
    assert.equal(response.score, 1000)
    assert.equal(response.durationMs, now - 100_000)
    assert.equal(response.round, 10)
  })
  await check("wrong answers finish immediately and claims cannot be replayed", () => {
    const state = store.emptyState()
    const run = game.startRun(state, "owner", 100_000)
    const wrong = [(run.pattern[0] + 1) % 9]
    const end = game.answerRun(state, run.id, "owner", wrong, 100_001)
    assert.equal(end.status, "finished")
    assert.equal(end.score, 0)
    const saved = game.claimRun(state, run.id, "owner", "ABC", 100_005)
    assert.equal(saved.length, 1)
    assert.deepEqual(game.claimRun(state, run.id, "owner", "ABC", 100_006), saved)
    assert.throws(() => game.claimRun(state, run.id, "owner", "XYZ", 100_007), failure("run_claimed"))
    assert.deepEqual(game.answerRun(state, run.id, "owner", wrong, 100_009), end)
    assert.equal(state.entries.length, 1)
  })
  await check("leaderboard keeps only three entries, ordered by score then duration", () => {
    const state = store.emptyState()
    const candidates = [{ initials: "AAA", rounds: 1, wait: 10 }, { initials: "BBB", rounds: 2, wait: 10 }, { initials: "CCC", rounds: 2, wait: 20 }, { initials: "DDD", rounds: 3, wait: 10 }]
    for (let index = 0; index < candidates.length; index++) {
      const item = candidates[index]
      const owner = `owner-${index}`
      let now = 100_000
      let response = game.startRun(state, owner, now)
      for (let round = 0; round < item.rounds; round++) {
        now += response.pattern.length * 600 + 350 + item.wait
        response = game.answerRun(state, response.id, owner, [...response.pattern], now)
      }
      game.answerRun(state, response.id, owner, [(response.pattern[0] + 1) % 9], now + 1)
      game.claimRun(state, response.id, owner, item.initials, now + 2)
    }
    assert.deepEqual(game.leaderboard(state).map((entry) => entry.initials), ["DDD", "BBB", "CCC"])
    assert.equal(state.entries.length, 3)
  })
  await check("route integration protects origin, cookie ownership, bodies and client scores", async () => {
    let response = await liveApi.POST(request("live", { sessionId: crypto.randomUUID(), viewId: crypto.randomUUID() }, undefined, "https://attacker.test"))
    assert.equal(response.status, 403)
    response = await liveApi.POST(request("live", { sessionId: crypto.randomUUID(), viewId: crypto.randomUUID(), large: "x".repeat(3000) }))
    assert.equal(response.status, 413)
    response = await gameApi.POST(request("game", { action: "start" }))
    assert.equal(response.status, 200)
    const cookie = response.headers.get("set-cookie")
    assert.match(cookie, /HttpOnly/)
    assert.match(cookie, /SameSite=Strict/)
    const run = await response.json()
    response = await gameApi.POST(request("game", { action: "answer", id: run.id, sequence: [(run.pattern[0] + 1) % 9] }))
    assert.equal(response.status, 401)
    response = await gameApi.POST(request("game", { action: "answer", id: run.id, sequence: [(run.pattern[0] + 1) % 9] }, cookie))
    assert.equal(response.status, 200)
    assert.equal((await response.json()).status, "finished")
    response = await scoresApi.POST(request("leaderboard", { id: run.id, initials: "AAA", score: 999999 }, cookie))
    assert.equal(response.status, 400)
    response = await scoresApi.POST(request("leaderboard", { id: run.id, initials: "AAA" }, cookie))
    assert.equal(response.status, 200)
    const saved = await response.json()
    assert.equal(saved.entries[0].score, 0)
    response = await scoresApi.POST(request("leaderboard", { id: run.id, initials: "AAA" }, cookie))
    assert.deepEqual((await response.json()).entries, saved.entries)
    response = await scoresApi.GET()
    assert.equal(response.headers.get("cache-control"), "no-store, max-age=0")
  })
  console.log(`${passed} backend checks passed.`)
}

main().catch((error) => { console.error(error); process.exitCode = 1 }).finally(() => {
  if (!sandbox.startsWith(sandboxRoot + path.sep)) throw new Error("Refusing to remove outside test directory")
  fs.rmSync(sandbox, { recursive: true, force: true })
})
