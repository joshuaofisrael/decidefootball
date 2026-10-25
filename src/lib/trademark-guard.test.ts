import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { INDEPENDENT_MICROCOPY } from "./compliance";
import { FLORIDA_GOVERNING_LAW, LEGAL_COPYRIGHT_LINE } from "./legal";
import { SITE_CONTACT_EMAIL } from "./site";

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
    assert.equal(SITE_CONTACT_EMAIL, "joshuaofisrael@gmail.com");
    assert.equal(
      LEGAL_COPYRIGHT_LINE,
      "© 2026 Joshua Israel Ventures LLC. All rights reserved. Decide Football is a trade name of Joshua Israel Ventures LLC, a Florida limited liability company.",
    );
    assert.equal(LEGAL_COPYRIGHT_LINE.toLowerCase().includes("dba"), false);
    assert.equal(
      FLORIDA_GOVERNING_LAW,
      "governed by the laws of the State of Florida, without regard to conflict-of-law rules, with exclusive venue in the state or federal courts located in Florida",
    );
    assert.equal(/county|michigan/i.test(FLORIDA_GOVERNING_LAW), false);
  });

  it("keeps the legal name and copyright line off non-legal pages and the sitewide footer", () => {
    const footer = readFileSync(join(ROOT, "src/components/Footer.tsx"), "utf8");
    assert.equal(footer.includes("Joshua Israel"), false);
    assert.equal(footer.includes("All rights reserved"), false);
    assert.equal(footer.includes("Florida"), false);

    const legalPages = new Set([
      "src/app/terms/page.tsx",
      "src/app/privacy/page.tsx",
      "src/app/disclaimer/page.tsx",
      "src/app/cookies/page.tsx",
    ]);
    const pages = walk(join(ROOT, "src/app")).filter((file) => file.endsWith("page.tsx") || file.endsWith("layout.tsx"));
    for (const file of pages) {
      const rel = relative(ROOT, file);
      const text = readFileSync(file, "utf8");
      if (legalPages.has(rel)) {
        assert.equal(text.includes("LegalNotice"), true, rel);
        continue;
      }
      assert.equal(text.includes("Joshua Israel"), false, rel);
      assert.equal(text.includes("All rights reserved"), false, rel);
      assert.equal(text.includes("FLORIDA_GOVERNING_LAW"), false, rel);
    }

    const site = readFileSync(join(ROOT, "src/lib/site.ts"), "utf8");
    const seo = readFileSync(join(ROOT, "src/lib/seo.ts"), "utf8");
    assert.equal(site.includes("Joshua Israel"), false);
    assert.equal(seo.includes("Joshua Israel"), false);
    assert.equal(seo.includes("legalName"), false);
  });

  it("does not use NFL event marks such as Super Bowl or Pro Bowl", () => {
    // The January 2027 playoff guide may name Super Bowl LXI in body copy.
    // Titles, the meta description, and every other file still omit it.
    const nominativeCopy = new Set([
      "src/lib/nfl-playoffs-2027.ts",
      "src/lib/nfl-playoffs-2027.test.ts",
    ]);
    for (const file of files) {
      if (file === SELF || !TEXT_EXT.test(file)) continue;
      const text = readFileSync(file, "utf8");
      const rel = relative(ROOT, file);
      assert.equal(/pro\s*bowl/i.test(text), false, rel);
      if (nominativeCopy.has(rel)) continue;
      assert.equal(/super\s*bowl/i.test(text), false, rel);
    }
  });

  it("flags waiver wire in page titles and product paths", () => {
    const phrase = /waiver[\s-]*wire/i;
    const appRoot = join(ROOT, "src/app");
    const redirectDir = join(appRoot, "waiver-wire");
    assert.equal(existsSync(redirectDir), true, "old desk URL must keep a redirect stub");

    function walkDirs(dir: string, out: string[] = []): string[] {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
          out.push(full);
          walkDirs(full, out);
        }
      }
      return out;
    }

    for (const dir of walkDirs(appRoot)) {
      const rel = relative(appRoot, dir);
      if (rel === "waiver-wire" || rel.startsWith("waiver-wire/")) continue;
      assert.equal(phrase.test(rel), false, `path ${rel}`);
    }

    const pages = walk(appRoot).filter((file) => file.endsWith("page.tsx") || file.endsWith("layout.tsx"));
    for (const file of pages) {
      const text = readFileSync(file, "utf8");
      const rel = relative(ROOT, file);
      const weeklyEditorial = /^src\/app\/waiver-radar\/\d{4}-week-\d+\/page\.tsx$/.test(rel);
      for (const match of text.matchAll(/title:\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g)) {
        const title = match[1] ?? match[2] ?? match[3] ?? "";
        if (weeklyEditorial) continue;
        assert.equal(phrase.test(title), false, `${rel} title: ${title}`);
      }
      if (file.startsWith(redirectDir) || weeklyEditorial) continue;
      assert.equal(phrase.test(text), false, rel);
    }

    const llms = readFileSync(join(ROOT, "public/llms.txt"), "utf8");
    assert.equal(phrase.test(llms), false);
  });

  it("ships no raster images without a license sidecar", () => {
    for (const file of files) {
      if (!RASTER_EXT.test(file)) continue;
      assert.ok(existsSync(`${file}.license.md`), `${relative(ROOT, file)} needs a .license.md sidecar`);
    }
  });
});
