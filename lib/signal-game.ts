import { randomInt, randomUUID } from "node:crypto"
import { ApiError, cleanup, consumeLimit, type PortfolioState, type StoredRun } from "./live-store"

export const GAME_TTL = 10 * 60_000
export const MAX_ROUNDS = 10

function sameSequence(first: number[], second: number[]) {
  return first.length === second.length && first.every((value, index) => value === second[index])
}

export function runResponse(run: StoredRun) {
  if (run.status === "finished") return { id: run.id, status: run.status, score: run.score, durationMs: run.durationMs!, round: run.round }
  return { id: run.id, pattern: run.pattern, round: run.round, score: run.score, status: run.status, expiresAt: run.expiresAt }
}

export function startRun(state: PortfolioState, owner: string, now: number) {
  cleanup(state, now)
  consumeLimit(state, `start:${owner}`, 6, now)
  consumeLimit(state, "starts:global", 120, now)
  if (Object.keys(state.runs).length >= 1_200) throw new ApiError(503, "capacity", "The game is busy. Please try again shortly.", 60)
  const id = randomUUID()
  const run: StoredRun = {
    id, owner, pattern: Array.from({ length: 3 }, () => randomInt(9)), round: 1, score: 0,
    status: "playing", startedAt: now, roundAt: now, expiresAt: now + GAME_TTL,
  }
  state.runs[id] = run
  return runResponse(run)
}

function ownedRun(state: PortfolioState, id: string, owner: string, now: number) {
  const run = state.runs[id]
  if (!run || run.owner !== owner) throw new ApiError(404, "run_not_found", "This game could not be found. Start a new run.")
  if (run.expiresAt <= now) throw new ApiError(410, "run_expired", "This run has expired. Start a new game.")
  return run
}

export function answerRun(state: PortfolioState, id: string, owner: string, sequence: number[], now: number) {
  const run = ownedRun(state, id, owner, now)
  // Network retries return the prior result without advancing the round twice.
  if (run.lastAnswer && sameSequence(run.lastAnswer, sequence)) return runResponse(run)
  if (run.status === "finished") throw new ApiError(409, "run_finished", "This run is already finished.")
  const correct = sameSequence(run.pattern, sequence)
  const readyAt = run.roundAt + run.pattern.length * 600 + 350
  if (correct && now < readyAt) throw new ApiError(409, "too_early", "Watch the full pattern before answering.", Math.max(1, Math.ceil((readyAt - now) / 1000)))
  run.lastAnswer = [...sequence]
  if (correct) run.score += 100
  if (!correct || run.round === MAX_ROUNDS) {
    run.status = "finished"
    run.durationMs = Math.max(1, now - run.startedAt)
  } else {
    run.round++
    run.pattern = [...run.pattern, randomInt(9)]
    run.roundAt = now
  }
  return runResponse(run)
}

export function leaderboard(state: PortfolioState) {
  return state.entries.slice(0, 3).map(({ initials, score, durationMs }) => ({ initials, score, durationMs }))
}

export function claimRun(state: PortfolioState, id: string, owner: string, initials: string, now: number) {
  const run = ownedRun(state, id, owner, now)
  if (run.status !== "finished" || !Number.isSafeInteger(run.durationMs)) throw new ApiError(409, "run_unfinished", "Finish your run before saving a score.")
  if (run.claimedInitials) {
    if (run.claimedInitials === initials) return leaderboard(state)
    throw new ApiError(409, "run_claimed", "This run has already been saved.")
  }
  run.claimedInitials = initials
  state.entries.push({ id, initials, score: run.score, durationMs: run.durationMs!, achievedAt: now })
  state.entries.sort((a, b) => b.score - a.score || a.durationMs - b.durationMs || a.achievedAt - b.achievedAt || a.id.localeCompare(b.id))
  state.entries = state.entries.slice(0, 3)
  return leaderboard(state)
}
