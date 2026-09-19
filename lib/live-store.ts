import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto"
import { mkdir, open, readFile, rename, stat, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { MongoClient, type Collection } from "mongodb"

export type StoreMode = "local" | "shared"
type TimedCounter = { count: number; until: number }
type Visitor = { seenAt: number; views: TimedCounter }
export type StoredRun = {
  id: string
  owner: string
  pattern: number[]
  round: number
  score: number
  status: "playing" | "finished"
  startedAt: number
  roundAt: number
  expiresAt: number
  durationMs?: number
  lastAnswer?: number[]
  claimedInitials?: string
}
export type LeaderboardEntry = { initials: string; score: number; durationMs: number }
export type StoredEntry = LeaderboardEntry & { id: string; achievedAt: number }
export type PortfolioState = {
  version: 1
  views: number
  visitors: Record<string, Visitor>
  viewed: Record<string, number>
  runs: Record<string, StoredRun>
  limits: Record<string, TimedCounter>
  entries: StoredEntry[]
}

export const ONLINE_TTL = 60_000
const DEDUP_TTL = 24 * 60 * 60_000
const STORE_KEY = process.env.PORTFOLIO_STORE_KEY || "mdayeen:portfolio:v1"
const COOKIE_NAME = "portfolio_game"
const idPattern = /^[a-zA-Z0-9_-]{16,100}$/

export class ApiError extends Error {
  status: number
  code: string
  retryAfter?: number
  constructor(status: number, code: string, message: string, retryAfter?: number) {
    super(message)
    this.status = status
    this.code = code
    this.retryAfter = retryAfter
  }
}

export function emptyState(): PortfolioState {
  return { version: 1, views: 0, visitors: {}, viewed: {}, runs: {}, limits: {}, entries: [] }
}

export function storeMode(): StoreMode {
  const uri = process.env.MONGODB_URI
  if (uri) {
    if (!/^mongodb(?:\+srv)?:\/\//.test(uri)) {
      throw new ApiError(503, "storage_unavailable", "Live services are not configured yet.")
    }
    return "shared"
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY) {
    throw new ApiError(503, "storage_unavailable", "Live services are not configured yet.")
  }
  return "local"
}

function dataDirectory() {
  return process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), ".portfolio-data")
}

function decodeState(raw: string | null): PortfolioState {
  if (raw === null) return emptyState()
  try {
    const state = JSON.parse(raw) as PortfolioState
    if (state.version !== 1 || !Number.isSafeInteger(state.views) || state.views < 0 ||
      !state.visitors || !state.viewed || !state.runs || !state.limits || !Array.isArray(state.entries)) throw new Error("Invalid state")
    return state
  } catch {
    // A damaged store must never silently reset a real counter or leaderboard.
    throw new ApiError(503, "storage_unavailable", "Live services are temporarily unavailable.", 30)
  }
}

type StoreDocument = { _id: string; revision: number; state: PortfolioState }
const mongoGlobal = globalThis as typeof globalThis & { portfolioMongoClient?: Promise<MongoClient> }

async function collection(): Promise<Collection<StoreDocument>> {
  if (!mongoGlobal.portfolioMongoClient) {
    const client = new MongoClient(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
      socketTimeoutMS: 10_000,
      maxPoolSize: 5,
      maxIdleTimeMS: 30_000,
      retryWrites: true,
      writeConcern: { w: "majority", wtimeoutMS: 5_000 },
    })
    mongoGlobal.portfolioMongoClient = client.connect().catch((error) => {
      mongoGlobal.portfolioMongoClient = undefined
      void client.close()
      throw error
    })
  }
  const client = await mongoGlobal.portfolioMongoClient
  return client.db(process.env.MONGODB_DB || "ayeen_portfolio").collection<StoreDocument>("portfolio_state")
}

async function readLocal(): Promise<string | null> {
  try { return await readFile(path.join(dataDirectory(), "state.json"), "utf8") }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null
    throw error
  }
}

