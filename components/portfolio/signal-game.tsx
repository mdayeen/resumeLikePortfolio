"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  Play,
  RotateCcw,
  Trophy,
  VolumeX,
} from "lucide-react";
import s from "./signal-game.module.css";

type PlayingSession = {
  id: string;
  pattern: number[];
  round: number;
  score: number;
  status: "playing";
  expiresAt: number | string;
};
type FinishedSession = {
  id: string;
  status: "finished";
  score: number;
  durationMs: number;
  round: number;
};
type GameSession = PlayingSession | FinishedSession;
type Entry = { initials: string; score: number; durationMs: number };
type Phase =
  | "idle"
  | "loading"
  | "watch"
  | "repeat"
  | "checking"
  | "feedback"
  | "finished"
  | "error";
type PendingRequest =
  | { action: "start" }
  | { action: "answer"; id: string; sequence: number[] };

const phaseLabels: Record<Phase, string> = {
  idle: "Ready when you are",
  loading: "Connecting…",
  watch: "Watch the signal",
  repeat: "Your turn. Repeat it.",
  checking: "Checking your signal…",
  feedback: "Signal received. Level up.",
  finished: "Run complete",
  error: "Connection interrupted",
};

function elapsed(ms: number) {
  return `${Math.max(1, Math.round(ms / 1000))}s`;
}

