import { canonicalizePlayerPair, parsePairSlug } from "./canonicalize";
import { isFixtureMode } from "./compliance";
import {
  ADD_DROP_PAIRS,
  FIXTURE_COMPUTED_AT,
  FIXTURE_RUN,
  FIXTURE_SEASON,
  FIXTURE_WEEK,
  GAMES,
  INJURIES,
  MATCHUP_FACTORS,
  PLAYERS,
  START_SIT_PAIRS,
  TEAMS,
  USAGE,
  WAIVER_SLUGS,
  WEEKLY_STATS,
  verificationFor,
} from "./fixtures";
import { computeProjection } from "./projections";
import { rankPlayersByProjection, recommendAddDrop, recommendStartSit } from "./recommendations";
import { getDefaultFormat, type ScoringFormat, type SkillPosition } from "./site";
import type {
  AddDropRecommendation,
  Game,
  InjuryStatus,
  Player,
  PlayerStatsWeekly,
  ProjectionResult,
  StartSitRecommendation,
  Team,
  UsageMetric,
  VerificationStamp,
  WaiverRank,
} from "./types";

function notImplementedDb(): never {
  throw new Error(
    "Database repository is not wired in Phase-1. Keep USE_FIXTURES=true until licensed ingest exists.",
  );
}

export function getPlayers(): Player[] {
  if (!isFixtureMode()) notImplementedDb();
  return PLAYERS;
}

export function getPlayerBySlug(slug: string): Player | null {
  return getPlayers().find((p) => p.slug === slug) ?? null;
}

export function getTeam(teamId: string): Team | null {
  if (!isFixtureMode()) notImplementedDb();
  return TEAMS.find((t) => t.id === teamId) ?? null;
}

export function getTeamBySlug(slug: string): Team | null {
  return TEAMS.find((t) => t.slug === slug) ?? null;
}

export function getInjury(playerId: string): InjuryStatus | null {
  return INJURIES.find((row) => row.playerId === playerId) ?? null;
}

export function getRecentStats(playerId: string): PlayerStatsWeekly[] {
  return WEEKLY_STATS.filter((row) => row.playerId === playerId);
}

export function getUsage(playerId: string, week: number): UsageMetric | null {
  return USAGE.find((row) => row.playerId === playerId && row.week === week) ?? null;
}

export function getGameForTeam(teamId: string, week = FIXTURE_WEEK): Game | null {
  return (
    GAMES.find(
      (g) => g.week === week && (g.homeTeamId === teamId || g.awayTeamId === teamId),
    ) ?? null
  );
}

export function getOpponent(teamId: string, week = FIXTURE_WEEK): Team | null {
  const game = getGameForTeam(teamId, week);
  if (!game) return null;
  const oppId = game.homeTeamId === teamId ? game.awayTeamId : game.homeTeamId;
  return getTeam(oppId);
}

export function getVerification(playerId: string, factFamily: string): VerificationStamp {
  return verificationFor(playerId, factFamily);
}

export function getProjection(
  player: Player,
  week = FIXTURE_WEEK,
  format: ScoringFormat = getDefaultFormat(),
): ProjectionResult {
  return computeProjection({
    playerId: player.id,
    season: FIXTURE_SEASON,
    week,
    scoringFormat: format,
    recentStats: getRecentStats(player.id),
    usage: getUsage(player.id, week),
    priorUsage: getUsage(player.id, week - 1),
    injury: getInjury(player.id),
    matchupFactor: MATCHUP_FACTORS[player.id] ?? 0,
    computedAt: FIXTURE_COMPUTED_AT,
  });
}

export function getStartSitPairs(): { left: Player; right: Player }[] {
  return START_SIT_PAIRS.map(([a, b]) => {
    const left = getPlayerBySlug(a);
    const right = getPlayerBySlug(b);
    if (!left || !right) throw new Error(`Missing start/sit pair ${a} vs ${b}`);
    const pair = canonicalizePlayerPair(left, right);
    return { left: pair.left, right: pair.right };
  });
}

export function getAddDropPairs(): { left: Player; right: Player }[] {
  return ADD_DROP_PAIRS.map(([a, b]) => {
    const left = getPlayerBySlug(a);
    const right = getPlayerBySlug(b);
    if (!left || !right) throw new Error(`Missing add/drop pair ${a} vs ${b}`);
    const pair = canonicalizePlayerPair(left, right);
    return { left: pair.left, right: pair.right };
  });
}

export function resolvePair(pairSlug: string): {
  left: Player;
  right: Player;
  requestedLeft: Player;
  requestedRight: Player;
  isCanonical: boolean;
} | null {
  const parsed = parsePairSlug(pairSlug);
  if (!parsed) return null;
  const requestedLeft = getPlayerBySlug(parsed.leftSlug);
  const requestedRight = getPlayerBySlug(parsed.rightSlug);
  if (!requestedLeft || !requestedRight) return null;
  if (requestedLeft.id === requestedRight.id) return null;
  const canonical = canonicalizePlayerPair(requestedLeft, requestedRight);
  return {
    left: canonical.left,
    right: canonical.right,
    requestedLeft,
    requestedRight,
    isCanonical: requestedLeft.id === canonical.left.id,
  };
}

export function getStartSitRecommendation(
  left: Player,
  right: Player,
  format: ScoringFormat = getDefaultFormat(),
) {
  return recommendStartSit({
    left,
    right,
    leftProjection: getProjection(left, FIXTURE_WEEK, format),
    rightProjection: getProjection(right, FIXTURE_WEEK, format),
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    scoringFormat: format,
    computedAt: FIXTURE_COMPUTED_AT,
  });
}

export function getAddDropRecommendation(
  left: Player,
  right: Player,
  format: ScoringFormat = getDefaultFormat(),
) {
  return recommendAddDrop({
    left,
    right,
    leftProjection: getProjection(left, FIXTURE_WEEK, format),
    rightProjection: getProjection(right, FIXTURE_WEEK, format),
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    scoringFormat: format,
    computedAt: FIXTURE_COMPUTED_AT,
  });
}

export function getRankings(
  position: SkillPosition,
  week = FIXTURE_WEEK,
  format: ScoringFormat = getDefaultFormat(),
) {
  const rows = getPlayers()
    .filter((p) => p.position === position)
    .map((player) => ({ player, projection: getProjection(player, week, format) }));
  return rankPlayersByProjection(rows);
}

export function getWaiverRanks(
  week = FIXTURE_WEEK,
  format: ScoringFormat = getDefaultFormat(),
): WaiverRank[] {
  const rows = WAIVER_SLUGS.map((slug) => {
    const player = getPlayerBySlug(slug);
    if (!player) throw new Error(`Missing waiver player ${slug}`);
    return { player, projection: getProjection(player, week, format) };
  });
  return rankPlayersByProjection(rows);
}

export function comparisonsForPlayer(player: Player): StartSitRecommendation[] {
  return getStartSitPairs()
    .filter((pair) => pair.left.id === player.id || pair.right.id === player.id)
    .map((pair) => getStartSitRecommendation(pair.left, pair.right));
}

export function addDropsForPlayer(player: Player): AddDropRecommendation[] {
  return getAddDropPairs()
    .filter((pair) => pair.left.id === player.id || pair.right.id === player.id)
    .map((pair) => getAddDropRecommendation(pair.left, pair.right));
}

export function fixtureRun() {
  return FIXTURE_RUN;
}

export function fixtureWeekMeta() {
  return { season: FIXTURE_SEASON, week: FIXTURE_WEEK };
}
