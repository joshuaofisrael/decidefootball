import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Timestamps } from "@/components/Timestamps";
import { WatchButton } from "@/components/WatchButton";
import { getWaiverRadar } from "@/lib/data";
import { FIXTURE_VERIFIED_AT, FIXTURE_WEEK } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { urgencyLabel } from "@/lib/radar";
import { formatLabel, getDefaultFormat } from "@/lib/site";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

/**
 * The public path is `/waiver-wire/week-3/`. A folder named `week-[week]` is
 * not a strict dynamic segment, so static export never filled `week` and the
 * page 404'd. The segment value is the full slug `week-N`.
 */
export function generateStaticParams() {
  return [{ week: `week-${FIXTURE_WEEK}` }];
}

function waiverWeekNumber(segment: string): number | null {
  const match = /^week-(\d{1,2})$/.exec(segment);
  if (!match) return null;
  const weekNum = Number(match[1]);
  if (!Number.isInteger(weekNum) || weekNum < 1 || weekNum > 18) return null;
  return weekNum;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}): Promise<Metadata> {
  const { week } = await params;
  const weekNum = waiverWeekNumber(week);
  return {
    title: `Waiver radar, week ${weekNum ?? "sample"}`,
    description: `Fixture waiver radar for week ${weekNum ?? "sample"}: hot, rising, stash, or fade. Estimates only.`,
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function WaiverWeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const weekNum = waiverWeekNumber(week);
  if (weekNum == null) notFound();

  const format = getDefaultFormat();
  const ranks = getWaiverRadar(weekNum, format);
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver radar", path: `/waiver-wire/week-${weekNum}/` },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">Radar · {formatLabel(format)}</p>
      <h1>Waiver radar, week {weekNum}</h1>
      <p>
        Urgency from fixture estimates, usage change, and listed status. Not a claim that any
        name is available on a host platform. No OAuth.{" "}
        <Link href="/guide/waiver-radar/">How to read the tags</Link>.
      </p>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />
      <KillSwitchNotice>
        <ol className="radar-list">
          {ranks.map((row) => (
            <li key={row.player.id} className={`radar-item is-${row.urgency}`}>
              <PlayerAvatar
                slug={row.player.slug}
                name={row.player.displayName}
                position={row.player.position}
                size={48}
              />
              <div>
                <p className="kicker">
                  {urgencyLabel(row.urgency)} · score {row.urgencyScore}
                </p>
                <h2>
                  <Link href={`/players/${row.player.slug}/`}>{row.player.displayName}</Link>
                </h2>
                <p>
                  Est. {row.projection.pointsMean.toFixed(1)} mean /{" "}
                  {row.projection.pointsCeiling.toFixed(1)} ceiling
                </p>
                <ul>
                  {row.reasons.slice(0, 3).map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
                <WatchButton slug={row.player.slug} name={row.player.displayName} />
              </div>
            </li>
          ))}
        </ol>
      </KillSwitchNotice>
      <p>
        <Link href="/add-drop/">Add/drop pairs</Link>
        {" · "}
        <Link href={`/week-${weekNum}/wr-rankings/`}>WR rankings</Link>
        {" · "}
        <Link href="/slate/">Week slate</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
