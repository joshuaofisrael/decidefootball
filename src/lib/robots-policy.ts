import { isFixtureMode, robotsAllowIndexing } from "./compliance";

/** Indexable editorial cluster while sports fixtures stay blocked. */
export const EDITORIAL_ROBOTS_ALLOW = [
  "/about/",
  "/methodology/",
  "/guide/",
  "/guide/start-sit/",
  "/guide/waiver-radar/",
  "/guide/listed-status/",
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
    return { disallow: "/" };
  }

  if (state.fixtureMode) {
    return {
      allow: [...EDITORIAL_ROBOTS_ALLOW],
      disallow: [...FIXTURE_CONTENT_DISALLOW],
    };
  }

  return {
    allow: "/",
    disallow: ["/api/", "/health/"],
  };
}
