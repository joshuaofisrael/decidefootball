# 2026-10-02 — Certainty-grade tool

**Date:** 2 October 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL with a client-side calculator. No fixture indexing. No paid host. No projection API. No ads.

## Data reviewed

- Live editorial cluster already includes `/guide/toss-up/` (PR #15), which applies the 1.5-point mean-delta line and says the start/sit certainty grade is not computed there.
- Homepage and fixture sports URLs stay `noindex` / `Disallow` until licensed GREEN data. That includes `/start-sit/` and `/add-drop/`.
- No Search Console query data yet, so this choice is from the cluster and the code, not from a query report.
- `src/lib/certainty.ts` already defines the desk grade: `computeCertainty`, `certaintyLabel`, and `certaintyCopy`. The start/sit card prints that score. Bands are 78 strong, 58 clear, 40 lean, otherwise thin.

## Why this action

Toss-up answers who leans. Certainty answers how sure that lean is. The toss-up FAQ already tells a visitor the card prints thin / lean / clear / strong and that the toss-up tool does not compute it. A second reading guide would repeat `/guide/start-sit/`. A calculator on the existing helper does not. The visitor types means and optional flags. The page does not need licensed player rows.

## What shipped

- `/guide/certainty/` with `index,follow`, Organization, WebPage, FAQPage, and breadcrumb JSON-LD (Home → Guides → Certainty tool).
- A client-side tool. Required means. Optional labels. Per side: availability gate (OUT / IR / INACTIVE zeros that mean), status discount (Questionable / Doubtful, a negative availability adjustment, not applied on top of the gate), uncertainty (low / med / high), and trailing weeks used (the helper takes the shorter side). Defaults are healthy, low uncertainty, and three trailing weeks, so a wide gap grades clear or strong.
- The delta is `meanDeltaLean`, the same rounded score the start/sit card passes into `computeCertainty`. The result prints the meter (score, label, reasons), the absolute mean delta, and whether the pair is a toss-up on the 1.5 line, with a link to `/guide/toss-up/`.
- Copy states the grade is not a win probability, not odds, and not a moneyline. Listed status still outranks numbers. Methodology v0, subject to change.
- Fixture-mode robots Allow and the sitemap gain `/guide/certainty/` only. The path is under Allow `/guide/` and does not match Disallow `/start-sit/`. Homepage stays `noindex` in fixture mode.
- The guides hub lists five reading notes and two tools. It does not call the certainty page a sixth reading guide. Footer, About, Methodology, the start/sit guide, the toss-up page, the rankings guide, and the add/drop guide link the tool. `public/llms.txt` lists the URL. The sample `/start-sit/` index links the tool and stays `noindex`.

## Why not the alternatives

- **Another certainty essay.** `/guide/start-sit/` already teaches the bands. This page is the calculator that essay points at.
- **Indexing the start/sit desk.** Pair URLs still use sample data. They stay out of Allow and out of the sitemap.
- **A new grade scale.** The tool calls `computeCertainty`. It does not add bands.

## What did not change

- No player, start/sit, injury, is-playing, waiver-wire, ranking, add/drop, week, slate, or watchlist URL was added to Allow or the sitemap.
- Ads stay gated. No analytics IDs were added. LLC ownership stays footer-only. No contact email or address was invented. Porkbun was not touched. No paid Vercel project was added.
- No backtest, official-accuracy, or NFL-affiliation claim. No gambling or sportsbook framing.

## Follow-ups

1. Do not index `/start-sit/` or other fixture sports URLs until licensed GREEN sports data replaces fixtures.
2. Legal contact is still NEED JOSHUA INPUT.
3. Search Console is still empty. Revisit the cluster when query data exists.
