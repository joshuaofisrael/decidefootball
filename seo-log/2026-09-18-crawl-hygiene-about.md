# 2026-09-18 — Crawl hygiene + indexable About

**Date:** 18 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Highest-EV pre-launch SEO change for this phase.

## Why this action

There is no Search Console or Analytics data yet, and licensed sports data is not approved for indexable player pages. Fixture decision URLs correctly stay `noindex`, but `robots.txt` still allowed `/`, so crawlers could spend budget on sample sports paths. The sitemap was empty, so Google had no genuine URL to discover once the custom-domain certificate and crawling catch up.

An editorial About page plus a crawlable Methodology page gives one real brand/trust document without indexing fake player data.

## What changed

- Editorial indexation path (`decideIndexation({ kind: "editorial" })`) — product/transparency pages may be `index,follow` when `COMPLIANCE_GATE` is GREEN. Licensed sports `SourceClass=GREEN` is not required.
- New `/about/` — independent fantasy *decision* site; not news, not NFL-affiliated, not gambling advice. No fixture player names, no sample tables, no FixtureBanner.
- `/methodology/` switched to editorial indexation; FixtureBanner removed (this is product methodology, not a fixture result page). v0 / subject-to-change / estimates-only language kept. No backtest claims.
- `robots.txt` in fixture mode: Sitemap still `${site}/sitemap.xml`. Allow About, Methodology, and legal shells. Disallow fixture prefixes including `/players/`, `/start-sit/`, `/is-playing/`, `/is-` (pretty `is-*-playing-today` copies), `/injuries/`, `/rankings/`, `/waiver-wire/`, `/add-drop/`, `/week-`, `/health/`, `/api/`.
- `sitemap.xml` lists `/about/` and `/methodology/` only (absolute, trailing slash). No fixture player/comparison/ranking URLs.
- About added to header and footer. Fixture product links remain for humans testing the UI.

## Still pending (do not do from this change)

- Custom-domain HTTPS certificate is **not ready**. GitHub still serves the `*.github.io` cert; `https_enforced` must stay false until a cert exists.
- Fixture sports pages remain `noindex` at the page level. Do not flip them to index.
- Search Console: connect when Joshua is ready. No property data yet.
- Ads stay off. Do not set `NEXT_PUBLIC_ADS_ENABLED`.

## Follow-ups

1. Enable **Enforce HTTPS** on GitHub Pages when the custom-domain certificate exists.
2. Add the property in Google Search Console (and submit the sitemap) when Joshua connects.
3. Only after licensed GREEN (or counsel-accepted) sports data: consider indexing player/decision URLs and widening robots/sitemap. Not this change.
