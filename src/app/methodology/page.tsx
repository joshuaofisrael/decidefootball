import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { DECAY_WEIGHTS, MATCHUP_ADJ_CAP, USAGE_ADJ_CAP } from "@/lib/projections";
import { MODEL_VERSION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology: how the desk computes a week",
  description:
    "How Decide Football builds weekly estimates, a certainty score, and waiver urgency. Versioned v0. Not a backtest.",
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
      <h1>How the desk computes a week</h1>
      <p>
        This is a working sketch, not a finished or backtested model. Weights stay labeled
        placeholders until someone calibrates them. The stamp is <strong>methodology v0,
        subject to change</strong>.
      </p>
      <p>
        The job is narrow. Produce comparable weekly fantasy point estimates so{" "}
        <Link href="/start-sit/">start/sit</Link>, rankings, and add/drop are driven by numbers
        first. A later explain layer may restate those numbers. It may not invent a status, a
        return, or a stat line that was not supplied.
      </p>

      <h2>Inputs</h2>
      <ul>
        <li>Trailing weekly counting stats stored as structured rows, not prose.</li>
        <li>Derived usage shares: snap, target, carry, route.</li>
        <li>Listed injury or participation status. The model never guesses a designation.</li>
        <li>Bounded matchup factor, cap ±{MATCHUP_ADJ_CAP}.</li>
        <li>Scoring format: PPR, half-PPR, or standard.</li>
      </ul>

      <h2>The mean</h2>
      <ol>
        <li>
          Base rate: decaying average of trailing format-adjusted fantasy points. Current decay
          weights, most recent first: {DECAY_WEIGHTS.join(", ")}.
        </li>
        <li>
          Usage overlay: current versus prior usage, capped at ±{USAGE_ADJ_CAP}.
        </li>
        <li>
          Availability gate: OUT, IR, or INACTIVE forces the projection to 0. Questionable and
          doubtful apply soft discounts. The model does not invent a return.
        </li>
        <li>Matchup factor: a bounded multiplier so one heuristic cannot run the desk.</li>
        <li>Uncertainty: wider floor and ceiling when the sample is thin or the status is dirty.</li>
      </ol>
      <p>
        Mean is the ranking number. Floor and ceiling are a model range, not a promise. All three
        sit on player and comparison pages.
      </p>

      <h2>Certainty score</h2>
      <p>
        Start/sit pages also print a 0 to 96 certainty score. It is not a probability of winning
        a week. It is a desk grade of how much the call can lean on the math in front of it.
      </p>
      <ul>
        <li>A wider mean gap raises the score.</li>
        <li>A toss-up (under 1.5 estimated points) keeps it thin.</li>
        <li>High uncertainty, a status discount, or an availability zero cuts the score.</li>
        <li>Three trailing weeks on both sides adds a little confidence.</li>
      </ul>
      <p>
        Bands: thin, lean, clear, strong. Read them next to the status labels, not instead of
        them.
      </p>

      <h2>Waiver radar</h2>
      <p>
        The <Link href="/waiver-wire/week-3/">waiver board</Link> adds an urgency tag (hot,
        rising, stash, fade) from the same estimates plus snap-share change and listed status.
        It is not a claim that a name is available on any host platform.
      </p>

      <h2>Format</h2>
      <ul>
        <li>Standard: yards and touchdowns only.</li>
        <li>Half-PPR: +0.5 per reception.</li>
        <li>Full PPR: +1.0 per reception (provisional default, NEED JOSHUA INPUT).</li>
      </ul>

      <h2>What stays distinct on the page</h2>
      <ul>
        <li>
          <strong>Reported status</strong>: the listed designation with a last-verified time.
        </li>
        <li>
          <strong>Model projection</strong>: estimated fantasy points, not official.
        </li>
        <li>
          <strong>Editorial note</strong>: short desk copy. It may only restate computed fields.
        </li>
      </ul>

      <h2>What stays blocked until licensed data</h2>
      <ul>
        <li>Live injury zeros presented as official current-week availability.</li>
        <li>Indexable production rankings.</li>
        <li>Public backtested accuracy claims.</li>
      </ul>
      <p>
        Licensed ingest waits on Joshua approving API spend. See the{" "}
        <Link href="/disclaimer/">independent disclaimer</Link> and the{" "}
        <Link href="/about/">about page</Link>.
      </p>
    </div>
  );
}
