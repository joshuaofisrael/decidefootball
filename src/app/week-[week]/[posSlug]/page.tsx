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
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import {
  parseRankingsPosSlug,
  rankingsPosSlug,
  weekRankingsPath,
} from "@/lib/static-paths";
import { POSITIONS, absoluteUrl, formatLabel, getDefaultFormat } from "@/lib/site";
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
  const { week, posSlug } = await params;
  const position = parseRankingsPosSlug(posSlug);
  if (!position) return { title: "Rankings" };
  return {
    title: `Week ${week} ${position} rankings`,
    description: `Fixture ${position} rankings for week ${week}. Estimates only.`,
    alternates: { canonical: absoluteUrl(weekRankingsPath(Number(week), position)) },
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function WeekRankingsPage({
  params,
}: {
  params: Promise<{ week: string; posSlug: string }>;
}) {
  const { week, posSlug } = await params;
  const weekNum = Number(week);
  const position = parseRankingsPosSlug(posSlug);
  if (!position || !Number.isInteger(weekNum) || weekNum < 1 || weekNum > 18) notFound();

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
        Default format {formatLabel(format)} is provisional{" "}
        <span className="flag">NEED JOSHUA INPUT</span>. K and DST are out of Phase 1.
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
                    <td>{injury ? <StatusLabel code={injury.statusCode} /> : "—"}</td>
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
        <Link href={`/waiver-wire/week-${weekNum}/`}>Waiver wire week {weekNum}</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
