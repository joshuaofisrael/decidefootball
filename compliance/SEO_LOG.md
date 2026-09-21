# SEO log

## 2026-09-21

Trust + crawl hygiene + AI citability for the editorial cluster.

- Legal stubs (`/privacy/`, `/terms/`, `/disclaimer/`, `/cookies/`) stay `noindex,follow` and are Disallowed in fixture-mode robots. They are not in the sitemap.
- About and Methodology remain the only indexable URLs. Titles/descriptions, About ↔ Methodology links, WebPage/Organization/FAQ JSON-LD, and `public/llms.txt` added.
- Homepage and fixture sports routes stay `noindex`. Tests/CI cover the split.
- Follow-ups: GSC connect; fill legal contact when Joshua provides it; licensed GREEN data before indexing sports.

## 2026-09-18

Press-box desk pass (certainty, slate, watchlist, radar, player hubs).

- Fixture sports URLs stay `noindex,follow`. New prefixes `/slate/` and `/watchlist/` are disallowed in `robots.txt` alongside the existing sample sports trees.
- Sitemap still lists only `/about/` and `/methodology/` while sample data is live.
- Titles and descriptions rewritten in desk voice. About and methodology remain the only indexable product pages.
- Internal links added from hubs to slate, radar, methodology, and injury timelines. Noindex sports pages still link to the two editorial URLs.
- No production backtest claims. Noindex fixtures are not submitted as indexable inventory.
