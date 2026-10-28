import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function repoRoot(): string {
  return process.cwd();
}

const W3C_DATE = /^(\d{4}-\d{2}-\d{2})$/;

/**
 * A date stored with the page. `contentUpdated` is an explicit export.
 * `lastModified` is the metadata field, date-only or the date prefix of an ISO timestamp.
 */
const METADATA_LASTMOD =
  /(?:export const contentUpdated\s*=\s*|lastModified\s*:\s*)["'](\d{4}-\d{2}-\d{2})(?:T[^"']*)?["']/;

const GUIDE_LIBS = [
  "start-sit-guide",
  "waiver-radar-guide",
  "listed-status-guide",
  "weekly-waiver",
  "weekly-waiver-week-7",
  "weekly-waiver-week-8",
  "weekly-start-sit",
  "weekly-start-sit-week-7",
  "weekly-start-sit-week-8",
  "thanksgiving-watch-2026",
  "cfp-watch-2026-27",
  "bowl-watch-2026-27",
  "christmas-watch-2026",
  "nfl-playoffs-2027",
] as const;

const STATIC_PAGE_FILES: Record<string, string> = {
  "/": "src/app/page.tsx",
  "/about/": "src/app/about/page.tsx",
  "/methodology/": "src/app/methodology/page.tsx",
  "/guide/": "src/app/guide/page.tsx",
  "/guide/start-sit/": "src/app/guide/start-sit/page.tsx",
  "/guide/waiver-radar/": "src/app/guide/waiver-radar/page.tsx",
  "/guide/listed-status/": "src/app/guide/listed-status/page.tsx",
  "/guide/rankings/": "src/app/guide/rankings/page.tsx",
  "/guide/add-drop/": "src/app/guide/add-drop/page.tsx",
  "/guide/toss-up/": "src/app/guide/toss-up/page.tsx",
  "/guide/certainty/": "src/app/guide/certainty/page.tsx",
  "/guide/thanksgiving-nfl-how-to-watch/": "src/app/guide/thanksgiving-nfl-how-to-watch/page.tsx",
  "/guide/college-football-playoff-2026-schedule-how-to-watch/":
    "src/app/guide/college-football-playoff-2026-schedule-how-to-watch/page.tsx",
  "/guide/bowl-schedule-2026-how-to-watch/": "src/app/guide/bowl-schedule-2026-how-to-watch/page.tsx",
  "/guide/christmas-nfl-how-to-watch/": "src/app/guide/christmas-nfl-how-to-watch/page.tsx",
  "/guide/nfl-playoffs-2027-schedule-how-to-watch/":
    "src/app/guide/nfl-playoffs-2027-schedule-how-to-watch/page.tsx",
  "/waiver-radar/2026-week-6/": "src/app/waiver-radar/2026-week-6/page.tsx",
  "/waiver-radar/2026-week-7/": "src/app/waiver-radar/2026-week-7/page.tsx",
  "/waiver-radar/2026-week-8/": "src/app/waiver-radar/2026-week-8/page.tsx",
  "/start-sit/2026-week-6/": "src/app/start-sit/2026-week-6/page.tsx",
  "/start-sit/2026-week-7/": "src/app/start-sit/2026-week-7/page.tsx",
  "/start-sit/2026-week-8/": "src/app/start-sit/2026-week-8/page.tsx",
  "/terms/": "src/app/terms/page.tsx",
  "/privacy/": "src/app/privacy/page.tsx",
  "/disclaimer/": "src/app/disclaimer/page.tsx",
  "/contact/": "src/app/contact/page.tsx",
  "/contact/thanks/": "src/app/contact/thanks/page.tsx",
  "/cookies/": "src/app/cookies/page.tsx",
  "/start-sit/": "src/app/start-sit/page.tsx",
  "/add-drop/": "src/app/add-drop/page.tsx",
  "/rankings/": "src/app/rankings/page.tsx",
  "/waiver-radar/": "src/app/waiver-radar/page.tsx",
  "/players/": "src/app/players/page.tsx",
  "/is-playing/": "src/app/is-playing/page.tsx",
  "/slate/": "src/app/slate/page.tsx",
  "/watchlist/": "src/app/watchlist/page.tsx",
  "/health/": "src/app/health/page.tsx",
};

