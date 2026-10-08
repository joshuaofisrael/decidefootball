import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { INDEPENDENT_MICROCOPY } from "./compliance";
import { BRAND_SENTENCE, COPYRIGHT_LINE, OPERATOR_VISIBLE_LINE, SITE_CONTACT_EMAIL } from "./site";

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
    assert.equal(OPERATOR_VISIBLE_LINE, "Operated by Joshua Israel Ventures LLC");
    assert.equal(
      COPYRIGHT_LINE,
      "© 2026 Joshua Israel Ventures LLC. All rights reserved. Decide Football is owned and operated by Joshua Israel Ventures LLC.",
    );
    assert.equal(BRAND_SENTENCE, "Decide Football is a brand of Joshua Israel Ventures LLC.");
    assert.equal(SITE_CONTACT_EMAIL, "joshuaofisrael@gmail.com");
    assert.equal(BRAND_SENTENCE.toLowerCase().includes("dba"), false);
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
