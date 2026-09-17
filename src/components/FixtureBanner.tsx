import { FIXTURE_BANNER, isKillSwitchActive, isYellowHold } from "@/lib/compliance";

export function FixtureBanner() {
  if (isKillSwitchActive()) {
    return (
      <p className="banner hold" role="status">
        Compliance gate is RED. Decision content is withheld. Legal pages remain available.
      </p>
    );
  }

  if (isYellowHold()) {
    return (
      <p className="banner hold" role="status">
        Compliance gate is YELLOW. Pages stay noindex until Joshua and counsel accept residual
        risk. {FIXTURE_BANNER}
      </p>
    );
  }

  return (
    <p className="banner" role="status">
      {FIXTURE_BANNER}
    </p>
  );
}
