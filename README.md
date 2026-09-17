# Decide Football

Independent fantasy football **decision** pages for [decidefootball.com](https://decidefootball.com): start/sit, is-playing, injuries, waivers, and rankings.

Not a sports news blog. Not NFL-affiliated. Not gambling.

**Consumer brand:** Decide Football  
**Operator (footer only):** Joshua Israel Ventures LLC  
**Phase:** Phase-1 GREEN-path scaffold. Fixture / sample data only.

## What this repo is

A production-shaped Next.js App Router site that:

- Renders high-intent decision URLs from **computed fixture metrics**
- Ships Postgres schema + migration + seed (Prisma)
- Enforces `COMPLIANCE_GATE=RED|YELLOW|GREEN` with a RED kill switch
- **noindex**s fixture sports pages and draft legal shells
- Stubs Redis, jobs, licensed ingest, and AI explain (off by default)
- Does **not** call sports APIs, scrape, or buy anything

Next operator step after review: **licensed data ingest, only after Joshua approves API spend.** Do not buy BALLDONTLIE (or any feed) from this scaffold. Never use Porkbun.

## Run locally

Requires Node 20+.

```bash
npm install
cp .env.example .env.local
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` works **without** Postgres. Pages read first-party fixtures from `src/lib/fixtures.ts`.

### Optional Postgres seed

Schema follows `C-database-schema.md`. Needed only when you want Prisma migrate/seed.

```bash
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/decidefootball"
npx prisma migrate deploy
npm run db:seed
```

The running app still defaults to fixtures until `USE_FIXTURES=false` and `USE_DATABASE=true` (not wired for production reads in this phase).

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

Copy `.env.example`. Never commit secrets.

## Compliance gate

| Gate | Behavior |
|------|----------|
| **RED** | Kill switch. Decision figures withheld. `noindex`. `robots.txt` disallows `/`. Legal pages still render. |
| **YELLOW** | Render with hold banner. Stay `noindex` unless Joshua + counsel accept residual risk. |
| **GREEN** | First-party analysis may render. **Fixture sports pages still `noindex`** until licensed GREEN (or accepted YELLOW) data replaces them. |

`last_verified` (data freshness) and `rendered` (this HTML) are always shown separately.

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
| `/is-[player]-playing-today/` | Availability; rewrite to `/is-playing/[player]/` |
| `/start-sit/[a]-vs-[b]/` | Canonical pair by ascending `player.id`; reverse **301** |
| `/add-drop/[a]-vs-[b]/` | Same pair rule |
| `/week-[n]/[pos]-rankings/` | QB/RB/WR/TE |
| `/waiver-wire/week-[n]/` | Fixture priority list |
| `/methodology/` | v0 estimate methodology |
| `/privacy/` `/terms/` `/disclaimer/` `/cookies/` | Draft shells; **NEED JOSHUA INPUT** for contact/address (none invented) |
| `/robots.txt` `/sitemap.xml` | Sitemap includes **indexable URLs only** (empty in this phase) |
| `/health/` | Gate + fixture-mode JSON |

## How to deploy later (not done here)

Production Vercel deploy and DNS are **out of scope** for this PR.

When Joshua is ready (after legal + data spend):

1. Create a Vercel project from this GitHub repo (do not buy extra domains; `decidefootball.com` is already at Namecheap).
2. Set env vars in the Vercel project (start with `COMPLIANCE_GATE=GREEN`, fixtures on, no API keys).
3. Point Namecheap DNS at Vercel only when you intend to serve this app. This repo does not change DNS.
4. Add Postgres (Neon/Supabase/RDS) and run `prisma migrate deploy` + seed **or** licensed ingest — not before.
5. Keep pages `noindex` until licensed data and counsel-ready legal text replace drafts.

## Product rules

- Metrics-first recommendations; never invent numbers
- No NFL/team logos, helmets, official photos, or “official” language
- No gambling, ads, accounts, or fantasy-platform OAuth
- Operator line lives in the **footer only**

## Scripts

```bash
npm run dev
npm run build
npm start
npm test
npm run db:seed
```
