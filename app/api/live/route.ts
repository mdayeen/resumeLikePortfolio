import { ApiError, apiFailure, apiJson, assertSameOrigin, liveSnapshot, readJson, readState, recordVisit, transact, validId } from "@/lib/live-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { state, mode } = await readState()
    return apiJson({ ...liveSnapshot(state, Date.now()), mode })
  } catch (error) { return apiFailure(error) }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request)
    const { sessionId, viewId } = await readJson(request)
    if (!validId(sessionId) || !validId(viewId)) throw new ApiError(400, "invalid_visit", "A valid anonymous session and page view are required.")
    const { value, mode } = await transact((state) => recordVisit(state, sessionId, viewId, Date.now()))
    return apiJson({ ...value, mode })
  } catch (error) { return apiFailure(error) }
}
