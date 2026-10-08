import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { INDEPENDENT_MICROCOPY } from "./compliance";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SELF = fileURLToPath(import.meta.url);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const TEXT_EXT = /\.(tsx?|mjs|css|txt|svg|json|md)$/;
const RASTER_EXT = /\.(png|jpe?g|webp|gif|avif|ico)$/i;
const files = [...walk(join(ROOT, "src")), ...walk(join(ROOT, "public"))];

describe("trademark guard", () => {
  it("footer non-affiliation line names the league, clubs, union, and cited platforms", () => {
    for (const name of ["NFL", "member clubs", "NFL Players Association", "ESPN", "Yahoo", "Sleeper"]) {
      assert.ok(INDEPENDENT_MICROCOPY.includes(name), name);
    }
    assert.match(INDEPENDENT_MICROCOPY, /not affiliated with, endorsed by, or sponsored by/);
    assert.match(INDEPENDENT_MICROCOPY, /trademarks belong to their respective owners/);
  });

  it("does not use NFL event marks such as Super Bowl or Pro Bowl", () => {
    for (const file of files) {
      if (file === SELF || !TEXT_EXT.test(file)) continue;
      const text = readFileSync(file, "utf8");
      assert.equal(/super\s*bowl|pro\s*bowl/i.test(text), false, relative(ROOT, file));
    }
  });

  it("ships no raster images without a license sidecar", () => {
    for (const file of files) {
      if (!RASTER_EXT.test(file)) continue;
      assert.ok(existsSync(`${file}.license.md`), `${relative(ROOT, file)} needs a .license.md sidecar`);
    }
  });
});
