import { getAddDropPairs, getPlayers, getStartSitPairs } from "./data";
import { EDITORIAL_SITEMAP_PATHS } from "./editorial-urls";
import { FIXTURE_WEEK } from "./fixtures";
import { isKillSwitchActive } from "./compliance";
import { playingTodaySegment, weekRankingsPath } from "./static-paths";
import { absoluteUrl, POSITIONS } from "./site";

/** Sample waiver desk. The reading guide stays at /guide/waiver-radar/. */
export const WAIVER_DESK_PATH = "/waiver-radar/";

/** Old desk prefix. Static HTML here only redirects. */
export const WAIVER_DESK_REDIRECT_PATH = "/waiver-wire/";

const DESK_INDEX_PATHS = [
  "/start-sit/",
  "/add-drop/",
  "/rankings/",
  WAIVER_DESK_PATH,
  "/players/",
  "/is-playing/",
  "/slate/",
  "/watchlist/",
  "/health/",
] as const;

/**
 * Every real page, trailing slash, in sitemap order.
 * Redirect stubs and reverse-pair aliases are omitted.
 */
export function indexableSitemapPaths(): string[] {
  const players = getPlayers();
  return [
    "/",
    ...EDITORIAL_SITEMAP_PATHS,
    ...DESK_INDEX_PATHS,
    ...POSITIONS.map((pos) => weekRankingsPath(FIXTURE_WEEK, pos)),
    ...getStartSitPairs().map(
      ({ left, right }) => `/start-sit/${left.slug}-vs-${right.slug}/`,
    ),
    ...getAddDropPairs().map(
      ({ left, right }) => `/add-drop/${left.slug}-vs-${right.slug}/`,
    ),
    ...players.flatMap((player) => [
      `/players/${player.slug}/`,
      `/injuries/${player.slug}/`,
      `/is-${playingTodaySegment(player.slug)}/`,
    ]),
  ];
}

export function indexableSitemapEntries(): { url: string }[] {
  if (isKillSwitchActive()) return [];
  return indexableSitemapPaths().map((path) => ({ url: absoluteUrl(path) }));
}
