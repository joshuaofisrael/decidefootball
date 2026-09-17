import type { Player } from "./types";

export interface CanonicalPair {
  left: Player;
  right: Player;
  leftSlug: string;
  rightSlug: string;
  pairSlug: string;
  isCanonicalOrder: boolean;
}

export function parsePairSlug(pair: string): { leftSlug: string; rightSlug: string } | null {
  const marker = "-vs-";
  const idx = pair.indexOf(marker);
  if (idx <= 0) return null;
  const leftSlug = pair.slice(0, idx);
  const rightSlug = pair.slice(idx + marker.length);
  if (!leftSlug || !rightSlug || leftSlug === rightSlug) return null;
  if (leftSlug.includes(marker) || rightSlug.includes(marker)) return null;
  return { leftSlug, rightSlug };
}

export function pairPath(leftSlug: string, rightSlug: string): string {
  return `${leftSlug}-vs-${rightSlug}`;
}

/**
 * Canonical A-vs-B order is ascending stable player.id.
 * Do not mix this with alphabetical slug order.
 */
export function canonicalizePlayerPair(a: Player, b: Player): CanonicalPair {
  if (a.id === b.id) {
    throw new Error("Self-pairs are not allowed");
  }
  const [left, right] = a.id < b.id ? [a, b] : [b, a];
  return {
    left,
    right,
    leftSlug: left.slug,
    rightSlug: right.slug,
    pairSlug: pairPath(left.slug, right.slug),
    isCanonicalOrder: a.id < b.id,
  };
}

export function requestedPairIsCanonical(
  requestedLeft: Player,
  requestedRight: Player,
): boolean {
  return requestedLeft.id < requestedRight.id;
}
