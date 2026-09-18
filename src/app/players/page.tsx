import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { StatusLabel } from "@/components/StatusLabel";
import { WatchButton } from "@/components/WatchButton";
import { getInjury, getPlayers, getProjection, getTeam } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";

export const metadata: Metadata = {
  title: "Fixture club",
  description: "Fixture player hubs with illustrated marks, usage, and status. No NFL photos or logos.",
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
      <h1>Fixture club</h1>
      <p>
        Original illustrated marks. No scraped photos. No team logos. Text names only for the
        clubs.
      </p>
      <div className="club-board">
        {getPlayers().map((player) => {
          const team = getTeam(player.teamId);
          const injury = getInjury(player.id);
          const proj = getProjection(player);
          return (
            <article className="card club-card" key={player.id}>
              <PlayerAvatar slug={player.slug} name={player.displayName} position={player.position} />
              <h2>
                <Link href={`/players/${player.slug}/`}>{player.displayName}</Link>
              </h2>
              <p className="stamp">
                {player.position} · {team?.displayNameText} · {proj.pointsMean.toFixed(1)}
              </p>
              {injury ? <StatusLabel code={injury.statusCode} /> : <span>n/a</span>}
              <WatchButton slug={player.slug} name={player.displayName} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
