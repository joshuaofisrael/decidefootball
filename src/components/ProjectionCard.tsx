import { ESTIMATE_DISCLAIMER } from "@/lib/compliance";
import { formatLabel } from "@/lib/site";
import type { ProjectionResult } from "@/lib/types";

export function ProjectionCard({
  projection,
  name,
}: {
  projection: ProjectionResult;
  name: string;
}) {
  return (
    <article className="card">
      <p className="kicker">Model projection · {formatLabel(projection.scoringFormat)}</p>
      <h2>{name}</h2>
      <p>
        Estimated fantasy points. Not official. Not a promise of outcomes.
        {projection.availabilityGated
          ? " Availability gate forced this row to 0 from fixture status."
          : null}
      </p>
      <div className="metric-row">
        <div className="metric">
          <dt>Mean</dt>
          <dd>{projection.pointsMean.toFixed(1)}</dd>
        </div>
        <div className="metric">
          <dt>Floor</dt>
          <dd>{projection.pointsFloor.toFixed(1)}</dd>
        </div>
        <div className="metric">
          <dt>Ceiling</dt>
          <dd>{projection.pointsCeiling.toFixed(1)}</dd>
        </div>
        <div className="metric">
          <dt>Uncertainty</dt>
          <dd>{projection.uncertaintyLabel}</dd>
        </div>
      </div>
      <p className="stamp">
        Base {projection.components.baseRate.toFixed(1)} · usage{" "}
        {projection.components.usageAdj.toFixed(2)} · matchup{" "}
        {projection.components.matchupAdj.toFixed(2)} · availability{" "}
        {projection.components.availabilityAdj.toFixed(2)} · weeks used{" "}
        {projection.components.trailingWeeksUsed} · model {projection.modelVersion}
      </p>
      <p>{ESTIMATE_DISCLAIMER}</p>
    </article>
  );
}
