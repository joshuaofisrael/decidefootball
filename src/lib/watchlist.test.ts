import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseWatchlist, toggleWatchlist } from "./watchlist";

describe("parseWatchlist", () => {
  it("reads a slug array and ignores junk", () => {
    assert.deepEqual(parseWatchlist(JSON.stringify(["jordan-voss", "kai-benton"])), [
      "jordan-voss",
      "kai-benton",
    ]);
    assert.deepEqual(parseWatchlist("nope"), []);
    assert.deepEqual(parseWatchlist(null), []);
  });
});

describe("toggleWatchlist", () => {
  it("adds and removes a slug", () => {
    const added = toggleWatchlist([], "jordan-voss");
    assert.deepEqual(added, ["jordan-voss"]);
    assert.deepEqual(toggleWatchlist(added, "jordan-voss"), []);
  });
});
