# Decide Football

Independent fantasy football **decision** pages for [decidefootball.com](https://decidefootball.com): start/sit, is-playing, injuries, waivers, and rankings.

Not a sports news blog. Not NFL-affiliated. Not gambling.

**Consumer brand:** Decide Football  
**Operator (footer only):** Joshua Israel Ventures LLC  
**Host:** Free **GitHub Pages** + GitHub Actions only. No paid Vercel. No Porkbun.  
**Phase:** Phase-1 GREEN-path scaffold. Fixture / sample data only.

## What this repo is

A static-export Next.js App Router site that:

- Renders high-intent decision URLs from **computed fixture metrics**
- Ships Postgres schema + migration + seed (Prisma) for later licensed ingest — **not required to build or publish**
- Enforces `COMPLIANCE_GATE=RED|YELLOW|GREEN` at **build** time
- **noindex**s fixture sports pages and draft legal shells; About and Methodology may be indexed as editorial pages
- Stubs Redis, jobs, licensed ingest, and AI explain (off by default)
- Does **not** call sports APIs, scrape, or buy anything

Next operator step after review: **licensed data ingest, only after Joshua approves API spend.** Do not buy BALLDONTLIE (or any feed) from this scaffold.

## Run locally

Requires Node 20+.

```bash
npm install
cp .env.example .env.local
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` writes a static site to `out/` (no Postgres). Preview that export:

```bash
npm run build
npm start
```

### Optional Postgres seed

Schema follows the C-database memo. Needed only when you want Prisma migrate/seed.

```bash
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/decidefootball"
npx prisma migrate deploy
npm run db:seed
```

## Env vars

| Variable | Purpose | Default |
|----------|---------|---------|
| `COMPLIANCE_GATE` | `RED` kill switch · `YELLOW` hold · `GREEN` may render first-party/approved sources | `GREEN` |
| `USE_FIXTURES` | Use compile-time sample rows | `true` |
| `USE_DATABASE` | Future Prisma reads; do not enable yet | `false` |
| `DATABASE_URL` | Postgres for migrate/seed only | unset |
| `REDIS_URL` | Reserved; cache is in-memory / Redis stub | unset |
| `AI_EXPLAIN_ENABLED` | Must stay `false` unless a later review turns it on | `false` |
| `NEXT_PUBLIC_GA4_ID` | GA4 placeholder; script loads only after consent stub accept. Required for the daily traffic routine before ads. | unset |
| `NEXT_PUBLIC_ADS_ENABLED` | Display ads. Must be the string `true` at export. Off otherwise. | unset / false |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense `ca-pub-…` client. Required with the ads flag. | unset |
| `NEXT_PUBLIC_ADSENSE_SLOT_LAYOUT` | Optional leaderboard slot under the header | unset |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Optional sidebar slot (layout chrome, not inside rec cards) | unset |
| `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` | Optional slot above the legal footer | unset |
| `NEXT_PUBLIC_SITE_URL` | Canonical host | `https://decidefootball.com` |
| `NEXT_PUBLIC_DISPLAY_TZ` | “Playing today” timezone — **NEED JOSHUA INPUT** | `America/New_York` |
| `NEXT_PUBLIC_DEFAULT_FORMAT` | `ppr` / `half` / `std` — **NEED JOSHUA INPUT** | `ppr` |

Copy `.env.example`. Never commit secrets. GitHub Actions sets `COMPLIANCE_GATE` and `NEXT_PUBLIC_SITE_URL` on build.

## Compliance gate

| Gate | Behavior |
|------|----------|
| **RED** | Kill switch. Decision figures withheld. `noindex`. `robots.txt` disallows `/`. Legal pages still render. |
| **YELLOW** | Render with hold banner. Stay `noindex` unless Joshua + counsel accept residual risk. |
| **GREEN** | First-party analysis may render. **Fixture sports pages still `noindex`** until licensed GREEN (or accepted YELLOW) data replaces them. |

`last_verified` (data freshness) and `rendered` (this HTML, baked at export) are always shown separately.

## Fixture vs future licensed ingest

**Now:** hand-built fictional players, teams (plain text nicknames), weekly counting stats, usage shares, and sample status rows. Every sports page is labeled SAMPLE / FIXTURE. Injuries in the seed are **not** live verified reports.

**Later (blocked):** a licensed adapter behind `src/lib/jobs.ts`. Candidate discussed in the plan pack is BALLDONTLIE NFL GOAT (~$39.99/mo, class **YELLOW** until counsel). NWS weather and Wikidata are GREEN complements and are **not** called here.

Do not scrape NFL.com, ESPN, Sleeper, or any RED source. Register: [`compliance/DATA_SOURCE_REGISTER.md`](compliance/DATA_SOURCE_REGISTER.md).

## Routes

| Path | Notes |
|------|--------|
| `/` | Hub |
| `/players/[player]/` | Player hub |
| `/injuries/[player]/` | Status deep page (fixture) |
| `/is-[player]-playing-today/` | Availability. Built from `/is-playing/[player]/` and copied into `out/` at export |
| `/start-sit/[a]-vs-[b]/` | Canonical pair by ascending `player.id`; reverse order is a static redirect page |
| `/add-drop/[a]-vs-[b]/` | Same pair rule |
| `/week-[n]/[pos]-rankings/` | QB/RB/WR/TE (real static file) |
| `/slate/` | Week slate by kick window, Sunday Mode (fixture, noindex) |
| `/watchlist/` | localStorage watchlist (fixture names, noindex) |
| `/waiver-wire/week-[n]/` | Waiver radar with urgency |
| `/about/` | Brand / trust page (editorial; indexable when the gate is GREEN) |
| `/guide/start-sit/` | How to read a start/sit card (editorial; indexable when the gate is GREEN). Not under the fixture `/start-sit/` tree |
| `/methodology/` | v0 estimate methodology (editorial; indexable when the gate is GREEN) |
| `/privacy/` `/terms/` `/disclaimer/` `/cookies/` | Draft shells; **NEED JOSHUA INPUT** for contact/address (none invented). Page meta is `noindex` until placeholders are gone |
| `/robots.txt` `/sitemap.xml` `/llms.txt` | Sitemap lists indexable editorial URLs only (`/about/`, `/methodology/`, `/guide/start-sit/`). Fixture sports prefixes are disallowed. Unfinished legal shells are omitted from fixture-mode Allow (not Disallowed) so crawlers can see page `noindex` |
| `/health.json` | Build-time health payload |

GitHub Pages cannot emit HTTP 301. Reverse pairs and alias paths are exported as HTML redirects (`<meta refresh>` + `location.replace`) with `rel=canonical` and `noindex`.

## Publish on GitHub Pages (free)

This repo is configured for **Actions-based GitHub Pages**. There is no `gh-pages` branch. A `CNAME` file ships as `public/CNAME` → `out/CNAME` (`decidefootball.com`). `.nojekyll` is written so Pages does not hide the `_next/` folder.

### One-time GitHub settings (repo owner)

1. Repo **Settings → Pages**
2. **Source:** GitHub Actions (not “Deploy from a branch”)
3. After the first successful deploy + DNS, enable **Enforce HTTPS**

Workflows:

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — test + static export on PRs
- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — build and `actions/deploy-pages` **from `main`** (and manual `workflow_dispatch`)

Merging this branch to `main` is what publishes. Do not buy hosting.

### Namecheap DNS (do not run from this repo)

Point `decidefootball.com` at GitHub Pages, not Vercel:

| Host | Type | Value |
|------|------|--------|
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `joshuaofisrael.github.io` |

Optional IPv6 (same GitHub Pages anycast): `@` AAAA `2606:50c0:8000::153` through `2606:50c0:8003::153`.

This repository does **not** change Namecheap DNS. After those records exist, add `decidefootball.com` (and optionally `www`) as a custom domain on the Pages settings screen if GitHub has not already picked up the `CNAME` file.

No Vercel project. No Porkbun.

## Display ads (off by default)

Ads stay **off** unless the static export is built with `NEXT_PUBLIC_ADS_ENABLED=true` **and** `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set. GitHub Actions leaves those unset unless repo **Variables** are filled. Placeholder units sit in the layout chrome (under the header, a sidebar rail, above the footer). They are labeled **Advertisement**. They are never rendered inside start/sit recommendation cards.

`public/ads.txt` is a comment template (no invented publisher ID). The export writes a real `google.com, pub-…, DIRECT, …` line only when ads are enabled and the client ID contains a `pub-` number.

### Threshold policy

Do **not** flip the flag until one of these is true:

- GA4 shows **≥ 1,000 pageviews in the last 7 days**, or
- the AdSense account is approved / ready to serve

`NEXT_PUBLIC_GA4_ID` is required for the daily traffic routine that checks that 7-day count. Do not enable ads without a measurement ID you actually read.

### How to flip the flag and redeploy GitHub Pages

1. Confirm the threshold (or AdSense ready) and counsel/cookie approach as needed.
2. Repo **Settings → Secrets and variables → Actions → Variables**:
   - `NEXT_PUBLIC_ADS_ENABLED` = `true`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-…`
   - optional `NEXT_PUBLIC_ADSENSE_SLOT_LAYOUT` / `_SIDEBAR` / `_FOOTER`
   - `NEXT_PUBLIC_GA4_ID` = the measurement ID used for the daily check
3. Re-run **Deploy GitHub Pages** (`workflow_dispatch`) or push to `main`. The values are baked into the static export.
4. To turn ads off, set `NEXT_PUBLIC_ADS_ENABLED` to `false` (or delete it) and redeploy.

Ad scripts still wait for the consent stub (accept). Reject keeps the labeled reservation; it does not load AdSense.

## Product rules

- Metrics-first recommendations; never invent numbers
- No NFL/team logos, helmets, official photos, or “official” language
- No gambling, accounts, or fantasy-platform OAuth
- Operator line lives in the **footer only**
- Display ads stay **off** unless the export flag is on; when on, labeled chrome only, never inside recommendation cards

## Player imagery and photo licensing

Decide Football does **not** scrape NFL.com, ESPN, team sites, or any official photo archive.

This build ships **original illustrated avatars**: geometric SVG marks generated from each fixture player's name, slug, and position. They are first-party artwork, not likenesses of real athletes, and not team marks.

If a later licensed or Wikimedia Commons photograph is added:

1. Confirm a license that allows reuse (CC BY, CC BY-SA, CC0, or equivalent).
2. Keep the file under `public/players/` with a sidecar note: author, source URL, license, retrieval date.
3. Render credit on the player hub (author + license + link). Do not crop away required attribution.
4. Never hotlink a league or club CDN.

Until that happens, the illustrated marks are the only player imagery.

## Scripts

```bash
npm run dev
npm run build   # next export + CNAME / .nojekyll / health.json
npm start       # serve the out/ folder
npm test
npm run db:seed
```
