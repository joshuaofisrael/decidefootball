import { DEFAULT_SEASON, DEFAULT_WEEK } from "./site";
import type {
  DataSourceRun,
  Game,
  InjuryEvent,
  InjuryStatus,
  KickWindow,
  Player,
  PlayerStatsWeekly,
  Team,
  UsageMetric,
  VerificationStamp,
  WeeklyCountingStats,
} from "./types";

export const FIXTURE_SEASON = DEFAULT_SEASON;
export const FIXTURE_WEEK = DEFAULT_WEEK;
export const FIXTURE_COMPUTED_AT = "2026-09-16T18:00:00.000Z";
export const FIXTURE_VERIFIED_AT = "2026-09-16T17:30:00.000Z";

export const FIXTURE_RUN: DataSourceRun = {
  id: "00000000-0000-4000-8000-000000000001",
  sourceKey: "first-party-fixtures",
  startedAt: "2026-09-16T17:00:00.000Z",
  finishedAt: FIXTURE_VERIFIED_AT,
  status: "success",
  complianceGate: "GREEN",
  sourceClass: "FIXTURE",
};

export const TEAMS: Team[] = [
  { id: "00000000-0000-4000-8000-000000000101", slug: "river-city", displayNameText: "River City" },
  { id: "00000000-0000-4000-8000-000000000102", slug: "harbor-wave", displayNameText: "Harbor Wave" },
  { id: "00000000-0000-4000-8000-000000000103", slug: "prairie-wind", displayNameText: "Prairie Wind" },
  { id: "00000000-0000-4000-8000-000000000104", slug: "iron-range", displayNameText: "Iron Range" },
  { id: "00000000-0000-4000-8000-000000000105", slug: "desert-mesa", displayNameText: "Desert Mesa" },
  { id: "00000000-0000-4000-8000-000000000106", slug: "lake-shore", displayNameText: "Lake Shore" },
];

export const PLAYERS: Player[] = [
  {
    id: "00000000-0000-4000-8000-000000000201",
    slug: "jordan-voss",
    displayName: "Jordan Voss",
    position: "RB",
    teamId: "00000000-0000-4000-8000-000000000101",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000202",
    slug: "marcus-hale",
    displayName: "Marcus Hale",
    position: "WR",
    teamId: "00000000-0000-4000-8000-000000000102",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000203",
    slug: "elias-quinn",
    displayName: "Elias Quinn",
    position: "QB",
    teamId: "00000000-0000-4000-8000-000000000103",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000204",
    slug: "theo-marsh",
    displayName: "Theo Marsh",
    position: "TE",
    teamId: "00000000-0000-4000-8000-000000000104",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000205",
    slug: "kai-benton",
    displayName: "Kai Benton",
    position: "WR",
    teamId: "00000000-0000-4000-8000-000000000105",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000206",
    slug: "noah-crowe",
    displayName: "Noah Crowe",
    position: "RB",
    teamId: "00000000-0000-4000-8000-000000000102",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000207",
    slug: "riley-soto",
    displayName: "Riley Soto",
    position: "QB",
    teamId: "00000000-0000-4000-8000-000000000101",
    active: true,
  },
  {
    id: "00000000-0000-4000-8000-000000000208",
    slug: "amir-cole",
    displayName: "Amir Cole",
    position: "WR",
    teamId: "00000000-0000-4000-8000-000000000103",
    active: true,
  },
];

export const GAMES: Game[] = [
  {
    id: "00000000-0000-4000-8000-000000000301",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    kickoffAt: "2026-09-20T17:00:00.000Z",
    homeTeamId: "00000000-0000-4000-8000-000000000101",
    awayTeamId: "00000000-0000-4000-8000-000000000102",
    status: "scheduled",
  },
  {
    id: "00000000-0000-4000-8000-000000000302",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    kickoffAt: "2026-09-20T20:25:00.000Z",
    homeTeamId: "00000000-0000-4000-8000-000000000103",
    awayTeamId: "00000000-0000-4000-8000-000000000104",
    status: "scheduled",
  },
  {
    id: "00000000-0000-4000-8000-000000000303",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    kickoffAt: "2026-09-21T17:00:00.000Z",
    homeTeamId: "00000000-0000-4000-8000-000000000105",
    awayTeamId: "00000000-0000-4000-8000-000000000106",
    status: "scheduled",
  },
];

