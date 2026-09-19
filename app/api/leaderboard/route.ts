import { ApiError, apiFailure, apiJson, assertSameOrigin, gameOwner, readJson, readState, transact, validId } from "@/lib/live-store"
import { claimRun, leaderboard } from "@/lib/signal-game"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { state, mode } = await readState()
    return apiJson({ entries: leaderboard(state), mode })
  } catch (error) { return apiFailure(error) }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request)
    const body = await readJson(request)
    const { id, initials } = body
    if (!validId(id) || typeof initials !== "string" || !/^[A-Z0-9]{3}$/.test(initials) || Object.keys(body).some((key) => !["id", "initials"].includes(key))) {
      throw new ApiError(400, "invalid_score", "Use three uppercase letters or numbers. Scores are calculated by the game.")
    }
    const owner = await gameOwner(request, false)
    const { value, mode } = await transact((state) => claimRun(state, id, owner.id, initials, Date.now()))
    return apiJson({ entries: value, mode })
  } catch (error) { return apiFailure(error) }
}
