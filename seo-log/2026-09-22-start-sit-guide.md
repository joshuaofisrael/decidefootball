# 2026-09-22 — Start/sit reading guide

**Date:** 22 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL. No fixture indexing. No paid host. No new analytics or ad IDs.

## Why this was the highest-EV action

Live crawl hygiene from 21 Sep is already shipped. Fixture sports URLs stay out of search. Robots Disallow covers the sample prefixes. Unfinished legal shells are omitted from both Allow and Disallow. The sitemap lists only About and Methodology. The indexable cluster is two URLs.

Another robots tweak, or another FAQ on those same two pages, would not open a new query surface. A generic start/sit tips post would compete with every fantasy blog and would not describe this desk.

The useful page is one that teaches a visitor how to read this product's artifacts: listed status before the number, mean as the ranking figure, floor and ceiling as a model range, certainty as a desk grade of the math. That page needs no licensed player rows and does not flip fixture pages to index. `/guide/start-sit/` sits outside the fixture Disallow prefixes, including `/start-sit/`, so it can be Allow-listed and sitemapped while comparison URLs stay blocked.

There is no GSC or GA4 property, so this choice is structural. It is a unique crawlable URL in a thin cluster, not a reaction to query data.

## What changed

- New `/guide/start-sit/` editorial page with `index,follow`, Organization, WebPage, and FAQPage JSON-LD. Breadcrumbs already emit BreadcrumbList.
- Fixture-mode robots Allow and the sitemap gain `/guide/start-sit/` only. Fixture Disallows are unchanged. Legal stubs stay off both lists.
- `public/llms.txt` lists the new URL with a one-line description.
- About and Methodology each link to the guide. The footer does too.
- Tests and CI expect the third editorial URL and still reject fixture URLs in the sitemap and on Allow.

## What did not change

- Homepage and fixture sports pages stay `noindex,follow`.
- No contact, address, email, GSC, GA4, or AdSense IDs. Ads stay off.
- No backtest, official-accuracy, or NFL-affiliation claim.
- Legal placeholders stay `NEED JOSHUA INPUT`.

## Follow-ups

1. Connect Google Search Console and submit the sitemap before treating this page as measured. There is still no query data.
2. Do not index player, start/sit, injury, waiver, ranking, slate, or watchlist URLs until licensed GREEN sports data replaces fixtures.
3. Fill legal contact and address only when Joshua provides them. Do not invent those fields.