const empty: WeeklyCountingStats = {
  passAtt: 0,
  passYds: 0,
  passTd: 0,
  interceptions: 0,
  rushAtt: 0,
  rushYds: 0,
  rushTd: 0,
  targets: 0,
  receptions: 0,
  recYds: 0,
  recTd: 0,
  fumblesLost: 0,
};

function stats(
  playerId: string,
  week: number,
  partial: Partial<WeeklyCountingStats>,
): PlayerStatsWeekly {
  return {
    playerId,
    season: FIXTURE_SEASON,
    week,
    stats: { ...empty, ...partial },
  };
}

export const WEEKLY_STATS: PlayerStatsWeekly[] = [
  stats("00000000-0000-4000-8000-000000000201", 1, {
    rushAtt: 18,
    rushYds: 92,
    rushTd: 1,
    targets: 4,
    receptions: 3,
    recYds: 21,
  }),
  stats("00000000-0000-4000-8000-000000000201", 2, {
    rushAtt: 22,
    rushYds: 114,
    rushTd: 1,
    targets: 5,
    receptions: 4,
    recYds: 33,
  }),
  stats("00000000-0000-4000-8000-000000000202", 1, {
    targets: 9,
    receptions: 6,
    recYds: 88,
    recTd: 1,
  }),
  stats("00000000-0000-4000-8000-000000000202", 2, {
    targets: 7,
    receptions: 4,
    recYds: 52,
  }),
  stats("00000000-0000-4000-8000-000000000203", 1, {
    passAtt: 34,
    passYds: 268,
    passTd: 2,
    interceptions: 1,
    rushAtt: 4,
    rushYds: 18,
  }),
  stats("00000000-0000-4000-8000-000000000203", 2, {
    passAtt: 31,
    passYds: 241,
    passTd: 1,
    interceptions: 0,
    rushAtt: 5,
    rushYds: 27,
    rushTd: 1,
  }),
  stats("00000000-0000-4000-8000-000000000204", 1, {
    targets: 6,
    receptions: 4,
    recYds: 47,
    recTd: 1,
  }),
  stats("00000000-0000-4000-8000-000000000204", 2, {
    targets: 5,
    receptions: 3,
    recYds: 29,
  }),
  stats("00000000-0000-4000-8000-000000000205", 1, {
    targets: 8,
    receptions: 5,
    recYds: 71,
  }),
  stats("00000000-0000-4000-8000-000000000205", 2, {
    targets: 11,
    receptions: 8,
    recYds: 104,
    recTd: 1,
  }),
  stats("00000000-0000-4000-8000-000000000206", 1, {
    rushAtt: 12,
    rushYds: 48,
    targets: 3,
    receptions: 2,
    recYds: 14,
  }),
  stats("00000000-0000-4000-8000-000000000206", 2, {
    rushAtt: 14,
    rushYds: 61,
    rushTd: 1,
    targets: 2,
    receptions: 1,
    recYds: 9,
  }),
  stats("00000000-0000-4000-8000-000000000207", 1, {
    passAtt: 29,
    passYds: 198,
    passTd: 1,
    interceptions: 1,
    rushAtt: 3,
    rushYds: 12,
  }),
  stats("00000000-0000-4000-8000-000000000207", 2, {
    passAtt: 33,
    passYds: 226,
    passTd: 2,
    interceptions: 0,
    rushAtt: 2,
    rushYds: 6,
  }),
  stats("00000000-0000-4000-8000-000000000208", 1, {
    targets: 5,
    receptions: 3,
    recYds: 41,
  }),
  stats("00000000-0000-4000-8000-000000000208", 2, {
    targets: 6,
    receptions: 4,
    recYds: 55,
  }),
  stats("00000000-0000-4000-8000-000000000201", 3, {
    rushAtt: 20,
    rushYds: 101,
    rushTd: 1,
    targets: 4,
    receptions: 3,
    recYds: 18,
  }),
  stats("00000000-0000-4000-8000-000000000202", 3, {
    targets: 8,
    receptions: 5,
    recYds: 61,
  }),
  stats("00000000-0000-4000-8000-000000000203", 3, {
    passAtt: 32,
    passYds: 255,
    passTd: 2,
    interceptions: 0,
    rushAtt: 4,
    rushYds: 21,
  }),
  stats("00000000-0000-4000-8000-000000000204", 3, {
    targets: 0,
    receptions: 0,
    recYds: 0,
  }),
  stats("00000000-0000-4000-8000-000000000205", 3, {
    targets: 12,
    receptions: 8,
    recYds: 119,
    recTd: 1,
  }),
  stats("00000000-0000-4000-8000-000000000206", 3, {
    rushAtt: 13,
    rushYds: 54,
    targets: 3,
    receptions: 2,
    recYds: 11,
  }),
  stats("00000000-0000-4000-8000-000000000207", 3, {
    passAtt: 30,
    passYds: 209,
    passTd: 1,
    interceptions: 1,
    rushAtt: 3,
    rushYds: 9,
  }),
  stats("00000000-0000-4000-8000-000000000208", 3, {
    targets: 7,
    receptions: 4,
    recYds: 48,
  }),
];

