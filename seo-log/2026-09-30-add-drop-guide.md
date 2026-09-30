# 2026-09-30 — Add/drop reading guide

**Date:** 30 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Add one indexable editorial URL. No fixture indexing. No paid host.

## Why

The indexable cluster was seven URLs: `/about/`, `/methodology/`, `/guide/`, `/guide/start-sit/`, `/guide/waiver-radar/`, `/guide/listed-status/`, and `/guide/rankings/`. `/guide/add-drop/` was missing. Live `/add-drop/` and pair cards already exist as fixture desks and stay `noindex`.

The intent is distinct. Start/sit is a weekly lineup call among rostered names. Waiver radar is hot, rising, stash, and fade. This page teaches the add-versus-drop card: keep one name by adding it over the name you would drop. Same estimate stack (listed status, mean, floor, ceiling, mean delta, 1.5-point toss-up) and the same canonical pair order plus reverse-pair redirect. It does not need licensed player rows.

`/guide/add-drop/` does not match Disallow `/add-drop/`. The sample desk stays blocked.

## What changed

- New `/guide/add-drop/` editorial page with `index,follow`, Organization, WebPage, and FAQPage JSON-LD. Breadcrumbs are Home → Guides → Add/drop guide.
- Fixture-mode robots Allow and the sitemap gain `/guide/add-drop/` only. Disallow `/add-drop/` is unchanged. Homepage stays `noindex` in fixture mode.
- The guides hub lists five notes. Footer, About, Methodology, the start/sit guide, and the waiver-radar guide link the new page. `public/llms.txt` lists the URL. The sample `/add-drop/` index links to the guide and stays `noindex`.

## What did not change

- No player, start/sit, injury, is-playing, waiver-wire, ranking, add/drop, week, slate, or watchlist URL was added to Allow or the sitemap.
- Ads stay gated. Fonts stay self-hosted. LLC ownership stays footer-only.
- No backtest, official-accuracy, or NFL-affiliation claim.

## Follow-ups

1. Do not index `/add-drop/` or other fixture sports URLs until licensed GREEN sports data replaces fixtures.
2. Legal contact is still NEED JOSHUA INPUT.
