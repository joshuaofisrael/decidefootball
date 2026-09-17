import { getComplianceGate, isFixtureMode } from "@/lib/compliance";
import { nowIso } from "@/lib/timestamps";

export function GET() {
  return Response.json({
    ok: true,
    service: "decidefootball",
    complianceGate: getComplianceGate(),
    fixtureMode: isFixtureMode(),
    renderedAt: nowIso(),
  });
}
