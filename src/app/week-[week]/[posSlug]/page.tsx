import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { getInjury, getRankings } from "@/lib/data";
import { FIXTURE_VERIFIED_AT, FIXTURE_WEEK } from "@/lib/fixtures";
import { pageMetadata } from "@/lib/seo";
import {
  parseRankingsPosSlug,
  rankingsPosSlug,
  weekRankingsPath,
} from "@/lib/static-paths";
import { POSITIONS, formatLabel, getDefaultFormat } from "@/lib/site";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSITIONS.map((pos) => ({
    week: String(FIXTURE_WEEK),
    posSlug: rankingsPosSlug(pos),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string; posSlug: string }>;
}): Promise<Metadata> {
  const { posSlug } = await params;
  const position = parseRankingsPosSlug(posSlug);
  // `week-[week]` builds /week-3/ from generateStaticParams but does not pass `week`.
  const weekNum = FIXTURE_WEEK;
  if (!position) {
    return pageMetadata({
      path: `/week-${weekNum}/${posSlug}/`,
      title: "Rankings",
      indexation: { sourceClass: "FIXTURE", thin: true },
    });
  }
  return pageMetadata({
    path: weekRankingsPath(weekNum, position),
    title: `Week ${weekNum} ${position} rankings`,
    description: `Sample ${position} rankings for week ${weekNum}, for demonstrating the tool. Not live licensed NFL statistics.`,
    indexation: { sourceClass: "FIXTURE" },
  });
}

export default async function WeekRankingsPage({
  params,
}: {
  params: Promise<{ week: string; posSlug: string }>;
}) {
  const { posSlug } = await params;
  const weekNum = FIXTURE_WEEK;
  const position = parseRankingsPosSlug(posSlug);
  if (!position) notFound();

  const format = getDefaultFormat();
  const ranks = getRankings(position, weekNum, format);
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Rankings", path: "/rankings/" },
          { name: `Week ${weekNum} ${position}`, path: weekRankingsPath(weekNum, position) },
        ]}
      />
      <FixtureBanner />
      <h1>
        Week {weekNum} {position} rankings
      </h1>
      <p>
        Default format {formatLabel(format)}. Kicker and team defense are not on this board.
      </p>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />
      <p>
        {POSITIONS.map((p) => (
          <span key={p}>
            <Link href={weekRankingsPath(weekNum, p)}>{p}</Link>
            {"  "}
          </span>
        ))}
      </p>
      <KillSwitchNotice>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Status</th>
                <th>Mean</th>
                <th>Floor</th>
                <th>Ceil</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((row) => {
                const injury = getInjury(row.player.id);
                return (
                  <tr key={row.player.id}>
                    <td>{row.rank}</td>
                    <td>
                      <Link href={`/players/${row.player.slug}/`}>{row.player.displayName}</Link>
                    </td>
                    <td>{injury ? <StatusLabel code={injury.statusCode} /> : "n/a"}</td>
                    <td>{row.projection.pointsMean.toFixed(1)}</td>
                    <td>{row.projection.pointsFloor.toFixed(1)}</td>
                    <td>{row.projection.pointsCeiling.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </KillSwitchNotice>
      <p>
        <Link href="/guide/rankings/">How to read the board</Link>
        {" · "}
        <Link href="/waiver-radar/">Waiver radar, week {weekNum}</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
