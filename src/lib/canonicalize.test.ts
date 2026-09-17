import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canonicalizePlayerPair, parsePairSlug } from "./canonicalize";
import type { Player } from "./types";

function player(id: string, slug: string): Player {
  return {
    id,
    slug,
    displayName: slug,
    position: "RB",
    teamId: "t",
    active: true,
  };
}

describe("canonicalizePlayerPair", () => {
  it("orders by ascending player.id, not slug", () => {
    const zeta = player("00000000-0000-4000-8000-000000000202", "aaa-zeta");
    const alpha = player("00000000-0000-4000-8000-000000000201", "zzz-alpha");
    const pair = canonicalizePlayerPair(zeta, alpha);
    assert.equal(pair.left.id, alpha.id);
    assert.equal(pair.right.id, zeta.id);
    assert.equal(pair.pairSlug, "zzz-alpha-vs-aaa-zeta");
  });

  it("rejects self-pairs", () => {
    const a = player("1", "same");
    assert.throws(() => canonicalizePlayerPair(a, a));
  });
});

describe("parsePairSlug", () => {
  it("splits on the first -vs-", () => {
    const parsed = parsePairSlug("jordan-voss-vs-noah-crowe");
    assert.deepEqual(parsed, { leftSlug: "jordan-voss", rightSlug: "noah-crowe" });
  });

  it("rejects missing or identical sides", () => {
    assert.equal(parsePairSlug("jordan-voss"), null);
    assert.equal(parsePairSlug("same-vs-same"), null);
  });
});
