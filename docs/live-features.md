# Live visitors and Signal Sprint

The counters and leaderboard start empty. All values come from the server; there are no seeded scores or simulated visitors.

## Storage setup

Local development works without credentials. `.portfolio-data/state.json` stores the view total, recent anonymous sessions and the top three scores. An exclusive file lock serializes Next.js workers; state writes use a flushed temporary file followed by an atomic rename. Keep this directory on a persistent local disk for a single-machine deployment, and include it in backups. The directory also contains the automatically generated game-session signing key. Do not commit it.

For Vercel, other serverless hosting, or multiple application servers, privately configure `MONGODB_URI` and `PORTFOLIO_SESSION_SECRET` (32 or more random characters) from `.env.example` in your deployment environment. `MONGODB_DB` defaults to `ayeen_portfolio`. For local development with MongoDB, put these values in an ignored `.env.local`; do not paste credentials in public issues, source files or chat. The database user needs read/write access to that database, and the database network access settings must allow the hosting environment. Use a separate `PORTFOLIO_STORE_KEY` or database for previews. Enable database backups appropriate to your host.

Shared mode stores a bounded document in MongoDB's `portfolio_state` collection. Each update uses an atomic revision-checked write, majority write concern, and retries contention against fresh state. This prevents lost increments and duplicate game submissions across application instances. Connections are reused across warm serverless requests with a small pool. There is no fallback to memory or temporary files if MongoDB fails. Vercel, Lambda and Netlify deployments without MongoDB return HTTP 503. Unknown serverless platforms must also be configured with MongoDB; local mode is only for a persistent single-host disk. The single-document transaction design is appropriate for a personal portfolio, not a large analytics platform.

## Counting rules

- The browser keeps a random session ID in localStorage and a fresh view ID for each page mount. `POST /api/live` accepts `{sessionId, viewId}` and is sent every 20 seconds while the page is visible. A session seen in the last 60 seconds is online. Tabs sharing the same session count as one visitor.
- The first heartbeat for a view ID adds one view; retries and later heartbeats do not. The deduplication record expires after 24 hours without a heartbeat. This is a page-view counter, not an all-time unique-person count.
- View IDs and recent sessions are anonymous. No IP address, user-agent, browsing history or email is stored. Inactive sessions expire after five minutes, unused view IDs after 24 hours, and game records after ten minutes. Cleanup occurs on writes. Public GET responses compute online status using timestamps even before cleanup.
- New views are limited to 20 per minute per anonymous session, 5,000 recent sessions and 50,000 remembered view IDs. Capacity failures return an honest unavailable state. Clearing browser storage can create a new anonymous session; these counters are not billing-grade analytics or bot detection.
- Both live endpoints return `{views, online, mode}`. `mode` is `local` or `shared` for integration diagnostics.

## Game and leaderboard

`POST /api/game` with `{action:"start"}` returns `{id,pattern,round:1,score:0,status:"playing",expiresAt}`. Pattern entries are tile indices 0–8. The first pattern has three tiles, each successful round adds a tile, and the run ends after ten successful rounds or the first incorrect answer. The entire run expires ten minutes after it starts.

`POST /api/game` with `{action:"answer",id,sequence}` checks the submitted sequence on the server. A correct answer cannot be accepted before `pattern.length * 600 + 350` milliseconds have passed since the server issued that round. An incorrect answer ends the run immediately. The server awards 100 points per completed round, to a maximum of 1,000, and calculates duration. A duplicate of the most recent answer is idempotent. Finished responses are `{id,status:"finished",score,durationMs,round}`.

`GET /api/leaderboard` returns `{entries:[{initials,score,durationMs}],mode}` with at most three entries. Scores sort descending, then elapsed time ascending. `POST /api/leaderboard` accepts only `{id,initials}`; initials are exactly three uppercase ASCII letters or digits. A completed run can be claimed once by its originating signed HttpOnly cookie session. An identical save retry returns the current leaderboard without inserting again; attempts to rename an already claimed run fail. Sending a client score or duration is rejected.

Anonymous starts are limited to six per minute per signed browser cookie and 120 globally per minute; at most 1,200 unexpired runs are kept. Request bodies are capped at 2 KB. Cross-origin writes are rejected, and public reads are never cached. API errors return `{error,code,retryAfter?}` with HTTP 400/401/403/404/409/410/413/415/429/503 as appropriate; retryable errors also set `Retry-After`.

The game verifies scoring and ownership, but it is a casual game, not cheat-proof competition: a determined script can read the pattern sent to a browser. Do not award valuable prizes based on this leaderboard.

## Verification

Run `node scripts/test-live-features.cjs` for deterministic behavioral checks of visit deduplication, concurrent persistence, game timing/ownership/expiry, replay handling and top-three ordering. The script compiles only the backend modules to a temporary directory, uses isolated storage, and never contacts a configured production MongoDB database.

For a deployed smoke test, visit the site from two different browsers, confirm online rises to two, then hide/close one for over 60 seconds. Reloading should add one page view; waiting through heartbeats should not. Finish a run and save three initials, then verify the entry from the other browser. Restart the service and verify the cumulative views and leaderboard survive.

MongoDB uses [single-document atomic writes](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/). Counters and scores become shared across browsers and deployment instances once the production database environment variables are configured.