export const PLAYER_NOTES: Record<string, { role: string; desk: string }> = {
  "jordan-voss": {
    role: "Lead back, every-down snaps",
    desk: "Voss is the volume. Harbor Wave cannot tackle him in this seed. If you sit him, you need a better reason than a hunch.",
  },
  "marcus-hale": {
    role: "Perimeter WR, hamstring watch",
    desk: "Hale's route share slipped when the hamstring showed up. The mean already prices that. Do not invent a worse number.",
  },
  "elias-quinn": {
    role: "Full-snap passer with designed keepers",
    desk: "Quinn is the clean QB in this set. The rushing floor is real. Soto is the other chair.",
  },
  "theo-marsh": {
    role: "Inline TE, out with ankle",
    desk: "Marsh is a zero this week. The timeline is the story, not the target share from week 1.",
  },
  "kai-benton": {
    role: "Alpha WR, 90% snaps",
    desk: "Benton is the waiver you already missed. Use him as the high side in Hale comparisons.",
  },
  "noah-crowe": {
    role: "Split-back, committee",
    desk: "Crowe works. He does not work enough to beat Voss. Fine as a flex if your RB2 is worse.",
  },
  "riley-soto": {
    role: "Game-manager QB",
    desk: "Soto is startable in 2QB. In 1QB he is a streamer behind Quinn.",
  },
  "amir-cole": {
    role: "WR3 / deep-league dart",
    desk: "Cole is the radar stash. Role is climbing. Do not spend like he is Benton.",
  },
};

export const INJURY_EVENTS: InjuryEvent[] = [
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    asOf: "2026-09-09T17:00:00.000Z",
    statusCode: "HEALTHY",
    bodyArea: null,
    note: "Week 1 fixture: no designation.",
  },
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    asOf: "2026-09-13T16:00:00.000Z",
    statusCode: "QUESTIONABLE",
    bodyArea: "hamstring",
    note: "Week 2 fixture: limited, then questionable. Sample only.",
  },
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "QUESTIONABLE",
    bodyArea: "hamstring",
    note: "Week 3 fixture: still questionable. Not a live report.",
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    asOf: "2026-09-09T17:00:00.000Z",
    statusCode: "QUESTIONABLE",
    bodyArea: "ankle",
    note: "Week 1 fixture: ankle, questionable. Played through it in this seed.",
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    asOf: "2026-09-13T16:00:00.000Z",
    statusCode: "OUT",
    bodyArea: "ankle",
    note: "Week 2 fixture: ruled out. Used to exercise the zero gate.",
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "OUT",
    bodyArea: "ankle",
    note: "Week 3 fixture: remains out. Estimate is forced to 0.",
  },
];

export function kickWindow(iso: string): KickWindow {
  const day = new Date(iso).getUTCDay();
  const hour = new Date(iso).getUTCHours();
  if (day === 0 && hour < 19) return "sunday-early";
  if (day === 0) return "sunday-late";
  if (day === 1) return "monday";
  return "other";
}

