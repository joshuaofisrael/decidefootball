import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { DECAY_WEIGHTS, MATCHUP_ADJ_CAP, USAGE_ADJ_CAP } from "@/lib/projections";
import { MODEL_VERSION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology v0",
  description:
    "How Decide Football computes weekly fantasy estimates. Metrics first. Versioned v0, subject to change, not a backtest.",
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function MethodologyPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Methodology", path: "/methodology/" },
        ]}
      />
      <p className="kicker">First-party analysis · {MODEL_VERSION}</p>
      <h1>How projections work (methodology v0)</h1>
      <p>
        This is a transparent sketch, not a finished or backtested model. Weights are placeholders
        until calibrated. Label remains <strong>methodology v0 — subject to change</strong>.
      </p>
      <h2>Purpose</h2>
      <p>
        Produce comparable weekly fantasy point estimates so start/sit, rankings, and add/drop are
        driven by numbers first. AI may later explain the calculation. It may not invent inputs.
      </p>
      <h2>Inputs used in this scaffold</h2>
      <ul>
        <li>Trailing weekly counting stats stored as structured rows (not prose).</li>
        <li>Derived usage shares (snap / target / carry).</li>
        <li>Fixture injury / participation status — never guessed by the model.</li>
        <li>Bounded matchup factor (cap ±{MATCHUP_ADJ_CAP}).</li>
        <li>Scoring format: PPR, half-PPR, or standard.</li>
      </ul>
      <h2>Weighting sketch</h2>
      <ol>
        <li>
          Base rate: decaying average of trailing format-adjusted fantasy points. Current decay
          weights (most recent first): {DECAY_WEIGHTS.join(", ")}.
        </li>
        <li>
          Usage overlay: adjust from current vs prior usage, capped at ±{USAGE_ADJ_CAP}.
        </li>
        <li>
          Availability gate: OUT, IR, or INACTIVE forces the projection to 0. Questionable and
          doubtful apply soft discounts. The model does not invent a return.
        </li>
        <li>Matchup factor: bounded multiplier so one heuristic cannot dominate.</li>
        <li>Uncertainty: wider floor/ceiling when sample is small or status is uncertain.</li>
      </ol>
      <h2>Floor / mean / ceiling</h2>
      <p>
        Mean is the ranking number. Floor and ceiling are a model range, not a promise of
        outcomes. All three appear on player and comparison pages.
      </p>
      <h2>Format adjustments</h2>
      <ul>
        <li>Standard: yards and touchdowns only.</li>
        <li>Half-PPR: +0.5 per reception.</li>
        <li>Full PPR: +1.0 per reception (provisional default — NEED JOSHUA INPUT).</li>
      </ul>
      <h2>What stays distinct in the UI</h2>
      <ul>
        <li>
          <strong>Reported fixture status</strong> — sample designation with last-verified time.
        </li>
        <li>
          <strong>Model projection</strong> — estimated fantasy points, not official.
        </li>
        <li>
          <strong>Editorial explanation</strong> — stubbed off. When enabled, it may only restate
          computed fields.
        </li>
      </ul>
      <h2>What is blocked until licensed GREEN data</h2>
      <ul>
        <li>Live injury-driven zeros presented as current-week official availability.</li>
        <li>Indexable production rankings.</li>
        <li>Public backtested accuracy claims.</li>
      </ul>
      <p>
        Next step after this scaffold: licensed ingest, only after Joshua approves API spend.
        See <Link href="/disclaimer/">the independent disclaimer</Link>.
      </p>
    </div>
  );
}
