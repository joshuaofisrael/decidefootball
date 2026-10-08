# 2026-10-08 — Retarget the waiver-radar guide

**Date:** 8 October 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Rewrite the existing `/guide/waiver-radar/` page for the generic waiver query. Same URL. No new indexable URL. No fixture indexing.

## Data reviewed

Search Console still shows almost no impressions. The page was written about reading this site's own waiver tags (hot, rising, stash, fade), so it aimed at a query nobody searches. The recurring demand is the generic question: how fantasy football waivers work.

Host facts were checked against primary help pages before they were written:

- ESPN Fan Support, Waivers Overview (updated 11 August 2026): four football acquisition systems, locked at the draft. Standard waivers award the highest priority and move that team to the end. The waiver period usually expires between 3 a.m. and 5 a.m. ET. Unclaimed players become free agents except under continuous FAB, where every unrostered player stays on waivers.
- ESPN Fan Support, Waiver Order Overview and Free Agent Budget Tiebreakers (updated 11 August 2026): Monday reset to inverse standings at 12:00 a.m. PT / 3:00 a.m. ET, or move-to-last with no automatic reset. The article says a successful claim moves the team to the bottom under either option. Free-agent adds do not change the order. The article is not labeled football-only, so the page cites it as ESPN's waiver-order article.
- Yahoo Help, Overview of Waivers in Fantasy Football: default weekly rule is Game Time – Tuesday. Players go on waivers when their first game begins. Waivers end after 11:59 p.m. PT Tuesday. Continual rolling list, reverse order of standings, weekly rolling list based on standings, and FAB. Default FAB budget $100. Offers from $0 to the remaining budget. Bids are blind. Ties use a commissioner-chosen priority.
- Sleeper Support, waiver types: rolling waivers are the default. Reverse standings resets each game week for lower-placed teams. Default FAAB budget $100.
- Sleeper Support, FAAB bidding: blind bids, highest bid wins, $0 minimum unless the commissioner changes it, tie-break works like rolling waivers, later draft picks start with better priority, free-agent adds do not change priority.
- Sleeper Support, regular-season waivers: players lock when their game begins. The Tuesday-clear example runs at 12:05 a.m. PST Wednesday. A 2-day drop timer is 47 hours, processed in the 48th hour. Free-agent adds must stay rostered 24 hours before a drop.

support.nfl.com returned a Cloudflare challenge from this environment, so the page states no NFL Fantasy product default. NFL.com's beginner's guide was read and not used: it is a general walkthrough, not the settings help, and it includes strategy language this page does not repeat.

The $40 / 8 weeks = $5 line is labeled arithmetic. No bid percentage, no expert quote, and no invented processing hour.

## Why this was the highest-EV action

The URL is already Allow-listed and sitemapped. Rewriting it at the query people already use is a better use of that crawl slot than another inward-facing FAQ. The tag-reading notes stay on the page, below the generic answer.

## Hypothesis

Retargeting `/guide/waiver-radar/` to the generic waiver query should earn the first real Search Console impressions within 2 to 4 weeks.

## What changed

- Title, H1, meta description, Open Graph, and Twitter title and description.
- Direct answer, comparison table, weekly clock, FAAB section, checklist, and source links.
- FAQPage questions rewritten to the waiver questions the page answers.
- Hub card and the listed-status anchors point at the new topic. `llms.txt` describes the page.
- Breadcrumb name is "How waivers work". The path is still `/guide/waiver-radar/`.

## What did not change

- No new indexable URL. Robots Allow and Disallow are unchanged. Fixture sports pages and the homepage stay `noindex,follow`.
- The sitemap generator does not emit `lastmod`, so the sitemap was not given a fabricated timestamp.
- Ads stay off. The footer operator line stays "Operated by Joshua Israel Ventures LLC". The page is not gambling advice and not NFL-affiliated.
- Other guides' main copy is unchanged except the two listed-status anchors that point here, and the hub card for this URL.
