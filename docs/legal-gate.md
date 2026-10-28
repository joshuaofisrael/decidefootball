# Pre-publish legal hold gate

Decide Football publishes a static export to GitHub Pages. `scripts/legal-gate.ts` runs on every content page and public asset **before** `next build`. A failure exits 1.

The gate is a required step in both workflows, placed **before** `npm run build` and **outside** the `npm ci` retry loop:

- `.github/workflows/ci.yml` (pull requests and branch pushes)
- `.github/workflows/deploy-pages.yml` (push to `main` and `workflow_dispatch`)

`npm run build` runs the same script again before `next build`, so a retried build step cannot skip it. There is no skip input. Held content does not produce an `out/` artifact.

Run it locally with `npm run legal-gate`.

Content scanned: `src/app`, `src/components`, `src/lib` (tests excluded), and text under `public/`. Images are every raster or SVG in `public/` plus every image path those files reference. Fixtures under `scripts/legal-gate-fixtures/` are not part of the Next app and are not in that scan, so they are not exported.

## Code-enforced

These checks fail the gate. HIGH findings are Joshua-only. MODERATE findings stay unpublished until the content itself is fixed (a source, a licence entry, or removal of the claim). The gate does not soften wording to make a check pass.

| Rule | Severity | What the script checks |
| --- | --- | --- |
| 3 | MODERATE | Every image in `public/` and every image path referenced by a scanned file has an entry in `content/asset-licences.json` with non-empty `source`, `licence`, and `permission`. Placeholder values (`unknown`, `todo`, `tbd`, `n/a`) fail. |
| 4 | MODERATE | Dated factual pages — `src/app/guide/`, `src/app/start-sit/`, and `src/app/waiver-radar/`, including schedule guides — include a `YYYY-MM-DD` date and an updated/checked/verified marker (`Last updated`, `Last checked`, `lastModified`, or similar), plus at least one external `http(s)` URL. The page's imported local modules count. Schema.org, this site's own host, analytics, ads, and font hosts do not count as sources. |
| 5 | MODERATE | No sportsbook URL and no sportsbook brand token (`draftkings`, `fanduel`, `betmgm`, and the host list in the script). The disclaimer word "sportsbook" in "not a sportsbook" is not a domain and does not fail. |
| 7 | MODERATE | No affirmative affiliation wording: `partner of the NFL`, `official partner`, `NFL partner`, or `official` / `endorsed` / `endorsement` unless the sentence negates it (`not`, `no`, `never`, `nothing`, …) or it is the not-affiliated disclaimer. `official` may also name a third-party release, report, bowl, ticket page, or announced date (`dates are official`, `official Week 6 report`). URLs are removed before this scan so a path like `official-allstate-…` is not a claim. |
| 1, 2, 6, 8 | HIGH | A frontmatter or data flag `legalStatus: HOLD_REVIEW` (also `legalStatus = "HOLD_REVIEW"`) fails unless `content/approvals.json` contains that file's repo-relative path and the sha256 of its **exact bytes**. Any edit changes the hash and the hold returns. |
| 1 | HIGH | Keyword heuristic. `arrested`, `charged`, `fraud`, `abuse`, `lawsuit`, `DUI`, or `suspended for` within 120 characters of a capitalized two-word name fails unless that page's import closure contains an `nfl.com` (including `operations.nfl.com` and `media.nfl.com`) or NFL club host URL, or the file's exact sha256 is approved. `suspended` alone, and ordinary injury words (questionable, doubtful, hamstring, ankle), do not match. A hit with no nearby name does not match. |

Sample desks are not rule 4 pages. A route is skipped for the source/date check when the path is a dynamic `[param]` template, or the page renders `FixtureBanner` / `sourceClass: "FIXTURE"`. Those pages are still scanned for images, betting links, affiliation wording, the hold flag, and the allegation heuristic.

`content/approvals.json` ships with an empty `approvals` array. Joshua approves a file by adding:

```json
{
  "approvals": [
    {
      "path": "src/app/example/page.md",
      "sha256": "<sha256 of the exact file bytes>"
    }
  ]
}
```

Hash the file with `sha256sum` or `node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync(process.argv[1])).digest('hex'))" path`.

Image provenance for the six photographs already in `public/images/` is copied from each file's `.license.md` sidecar (AI-generated for Decide Football on 2026-10-23; no third-party licence). Nothing in that record was inferred beyond those sidecars.

`src/app/icon.svg` is the Next.js app icon (a two-letter "DF" monogram). It is not under `public/`, and no page references it by path, so this gate does not require a licence row for it. The repo has no sidecar for it. No licence text was invented for it.

HIGH failures also append one JSON line per finding to `content-review/queue.jsonl` (`ts`, `site`, `bot`, `title`, `flagged`, `rule`, `sources`, `suggestion`, `draft_path`, `status: "HOLD_REVIEW"`). That file is produced when the gate fails. It is not a way to publish.

## Judgement-only

The script does not decide these. They stay with a person, using the hold flag when the item is HIGH.

| Rule | What the script does not decide |
| --- | --- |
| 1 | Allegations that avoid the keyword list. Whether an `nfl.com` or club URL on the page actually supports the sentence. The heuristic clears the whole import closure when any such URL is present; it does not read the page. Do not rephrase an allegation so the keyword misses. |
| 2 | Sensitive personal information (private contact details, addresses, financial data, private messages, health, sexuality, children, victims), other than recording `legalStatus: HOLD_REVIEW`. |
| 3 | Whether a filled-in licence actually permits the use. Attribution, an API subscription, or another site using the file is not permission. The script only checks that source, licence, and permission are written down and are not placeholders. Fair use is not assumed. |
| 4 | Whether a source was opened, whether sources disagree, whether a quote is accurate, or whether two people were confused. Presence of a URL and a date is not verification. Fixture desks are excluded from this check because they are labeled sample data; a real-world claim that lands on one is still subject to the other rules. |
| 5 | Personalised medical, legal, tax, or investment advice, promised returns, and dangerous instructions that are not a betting link or sportsbook domain. |
| 6 | Election dates, eligibility, polling places, and results described as final, other than recording `legalStatus: HOLD_REVIEW`. This site does not publish election logistics, and the script has no election parser. |
| 7 | A headline stronger than the evidence. Synthetic media that could be mistaken for a real person or event. Whether an allowlisted "official release" could still be read as our own affiliation. |
| 8 | A complaint, embargo, or reporting restriction that arrives outside the repo. Record it with `legalStatus: HOLD_REVIEW` on the file. The script cannot see an inbox. Legal notices are HIGH and are not self-cleared. |
| Moderate review | The 27 Oct amendments: fix a moderate item, then `python3 /workspace/content-review/bin/chatgpt_review.py`, up to three rounds, and log `content-review/moderate-clearances.jsonl`. That reviewer is not in this repo and is not a CI step. A missing key must not become a pass. CI publishes only when the mechanical gate passes. |

## Fixtures

`scripts/legal-gate-fixtures/hold/` should fail: an unsourced allegation against the fictional name Alex Mercer, and `public/images/mystery.png` with no licence entry.

`scripts/legal-gate-fixtures/pass/` should pass: a guide note with a date, an `nfl.com` injury-report URL, ordinary knee-injury copy, "suspended for" cleared by that league URL, the not-affiliated disclaimer, and a licence entry for its test image.

`npm test` runs both. Neither directory is under `src/app` or `public/`, so `next build` does not export them.
