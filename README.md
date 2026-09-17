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
- **noindex**s fixture sports pages and draft legal shells
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
| `NEXT_PUBLIC_GA4_ID` | GA4 placeholder; script loads only after consent stub accept | unset |
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
| `/waiver-wire/week-[n]/` | Fixture priority list |
| `/methodology/` | v0 estimate methodology |
| `/privacy/` `/terms/` `/disclaimer/` `/cookies/` | Draft shells; **NEED JOSHUA INPUT** for contact/address (none invented) |
| `/robots.txt` `/sitemap.xml` | Sitemap includes **indexable URLs only** (empty in this phase) |
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

## Product rules

- Metrics-first recommendations; never invent numbers
- No NFL/team logos, helmets, official photos, or “official” language
- No gambling, ads, accounts, or fantasy-platform OAuth
- Operator line lives in the **footer only**

## Scripts

```bash
npm run dev
npm run build   # next export + CNAME / .nojekyll / health.json
npm start       # serve the out/ folder
npm test
npm run db:seed
```
