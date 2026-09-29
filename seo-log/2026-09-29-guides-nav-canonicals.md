# 2026-09-29 — Guides in the primary nav, and per-page canonicals

**Date:** 29 September 2026  
**Site:** decidefootball.com (Joshua Israel Ventures LLC)  
**Action:** Put the existing reading-guide hub in the primary nav, and emit a canonical plus `og:url` on every page that sets metadata. No new article. No fixture indexing. No paid host.

## Data reviewed

There is still no Google Search Console property and no query data. Nothing in this change is a reaction to impressions or clicks. The live site is HTTPS on GitHub Pages. The indexable editorial cluster is already complete and live: `/about/`, `/methodology/`, `/guide/`, `/guide/start-sit/`, `/guide/waiver-radar/`, `/guide/listed-status/`, and `/guide/rankings/`. Sitemap and robots Allow match that set. Fixture sports URLs stay `noindex` and Disallow. The homepage stays `noindex,follow` in fixture mode. Ads stay gated off.

A live HTML check on 29 September 2026 found no `rel=canonical` and no `og:url` on the pages that were opened. `metadataBase` is set in the root layout, and `absoluteUrl()` already builds trailing-slash absolute URLs, but neither one was writing a canonical into the exported HTML. The primary nav lists Decide, Slate, Watch, Club, Radar, Method, and About. The reading-guide cluster is linked from the footer, not from that nav.

## Why nav and canonicals beat another leaf guide

The cluster already has a page for each reading job this desk does: start/sit, listed status, waiver radar, and rankings, plus the hub. Another leaf would add a URL without a Search Console signal that a fifth intent is missing. Two gaps are structural and do not need query data.

The hub is the indexable parent, and it is one click deeper than the fixture tools. Crawlers and readers who use the primary nav never see Guides. That is an internal-link problem on a cluster that is otherwise finished.

The missing canonical is a duplicate-URL problem. GitHub Pages serves the trailing-slash paths this export builds. Without a declared canonical, a copied link, a slash variant, or an `og:url` that never got set can disagree about which URL is the page. `metadataBase` alone did not emit the tag. Declaring the path on each page does.

## What changed

- The shared header link list, used by the desktop nav and the mobile menu, gains Guides → `/guide/` after Radar and before Method. Existing product links stay. Leaf guide URLs stay out of the primary nav. The footer still lists the leaves.
- `pageMetadata` in `src/lib/seo.ts` takes a path, a title, an optional description, and the same indexation inputs pages already used. It returns title, description, and robots through `robotsMeta(decideIndexation(...))`, `alternates.canonical` as a trailing-slash path (home stays `/`), and `openGraph` url, title, and description. It also repeats `siteName`, `locale`, and `type`, because a page-level `openGraph` object replaces the layout object rather than merging into it. The root layout does not set a sitewide canonical.
- Every page that exports `metadata` or `generateMetadata` uses the helper. That includes the editorial cluster, the homepage, the four legal drafts (still `draftLegal`, so still `noindex`), and the fixture pages, including dynamic routes. Dynamic canonicals are the concrete path for those params, with a trailing slash. Reverse start/sit and add/drop URLs, and the rankings week/position alias, still canonical to the destination URL. The playing-today canonical stays the public `/is-{slug}-playing-today/` path.
- Unit tests check trailing-slash canonicals for editorial paths and for a sample fixture path, and they check that fixture and draft-legal robots stay `noindex,follow`.
- The `/week-3/...` positional export is still the pre-existing 404. The folder `week-[week]` does not pass `week` on `params`, and the page calls `notFound()`. This change does not repair that route. The `/rankings/3/rb/` alias still canonicals to `/week-3/rb-rankings/`.

## What did not change

- No new fantasy tips article and no new indexable URL. The sitemap and robots Allow list are unchanged. Fixture prefixes stay Disallow, including `/rankings/`, `/players/`, `/start-sit/`, `/waiver-wire/`, `/is-playing/`, `/is-`, `/injuries/`, `/week-`, `/add-drop/`, `/slate/`, and `/watchlist/`.
- Homepage and fixture sports pages stay `noindex,follow`. Legal drafts stay `noindex,follow`.
- No contact, address, email, credential, backtest, GSC, GA4, or AdSense ID. Ads stay off. LLC ownership stays on the footer line. No NFL-affiliation claim.

## Follow-ups

1. Connect Google Search Console and submit the sitemap before treating any of this as measured. There is still no query data. That remains a Joshua follow-up.
2. Do not index player, start/sit, injury, is-playing, waiver-wire, ranking, add/drop, week, slate, or watchlist URLs until licensed GREEN sports data replaces fixtures.
3. Fill legal contact and address only when Joshua provides them. Do not invent those fields. Legal contact is still NEED JOSHUA INPUT.
