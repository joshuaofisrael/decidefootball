import { pairPath } from "./canonicalize";
import { getAddDropPairs, getStartSitPairs } from "./data";
import { POSITIONS, type SkillPosition } from "./site";

export function bothOrderPairParams(
  pairs: { left: { slug: string }; right: { slug: string } }[],
): { pair: string }[] {
  return pairs.flatMap(({ left, right }) => [
    { pair: pairPath(left.slug, right.slug) },
    { pair: pairPath(right.slug, left.slug) },
  ]);
}

export function startSitStaticParams() {
  return bothOrderPairParams(getStartSitPairs());
}

export function addDropStaticParams() {
  return bothOrderPairParams(getAddDropPairs());
}

export function playingTodaySegment(slug: string): string {
  return `${slug}-playing-today`;
}

export function parsePlayingTodaySegment(segment: string | undefined): string | null {
  const suffix = "-playing-today";
  if (!segment || !segment.endsWith(suffix)) return null;
  const slug = segment.slice(0, -suffix.length);
  return slug || null;
}

export function rankingsPosSlug(pos: SkillPosition): string {
  return `${pos.toLowerCase()}-rankings`;
}

export function parseRankingsPosSlug(posSlug: string): SkillPosition | null {
  const suffix = "-rankings";
  if (!posSlug.endsWith(suffix)) return null;
  const pos = posSlug.slice(0, -suffix.length).toUpperCase();
  return (POSITIONS as readonly string[]).includes(pos) ? (pos as SkillPosition) : null;
}

export function weekRankingsPath(week: number, pos: SkillPosition): string {
  return `/week-${week}/${rankingsPosSlug(pos)}/`;
}
