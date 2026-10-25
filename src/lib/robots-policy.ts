import { robotsAllowIndexing, isFixtureMode } from "./compliance";

/**
 * Named crawlers listed in the same robots group as `*` so a specific agent
 * does not override the star rules. The group allows `/` and disallows only `/api/`.
 */
export const AI_SEARCH_USER_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "anthropic-ai",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
] as const;

/**
 * Indexable editorial pages. Finished legal pages are included.
 * The cookie notice is indexable and listed with them.
 * Sample desks are allowed by `Allow: /` and are not repeated here.
 */
export const EDITORIAL_ROBOTS_ALLOW = [
  "/about/",
  "/methodology/",
  "/guide/",
  "/guide/start-sit/",
  "/guide/waiver-radar/",
  "/guide/listed-status/",
  "/guide/rankings/",
  "/guide/add-drop/",
  "/guide/toss-up/",
  "/guide/certainty/",
  "/guide/thanksgiving-nfl-how-to-watch/",
  "/guide/college-football-playoff-2026-schedule-how-to-watch/",
  "/guide/bowl-schedule-2026-how-to-watch/",
  "/guide/christmas-nfl-how-to-watch/",
  "/guide/nfl-playoffs-2027-schedule-how-to-watch/",
  "/waiver-radar/2026-week-6/",
  "/waiver-radar/2026-week-7/",
  "/start-sit/2026-week-6/",
  "/start-sit/2026-week-7/",
  "/terms/",
  "/privacy/",
  "/disclaimer/",
  "/contact/",
  "/contact/thanks/",
  "/cookies/",
] as const;

/**
 * No legal page is omitted from crawl. Kept as an empty list so callers
 * that still iterate stubs do not invent a noindex exception.
 */
export const LEGAL_STUB_PATHS = [] as const;

/**
 * Not a public page. Real HTML pages, including sample desks, stay crawlable.
 */
export const NON_PAGE_DISALLOW = ["/api/"] as const;

export interface RobotsPolicyState {
  allowIndexing: boolean;
  fixtureMode: boolean;
}

export function currentRobotsPolicyState(): RobotsPolicyState {
  return {
    allowIndexing: robotsAllowIndexing(),
    fixtureMode: isFixtureMode(),
  };
}

export function buildRobotsRules(state: RobotsPolicyState = currentRobotsPolicyState()): {
  allow?: string | string[];
  disallow: string | string[];
} {
  if (!state.allowIndexing) {
    // Kill switch stays a full disallow. Do not open /llms.txt as an exception.
    return { disallow: "/" };
  }

  return {
    allow: ["/", ...EDITORIAL_ROBOTS_ALLOW, "/llms.txt"],
    disallow: [...NON_PAGE_DISALLOW],
  };
}
