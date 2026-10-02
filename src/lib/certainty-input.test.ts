import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { certaintyLabel } from "./certainty";
import {
  gradeCertaintyInputs,
  HEALTHY_SIDE_FLAGS,
  STATUS_DISCOUNT_ADJ,
} from "./certainty-input";

const healthy = HEALTHY_SIDE_FLAGS;

describe("gradeCertaintyInputs", () => {
  it("grades a wide healthy low-uncertainty three-week gap clear or strong", () => {
    const result = gradeCertaintyInputs({
      meanA: 24.6,
      meanB: 11.4,
      left: healthy,
      right: healthy,
    });
    assert.equal(result.decision.scoreDelta, 13.2);
    assert.equal(result.decision.absoluteDelta, 13.2);
    assert.equal(result.decision.lean, "a");
    assert.ok(result.certainty.score >= 58);
    assert.ok(result.certainty.label === "clear" || result.certainty.label === "strong");
    assert.equal(result.certainty.label, certaintyLabel(result.certainty.score));
    assert.doesNotMatch(result.certainty.reasons.join(" "), /status discount/);
    assert.match(result.certainty.reasons.join(" "), /three trailing weeks/);
  });

  it("uses the rounded mean delta, including the 1.5 toss-up line", () => {
    const toss = gradeCertaintyInputs({
      meanA: 10.04,
      meanB: 8.6,
      left: healthy,
      right: healthy,
    });
    assert.equal(toss.decision.scoreDelta, 1.4);
    assert.equal(toss.decision.lean, "toss_up");
    assert.match(toss.certainty.reasons.join(" "), /toss-up band/);

    const lean = gradeCertaintyInputs({
      meanA: 10.14,
      meanB: 8.6,
      left: healthy,
      right: healthy,
    });
    assert.equal(lean.decision.scoreDelta, 1.5);
    assert.equal(lean.decision.lean, "a");
    assert.match(lean.certainty.reasons.join(" "), /clears the 1\.5-point toss-up line/);
  });

  it("zeros a gated side and does not also apply the status discount", () => {
    const open = gradeCertaintyInputs({
      meanA: 18,
      meanB: 10,
      left: healthy,
      right: healthy,
    });
    const gated = gradeCertaintyInputs({
      meanA: 18,
      meanB: 10,
      left: healthy,
      right: {
        ...healthy,
        availabilityGated: true,
        statusDiscount: true,
        uncertainty: "high",
      },
    });
    assert.equal(gated.right.pointsMean, 0);
    assert.equal(gated.right.availabilityGated, true);
    assert.equal(gated.right.components.availabilityAdj, 0);
    assert.equal(gated.decision.scoreDelta, 18);
    assert.ok(gated.certainty.score < open.certainty.score);
    assert.match(gated.certainty.reasons.join(" "), /availability-gated/);
  });

  it("maps a status discount to a negative availability adjustment", () => {
    const graded = gradeCertaintyInputs({
      meanA: 16,
      meanB: 12,
      left: { ...healthy, statusDiscount: true },
      right: healthy,
    });
    assert.equal(graded.left.availabilityGated, false);
    assert.equal(graded.left.components.availabilityAdj, STATUS_DISCOUNT_ADJ);
    assert.ok(graded.left.components.availabilityAdj < 0);
    assert.match(graded.certainty.reasons.join(" "), /status discount/);
  });

  it("passes uncertainty through and uses the shorter trailing sample", () => {
    const graded = gradeCertaintyInputs({
      meanA: 20,
      meanB: 11,
      left: { ...healthy, uncertainty: "high", trailingWeeksUsed: 3 },
      right: { ...healthy, uncertainty: "med", trailingWeeksUsed: 1 },
    });
    assert.equal(graded.left.uncertaintyLabel, "high");
    assert.equal(graded.right.uncertaintyLabel, "med");
    assert.match(graded.certainty.reasons.join(" "), /High uncertainty/);
    assert.match(graded.certainty.reasons.join(" "), /Thin trailing sample/);
    assert.doesNotMatch(graded.certainty.reasons.join(" "), /three trailing weeks/);
  });

  it("keeps the desk bands", () => {
    assert.equal(certaintyLabel(78), "strong");
    assert.equal(certaintyLabel(58), "clear");
    assert.equal(certaintyLabel(40), "lean");
    assert.equal(certaintyLabel(39), "thin");
  });
});
