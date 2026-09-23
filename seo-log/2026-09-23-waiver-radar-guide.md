# 2026-09-23 — Waiver radar reading guide

**Date:** 23 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL. No fixture indexing. No paid host. No new analytics or ad IDs.

## Data reviewed

There is still no Google Search Console property and no GA4 property. Nothing in this change is a reaction to queries, impressions, or click data. The live indexable cluster, after the 22 Sep start/sit guide, is three URLs: `/about/`, `/methodology/`, and `/guide/start-sit/`. Fixture sports prefixes stay Disallow and `noindex`. HTTPS on the live host was already in place. That crawl surface is thin, and it is the only evidence available.

## Why this was the highest-EV action

Another robots tweak, or another FAQ on the same three pages, would not open a new query. The start/sit guide already owns "how to read the card" (mean, floor, ceiling, certainty). A second reading guide for waiver urgency — hot, rising, stash, fade — is a different question: how hard to chase an add, not which of two rostered names to start. It does not need licensed player rows, and it does not sit on a fixture prefix. `/guide/waiver-radar/` is outside `/waiver-wire/`, so it can be Allow-listed and sitemapped while the sample radar URLs stay blocked.

The choice is structural. It is a fourth crawlable URL with its own intent, not a measurement from Search Console.

## What changed

- New `/guide/waiver-radar/` editorial page with `index,follow`, Organization, WebPage, and FAQPage JSON-LD. Breadcrumbs already emit BreadcrumbList.
- Copy stays inside the existing method: the four tags come from the same estimates plus snap-share change and listed status; the tag is not a host-platform availability claim; OUT, IR, and INACTIVE are not adds to start this week; mean, floor, ceiling, and certainty are pointed at the start/sit guide and the methodology rather than re-taught. The page states it is not gambling advice, not NFL-affiliated, that fixture boards are sample until licensed GREEN data, and that there is no public backtest.
- Fixture-mode robots Allow and the sitemap gain `/guide/waiver-radar/` only. Fixture Disallows are unchanged, including `/waiver-wire/`. Legal stubs stay off both lists.
- `public/llms.txt` lists the new URL with a one-line description.
- About, Methodology, the start/sit guide, and the footer link the new page. The sample waiver board deep-links to the guide for reading help and stays `noindex`.
- The sample board now exports at `/waiver-wire/week-3/`, the path the desk already linked. A `week-[week]` folder is not a strict dynamic segment, so the previous export was an error shell at the literal bracket path and `week-3` 404'd. The URL stays out of Allow and the sitemap.
- Tests and CI expect the fourth editorial URL and still reject fixture URLs in the sitemap and on Allow.

## What did not change

- Homepage and fixture sports pages stay `noindex,follow`. No player, start/sit, injury, waiver-wire, ranking, slate, or watchlist URL was added to Allow or the sitemap.
- No contact, address, email, GSC, GA4, or AdSense IDs. Ads stay off (`NEXT_PUBLIC_ADS_ENABLED` was not set).
- No backtest, official-accuracy, or NFL-affiliation claim. LLC ownership stays footer-only.
- Legal placeholders stay `NEED JOSHUA INPUT`.

## Follow-ups

1. Connect Google Search Console and submit the sitemap before treating this page as measured. There is still no query data.
2. Do not index player, start/sit, injury, waiver-wire, ranking, slate, or watchlist URLs until licensed GREEN sports data replaces fixtures.
3. Fill legal contact and address only when Joshua provides them. Do not invent those fields. Legal contact is still NEED JOSHUA INPUT.
