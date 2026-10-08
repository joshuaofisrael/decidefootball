import { isFixtureMode, robotsAllowIndexing } from "./compliance";

/**
 * Named AI search crawlers. They are listed in the same robots group as `*`
 * so a specific agent does not override the star rules.
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
] as const;

/** Indexable editorial cluster while sports fixtures stay blocked. */
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
] as const;

/**
 * Unfinished legal shells. Page meta is already noindex,follow. Omit them
 * from both Allow and Disallow in fixture mode so crawlers are not invited
 * to treat them as indexable inventory, but can still recrawl the noindex tag.
 */
export const LEGAL_STUB_PATHS = [
  "/privacy/",
  "/terms/",
  "/disclaimer/",
  "/cookies/",
] as const;

/**
 * Fixture / sample sports URL prefixes.
 * `/is-` also covers postbuild pretty copies such as `/is-{slug}-playing-today/`.
 */
export const FIXTURE_CONTENT_DISALLOW = [
  "/players/",
  "/start-sit/",
  "/is-playing/",
  "/is-",
  "/injuries/",
  "/rankings/",
  "/waiver-wire/",
  "/add-drop/",
  "/week-",
  "/slate/",
  "/watchlist/",
  "/health/",
  "/api/",
] as const;

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

  if (state.fixtureMode) {
    return {
      allow: [...EDITORIAL_ROBOTS_ALLOW, "/llms.txt"],
      disallow: [...FIXTURE_CONTENT_DISALLOW],
    };
  }

  return {
    allow: ["/", "/llms.txt"],
    disallow: ["/api/", "/health/"],
  };
}
