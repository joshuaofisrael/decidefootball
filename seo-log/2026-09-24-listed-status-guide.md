# 2026-09-24 — Listed status reading guide

**Date:** 24 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL. No fixture indexing. No paid host. No new analytics or ad IDs.

## Data reviewed

There is still no Google Search Console property and no GA4 property. Nothing in this change is a reaction to queries, impressions, or click data. The live indexable cluster, after the 23 Sep waiver radar guide, is four URLs: `/about/`, `/methodology/`, `/guide/start-sit/`, and `/guide/waiver-radar/`. Fixture sports prefixes stay Disallow and `noindex`, including `/is-playing/`, `/is-`, and `/injuries/`. HTTPS on the live host was already in place. That crawl surface is thin, and it is the only evidence available.

## Why this was the highest-EV action

Another robots tweak, or another FAQ on the same four pages, would not open a new query. The start/sit guide already owns "which of two to start" (mean, floor, ceiling, certainty). The waiver radar guide already owns "how hard to chase an add" (hot, rising, stash, fade). A third reading guide for listed availability — Healthy, Questionable, Doubtful, OUT, IR, INACTIVE — is a different question: how to read the designation before any projection number. It does not need licensed player rows, and it does not sit on a fixture prefix. `/guide/listed-status/` is outside `/is-playing/`, `/is-`, and `/injuries/`, so it can be Allow-listed and sitemapped while the sample availability URLs stay blocked.

The choice is structural. It is a fifth crawlable URL with its own intent, not a measurement from Search Console.

## What changed

- New `/guide/listed-status/` editorial page with `index,follow`, Organization, WebPage, and FAQPage JSON-LD. Breadcrumbs already emit BreadcrumbList.
- Copy stays inside the existing method: status is read before the mean; Healthy carries no status discount; Questionable and Doubtful are soft discounts, with Doubtful heavier; OUT, IR, and INACTIVE force the estimate to zero; the model does not invent a designation or a return; last verified and page rendered stay distinct clocks. Mean, floor, ceiling, and certainty are pointed at the start/sit guide. Waiver tags are pointed at the waiver radar guide. The page states it is not an official NFL or club injury report, not a return-date promise, not gambling advice, that fixture availability pages are sample until licensed GREEN data, and that there is no public backtest.
- Fixture-mode robots Allow and the sitemap gain `/guide/listed-status/` only. Fixture Disallows are unchanged, including `/is-playing/`, `/is-`, and `/injuries/`. Legal stubs stay off both lists.
- `public/llms.txt` lists the new URL with a one-line description.
- About, Methodology (availability gate and reported status), the start/sit guide, the waiver radar guide, and the footer link the new page. The sample is-playing board, playing-today pages, and injury timelines deep-link to the guide for reading help and stay `noindex`.
- Tests and CI expect the fifth editorial URL and still reject fixture URLs in the sitemap and on Allow.

## What did not change

- Homepage and fixture sports pages stay `noindex,follow`. No player, start/sit, injury, is-playing, waiver-wire, ranking, slate, or watchlist URL was added to Allow or the sitemap.
- No contact, address, email, GSC, GA4, or AdSense IDs. Ads stay off (`NEXT_PUBLIC_ADS_ENABLED` was not set).
- No backtest, official-accuracy, or NFL-affiliation claim. LLC ownership stays footer-only.
- Legal placeholders stay `NEED JOSHUA INPUT`.

## Follow-ups

1. Connect Google Search Console and submit the sitemap before treating this page as measured. There is still no query data.
2. Do not index player, start/sit, injury, is-playing, waiver-wire, ranking, slate, or watchlist URLs until licensed GREEN sports data replaces fixtures.
3. Fill legal contact and address only when Joshua provides them. Do not invent those fields. Legal contact is still NEED JOSHUA INPUT.
