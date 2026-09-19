import { ApiError, apiFailure, apiJson, assertSameOrigin, gameOwner, readJson, transact, validId } from "@/lib/live-store"
import { answerRun, startRun } from "@/lib/signal-game"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    assertSameOrigin(request)
    const { action, id, sequence } = await readJson(request)
    if (action !== "start" && action !== "answer") throw new ApiError(400, "invalid_action", "Choose start or answer.")
    if (action === "answer" && (!validId(id) || !Array.isArray(sequence) || sequence.length > 12 || sequence.length < 1 || sequence.some((tile) => !Number.isInteger(tile) || tile < 0 || tile > 8))) {
      throw new ApiError(400, "invalid_answer", "A valid game and tile sequence are required.")
    }
    const owner = await gameOwner(request, action === "start")
    const { value } = await transact((state) => action === "start" ? startRun(state, owner.id, Date.now()) : answerRun(state, id as string, owner.id, sequence as number[], Date.now()))
    return apiJson(value, 200, owner.cookie)
  } catch (error) { return apiFailure(error) }
}
