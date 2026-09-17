import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { ProjectionCard } from "@/components/ProjectionCard";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { addDropsForPlayer, comparisonsForPlayer, getGameForTeam, getInjury, getOpponent, getPlayerBySlug, getPlayers, getProjection, getRecentStats, getTeam, getUsage, getVerification } from "@/lib/data";
import { fantasyPoints } from "@/lib/format";
import { FIXTURE_WEEK } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { getDefaultFormat } from "@/lib/site";
import { formatTimestamp, nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlayers().map((player) => ({ player: player.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ player: string }>;
}): Promise<Metadata> {
  const { player: slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return { title: "Player not found" };
  return {
    title: `${player.displayName} decision hub`,
    description: `Fixture snapshot for ${player.displayName}: status, usage, estimate, and related decisions.`,
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function PlayerHubPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const { player: slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) notFound();

  const team = getTeam(player.teamId);
  const opponent = getOpponent(player.teamId);
  const game = getGameForTeam(player.teamId);
  const injury = getInjury(player.id);
  const projection = getProjection(player);
  const usage = getUsage(player.id, FIXTURE_WEEK);
  const stats = getRecentStats(player.id);
  const format = getDefaultFormat();
  const stamp = getVerification(player.id, "injury_status");
  const renderedAt = nowIso();
  const startSits = comparisonsForPlayer(player);
  const addDrops = addDropsForPlayer(player);

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Players", path: "/players/" },
          { name: player.displayName, path: `/players/${player.slug}/` },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">
        Player hub · {player.position} · {team?.displayNameText}
      </p>
      <h1>{player.displayName}</h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      <p>
        {injury ? (
          <>
            Fixture status <StatusLabel code={injury.statusCode} />
            {injury.bodyArea ? ` · ${injury.bodyArea}` : ""}. This is sample data, not a live
            verified injury.
          </>
        ) : (
          "No fixture status row."
        )}
      </p>
      <p>
        Week {FIXTURE_WEEK} opponent text: {opponent?.displayNameText ?? "unlisted"}
        {game ? ` · kickoff ${formatTimestamp(game.kickoffAt)}` : ""}.
      </p>
      <p>
        <Link href={`/injuries/${player.slug}/`}>Injury / status page</Link>
        {" · "}
        <Link href={`/is-${player.slug}-playing-today/`}>Is {player.displayName} playing today?</Link>
        {" · "}
        <Link href={`/week-${FIXTURE_WEEK}/${player.position.toLowerCase()}-rankings/`}>
          {player.position} rankings
        </Link>
      </p>

      <KillSwitchNotice>
        <div className="cards" style={{ marginTop: "1rem" }}>
          <ProjectionCard projection={projection} name={`${player.displayName} estimate`} />
          <article className="card">
            <p className="kicker">Usage (derived fixture)</p>
            <h2>Week {FIXTURE_WEEK} role</h2>
            <ul>
              <li>Snap share: {usage ? `${Math.round(usage.metrics.snapShare * 100)}%` : "—"}</li>
              <li>
                Target share:{" "}
                {usage?.metrics.targetShare != null
                  ? `${Math.round(usage.metrics.targetShare * 100)}%`
                  : "n/a"}
              </li>
              <li>
                Carry share:{" "}
                {usage?.metrics.carryShare != null
                  ? `${Math.round(usage.metrics.carryShare * 100)}%`
                  : "n/a"}
              </li>
            </ul>
            <p className="stamp">Derived from fixture weekly stats. Not a live snap chart.</p>
          </article>
        </div>

        <section className="card" style={{ marginTop: "1rem" }}>
          <h2>Trailing counting stats</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Rush</th>
                  <th>Rec</th>
                  <th>Pass</th>
                  <th>{format.toUpperCase()} pts</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((row) => (
                  <tr key={row.week}>
                    <td>{row.week}</td>
                    <td>
                      {row.stats.rushAtt}/{row.stats.rushYds}/{row.stats.rushTd}
                    </td>
                    <td>
                      {row.stats.receptions}/{row.stats.recYds}/{row.stats.recTd} on{" "}
                      {row.stats.targets}
                    </td>
                    <td>
                      {row.stats.passYds} yds / {row.stats.passTd} TD / {row.stats.interceptions} INT
                    </td>
                    <td>{fantasyPoints(row.stats, format).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </KillSwitchNotice>

      <section style={{ marginTop: "1rem" }}>
        <h2>Related decisions</h2>
        <ul>
          {startSits.map((rec) => (
            <li key={`${rec.left.slug}-${rec.right.slug}`}>
              <Link href={`/start-sit/${rec.left.slug}-vs-${rec.right.slug}/`}>
                Start/sit {rec.left.displayName} vs {rec.right.displayName}
              </Link>
            </li>
          ))}
          {addDrops.map((rec) => (
            <li key={`ad-${rec.left.slug}-${rec.right.slug}`}>
              <Link href={`/add-drop/${rec.left.slug}-vs-${rec.right.slug}/`}>
                Add/drop {rec.left.displayName} vs {rec.right.displayName}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/methodology/">How these estimates are computed</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
