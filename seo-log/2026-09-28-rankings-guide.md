# 2026-09-28 — Rankings reading guide

**Date:** 28 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL. No fixture indexing. No paid host. No new analytics or ad IDs.

## Data reviewed

There is still no Google Search Console property and no GA4 property. Nothing in this change is a reaction to queries, impressions, or click data. Cloudflare Web Analytics is already on the live host (the beacon from 27 Sep). The live site is HTTPS on GitHub Pages. The live indexable cluster, after the guide hub, is six URLs: `/about/`, `/methodology/`, `/guide/`, `/guide/start-sit/`, `/guide/waiver-radar/`, and `/guide/listed-status/`. `https://decidefootball.com/guide/rankings/` returns 404. The hub still says three guides. Fixture sports prefixes stay Disallow and `noindex`, including `/rankings/` and `/week-`. The homepage stays `noindex` in fixture mode. That crawl surface is the evidence available.

## Why this was the highest-EV action

Another robots tweak, or another FAQ on the same six pages, would not open a new query. The start/sit guide already owns pairwise comparison (mean, floor, ceiling, certainty). The listed-status guide already owns Healthy through INACTIVE before any number. The waiver-radar guide already owns hot, rising, stash, and fade. The missing intent is the weekly positional board: an ordered list by mean, and how status, floor, ceiling, and the start/sit certainty grade change how a ranking row is used. That page does not need licensed player rows. `/guide/rankings/` is under Allow `/guide/` and does not match Disallow `/rankings/`, so it can be Allow-listed and sitemapped while the sample boards stay blocked.

The choice is structural. It is a seventh crawlable URL with its own intent, not a measurement from Search Console.

## What changed

- New `/guide/rankings/` editorial page with `index,follow`, Organization, WebPage, and FAQPage JSON-LD. Breadcrumbs are Home → Guides → Rankings guide and already emit BreadcrumbList.
- Copy stays inside the existing method. The board is one position (QB, RB, WR, TE; kicker and team defense are off this desk), ordered by the mean, with the higher ceiling breaking a mean tie. The row prints status, mean, floor, and ceiling. Certainty is not a column; it is the start/sit grade, and a narrow mean gap (under 1.5) is still a toss-up on that card. OUT, IR, and INACTIVE zero the row. A rank is not a start/sit verdict, not an official list, and not a free-agent claim. The page states it is not gambling advice, that fixture rankings URLs are sample until licensed GREEN data, and that there is no public backtest.
- Fixture-mode robots Allow and the sitemap gain `/guide/rankings/` only. Fixture Disallows are unchanged, including `/rankings/` and `/week-`. Legal stubs stay off both lists.
- `public/llms.txt` lists the new URL with a one-line description. The hub line names four guides.
- The `/guide/` hub lists rankings as the fourth guide, says four, and keeps the sample-desks-out-of-search copy. The card row uses a two-column four-card layout so the fourth card is not stranded under a three-column grid.
- About, Methodology (where the mean and the blocked production boards are discussed), the start/sit guide, the listed-status guide, the waiver-radar guide, and the footer link the new page. The sample rankings index and the week positional boards deep-link to the guide for reading help and stay `noindex`.
- Tests and CI expect the seventh editorial URL and still reject fixture paths, including `/rankings/`, on Allow and in the sitemap.

## What did not change

- Homepage and fixture sports pages stay `noindex,follow`. No player, start/sit, injury, is-playing, waiver-wire, ranking, add/drop, week, slate, or watchlist URL was added to Allow or the sitemap.
- No contact, address, email, GSC, GA4, or AdSense IDs. The Cloudflare beacon was already live and was not changed. Ads stay off (`NEXT_PUBLIC_ADS_ENABLED` was not set).
- No backtest, official-accuracy, or NFL-affiliation claim. LLC ownership stays footer-only.
- Legal placeholders stay `NEED JOSHUA INPUT`. The default scoring format on the sample board stays provisional.

## Follow-ups

1. Connect Google Search Console and submit the sitemap before treating this page as measured. There is still no query data.
2. Do not index player, start/sit, injury, is-playing, waiver-wire, ranking, slate, or watchlist URLs until licensed GREEN sports data replaces fixtures. `/rankings/` and `/week-` positional boards stay `noindex` and Disallow.
3. Fill legal contact and address only when Joshua provides them. Do not invent those fields. Legal contact is still NEED JOSHUA INPUT.
