import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { StatusLabel } from "@/components/StatusLabel";
import { getInjury, getPlayers, getProjection, getTeam } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Players",
  description: "Fixture player hubs for Decide Football decision pages.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function PlayersIndexPage() {
  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Players", path: "/players/" },
        ]}
      />
      <FixtureBanner />
      <h1>Fixture players</h1>
      <p>Text identifiers only. No logos, helmets, or official photos.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Pos</th>
              <th>Team text</th>
              <th>Fixture status</th>
              <th>Est. mean</th>
            </tr>
          </thead>
          <tbody>
            {getPlayers().map((player) => {
              const team = getTeam(player.teamId);
              const injury = getInjury(player.id);
              const proj = getProjection(player);
              return (
                <tr key={player.id}>
                  <td>
                    <Link href={`/players/${player.slug}/`}>{player.displayName}</Link>
                  </td>
                  <td>{player.position}</td>
                  <td>{team?.displayNameText}</td>
                  <td>{injury ? <StatusLabel code={injury.statusCode} /> : "—"}</td>
                  <td>{proj.pointsMean.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
