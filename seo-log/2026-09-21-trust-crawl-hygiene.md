# 2026-09-21 — Trust + crawl hygiene + AI citability

**Date:** 21 September 2026 (Europe/London)  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Highest-EV SEO change for this phase. No new fantasy article. No fixture indexing.

## Data reviewed

- Live site HTTPS 200; GitHub Pages `https_enforced` true.
- `robots.txt` allowed `/about/`, `/methodology/`, **and** unfinished legal shells (`/privacy/`, `/terms/`, `/disclaimer/`, `/cookies/`).
- `sitemap.xml` listed only `/about/` and `/methodology/` (kept).
- About + Methodology were already indexable from the 18 Sep crawl-hygiene pass.
- No Search Console, GA4, or Cloudflare analytics — no query data.
- Live `/privacy/` (and the other legal shells) still contain many `NEED JOSHUA INPUT` placeholders.
- Homepage still presents SAMPLE/FIXTURE fantasy UI.

## Why this action

Allow-listing unfinished legal stubs invited Google to index placeholder contact copy. That is a trust loss, and there is no query data to justify a new article. The next useful move is to harden crawl policy around the two real editorial URLs and make those pages easier for search and AI systems to cite accurately.

## What changed

- Draft legal shells stay `noindex,follow` at page metadata. They are no longer Allow-listed in fixture-mode `robots.txt`; they are Disallowed instead. Contact emails and addresses were not invented.
- Root `/` and fixture product routes remain `noindex,follow`. Humans can still use the UI. Homepage is not in the sitemap.
- `/about/` and `/methodology/` titles/descriptions tightened to decision-site intent (not NFL news). About ↔ Methodology links both ways. About adds a short factual FAQ plus FAQPage JSON-LD. Both pages emit WebPage + Organization JSON-LD (BreadcrumbList was already on the crumbs).
- Added `public/llms.txt` pointing AI crawlers at About and Methodology, stating fixtures are sample/non-indexable and the site is not NFL-affiliated.
- Sitemap still lists only `/about/` and `/methodology/`.
- Tests and CI assert legal noindex, editorial index, fixture blocks, sitemap paths, and `llms.txt`.

Ads remain gated/off. LLC branding remains footer-only in visible chrome.

## Follow-ups

1. Connect Google Search Console (and submit the sitemap) when Joshua is ready. No property data yet.
2. Fill legal contact / address / counsel items when Joshua provides them. Only then remove `draftLegal` noindex and the legal Disallow (do not invent those fields).
3. Do not index player / start-sit / injury / ranking URLs until licensed GREEN sports data replaces fixtures.
4. Ads stay off. Do not set `NEXT_PUBLIC_ADS_ENABLED`.
