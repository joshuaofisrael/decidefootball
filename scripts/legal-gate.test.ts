import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  affiliationProblems,
  allegationHits,
  hashFile,
  listContentFiles,
  runLegalGate,
  sportsbookProblems,
} from "./legal-gate";

const REPO = fileURLToPath(new URL("..", import.meta.url));
const FIXTURES = fileURLToPath(new URL("./legal-gate-fixtures/", import.meta.url));

const EMPTY_LICENCES = `${JSON.stringify({ assets: [] }, null, 2)}\n`;
const EMPTY_APPROVALS = `${JSON.stringify({ approvals: [] }, null, 2)}\n`;

function withSite(files: Record<string, string>, run: (root: string) => void) {
  const root = mkdtempSync(join(tmpdir(), "legal-gate-"));
  try {
    for (const [rel, body] of Object.entries(files)) {
      const full = join(root, rel);
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, body);
    }
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function rules(root: string): string[] {
  return runLegalGate({ root }).findings.map((finding) => finding.rule);
}

describe("legal hold gate", () => {
  it("holds an unsourced allegation and an image with no licence entry", () => {
    const result = runLegalGate({ root: join(FIXTURES, "hold") });
    assert.equal(result.ok, false);
    assert.ok(result.findings.some((finding) => finding.rule === "1" && finding.severity === "HIGH"));
    assert.ok(
      result.findings.some(
        (finding) => finding.rule === "3" && finding.path === "public/images/mystery.png",
      ),
    );
  });

  it("passes a sourced note, a licensed image, and suspension reporting with an nfl.com source", () => {
    const result = runLegalGate({ root: join(FIXTURES, "pass") });
    assert.deepEqual(result.findings, []);
    assert.equal(result.ok, true);
  });

  it("keeps the published-site scan off the fixtures", () => {
    const files = listContentFiles(REPO);
    assert.equal(
      files.some((file) => file.includes("legal-gate-fixtures")),
      false,
    );
  });

  it("passes the real site", () => {
    const result = runLegalGate({ root: REPO });
    assert.deepEqual(
      result.findings,
      [],
      result.findings.map((finding) => `${finding.rule} ${finding.path}: ${finding.message}`).join("\n"),
    );
  });

  it("does not treat ordinary injury or suspension copy as an allegation", () => {
    assert.deepEqual(allegationHits("Jordan Voss is questionable with a hamstring and was suspended."), []);
    assert.equal(allegationHits("Alex Mercer was suspended for one game.").length > 0, true);
    assert.deepEqual(allegationHits("A lawsuit was filed somewhere."), []);
  });

  it("allows the not-affiliated disclaimer and flags an affiliation claim", () => {
    const disclaimer =
      "Decide Football is not affiliated with, endorsed by, or sponsored by the NFL. Projections are not official.";
    assert.deepEqual(affiliationProblems(disclaimer), []);
    assert.deepEqual(affiliationProblems("whose dates are official"), []);
    assert.deepEqual(affiliationProblems("The official Week 6 report was not posted."), []);
    assert.equal(
      affiliationProblems("Decide Football is the official partner of the NFL.").length > 0,
      true,
    );
    assert.equal(affiliationProblems("This desk is endorsed by the NFL.").length > 0, true);
  });

  it("flags sportsbook domains and brand tokens, not the disclaimer word", () => {
    assert.deepEqual(sportsbookProblems("Not gambling advice, odds, or a sportsbook."), []);
    assert.equal(sportsbookProblems("https://sportsbook.draftkings.com/bet").length > 0, true);
    assert.equal(sportsbookProblems("See FanDuel for the line.").length > 0, true);
  });

  it("fails HOLD_REVIEW unless the sha256 matches the exact file", () => {
    const rel = "src/app/note/page.md";
    const body = "---\nlegalStatus: HOLD_REVIEW\n---\n\nA routine note with no allegation.\n";
    withSite(
      {
        [rel]: body,
        "content/asset-licences.json": EMPTY_LICENCES,
        "content/approvals.json": EMPTY_APPROVALS,
      },
      (root) => {
        const blocked = runLegalGate({ root });
        assert.equal(blocked.ok, false);
        assert.ok(blocked.findings.some((finding) => finding.rule === "1/2/6/8"));

        const hash = hashFile(join(root, rel));
        writeFileSync(
          join(root, "content/approvals.json"),
          `${JSON.stringify({ approvals: [{ path: rel, sha256: hash }] }, null, 2)}\n`,
        );
        assert.deepEqual(runLegalGate({ root }).findings, []);

        writeFileSync(join(root, rel), `${body}\nEdited.\n`);
        const changed = runLegalGate({ root });
        assert.equal(changed.ok, false);
        assert.ok(changed.findings.some((finding) => finding.rule === "1/2/6/8"));
      },
    );
  });

  it("clears a keyword hit when an nfl.com source is on the page, and holds it when the source is absent", () => {
    const page = "src/app/note/page.md";
    const allegation = "Alex Mercer was suspended for one game.\n";
    withSite(
      {
        [page]: allegation,
        "content/asset-licences.json": EMPTY_LICENCES,
        "content/approvals.json": EMPTY_APPROVALS,
      },
      (root) => {
        assert.ok(rules(root).includes("1"));
      },
    );
    withSite(
      {
        [page]: `${allegation}\nSource: https://www.nfl.com/injuries/\n`,
        "content/asset-licences.json": EMPTY_LICENCES,
        "content/approvals.json": EMPTY_APPROVALS,
      },
      (root) => {
        assert.deepEqual(runLegalGate({ root }).findings, []);
      },
    );
  });

  it("requires a source URL and an updated date on a guide page", () => {
    withSite(
      {
        "src/app/guide/plain/page.md": "Last updated: 2026-10-27.\n\nHow to read a card.\n",
        "content/asset-licences.json": EMPTY_LICENCES,
        "content/approvals.json": EMPTY_APPROVALS,
      },
      (root) => {
        const found = rules(root);
        assert.ok(found.includes("4"));
        assert.equal(found.includes("1"), false);
      },
    );
  });

  it("rejects a placeholder licence", () => {
    withSite(
      {
        "src/app/note/page.md": "A note.\n",
        "public/images/blank.png": "png",
        "content/asset-licences.json": `${JSON.stringify(
          {
            assets: [
              {
                path: "public/images/blank.png",
                source: "unknown",
                licence: "unknown",
                permission: "unknown",
              },
            ],
          },
          null,
          2,
        )}\n`,
        "content/approvals.json": EMPTY_APPROVALS,
      },
      (root) => {
        const result = runLegalGate({ root });
        assert.equal(result.ok, false);
        assert.ok(result.findings.some((finding) => finding.rule === "3" && /placeholder/i.test(finding.message)));
      },
    );
  });

  it("is a required step before the Pages build and outside the npm ci retry", () => {
    const ci = readFileSync(join(REPO, ".github/workflows/ci.yml"), "utf8");
    const deploy = readFileSync(join(REPO, ".github/workflows/deploy-pages.yml"), "utf8");
    const pkg = readFileSync(join(REPO, "package.json"), "utf8");
    function runStep(yaml: string, command: string): number {
      return yaml.split("\n").findIndex((line) => {
        const trimmed = line.trim();
        return trimmed === `run: ${command}` || trimmed === `- run: ${command}`;
      });
    }
    for (const yaml of [ci, deploy]) {
      const gateAt = runStep(yaml, "npm run legal-gate");
      const buildAt = runStep(yaml, "npm run build");
      assert.ok(gateAt > 0, "workflow is missing npm run legal-gate");
      assert.ok(buildAt > gateAt, "legal gate must run before the build step");
    }
    assert.match(pkg, /"build": "tsx scripts\/legal-gate\.ts && next build/);
    const retry = deploy.slice(deploy.indexOf("for attempt"), deploy.indexOf("npm test"));
    assert.equal(retry.includes("legal-gate"), false);
    assert.equal(deploy.includes("continue-on-error"), false);
  });
});