// An exclusive lock file serializes separate Next.js workers as well as one process.
// A crashed worker's lock becomes recoverable after 30 seconds.
async function lockLocal() {
  const directory = dataDirectory()
  await mkdir(directory, { recursive: true })
  const lockPath = path.join(directory, "state.lock")
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const lock = await open(lockPath, "wx", 0o600)
      return async () => { await lock.close(); await unlink(lockPath).catch(() => undefined) }
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      // Windows can report a delete-pending lock as EPERM/EACCES briefly.
      // Treat that exactly like contention, with the same bounded retry budget.
      if (code !== "EEXIST" && !(process.platform === "win32" && (code === "EPERM" || code === "EACCES"))) throw error
      const information = await stat(lockPath).catch(() => null)
      if (information && Date.now() - information.mtimeMs > 30_000) await unlink(lockPath).catch(() => undefined)
      await new Promise((resolve) => setTimeout(resolve, 20 + Math.random() * 20))
    }
  }
  throw new ApiError(503, "storage_busy", "Live services are busy. Please try again.", 3)
}

export async function readState() {
  const mode = storeMode()
  if (mode === "shared") {
    const document = await (await collection()).findOne({ _id: STORE_KEY })
    return { state: decodeState(document ? JSON.stringify(document.state) : null), mode }
  }
  return { state: decodeState(await readLocal()), mode }
}

export async function transact<T>(change: (state: PortfolioState) => T): Promise<{ value: T; mode: StoreMode }> {
  const mode = storeMode()
  if (mode === "shared") {
    // Every attempt rechecks preconditions against the latest state. MongoDB's
    // atomic revision check prevents lost views, duplicate awards and replayed claims.
    const documents = await collection()
    for (let attempt = 0; attempt < 12; attempt++) {
      const document = await documents.findOne({ _id: STORE_KEY })
      const state = decodeState(document ? JSON.stringify(document.state) : null)
      const value = change(state)
      if (document) {
        const result = await documents.updateOne({ _id: STORE_KEY, revision: document.revision }, { $set: { state }, $inc: { revision: 1 } })
        if (result.matchedCount === 1) return { value, mode }
      } else {
        try {
          await documents.insertOne({ _id: STORE_KEY, revision: 1, state })
          return { value, mode }
        } catch (error) {
          if ((error as { code?: number }).code !== 11000) throw error
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 10 + Math.random() * 40))
    }
    throw new ApiError(503, "storage_busy", "Live services are busy. Please try again.", 3)
  }
  const unlock = await lockLocal()
  let temporary: string | undefined
  try {
    const state = decodeState(await readLocal())
    const value = change(state)
    temporary = path.join(dataDirectory(), `state-${randomUUID()}.tmp`)
    const handle = await open(temporary, "wx", 0o600)
    try { await handle.writeFile(JSON.stringify(state)); await handle.sync() }
    finally { await handle.close() }
    await rename(temporary, path.join(dataDirectory(), "state.json"))
    return { value, mode }
  } finally {
    if (temporary) await unlink(temporary).catch(() => undefined)
    await unlock()
  }
}

export function cleanup(state: PortfolioState, now: number) {
  for (const [id, visitor] of Object.entries(state.visitors)) if (visitor.seenAt < now - 5 * 60_000) delete state.visitors[id]
  for (const [id, seenAt] of Object.entries(state.viewed)) if (seenAt < now - DEDUP_TTL) delete state.viewed[id]
  for (const [id, run] of Object.entries(state.runs)) if (run.expiresAt <= now) delete state.runs[id]
  for (const [id, limit] of Object.entries(state.limits)) if (limit.until <= now) delete state.limits[id]
}

export function liveSnapshot(state: PortfolioState, now: number) {
  return { views: state.views, online: Object.values(state.visitors).filter((visitor) => visitor.seenAt > now - ONLINE_TTL).length }
}

export function recordVisit(state: PortfolioState, sessionId: string, viewId: string, now: number) {
  cleanup(state, now)
  const visitor = state.visitors[sessionId] || { seenAt: now, views: { count: 0, until: now + 60_000 } }
  if (!state.visitors[sessionId] && Object.keys(state.visitors).length >= 5_000) {
    throw new ApiError(503, "capacity", "The live counter is busy. Please try again.", 60)
  }
  if (!state.viewed[viewId]) {
    if (Object.keys(state.viewed).length >= 50_000) throw new ApiError(503, "capacity", "The live counter is busy. Please try again.", 60)
    if (visitor.views.until <= now) visitor.views = { count: 0, until: now + 60_000 }
    if (visitor.views.count >= 20) throw new ApiError(429, "rate_limit", "Too many new page visits. Please wait a moment.", Math.ceil((visitor.views.until - now) / 1000))
    visitor.views.count += 1
    state.views += 1
  }
  state.viewed[viewId] = now
  visitor.seenAt = now
  state.visitors[sessionId] = visitor
  return liveSnapshot(state, now)
}

