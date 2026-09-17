import type { ScoringFormat, SkillPosition } from "./site";

export type ComplianceGate = "RED" | "YELLOW" | "GREEN";
export type SourceClass = "GREEN" | "YELLOW" | "RED" | "FIXTURE";
export type InjuryStatusCode =
  | "HEALTHY"
  | "QUESTIONABLE"
  | "DOUBTFUL"
  | "OUT"
  | "IR"
  | "INACTIVE";
export type GameStatus = "scheduled" | "in_progress" | "final";
export type UncertaintyLabel = "low" | "med" | "high";
export type ComparisonType = "start_sit" | "add_drop";
export type Indexation = "index" | "noindex" | "blocked";
export type QualityGateStatus = "pass" | "fail" | "pending";

export interface Team {
  id: string;
  slug: string;
  displayNameText: string;
}

export interface Player {
  id: string;
  slug: string;
  displayName: string;
  position: SkillPosition;
  teamId: string;
  active: boolean;
}

export interface Game {
  id: string;
  season: number;
  week: number;
  kickoffAt: string;
  homeTeamId: string;
  awayTeamId: string;
  status: GameStatus;
}

export interface WeeklyCountingStats {
  passAtt: number;
  passYds: number;
  passTd: number;
  interceptions: number;
  rushAtt: number;
  rushYds: number;
  rushTd: number;
  targets: number;
  receptions: number;
  recYds: number;
  recTd: number;
  fumblesLost: number;
}

export interface PlayerStatsWeekly {
  playerId: string;
  season: number;
  week: number;
  stats: WeeklyCountingStats;
}

export interface UsageSnapshot {
  snapShare: number;
  targetShare: number | null;
  carryShare: number | null;
  routeShare: number | null;
}

export interface UsageMetric {
  playerId: string;
  season: number;
  week: number;
  metrics: UsageSnapshot;
}

export interface InjuryStatus {
  playerId: string;
  asOf: string;
  statusCode: InjuryStatusCode;
  bodyArea: string | null;
  notesSourceText: string | null;
  sourceClass: SourceClass;
  sourceRunId: string;
}

export interface VerificationStamp {
  factFamily: string;
  entityType: string;
  entityId: string;
  lastVerifiedAt: string;
  lastSourceRunId: string;
}

export interface DataSourceRun {
  id: string;
  sourceKey: string;
  startedAt: string;
  finishedAt: string;
  status: "success" | "fail" | "partial";
  complianceGate: ComplianceGate;
  sourceClass: SourceClass;
}

export interface ProjectionResult {
  playerId: string;
  season: number;
  week: number;
  scoringFormat: ScoringFormat;
  pointsMean: number;
  pointsFloor: number;
  pointsCeiling: number;
  uncertaintyLabel: UncertaintyLabel;
  modelVersion: string;
  computedAt: string;
  availabilityGated: boolean;
  components: {
    baseRate: number;
    usageAdj: number;
    matchupAdj: number;
    availabilityAdj: number;
    trailingWeeksUsed: number;
  };
}

export interface StartSitRecommendation {
  type: "start_sit";
  left: Player;
  right: Player;
  season: number;
  week: number;
  scoringFormat: ScoringFormat;
  winnerPlayerId: string | null;
  lean: "start_left" | "start_right" | "toss_up";
  scoreDelta: number;
  leftProjection: ProjectionResult;
  rightProjection: ProjectionResult;
  modelVersion: string;
  computedAt: string;
}

export interface AddDropRecommendation {
  type: "add_drop";
  left: Player;
  right: Player;
  season: number;
  week: number;
  scoringFormat: ScoringFormat;
  addPlayerId: string | null;
  dropPlayerId: string | null;
  lean: "add_left" | "add_right" | "toss_up";
  scoreDelta: number;
  leftProjection: ProjectionResult;
  rightProjection: ProjectionResult;
  modelVersion: string;
  computedAt: string;
}

export interface WaiverRank {
  rank: number;
  player: Player;
  projection: ProjectionResult;
  score: number;
}

export interface PageRecord {
  path: string;
  pageType: string;
  indexation: Indexation;
  qualityGateStatus: QualityGateStatus;
  canonicalPath: string;
  lastVerifiedAt: string | null;
}
