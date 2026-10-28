/**
 * Pre-publish legal hold gate for Decide Football.
 *
 * Runs on content pages and public assets before `next build`. A failing
 * gate exits 1 so CI rejects the PR and the GitHub Pages workflow cannot
 * upload an artifact. There is no skip flag. See docs/legal-gate.md.
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

export type Severity = "HIGH" | "MODERATE";

export type Finding = {
  severity: Severity;
  rule: string;
  path: string;
  message: string;
};

export type GateOptions = {
  root?: string;
  /** Append HIGH findings to content-review/queue.jsonl. CLI turns this on. */
  writeQueue?: boolean;
};

export type GateResult = {
  ok: boolean;
  findings: Finding[];
};

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i;
const TEXT_EXT = /\.(tsx?|jsx?|mjs|cjs|md|mdx|txt|html|css|svg|json)$/i;
const PAGE_EXT = /\.(tsx|ts|md|mdx)$/;
const TEST_FILE = /\.(?:test|spec)\.(tsx?|jsx?|mjs)$/;

const HOLD_FLAG = /legalStatus\s*[:=]\s*["']?HOLD_REVIEW["']?/;

const ALLEGATION_PATTERNS: { word: string; re: RegExp }[] = [
  { word: "arrested", re: /\barrested\b/gi },
  { word: "charged", re: /\bcharged\b/gi },
  { word: "fraud", re: /\bfraud\b/gi },
  { word: "abuse", re: /\babuse\b/gi },
  { word: "lawsuit", re: /\blawsuit\b/gi },
  { word: "DUI", re: /\bDUI\b/gi },
  { word: "suspended for", re: /\bsuspended for\b/gi },
];

/** Two-word capitalized name. Single status words and "suspended" alone do not match. */
const PERSON_NAME = /\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})+\b/g;
const NAME_WINDOW = 120;

const NEGATION_BEFORE =
  /\b(?:not|no|never|nothing|neither|nor|isn'?t|aren'?t|wasn'?t|weren'?t|without|non-)\b/i;

/**
 * "official" describing a third-party document, announced date, or a question.
 * Not a claim that Decide Football is the official site.
 */
const OFFICIAL_COLLOCATION =
  /\bofficial\b(?:\s+\S+){0,6}\s+(?:release|report|reports|bowl|premium|ticket|tickets|page|pages|program)\b|\bdates are official\b|\bon an official\b|\bpresented as official\b|\bpull official\b/i;

