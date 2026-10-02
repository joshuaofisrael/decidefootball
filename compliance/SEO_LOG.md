# SEO log

## 2026-10-02

Tenth indexable URL: `/guide/certainty/`, an interactive tool for this desk's certainty grade (thin, lean, clear, strong). The hub now lists five reading guides and two tools. Intent is how sure a lean is, on numbers and flags the visitor types. The toss-up tool still answers who leans. This page does not replace the start/sit reading guide.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap, including `/start-sit/` and `/add-drop/`. `/guide/certainty/` does not match Disallow `/start-sit/`. Homepage stays `noindex` while fixture mode applies.
- The grade reuses `computeCertainty`. The form builds projection stubs and does not search players or call a projection feed. Bands stay 78 strong, 58 clear, 40 lean, else thin.
- About, Methodology, the start/sit guide, the toss-up tool, the rankings guide, the add/drop guide, `llms.txt`, and the footer link the new page. The sample start/sit index links the tool and stays `noindex`.
- Follow-ups: licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT. No Search Console query data yet.

## 2026-10-01

Ninth indexable URL: `/guide/toss-up/`, an interactive tool for this desk's 1.5-point mean-delta line. The hub now lists five reading guides and the toss-up tool. Intent is calculator/comparison on numbers the visitor types, distinct from the start/sit reading guide and the add/drop reading guide.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap, including `/start-sit/` and `/add-drop/`. Homepage stays `noindex` while fixture mode applies.
- The lean reuses `TOSS_UP_DELTA` (1.5). The form does not search players or call a projection feed.
- About, Methodology, the start/sit guide, the add/drop guide, the rankings guide, `llms.txt`, and the footer link the new page. Sample start/sit and add/drop indexes link the tool and stay `noindex`.
- Follow-ups: licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT. No Search Console query data yet.

## 2026-09-30

Eighth indexable URL: `/guide/add-drop/`, a reading guide for this desk's add-versus-drop card. The hub now lists five guides. Intent is roster churn (keep one name by adding it over the other), distinct from start/sit and from waiver urgency tags.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap, including `/add-drop/`. `/guide/add-drop/` does not match that prefix. Homepage stays `noindex` while fixture mode applies.
- About, Methodology, the start/sit guide, the waiver-radar guide, `llms.txt`, and the footer link the new page. The sample add/drop desk links to the guide and stays `noindex`.
- Follow-ups: licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-29

Primary nav gains Guides (`/guide/`). Every page that exports metadata now sets a trailing-slash canonical and a matching `og:url`. No new article.

- Editorial cluster unchanged: the seven URLs stay `index,follow`. Fixture sports prefixes stay disallowed and out of the sitemap. Legal drafts stay `noindex`. Homepage stays `noindex` while fixture mode applies.
- The root layout does not set a sitewide canonical. Dynamic routes use the concrete path.
- Follow-ups: Google Search Console when Joshua provides access. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-28

Seventh indexable URL: `/guide/rankings/`, a reading guide for this desk's weekly positional rankings board. The hub now lists four guides.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap, including `/rankings/` and `/week-`. Legal stubs stay omitted from Allow and Disallow. Homepage stays `noindex` while fixture mode applies.
- About, Methodology, the three sibling guides, `llms.txt`, and the footer link the new page. Sample rankings boards link to the guide and stay `noindex`.
- Follow-ups: Google Search Console when Joshua provides access. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-27

Cloudflare Web Analytics beacon is in the shared layout on every page. Ads and GA4 stay off.

- The beacon token is baked into the layout. No AdSense, GA4, or other measurement IDs were added.
- Privacy, cookie, and consent copy name Cloudflare Web Analytics. Advertising pixels stay gated off.
- Follow-ups: Google Search Console when Joshua provides access. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-25

Reading-guides hub at `/guide/`. The indexable cluster is now six URLs. The parent path had been a 404 over three leaf guides.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap. Legal stubs stay omitted from Allow and Disallow. Homepage stays `noindex` while fixture mode applies.
- Leaf guide breadcrumbs are Home → Guides → leaf. About, Methodology, and the footer link the hub and keep the leaf links.
- Follow-ups: Google Search Console and Cloudflare Web Analytics when Joshua provides the IDs. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-24

Fifth indexable URL: `/guide/listed-status/`, a reading guide for this desk's listed availability.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap, including `/is-playing/`, `/is-`, and `/injuries/`. Legal stubs stay omitted from Allow and Disallow.
- About, Methodology, the start/sit guide, the waiver radar guide, `llms.txt`, and the footer link the new page. Sample is-playing and injury pages link to the guide and stay `noindex`.
- Follow-ups: GSC still required before this can be measured. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-23

Fourth indexable URL: `/guide/waiver-radar/`, a reading guide for this desk's waiver urgency tags.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap. Legal stubs stay omitted from Allow and Disallow.
- About, Methodology, the start/sit guide, `llms.txt`, and the footer link the new page. The sample waiver board links to the guide and stays `noindex`, including the `/waiver-wire/week-3/` export.
- Follow-ups: GSC still required before this can be measured. Licensed GREEN data before any sports URL is indexed. Legal contact still NEED JOSHUA INPUT.

## 2026-09-22

Third indexable URL: `/guide/start-sit/`, a reading guide for this desk's start/sit card.

- Editorial `index,follow` only. Fixture sports prefixes stay disallowed and out of the sitemap. Legal stubs stay omitted from Allow and Disallow.
- About, Methodology, `llms.txt`, and the footer link the new page. No fixture URL was flipped to index.
- Follow-ups: GSC still required before this can be measured. Licensed GREEN data before any sports URL is indexed.

## 2026-09-21

Robots alignment + editorial citability after live launch check.

- Live page meta and sitemap were already correct (legal/home noindex; About/Methodology index). Fixture-mode robots no longer Allow-lists unfinished legal shells and does not Disallow them, so crawl can still see `noindex`.
- About FAQ + FAQPage JSON-LD, `public/llms.txt`, light About ↔ Methodology polish.
- Follow-ups: GSC connect; fill legal contact when Joshua provides it; licensed GREEN data before indexing sports.

## 2026-09-18

Press-box desk pass (certainty, slate, watchlist, radar, player hubs).

- Fixture sports URLs stay `noindex,follow`. New prefixes `/slate/` and `/watchlist/` are disallowed in `robots.txt` alongside the existing sample sports trees.
- Sitemap still lists only `/about/` and `/methodology/` while sample data is live.
- Titles and descriptions rewritten in desk voice. About and methodology remain the only indexable product pages.
- Internal links added from hubs to slate, radar, methodology, and injury timelines. Noindex sports pages still link to the two editorial URLs.
- No production backtest claims. Noindex fixtures are not submitted as indexable inventory.