export function kickWindowLabel(window: KickWindow): string {
  if (window === "sunday-early") return "Sunday early";
  if (window === "sunday-late") return "Sunday late";
  if (window === "monday") return "Monday";
  return "Other window";
}

export const USAGE: UsageMetric[] = [
  {
    playerId: "00000000-0000-4000-8000-000000000201",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.71, targetShare: 0.12, carryShare: 0.62, routeShare: 0.28 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000201",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0.74, targetShare: 0.13, carryShare: 0.64, routeShare: 0.3 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.82, targetShare: 0.21, carryShare: null, routeShare: 0.86 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0.68, targetShare: 0.17, carryShare: null, routeShare: 0.7 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000203",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 1, targetShare: null, carryShare: 0.08, routeShare: null },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000203",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 1, targetShare: null, carryShare: 0.09, routeShare: null },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.77, targetShare: 0.16, carryShare: null, routeShare: 0.72 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0, targetShare: 0, carryShare: null, routeShare: 0 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000205",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.88, targetShare: 0.26, carryShare: null, routeShare: 0.91 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000205",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0.9, targetShare: 0.27, carryShare: null, routeShare: 0.92 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000206",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.48, targetShare: 0.08, carryShare: 0.38, routeShare: 0.22 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000206",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0.5, targetShare: 0.08, carryShare: 0.4, routeShare: 0.22 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000207",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 1, targetShare: null, carryShare: 0.05, routeShare: null },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000207",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 1, targetShare: null, carryShare: 0.05, routeShare: null },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000208",
    season: FIXTURE_SEASON,
    week: 2,
    metrics: { snapShare: 0.61, targetShare: 0.14, carryShare: null, routeShare: 0.64 },
  },
  {
    playerId: "00000000-0000-4000-8000-000000000208",
    season: FIXTURE_SEASON,
    week: FIXTURE_WEEK,
    metrics: { snapShare: 0.63, targetShare: 0.15, carryShare: null, routeShare: 0.66 },
  },
];

export const INJURIES: InjuryStatus[] = [
  {
    playerId: "00000000-0000-4000-8000-000000000201",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000202",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "QUESTIONABLE",
    bodyArea: "hamstring",
    notesSourceText:
      "Fixture sample only. Not a live or official injury report. Used to exercise questionable discounting.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000203",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000204",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "OUT",
    bodyArea: "ankle",
    notesSourceText:
      "Fixture sample only. Not a live or official injury report. Used to exercise the OUT → 0 gate.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000205",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000206",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000207",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
  {
    playerId: "00000000-0000-4000-8000-000000000208",
    asOf: FIXTURE_VERIFIED_AT,
    statusCode: "HEALTHY",
    bodyArea: null,
    notesSourceText: "Fixture sample. No designation in this seed.",
    sourceClass: "FIXTURE",
    sourceRunId: FIXTURE_RUN.id,
  },
];

export const MATCHUP_FACTORS: Record<string, number> = {
  "00000000-0000-4000-8000-000000000201": 0.04,
  "00000000-0000-4000-8000-000000000202": -0.03,
  "00000000-0000-4000-8000-000000000203": 0.02,
  "00000000-0000-4000-8000-000000000204": 0,
  "00000000-0000-4000-8000-000000000205": 0.05,
  "00000000-0000-4000-8000-000000000206": -0.02,
  "00000000-0000-4000-8000-000000000207": -0.01,
  "00000000-0000-4000-8000-000000000208": 0.01,
};

export const START_SIT_PAIRS: [string, string][] = [
  ["jordan-voss", "noah-crowe"],
  ["marcus-hale", "kai-benton"],
  ["elias-quinn", "riley-soto"],
];

export const ADD_DROP_PAIRS: [string, string][] = [
  ["kai-benton", "amir-cole"],
  ["noah-crowe", "amir-cole"],
];

export const WAIVER_SLUGS = ["amir-cole", "noah-crowe", "marcus-hale"];

export function verificationFor(playerId: string, factFamily: string): VerificationStamp {
  return {
    factFamily,
    entityType: "player",
    entityId: playerId,
    lastVerifiedAt: FIXTURE_VERIFIED_AT,
    lastSourceRunId: FIXTURE_RUN.id,
  };
}
