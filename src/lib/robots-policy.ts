import { isFixtureMode, robotsAllowIndexing } from "./compliance";

/** Indexable editorial cluster while sports fixtures stay blocked. */
export const EDITORIAL_ROBOTS_ALLOW = ["/about/", "/methodology/"] as const;

/**
 * Draft legal shells with unfinished placeholders. Humans can still open the
 * pages; they stay out of the Allow list and are Disallowed in fixture mode
 * so Google is not invited to index stub Privacy/Terms copy.
 */
export const LEGAL_STUB_DISALLOW = [
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
      disallow: [...FIXTURE_CONTENT_DISALLOW, ...LEGAL_STUB_DISALLOW],
    };
  }

  return {
    allow: "/",
    disallow: ["/api/", "/health/"],
  };
}