export function validId(value: unknown): value is string {
  return typeof value === "string" && idPattern.test(value) && !Object.prototype.hasOwnProperty.call(Object.prototype, value)
}

export function consumeLimit(state: PortfolioState, key: string, maximum: number, now: number) {
  let limit = state.limits[key]
  if (!limit || limit.until <= now) limit = { count: 0, until: now + 60_000 }
  if (limit.count >= maximum) throw new ApiError(429, "rate_limit", "Too many attempts. Please try again shortly.", Math.max(1, Math.ceil((limit.until - now) / 1000)))
  limit.count++
  state.limits[key] = limit
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const destination = new URL(request.url)
  const host = request.headers.get("host") || destination.host
  try {
    if (origin && new URL(origin).host === host && /^https?:$/.test(new URL(origin).protocol)) return
  } catch { /* Invalid origins are denied. */ }
  throw new ApiError(403, "invalid_origin", "This request must come from this portfolio.")
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new ApiError(415, "invalid_content_type", "Use a JSON request.")
  if (Number(request.headers.get("content-length") || 0) > 2048) throw new ApiError(413, "request_too_large", "This request is too large.")
  const reader = request.body?.getReader()
  if (!reader) throw new ApiError(400, "invalid_json", "A JSON request is required.")
  const chunks: Uint8Array[] = []
  let total = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > 2048) { await reader.cancel(); throw new ApiError(413, "request_too_large", "This request is too large.") }
    chunks.push(value)
  }
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"))
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Object required")
    return parsed
  } catch { throw new ApiError(400, "invalid_json", "A valid JSON object is required.") }
}

async function sessionSecret() {
  const configured = process.env.PORTFOLIO_SESSION_SECRET
  if (configured && configured.length >= 32) return configured
  if (storeMode() === "shared" || configured) throw new ApiError(503, "session_unavailable", "The game is not configured yet.")
  await mkdir(dataDirectory(), { recursive: true })
  const secretPath = path.join(dataDirectory(), "session.key")
  try {
    const existing = await readFile(secretPath, "utf8")
    if (/^[a-f0-9]{64}$/.test(existing)) return existing
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error }
  // A second worker can observe an empty file between creation and its write.
  // Recheck under the cross-process lock so no cookie uses a partial secret.
  const unlock = await lockLocal()
  try {
    try {
      const existing = await readFile(secretPath, "utf8")
      if (!/^[a-f0-9]{64}$/.test(existing)) throw new ApiError(503, "session_unavailable", "The game is temporarily unavailable.")
      return existing
    } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error }
    const generated = randomBytes(32).toString("hex")
    await writeFile(secretPath, generated, { flag: "wx", mode: 0o600 })
    return generated
  } finally { await unlock() }
}

export async function gameOwner(request: Request, create: boolean) {
  const secret = await sessionSecret()
  const cookie = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1)
  if (cookie) {
    const [id, signature] = cookie.split(".")
    if (validId(id) && /^[a-f0-9]{64}$/.test(signature || "")) {
      const expected = createHmac("sha256", secret).update(id).digest()
      if (timingSafeEqual(Buffer.from(signature, "hex"), expected)) return { id, cookie: undefined }
    }
  }
  if (!create) throw new ApiError(401, "session_required", "Please start a new game in this browser.")
  const id = randomUUID()
  const signature = createHmac("sha256", secret).update(id).digest("hex")
  const secure = new URL(request.url).protocol === "https:" || process.env.NODE_ENV === "production"
  return { id, cookie: `${COOKIE_NAME}=${id}.${signature}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=86400${secure ? "; Secure" : ""}` }
}

export function apiJson(body: unknown, status = 200, cookie?: string) {
  const headers: Record<string, string> = { "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff" }
  if (cookie) headers["Set-Cookie"] = cookie
  return Response.json(body, { status, headers })
}

export function apiFailure(error: unknown) {
  const failure = error instanceof ApiError ? error : new ApiError(503, "service_unavailable", "Live services are temporarily unavailable. Please try again.", 15)
  const response = apiJson({ error: failure.message, code: failure.code, ...(failure.retryAfter ? { retryAfter: failure.retryAfter } : {}) }, failure.status)
  if (failure.retryAfter) response.headers.set("Retry-After", String(failure.retryAfter))
  return response
}
