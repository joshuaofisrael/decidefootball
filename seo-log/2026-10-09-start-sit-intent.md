# 2026-10-09 — Retarget the start/sit guide

**Date:** 9 October 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Rewrite the existing `/guide/start-sit/` page for the generic lineup query. Same URL. No new indexable URL. No fixture indexing.

## Data reviewed

Search Console is still nearly empty: on the order of 0–2 impressions sitewide. The live title and H1 were still inward-facing ("How to read start/sit estimates — floor, mean, ceiling, certainty" / "How to read a start/sit card"). That page described this site's card. It did not answer the query managers search: how to decide who to start using floor, mean, and ceiling, and when a close call is a toss-up.

The 1.5 estimated-point line is the desk constant already in `TOSS_UP_DELTA`, the toss-up tool, and the methodology page. Certainty bands remain thin, lean, clear, and strong. No new backtest, accuracy rate, or player projection was added. Methodology stays v0.

No host lineup-lock page was cited. This environment was not used to invent an ESPN, Yahoo, Sleeper, or NFL Fantasy default clock. The checklist says the hour depends on league settings.

## Why this was the highest-EV action

`/guide/start-sit/` is already Allow-listed and sitemapped. Rewriting it at the query people already use is a better use of that crawl slot than a new leaf, a fixture rename, or another inward-facing FAQ. The card-reading notes stay on the page, below the generic answer. The toss-up tool and the certainty tool stay the calculators. This page stays the decision framework.

## Hypothesis

Retargeting `/guide/start-sit/` to the generic floor-versus-ceiling query should earn the first real Search Console impressions within 2 to 4 weeks.

## What changed

- Title, H1, meta description, Open Graph, and Twitter title and description.
- Direct answer, comparison table (floor-first, mean-first, ceiling-first), Sunday-lock checklist, and toss-up section.
- FAQPage questions rewritten to the start/sit questions the page answers, including one question on this site's certainty grade.
- Hub card and descriptive anchors on the sibling guides, about, the toss-up tool, and the certainty tool point at the new topic. `llms.txt` describes the page.
- Breadcrumb name is "Floor vs ceiling". The path is still `/guide/start-sit/`.

## What did not change

- No new indexable URL. Robots Allow and Disallow are unchanged. Fixture sports pages, including `/start-sit/`, and the homepage stay `noindex,follow`.
- `/waiver-wire/` was not renamed.
- The sitemap generator does not emit `lastmod`, so the sitemap was not given a fabricated timestamp.
- Ads stay off. The footer operator line stays "Operated by Joshua Israel Ventures LLC". The page is not gambling advice and not NFL-affiliated.
- No licensed player names and no projection numbers presented as real players. No accuracy rate.
- Other guides' main copy is unchanged except the anchors that pointed at "how to read a start/sit card," and the hub card for this URL.