const gitDateCache = new Map<string, string | null>();

export function buildDate(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function metadataDateFromSource(source: string): string | null {
  const match = source.match(METADATA_LASTMOD);
  const date = match?.[1];
  return date && W3C_DATE.test(date) ? date : null;
}

/**
 * Page metadata wins, then the latest content commit, then the build date.
 * Invalid candidates are skipped so a bad string cannot become a lastmod.
 */
export function resolveContentLastmod(args: {
  metadataDate?: string | null;
  gitDate?: string | null;
  buildDate: string;
}): string {
  for (const candidate of [args.metadataDate, args.gitDate, args.buildDate]) {
    if (candidate && W3C_DATE.test(candidate)) return candidate;
  }
  return buildDate();
}

export function pageFileForPath(path: string): string | null {
  const staticFile = STATIC_PAGE_FILES[path];
  if (staticFile) return staticFile;
  if (/^\/week-\d+\/[a-z]+-rankings\/$/.test(path)) return "src/app/week-[week]/[posSlug]/page.tsx";
  if (path.startsWith("/start-sit/")) return "src/app/start-sit/[pair]/page.tsx";
  if (path.startsWith("/add-drop/")) return "src/app/add-drop/[pair]/page.tsx";
  if (path.startsWith("/players/")) return "src/app/players/[player]/page.tsx";
  if (path.startsWith("/injuries/")) return "src/app/injuries/[player]/page.tsx";
  if (path.startsWith("/is-") && path.endsWith("-playing-today/")) {
    return "src/app/is-playing/[player]/page.tsx";
  }
  return null;
}

/**
 * Files that hold the page's copy or the sample rows it renders.
 * Shared chrome (header, footer, layout) is omitted so a footer edit does not
 * restamp every URL. The sample banner is included because its sentence is
 * page content.
 */
export function contentFilesForPath(path: string): string[] {
  const page = pageFileForPath(path);
  if (!page) return [];
  const files = [page];
  let source = "";
  try {
    source = readFileSync(join(repoRoot(), page), "utf8");
  } catch {
    return files;
  }
  for (const name of GUIDE_LIBS) {
    if (source.includes(`@/lib/${name}`)) files.push(`src/lib/${name}.ts`);
  }
  if (source.includes("@/lib/data") || source.includes("@/lib/fixtures")) {
    files.push("src/lib/fixtures.ts");
  }
  if (source.includes("FixtureBanner")) {
    files.push("src/components/FixtureBanner.tsx", "src/lib/compliance.ts");
  }
  if (source.includes("WatchlistDesk")) {
    files.push("src/components/WatchlistDesk.tsx");
  }
  return files;
}

function gitCommitDate(file: string): string | null {
  const cached = gitDateCache.get(file);
  if (cached !== undefined) return cached;
  let date: string | null = null;
  try {
    const output = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: repoRoot(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (W3C_DATE.test(output)) date = output;
  } catch {
    date = null;
  }
  gitDateCache.set(file, date);
  return date;
}

function latestGitDate(files: string[]): string | null {
  let latest: string | null = null;
  for (const file of files) {
    const date = gitCommitDate(file);
    if (date && (latest === null || date > latest)) latest = date;
  }
  return latest;
}

export function lastmodForPath(path: string, now: Date = new Date()): string {
  const page = pageFileForPath(path);
  let metadataDate: string | null = null;
  if (page) {
    try {
      metadataDate = metadataDateFromSource(readFileSync(join(repoRoot(), page), "utf8"));
    } catch {
      metadataDate = null;
    }
  }
  return resolveContentLastmod({
    metadataDate,
    gitDate: latestGitDate(contentFilesForPath(path)),
    buildDate: buildDate(now),
  });
}
