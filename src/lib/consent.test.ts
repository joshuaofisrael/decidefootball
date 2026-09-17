import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseConsentChoice } from "./consent";

describe("parseConsentChoice", () => {
  it("accepts only explicit accept or reject", () => {
    assert.equal(parseConsentChoice("accept"), "accept");
    assert.equal(parseConsentChoice("reject"), "reject");
  });

  it("treats missing or unknown values as unset", () => {
    assert.equal(parseConsentChoice(null), "unset");
    assert.equal(parseConsentChoice(""), "unset");
    assert.equal(parseConsentChoice("essential-only"), "unset");
  });
});
