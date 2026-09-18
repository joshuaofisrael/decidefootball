import { certaintyCopy } from "@/lib/certainty";
import type { CertaintyScore } from "@/lib/types";

export function CertaintyMeter({ certainty }: { certainty: CertaintyScore }) {
  return (
    <aside className="certainty" aria-label="Certainty score">
      <p className="kicker">Certainty score</p>
      <p className={`certainty-score is-${certainty.label}`}>
        <strong>{certainty.score}</strong>
        <span>{certaintyCopy(certainty.label)}</span>
      </p>
      <div className="certainty-track" aria-hidden="true">
        <span className="certainty-fill" style={{ width: `${certainty.score}%` }} />
      </div>
      <ul>
        {certainty.reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </aside>
  );
}
