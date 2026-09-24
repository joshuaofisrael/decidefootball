# Data source register — Phase-1 GREEN scaffold

**Entity:** Joshua Israel Ventures LLC  
**Site:** Decide Football / decidefootball.com  
**Register date:** 2026-09-17  
**Phase:** Repo scaffold only. No licensed sports API is purchased or called.

This file is the scaffold-phase register. It is not a claim that production pages use live GREEN sports data.

## Classification used here

| Class | Meaning |
|-------|---------|
| GREEN | Terms clearly permit intended commercial use |
| YELLOW | Possible with license/purchase/counsel; residual risk |
| RED | Do not integrate |
| FIXTURE | First-party synthetic rows for UI and tests. Never present as live verified injuries |

## Sources in this repository

| Source | Method | Class | In this scaffold? |
|--------|--------|-------|-------------------|
| First-party analysis (Joshua Israel Ventures LLC) | Internal projection / recommendation modules | GREEN | Yes — `src/lib/projections.ts`, `src/lib/recommendations.ts` |
| First-party fixture / sample rows | Compile-time TypeScript + optional Prisma seed | FIXTURE (first-party, not live) | Yes — `src/lib/fixtures.ts` |
| Weather.gov / NWS API | Official public API | GREEN | Interface only — no network call |
| Wikidata CC0 | Official API / dumps | GREEN | Enrichment stub only — no network call |
| BALLDONTLIE NFL API | Official paid API | YELLOW | **Not integrated.** Do not subscribe until Joshua approves spend + counsel |
| nflverse (CC BY 4.0) | GitHub releases | YELLOW | Not ingested |
| OpenWeatherMap | Official API | YELLOW | Not used; prefer NWS later |
| Genius Sports / Sportradar / SportsDataIO Leagues / MySportsFeeds / API-Sports / Yahoo Fantasy | Commercial / unclear | YELLOW | Not integrated |
| NFL.com consumer sites | Scrape / unlicensed commercial use | **RED** | Never |
| ESPN / Disney undocumented endpoints | Scrape / unlicensed | **RED** | Never |
| SportsDataIO Discovery Lab (hobby commercial redistribution) | Official hobby SKU | **RED** | Never |
| Sleeper public API without commercial license | Public HTTP | **RED** | Never |

## Hard rules for this phase

1. No sports data API keys. No purchases from this repo. Never Porkbun.
2. No scraping. No RED sources.
3. Fixture injury/status rows are labeled SAMPLE / FIXTURE. They are not live verified injuries.
4. `last_verified_at` and page `rendered_at` are stored and displayed as different timestamps.
5. Recommendations are computed from structured fixture metrics. AI explain is off (`AI_EXPLAIN_ENABLED=false`).
6. `COMPLIANCE_GATE=RED` is a kill switch. Fixture pages stay `noindex` until real GREEN (or counsel-accepted YELLOW) licensed data replaces them.
7. Sitemap emits only indexable URLs. Fixture sports URLs stay out. Editorial About, Methodology, and the reading guides may be listed when the gate is GREEN.

## Future licensed ingest (blocked)

After Joshua approves a monthly data spend ceiling and counsel accepts residual risk where needed:

1. Implement a licensed adapter behind `IngestAdapter` (`src/lib/jobs.ts`).
2. Store `source_class`, `source_run_id`, and verification stamps on every fact family.
3. Flip pages from FIXTURE → licensed rows only after quality gates pass.
4. Do not claim “official NFL data” unless the license and counsel say so.

See the pre-launch pack (`E-data-source-register`) for the full eighteen-source review dated 2026-09-17.
