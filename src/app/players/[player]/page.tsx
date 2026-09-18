import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { InjuryTimeline } from "@/components/InjuryTimeline";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { ProjectionCard } from "@/components/ProjectionCard";
import { Sparkline } from "@/components/Sparkline";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { UsageBars } from "@/components/UsageBars";
import { WatchButton } from "@/components/WatchButton";
import {
  addDropsForPlayer,
  comparisonsForPlayer,
  getGameForTeam,
  getInjury,
  getInjuryTimeline,
  getOpponent,
  getPlayerBySlug,
  getPlayerNote,
  getPlayers,
  getProjection,
  getRecentStats,
  getTeam,
  getUsage,
  getVerification,
} from "@/lib/data";
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
    title: `${player.displayName} hub: usage, estimate, and status`,
    description: `Fixture desk for ${player.displayName}: illustrated mark, usage bars, sparkline, and an injury timeline. Sample data.`,
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
  const note = getPlayerNote(player.slug);
  const spark = stats.map((row) => fantasyPoints(row.stats, format));

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
      <header className="hub-head">
        <PlayerAvatar slug={player.slug} name={player.displayName} position={player.position} size={88} />
        <div>
          <p className="kicker">
            {player.position} · {team?.displayNameText} · {note.role}
          </p>
          <h1>{player.displayName}</h1>
          <WatchButton slug={player.slug} name={player.displayName} />
        </div>
      </header>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      <p className="desk-note">{note.desk}</p>
      <p>
        {injury ? (
          <>
            Fixture status <StatusLabel code={injury.statusCode} />
            {injury.bodyArea ? ` · ${injury.bodyArea}` : ""}. Sample designation, not a live
            report.
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
        <Link href={`/injuries/${player.slug}/`}>Injury timeline</Link>
        {" · "}
        <Link href={`/is-${player.slug}-playing-today/`}>Is {player.displayName} playing today?</Link>
        {" · "}
        <Link href={`/week-${FIXTURE_WEEK}/${player.position.toLowerCase()}-rankings/`}>
          {player.position} rankings
        </Link>
        {" · "}
        <Link href="/slate/">Week slate</Link>
      </p>

      <KillSwitchNotice>
        <div className="cards" style={{ marginTop: "1rem" }}>
          <ProjectionCard projection={projection} name={`${player.displayName} estimate`} />
          <UsageBars metrics={usage?.metrics} week={FIXTURE_WEEK} />
        </div>
        <section className="card" style={{ marginTop: "1rem" }}>
          <p className="kicker">Sample weeks</p>
          <h2>PPR sparkline</h2>
          <Sparkline values={spark} label={`${player.displayName} fixture PPR`} />
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
                      {row.stats.passYds} yds / {row.stats.passTd} TD / {row.stats.interceptions}{" "}
                      INT
                    </td>
                    <td>{fantasyPoints(row.stats, format).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="card" style={{ marginTop: "1rem" }}>
          <h2>Availability timeline</h2>
          <InjuryTimeline events={getInjuryTimeline(player.id)} />
        </section>
      </KillSwitchNotice>

      <section style={{ marginTop: "1rem" }}>
        <h2>Related calls</h2>
        <ul>
          {startSits.map((rec) => (
            <li key={`${rec.left.slug}-${rec.right.slug}`}>
              <Link href={`/start-sit/${rec.left.slug}-vs-${rec.right.slug}/`}>
                Start/sit {rec.left.displayName} vs {rec.right.displayName} (certainty{" "}
                {rec.certainty.score})
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