export function SignalGame({ motion }: { motion: boolean }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [session, setSession] = useState<GameSession | null>(null);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [watchStep, setWatchStep] = useState(0);
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [boardState, setBoardState] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [boardMode, setBoardMode] = useState<"local" | "shared">("local");
  const [initials, setInitials] = useState("");
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [saveError, setSaveError] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const sessionRef = useRef<GameSession | null>(null);
  const inputRef = useRef<number[]>([]);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const boardRequestRef = useRef<AbortController | null>(null);
  const saveRequestRef = useRef<AbortController | null>(null);
  const pendingRef = useRef<PendingRequest | null>(null);
  const generationRef = useRef(0);
  const mountedRef = useRef(false);

  const changePhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = null;
  }, []);

  const later = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      if (mountedRef.current) callback();
    }, delay);
    timersRef.current.add(timer);
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    if (boardRequestRef.current || document.hidden) return;
    const controller = new AbortController();
    boardRequestRef.current = controller;
    try {
      const response = await fetch("/api/leaderboard", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Leaderboard unavailable");
      const data = await response.json();
      if (!Array.isArray(data.entries))
        throw new Error("Leaderboard unavailable");
      if (mountedRef.current && !controller.signal.aborted) {
        setEntries(data.entries.slice(0, 3));
        setBoardMode(data.mode === "shared" ? "shared" : "local");
        setBoardState("ready");
      }
    } catch {
      if (mountedRef.current && !controller.signal.aborted)
        setBoardState("error");
    } finally {
      if (boardRequestRef.current === controller)
        boardRequestRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void refreshLeaderboard();
    const poll = setInterval(() => void refreshLeaderboard(), 30_000);
    const onVisibility = () => {
      if (!document.hidden) void refreshLeaderboard();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mountedRef.current = false;
      generationRef.current += 1;
      clearTimers();
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisibility);
      requestRef.current?.abort();
      boardRequestRef.current?.abort();
      boardRequestRef.current = null;
      saveRequestRef.current?.abort();
    };
  }, [clearTimers, refreshLeaderboard]);

  const playPattern = useCallback(
    (next: PlayingSession) => {
      clearTimers();
      inputRef.current = [];
      setInput([]);
      setActiveTile(null);
      setWatchStep(0);
      changePhase("watch");
      next.pattern.forEach((tile, index) => {
        later(
          () => {
            setActiveTile(tile);
            setWatchStep(index + 1);
          },
          350 + index * 600,
        );
        later(() => setActiveTile(null), 350 + index * 600 + 430);
      });
      later(
        () => {
          setActiveTile(null);
          changePhase("repeat");
        },
        350 + next.pattern.length * 600,
      );
    },
    [changePhase, clearTimers, later],
  );

  const requestGame = useCallback(
    async (request: PendingRequest) => {
      requestRef.current?.abort();
      const controller = new AbortController();
      requestRef.current = controller;
      const generation = generationRef.current;
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, 15_000);
      pendingRef.current = request;
      changePhase(request.action === "start" ? "loading" : "checking");
      setMessage("");
      try {
        const response = await fetch("/api/game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(
            data.error || "The server could not check this run. Try again.",
          );
        if (data.status !== "playing" && data.status !== "finished")
          throw new Error("The game could not connect. Please retry.");
        if (
          !mountedRef.current ||
          controller.signal.aborted ||
          generation !== generationRef.current
        )
          return;
        const next = data as GameSession;
        sessionRef.current = next;
        setSession(next);
        pendingRef.current = null;
        if (next.status === "finished") {
          clearTimers();
          setActiveTile(null);
          changePhase("finished");
          setMessage(
            next.score === 1000
              ? "All 10 rounds decoded. Beautiful work."
              : `Signal lost on round ${next.round}. Try for a longer streak.`,
          );
        } else if (request.action === "start") {
          playPattern(next);
        } else {
          setActiveTile(null);
          changePhase("feedback");
          later(() => playPattern(next), 850);
        }
      } catch (error) {
        if (
          !mountedRef.current ||
          (controller.signal.aborted && !timedOut) ||
          generation !== generationRef.current
        )
          return;
        clearTimers();
        setActiveTile(null);
        changePhase("error");
        setMessage(
          timedOut
            ? "The connection took too long. Retry to continue your run."
            : error instanceof Error
              ? error.message
              : "Connection interrupted. Retry to continue your run.",
        );
      } finally {
        clearTimeout(timeout);
        if (requestRef.current === controller) requestRef.current = null;
      }
    },
    [changePhase, clearTimers, later, playPattern],
  );

  const startGame = useCallback(() => {
    rootRef.current?.focus({ preventScroll: true });
    generationRef.current += 1;
    requestRef.current?.abort();
    saveRequestRef.current?.abort();
    clearTimers();
    sessionRef.current = null;
    inputRef.current = [];
    setSession(null);
    setInput([]);
    setActiveTile(null);
    setInitials("");
    setSaveState("idle");
    setSaveError("");
    void requestGame({ action: "start" });
  }, [clearTimers, requestGame]);

  const selectTile = useCallback(
    (tile: number) => {
      const current = sessionRef.current;
      if (phaseRef.current !== "repeat" || current?.status !== "playing")
        return;
      const next = [...inputRef.current, tile];
      inputRef.current = next;
      setInput(next);
      setActiveTile(tile);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        if (mountedRef.current) setActiveTile(null);
        flashTimerRef.current = null;
      }, 160);
      if (next.length === current.pattern.length) {
        changePhase("checking");
        void requestGame({ action: "answer", id: current.id, sequence: next });
      }
    },
    [changePhase, requestGame],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.altKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.repeat
    )
      return;
    if (/^[1-9]$/.test(event.key) && phaseRef.current === "repeat") {
      event.preventDefault();
      selectTile(Number(event.key) - 1);
    } else if (
      event.key === "Enter" &&
      event.target === rootRef.current &&
      ["idle", "finished"].includes(phaseRef.current)
    ) {
      event.preventDefault();
      startGame();
    }
  };

  const saveScore = async () => {
    const current = sessionRef.current;
    if (
      current?.status !== "finished" ||
      saveRequestRef.current ||
      initials.length !== 3
    )
      return;
    const controller = new AbortController();
    saveRequestRef.current = controller;
    const generation = generationRef.current;
    setSaveState("saving");
    setSaveError("");
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: current.id, initials }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Your score could not be saved. Try again.",
        );
      if (
        !mountedRef.current ||
        controller.signal.aborted ||
        generation !== generationRef.current
      )
        return;
      setSaveState("saved");
      boardRequestRef.current?.abort();
      boardRequestRef.current = null;
      void refreshLeaderboard();
    } catch (error) {
      if (
        !mountedRef.current ||
        controller.signal.aborted ||
        generation !== generationRef.current
      )
        return;
      setSaveState("error");
      setSaveError(
        error instanceof Error
          ? error.message
          : "Your score could not be saved. Try again.",
      );
    } finally {
      if (saveRequestRef.current === controller) saveRequestRef.current = null;
    }
  };

  const patternLength =
    session?.status === "playing" ? session.pattern.length : 3;
  const inProgress = [
    "loading",
    "watch",
    "repeat",
    "checking",
    "feedback",
  ].includes(phase);
  const score = session?.score ?? 0;

  return (
    <div
      ref={rootRef}
      className={s.game}
      data-motion={motion ? "on" : "off"}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Signal Sprint memory game"
    >
      <div className={s.console}>
        <div className={s.consoleTop}>
          <span>
            <span className={s.statusDot} /> SIGNAL SPRINT / 001
          </span>
          <span className={s.silent}>
            <VolumeX size={13} aria-hidden="true" /> SILENT BY DESIGN
          </span>
        </div>
        <div className={s.arena}>
          <div className={s.instructions}>
            <span className={s.kicker}>
              A little less scrolling.
              <br />A little more focus.
            </span>
            <h3>
              Catch the
              <br />
              <span>signal.</span>
            </h3>
            <p>
              Watch the tiles light up. Repeat the pattern in order. Every round
              adds one more signal.
            </p>
            <div className={s.rules}>
              <span>
                <b>01</b> Watch
              </span>
              <i aria-hidden="true">→</i>
              <span>
                <b>02</b> Remember
              </span>
              <i aria-hidden="true">→</i>
              <span>
                <b>03</b> Repeat
              </span>
            </div>
            <div className={s.stats}>
              <div>
                <span>ROUND</span>
                <strong>
                  {String(session?.round ?? 0).padStart(2, "0")}
                  <small>/10</small>
                </strong>
              </div>
              <div>
                <span>SCORE</span>
                <strong>{String(score).padStart(3, "0")}</strong>
              </div>
            </div>
            {phase === "idle" ? (
              <button className={s.start} onClick={startGame}>
                <Play size={15} fill="currentColor" aria-hidden="true" /> Play a
                round <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            ) : phase === "finished" ? (
              <div className={s.result}>
                <p>{message}</p>
                {score > 0 && saveState !== "saved" ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      void saveScore();
                    }}
                    className={s.saveForm}
                  >
                    <label htmlFor="signal-initials">
                      Put your initials on the board
                    </label>
                    <div>
                      <input
                        id="signal-initials"
                        aria-label="Three initials for the leaderboard"
                        placeholder="YOU"
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        maxLength={3}
                        pattern="[A-Z0-9]{3}"
                        value={initials}
                        disabled={saveState === "saving"}
                        onChange={(event) =>
                          setInitials(
                            event.target.value
                              .toUpperCase()
                              .replace(/[^A-Z0-9]/g, "")
                              .slice(0, 3),
                          )
                        }
                      />
                      <button
                        type="submit"
                        disabled={
                          initials.length !== 3 || saveState === "saving"
                        }
                      >
                        {saveState === "saving" ? "Saving…" : "Save score"}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                    {saveError && (
                      <span className={s.error} role="alert">
                        {saveError}
                      </span>
                    )}
                  </form>
                ) : saveState === "saved" ? (
                  <span className={s.saved} role="status">
                    <Check size={15} aria-hidden="true" /> Score saved. Only the
                    top 3 make the board.
                  </span>
                ) : (
                  <p className={s.hint}>
                    Complete a round to get on the board.
                  </p>
                )}
                <button
                  className={s.restart}
                  onClick={startGame}
                  disabled={saveState === "saving"}
                >
                  <RotateCcw size={14} aria-hidden="true" /> Another run
                </button>
              </div>
            ) : phase === "error" ? (
              <div className={s.result}>
                <p className={s.error} role="alert">
                  {message}
                </p>
                <button
                  className={s.start}
                  onClick={() =>
                    pendingRef.current && void requestGame(pendingRef.current)
                  }
                >
                  Retry connection <RotateCcw size={15} aria-hidden="true" />
                </button>
                <button className={s.restart} onClick={startGame}>
                  Start a new run
                </button>
              </div>
            ) : (
              <div className={s.runNote}>
                <span className={s.signalLine} aria-hidden="true" />
                <p>
                  {phase === "repeat"
                    ? `${input.length} of ${patternLength} signals entered`
                    : phase === "feedback"
                      ? "Clean connection. Here comes the next one."
                      : phase === "watch"
                        ? "Eyes on the grid. Your turn is next."
                        : "One moment…"}
                </p>
              </div>
            )}
            <span className={s.keyboard}>
              CLICK / TAP / KEYS 1–9 <span>•</span> 10 ROUNDS
            </span>
          </div>
          <div className={s.boardArea}>
            <div
              className={s.phase}
              data-phase={phase}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className={s.phaseMarker} aria-hidden="true" />
              {phaseLabels[phase]}
            </div>
            <div
              className={s.tiles}
              role="group"
              aria-label="Nine signal tiles"
            >
              {Array.from({ length: 9 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={s.tile}
                  data-active={activeTile === index}
                  data-ready={phase === "repeat"}
                  aria-label={`Tile ${index + 1}`}
                  aria-disabled={phase !== "repeat"}
                  aria-pressed={activeTile === index}
                  onClick={() => selectTile(index)}
                  tabIndex={phase === "repeat" ? 0 : -1}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className={s.tileCircuit}
                    aria-hidden="true"
                  >
                    <path d="M8 32V8h24M68 8h24v24M92 68v24H68M32 92H8V68" />
                    <path d="M39 50h22M50 39v22" />
                  </svg>
                  <span>{index + 1}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
            <div
              className={s.progress}
              aria-label={
                phase === "watch"
                  ? `Showing ${watchStep} of ${patternLength} signals`
                  : `${input.length} of ${patternLength} signals entered`
              }
            >
              {Array.from({ length: patternLength }, (_, index) => (
                <span
                  key={index}
                  data-lit={
                    phase === "watch" ? index < watchStep : index < input.length
                  }
                />
              ))}
            </div>
            <div className={s.boardCaption}>
              <span>
                {inProgress
                  ? "TRANSMISSION IN PROGRESS"
                  : "MAKE A LITTLE TIME FOR PLAY"}
              </span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.leaderboard}>
        <div className={s.leaderboardTitle}>
          <Trophy size={16} aria-hidden="true" />
          <h4>The top three</h4>
          <span>{boardMode === "shared" ? "GLOBAL BOARD" : "LOCAL BOARD"}</span>
        </div>
        {entries.length > 0 ? (
          <ol className={s.ranking}>
            {entries.map((entry, index) => (
              <li key={`${entry.initials}-${index}`}>
                <span className={s.rank}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{entry.initials}</strong>
                <span>
                  {entry.score}
                  <small>PTS</small>
                </span>
                <time>{elapsed(entry.durationMs)}</time>
              </li>
            ))}
          </ol>
        ) : (
          <p className={s.empty}>
            {boardState === "loading"
              ? "Receiving high scores…"
              : boardState === "error"
                ? "The board is taking a breather."
                : "A clean slate. The first spot could be yours."}
          </p>
        )}
        {boardState === "error" && (
          <button
            className={s.boardRetry}
            onClick={() => void refreshLeaderboard()}
          >
            Refresh scores <RotateCcw size={12} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
