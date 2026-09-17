import type { Metadata } from "next";
import { getComplianceGate, isFixtureMode } from "@/lib/compliance";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { nowIso } from "@/lib/timestamps";

export const metadata: Metadata = {
  title: "Health",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE", thin: true })),
};

export default function HealthPage() {
  const payload = {
    ok: true,
    service: "decidefootball",
    complianceGate: getComplianceGate(),
    fixtureMode: isFixtureMode(),
    host: "github-pages",
    renderedAt: nowIso(),
  };

  return (
    <div className="wrap">
      <h1>Health</h1>
      <p>Machine-readable copy also at /health.json (written at export time).</p>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
}
