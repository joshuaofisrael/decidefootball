# 2026-09-21 — Robots alignment + editorial citability

**Date:** 21 September 2026 (Europe/London)  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Highest-EV SEO change after live launch check. No new fantasy article. No fixture indexing.

## Data reviewed (live, 21 Sep 2026)

- Homepage, `/privacy/`, `/terms/`, `/disclaimer/`, `/cookies/` already emit `noindex,follow`.
- `/about/` and `/methodology/` already emit `index,follow`.
- Sitemap already lists About + Methodology only.
- Live `robots.txt` still Allow-listed unfinished legal shells alongside About and Methodology.
- Legal pages still contain `NEED JOSHUA INPUT` placeholders. No GSC/GA4 query data.

## Why this action

Page meta and sitemap were already correct. The remaining trust leak was robots inviting crawl of unfinished legal shells. Align robots with page meta, then add citability on the two indexable URLs (FAQ + `llms.txt`) without touching fixture indexation or inventing contact details.

## What changed

- Fixture-mode `robots.txt` Allow list is now only `/about/` and `/methodology/`. Unfinished legal shells are omitted from both Allow and Disallow so crawlers are not invited to index them but can still recrawl the existing `noindex` tag. Legal page metadata was left as-is.
- `/about/` FAQ (What is Decide Football? NFL affiliation? Are projections official? When will player pages be indexed?) plus matching FAQPage JSON-LD. Accurate answers only; no backtest claims.
- `public/llms.txt` points AI crawlers at About and Methodology, states fixtures are sample/non-indexable, not NFL-affiliated.
- Light About ↔ Methodology title/description and internal-link polish.
- Tests/CI assert robots omit legal from Allow and Disallow, sitemap stays editorial-only, FAQ/`llms.txt` ship.

Ads remain gated/off. LLC branding remains footer-only in visible chrome.

## Follow-ups

1. Connect Google Search Console (and submit the sitemap) when Joshua is ready. No property data yet.
2. Fill legal contact / address / counsel items when Joshua provides them. Only then Allow-list those URLs and lift `draftLegal` noindex (do not invent those fields).
3. Do not index player / start-sit / injury / ranking URLs until licensed GREEN sports data replaces fixtures.
4. Ads stay off. Do not set `NEXT_PUBLIC_ADS_ENABLED`.
