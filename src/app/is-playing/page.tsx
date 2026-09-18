import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { getInjury, getPlayers, getTeam } from "@/lib/data";
import { statusVerb } from "@/lib/format";
import { FIXTURE_VERIFIED_AT } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { getDisplayTimeZone } from "@/lib/site";
import { nowIso } from "@/lib/timestamps";

export const metadata: Metadata = {
  title: "Is playing today",
  description: "Fixture availability answers. Status is not inferred by the projection model.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function IsPlayingIndexPage() {
  const renderedAt = nowIso();
  const tz = getDisplayTimeZone();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Is playing", path: "/is-playing/" },
        ]}
      />
      <FixtureBanner />
      <h1>Is this player playing?</h1>
      <p>
        Availability comes from the fixture status row, not from the estimate engine. Display
        timezone is <span className="flag">NEED JOSHUA INPUT</span> (currently {tz}).
      </p>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team text</th>
              <th>Status</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {getPlayers().map((player) => {
              const injury = getInjury(player.id);
              return (
                <tr key={player.id}>
                  <td>
                    <Link href={`/is-${player.slug}-playing-today/`}>{player.displayName}</Link>
                  </td>
                  <td>{getTeam(player.teamId)?.displayNameText}</td>
                  <td>{injury ? <StatusLabel code={injury.statusCode} /> : "n/a"}</td>
                  <td>{statusVerb(injury?.statusCode ?? "")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
