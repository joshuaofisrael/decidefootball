# 2026-10-07 — Retarget the listed-status guide

**Date:** 7 October 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Rewrite the existing `/guide/listed-status/` page for the generic injury-designation query. Same URL. No new indexable URL. No fixture indexing.

## Data reviewed

Search Console still shows almost no impressions. The indexable guides were written about reading this site's own cards, so the listed-status URL was aimed at a query nobody searches. The recurring demand is the generic question: what Questionable, Doubtful, and Out mean on the NFL injury report, plus injured reserve and inactive.

League facts were checked against primary pages before they were written:

- NFL.com, August 21, 2016, "Competition Committee approves revisions to injury report": Questionable means it is uncertain whether the player will play; Doubtful means it is unlikely the player will participate; Out means the player will not play. Probable was removed. Practice participation is Did Not Participate, Limited Participation, or Full Participation. A player the club is certain will play is left off the game status report.
- NFL Football Operations, 2026 important dates, and the same text on NFL.com's 2026–27 important dates: for a Sunday game, practice reports are Wednesday, Thursday, and Friday, and the game status report is Friday, each by 4:00 p.m. New York time or as soon as possible after practice. That Friday deadline is what the current league calendars publish.
- NFL Football Operations, countdown to kickoff: the inactive list is in the Game Day Administration Report delivered to the referee one hour and 30 minutes before kickoff.

A fixed 50/50 for Questionable is not in that 2016 definition, so the page says the published definition is not a percentage. It does not invent an older percentage. It does not state an injured-reserve return week, because the 2026 calendar only says a return is subject to applicable procedures.

## Why this was the highest-EV action

The URL is already Allow-listed and sitemapped. Rewriting it at the query people already use is a better use of that crawl slot than another inward-facing FAQ. The card-reading notes stay on the page, below the generic answer, so the existing job is not dropped.

## Hypothesis

Retargeting `/guide/listed-status/` to the generic injury-designation query should earn the first real Search Console impressions within 2 to 4 weeks.

## What changed

- Title, H1, meta description, Open Graph, and Twitter title and description.
- Direct answer table, weekly timeline, checklist, and source links.
- FAQPage questions rewritten to the generic questions the page answers.
- Hub card, `llms.txt`, and descriptive anchors from the guide hub, start/sit guide, methodology, about, and the other reading pages.
- Breadcrumb name is "Injury designations". The path is still `/guide/listed-status/`.

## What did not change

- No new indexable URL. Robots Allow and Disallow are unchanged. Fixture sports pages and the homepage stay `noindex,follow`.
- The sitemap generator does not emit `lastmod`, so the sitemap was not given a fabricated timestamp.
- Ads stay off. LLC ownership stays footer-only. The page is not gambling advice and not NFL-affiliated.
- No player names and no licensed injury news.