const URL_RE = /https?:\/\/[^\s"'<>)\]]+/gi;

const SOURCE_HOST_IGNORE = [
  "schema.org",
  "decidefootball.com",
  "localhost",
  "googletagmanager.com",
  "google-analytics.com",
  "googlesyndication.com",
  "googleapis.com",
  "gstatic.com",
  "formsubmit.co",
  "cloudflareinsights.com",
  "google.com",
  "w3.org",
  "example.com",
];

const CLUB_HOSTS = [
  "azcardinals.com",
  "atlantafalcons.com",
  "baltimoreravens.com",
  "buffalobills.com",
  "chicagobears.com",
  "bengals.com",
  "clevelandbrowns.com",
  "dallascowboys.com",
  "denverbroncos.com",
  "detroitlions.com",
  "packers.com",
  "houstontexans.com",
  "colts.com",
  "jaguars.com",
  "chiefs.com",
  "raiders.com",
  "chargers.com",
  "therams.com",
  "miamidolphins.com",
  "vikings.com",
  "patriots.com",
  "neworleanssaints.com",
  "giants.com",
  "newyorkjets.com",
  "philadelphiaeagles.com",
  "steelers.com",
  "49ers.com",
  "seahawks.com",
  "buccaneers.com",
  "titansonline.com",
  "commanders.com",
  "panthers.com",
];

/** Hosts and brand tokens from the site safe-content rule. "sportsbook" alone is the disclaimer, not a domain. */
const SPORTSBOOK_HOSTS = [
  "draftkings.com",
  "fanduel.com",
  "betmgm.com",
  "caesarssportsbook.com",
  "williamhill.com",
  "betrivers.com",
  "pointsbet.com",
  "bet365.com",
  "bovada.lv",
  "bovada.com",
  "prizepicks.com",
  "underdogfantasy.com",
  "hardrock.bet",
  "barstoolsportsbook.com",
  "wynnbet.com",
  "unibet.com",
  "betway.com",
  "pinnacle.com",
  "sugarhouse.com",
  "betonline.ag",
  "mybookie.ag",
  "sportsbook.fanatics.com",
  "sportsbook.com",
];

const SPORTSBOOK_BRANDS =
  /\b(?:draftkings|fanduel|betmgm|pointsbet|betrivers|prizepicks|underdogfantasy|bovada|wynnbet|barstoolsportsbook|caesarssportsbook)\b|\bcaesars sportsbook\b/gi;

const PLACEHOLDER = /^(?:unknown|todo|tbd|n\/a|na|none|unlicensed|\?+|tbc)$/i;

const DATED_TOP = new Set(["guide", "start-sit", "waiver-radar"]);

const DATE_RE = /\b20\d{2}-\d{2}-\d{2}\b/;
const UPDATED_RE = /last\s+(?:updated|checked|verified)|lastModified|dateModified|verified\s+at/i;

type LicenceEntry = {
  path: string;
  source: string;
  licence: string;
  permission: string;
};

type Approval = {
  path: string;
  sha256: string;
};

function posix(path: string): string {
  return path.split(sep).join("/");
}

export function repoRelative(root: string, file: string): string {
  return posix(relative(root, file));
}

export function hashBuffer(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function hashFile(file: string): string {
  return hashBuffer(readFileSync(file));
}

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function isTest(file: string): boolean {
  return TEST_FILE.test(file);
}

export function listContentFiles(root: string): string[] {
  const dirs = [join(root, "src", "app"), join(root, "src", "components"), join(root, "src", "lib")];
  const files: string[] = [];
  for (const dir of dirs) {
    for (const file of walk(dir)) {
      if (isTest(file) || file.endsWith(".d.ts")) continue;
      if (!TEXT_EXT.test(file)) continue;
      files.push(file);
    }
  }
  const pub = join(root, "public");
  for (const file of walk(pub)) {
    if (IMAGE_EXT.test(file)) continue;
    if (!TEXT_EXT.test(file)) continue;
    files.push(file);
  }
  return files.sort();
}

function listPages(root: string): string[] {
  return walk(join(root, "src", "app")).filter((file) => {
    if (isTest(file)) return false;
    const base = file.slice(file.lastIndexOf(sep) + 1);
    return PAGE_EXT.test(base) && (base.startsWith("page.") || base.startsWith("layout.") || base.startsWith("template."));
  });
}

function resolveModule(spec: string, fromFile: string, root: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(root, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = join(dirname(fromFile), spec);
  else return null;
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.mjs`,
    `${base}.js`,
    `${base}.md`,
    `${base}.mdx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function importedSpecs(text: string): string[] {
  const specs: string[] = [];
  const fromRe = /\bfrom\s+["']([^"']+)["']/g;
  const bareRe = /\bimport\s+["']([^"']+)["']/g;
  for (const re of [fromRe, bareRe]) {
    for (const match of text.matchAll(re)) {
      if (match[1]) specs.push(match[1]);
    }
  }
  return specs;
}

/** Page or layout plus the local modules it imports, following relative and @/ imports. */
export function importClosure(root: string, entry: string): string[] {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length > 0) {
    const file = queue.pop();
    if (!file || seen.has(file)) continue;
    seen.add(file);
    let text = "";
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const spec of importedSpecs(text)) {
      const next = resolveModule(spec, file, root);
      if (next && !seen.has(next)) queue.push(next);
    }
  }
  return [...seen];
}

function readText(file: string): string {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function hostOf(raw: string): string | null {
  const cleaned = raw.replace(/[.,;:]+$/, "");
  try {
    return new URL(cleaned).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

function hostIs(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

export function extractUrls(text: string): string[] {
  return text.match(URL_RE) ?? [];
}

export function isIgnoredSourceHost(host: string): boolean {
  return SOURCE_HOST_IGNORE.some((domain) => hostIs(host, domain));
}

export function isLeagueOrClubHost(host: string): boolean {
  if (hostIs(host, "nfl.com")) return true;
  return CLUB_HOSTS.some((domain) => hostIs(host, domain));
}

export function leagueOrClubSourcePresent(text: string): boolean {
  return extractUrls(text).some((url) => {
    const host = hostOf(url);
    return host ? isLeagueOrClubHost(host) : false;
  });
}

export function externalSourceUrls(text: string): string[] {
  const found: string[] = [];
  for (const url of extractUrls(text)) {
    const host = hostOf(url);
    if (!host || isIgnoredSourceHost(host)) continue;
    found.push(url.replace(/[.,;:]+$/, ""));
  }
  return found;
}

function snippet(text: string, index: number): string {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + 50);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function negatedBefore(text: string, index: number): boolean {
  const before = text.slice(Math.max(0, index - 80), index);
  return NEGATION_BEFORE.test(before);
}

function questionNear(text: string, index: number): boolean {
  const after = text.slice(index, index + 60);
  return after.includes("?");
}

export function affiliationProblems(text: string): string[] {
  const problems: string[] = [];
  const withoutUrls = text.replace(URL_RE, " ");

  for (const match of withoutUrls.matchAll(/\bofficial\b/gi)) {
    const index = match.index ?? 0;
    if (negatedBefore(withoutUrls, index)) continue;
    if (questionNear(withoutUrls, index)) continue;
    const window = withoutUrls.slice(Math.max(0, index - 40), index + 80);
    if (OFFICIAL_COLLOCATION.test(window)) continue;
    problems.push(`unnegated "official" near "${snippet(withoutUrls, index)}"`);
  }

  for (const match of withoutUrls.matchAll(/\bendorsed\b|\bendorsement\b/gi)) {
    const index = match.index ?? 0;
    if (negatedBefore(withoutUrls, index)) continue;
    problems.push(`unnegated "${match[0]}" near "${snippet(withoutUrls, index)}"`);
  }

  for (const match of withoutUrls.matchAll(/\bpartner of the NFL\b|\bofficial partner\b|\bNFL partner\b/gi)) {
    const index = match.index ?? 0;
    if (negatedBefore(withoutUrls, index)) continue;
    problems.push(`affiliation claim "${match[0]}" near "${snippet(withoutUrls, index)}"`);
  }

  return problems;
}

export function allegationHits(text: string): { word: string; index: number }[] {
  const hits: { word: string; index: number }[] = [];
  for (const pattern of ALLEGATION_PATTERNS) {
    for (const match of text.matchAll(pattern.re)) {
      const index = match.index ?? 0;
      const window = text.slice(Math.max(0, index - NAME_WINDOW), Math.min(text.length, index + match[0].length + NAME_WINDOW));
      PERSON_NAME.lastIndex = 0;
      if (!PERSON_NAME.test(window)) continue;
      hits.push({ word: pattern.word, index });
    }
  }
  return hits;
}

export function sportsbookProblems(text: string): string[] {
  const problems: string[] = [];
  for (const url of extractUrls(text)) {
    const host = hostOf(url);
    if (!host) continue;
    if (SPORTSBOOK_HOSTS.some((domain) => hostIs(host, domain))) {
      problems.push(`sportsbook URL ${url.replace(/[.,;:]+$/, "")}`);
    }
  }
  const withoutUrls = text.replace(URL_RE, " ");
  for (const match of withoutUrls.matchAll(SPORTSBOOK_BRANDS)) {
    problems.push(`sportsbook brand "${match[0]}" near "${snippet(withoutUrls, match.index ?? 0)}"`);
  }
  return problems;
}

function isDatedFactualPage(root: string, file: string, text: string): boolean {
  const rel = repoRelative(root, file);
  if (!/\/page\.(tsx|ts|md|mdx)$/.test(rel)) return false;
  const appRel = rel.split("src/app/")[1];
  if (!appRel) return false;
  if (appRel.includes("[")) return false;
  const top = appRel.split("/")[0] ?? "";
  if (!DATED_TOP.has(top)) return false;
  if (/\bFixtureBanner\b/.test(text)) return false;
  if (/sourceClass:\s*["']FIXTURE["']/.test(text)) return false;
  return true;
}

function loadJson(file: string): unknown {
  return JSON.parse(readFileSync(file, "utf8"));
}

function loadLicences(root: string, findings: Finding[]): Map<string, LicenceEntry> {
  const rel = "content/asset-licences.json";
  const file = join(root, rel);
  const map = new Map<string, LicenceEntry>();
  if (!existsSync(file)) {
    findings.push({
      severity: "MODERATE",
      rule: "3",
      path: rel,
      message: "licence record is missing",
    });
    return map;
  }
  let parsed: unknown;
  try {
    parsed = loadJson(file);
  } catch (error) {
    findings.push({
      severity: "MODERATE",
      rule: "3",
      path: rel,
      message: `licence record is not valid JSON (${error instanceof Error ? error.message : "parse error"})`,
    });
    return map;
  }
  const assets = (parsed as { assets?: unknown }).assets;
  if (!Array.isArray(assets)) {
    findings.push({
      severity: "MODERATE",
      rule: "3",
      path: rel,
      message: "licence record needs an assets array",
    });
    return map;
  }
  for (const raw of assets) {
    const entry = raw as Partial<LicenceEntry>;
    const path = typeof entry.path === "string" ? posix(entry.path).replace(/^\.\//, "") : "";
    const source = typeof entry.source === "string" ? entry.source.trim() : "";
    const licence = typeof entry.licence === "string" ? entry.licence.trim() : "";
    const permission = typeof entry.permission === "string" ? entry.permission.trim() : "";
    if (!path || !source || !licence || !permission) {
      findings.push({
        severity: "MODERATE",
        rule: "3",
        path: rel,
        message: `licence entry is missing path, source, licence, or permission (${path || "no path"})`,
      });
      continue;
    }
    map.set(path, { path, source, licence, permission });
    if (PLACEHOLDER.test(source) || PLACEHOLDER.test(licence) || PLACEHOLDER.test(permission)) {
      findings.push({
        severity: "MODERATE",
        rule: "3",
        path,
        message: "licence entry uses a placeholder instead of documented provenance",
      });
    }
  }
  return map;
}

function loadApprovals(root: string, findings: Finding[]): Approval[] {
  const rel = "content/approvals.json";
  const file = join(root, rel);
  if (!existsSync(file)) return [];
  try {
    const parsed = loadJson(file) as { approvals?: unknown };
    if (!Array.isArray(parsed.approvals)) {
      findings.push({
        severity: "HIGH",
        rule: "1/2/6/8",
        path: rel,
        message: "approvals record needs an approvals array",
      });
      return [];
    }
    return parsed.approvals
      .map((raw) => raw as Partial<Approval>)
      .filter((entry): entry is Approval => typeof entry.path === "string" && typeof entry.sha256 === "string")
      .map((entry) => ({
        path: posix(entry.path).replace(/^\.\//, ""),
        sha256: entry.sha256.trim().toLowerCase(),
      }));
  } catch (error) {
    findings.push({
      severity: "HIGH",
      rule: "1/2/6/8",
      path: rel,
      message: `approvals record is not valid JSON (${error instanceof Error ? error.message : "parse error"})`,
    });
    return [];
  }
}

function approved(approvals: Approval[], rel: string, hash: string): boolean {
  return approvals.some((entry) => entry.path === rel && entry.sha256 === hash);
}

function listPublicImages(root: string): string[] {
  return walk(join(root, "public"))
    .filter((file) => IMAGE_EXT.test(file))
    .map((file) => repoRelative(root, file));
}

function referencedImages(text: string): string[] {
  const normalized = new Set<string>();
  const local = /(?:public)?\/images\/([A-Za-z0-9_./-]+\.(?:png|jpe?g|gif|webp|avif|svg|ico))/gi;
  for (const match of text.matchAll(local)) {
    const name = match[1];
    if (name) normalized.add(`public/images/${name}`);
  }
  const remote = /https?:\/\/[^\s"'<>)\]]+\.(?:png|jpe?g|gif|webp|avif|svg|ico)/gi;
  for (const match of text.matchAll(remote)) {
    normalized.add(match[0].replace(/[.,;:]+$/, ""));
  }
  return [...normalized];
}

function checkImages(root: string, files: string[], licences: Map<string, LicenceEntry>, findings: Finding[]) {
  const needed = new Set<string>(listPublicImages(root));
  for (const file of files) {
    for (const image of referencedImages(readText(file))) needed.add(image);
  }
  for (const image of needed) {
    if (licences.has(image)) continue;
    findings.push({
      severity: "MODERATE",
      rule: "3",
      path: image,
      message: "image has no source, licence, and permission entry in content/asset-licences.json",
    });
  }
}

function closureLeagueClear(
  file: string,
  closures: Map<string, string[]>,
  texts: Map<string, string>,
): boolean {
  if (leagueOrClubSourcePresent(texts.get(file) ?? "")) return true;
  for (const members of closures.values()) {
    if (!members.includes(file)) continue;
    const combined = members.map((member) => texts.get(member) ?? "").join("\n");
    if (leagueOrClubSourcePresent(combined)) return true;
  }
  return false;
}

function checkFile(
  root: string,
  file: string,
  texts: Map<string, string>,
  closures: Map<string, string[]>,
  approvals: Approval[],
  findings: Finding[],
) {
  const rel = repoRelative(root, file);
  const text = texts.get(file) ?? "";
  const hash = hashFile(file);
  const isApproved = approved(approvals, rel, hash);

  if (HOLD_FLAG.test(text) && !isApproved) {
    findings.push({
      severity: "HIGH",
      rule: "1/2/6/8",
      path: rel,
      message: `legalStatus HOLD_REVIEW and content/approvals.json has no matching sha256 for this file (${hash})`,
    });
  }

  if (!isApproved && !closureLeagueClear(file, closures, texts)) {
    for (const hit of allegationHits(text)) {
      findings.push({
        severity: "HIGH",
        rule: "1",
        path: rel,
        message: `allegation word "${hit.word}" near a name ("${snippet(text, hit.index)}"). Hold for review, or cite an nfl.com or club source, or record Joshua's sha256 approval of this exact file.`,
      });
    }
  }

  for (const problem of sportsbookProblems(text)) {
    findings.push({
      severity: "MODERATE",
      rule: "5",
      path: rel,
      message: problem,
    });
  }

  for (const problem of affiliationProblems(text)) {
    findings.push({
      severity: "MODERATE",
      rule: "7",
      path: rel,
      message: problem,
    });
  }
}

function checkDatedPage(root: string, page: string, closure: string[], texts: Map<string, string>, findings: Finding[]) {
  const own = texts.get(page) ?? "";
  if (!isDatedFactualPage(root, page, own)) return;
  const bundle = closure.map((file) => texts.get(file) ?? "").join("\n");
  const rel = repoRelative(root, page);
  if (!UPDATED_RE.test(bundle) || !DATE_RE.test(bundle)) {
    findings.push({
      severity: "MODERATE",
      rule: "4",
      path: rel,
      message: "dated factual page needs a verified or updated date (Last updated, Last checked, or lastModified) and a YYYY-MM-DD date",
    });
  }
  if (externalSourceUrls(bundle).length === 0) {
    findings.push({
      severity: "MODERATE",
      rule: "4",
      path: rel,
      message: "dated factual page needs at least one external source URL",
    });
  }
}

export function runLegalGate(options: GateOptions = {}): GateResult {
  const root = resolve(options.root ?? process.cwd());
  const findings: Finding[] = [];
  const licences = loadLicences(root, findings);
  const approvals = loadApprovals(root, findings);
  const files = listContentFiles(root);
  const texts = new Map<string, string>();
  for (const file of files) texts.set(file, readText(file));

  const pages = listPages(root).filter((file) => files.includes(file) || existsSync(file));
  const closures = new Map<string, string[]>();
  for (const page of pages) {
    const closure = importClosure(root, page).filter((file) => existsSync(file));
    closures.set(page, closure);
    for (const file of closure) {
      if (!texts.has(file)) texts.set(file, readText(file));
    }
  }

  for (const file of files) checkFile(root, file, texts, closures, approvals, findings);
  for (const [page, closure] of closures) checkDatedPage(root, page, closure, texts, findings);
  checkImages(root, files, licences, findings);

  const unique: Finding[] = [];
  const seen = new Set<string>();
  for (const finding of findings) {
    const key = `${finding.severity}|${finding.rule}|${finding.path}|${finding.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(finding);
  }
  unique.sort((a, b) => a.path.localeCompare(b.path) || a.rule.localeCompare(b.rule) || a.message.localeCompare(b.message));

  if (options.writeQueue) writeQueue(root, unique);

  return { ok: unique.length === 0, findings: unique };
}

function writeQueue(root: string, findings: Finding[]) {
  const high = findings.filter((finding) => finding.severity === "HIGH");
  if (high.length === 0) return;
  const dir = join(root, "content-review");
  mkdirSync(dir, { recursive: true });
  const lines = high.map((finding) =>
    JSON.stringify({
      ts: new Date().toISOString(),
      site: "decidefootball",
      bot: "legal-gate",
      title: finding.path,
      flagged: finding.message,
      rule: finding.rule,
      sources: [],
      suggestion: "Leave unpublished until Joshua approves this exact file hash in content/approvals.json.",
      draft_path: finding.path,
      status: "HOLD_REVIEW",
    }),
  );
  appendFileSync(join(dir, "queue.jsonl"), `${lines.join("\n")}\n`);
}

function printReport(result: GateResult) {
  if (result.ok) {
    console.log("legal-gate: pass");
    return;
  }
  console.error(`legal-gate: ${result.findings.length} finding(s)`);
  for (const finding of result.findings) {
    console.error(`${finding.severity} rule ${finding.rule} ${finding.path}: ${finding.message}`);
  }
}

function main() {
  const rootArg = process.argv.indexOf("--root");
  const root = rootArg >= 0 ? process.argv[rootArg + 1] : undefined;
  const result = runLegalGate({ root, writeQueue: true });
  printReport(result);
  if (!result.ok) process.exit(1);
}

const entry = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (import.meta.url === entry) main();
