import type { ScoringFormat } from "./site";
import type { WeeklyCountingStats } from "./types";

export function fantasyPoints(stats: WeeklyCountingStats, format: ScoringFormat): number {
  const recBonus = format === "ppr" ? 1 : format === "half" ? 0.5 : 0;
  return round1(
    stats.passYds * 0.04 +
      stats.passTd * 4 +
      stats.interceptions * -2 +
      stats.rushYds * 0.1 +
      stats.rushTd * 6 +
      stats.recYds * 0.1 +
      stats.recTd * 6 +
      stats.receptions * recBonus +
      stats.fumblesLost * -2,
  );
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function statusVerb(code: string): string {
  switch (code) {
    case "OUT":
    case "IR":
    case "INACTIVE":
      return "No — listed as unavailable in this fixture";
    case "DOUBTFUL":
      return "Unlikely — fixture status is doubtful";
    case "QUESTIONABLE":
      return "Uncertain — fixture status is questionable";
    case "HEALTHY":
      return "Yes — fixture lists no injury designation";
    default:
      return "Unknown in this fixture set";
  }
}
