import Link from "next/link";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Timestamps } from "@/components/Timestamps";
import { WatchButton } from "@/components/WatchButton";
import { getWaiverRadar } from "@/lib/data";
import { FIXTURE_VERIFIED_AT, FIXTURE_WEEK } from "@/lib/fixtures";
import { WAIVER_DESK_PATH } from "@/lib/indexable-urls";
import { urgencyLabel } from "@/lib/radar";
import { pageMetadata } from "@/lib/seo";
import { formatLabel, getDefaultFormat } from "@/lib/site";
import { nowIso } from "@/lib/timestamps";

export const metadata = pageMetadata({
  path: WAIVER_DESK_PATH,
  title: `Waiver radar, week ${FIXTURE_WEEK}`,
  description: `Sample waiver radar for week ${FIXTURE_WEEK}: hot, rising, stash, or fade. The numbers demonstrate the tool and are not live licensed NFL stats.`,
  indexation: { sourceClass: "FIXTURE" },
});

export default function WaiverRadarPage() {
  const weekNum = FIXTURE_WEEK;
  const format = getDefaultFormat();
  const ranks = getWaiverRadar(weekNum, format);
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver radar", path: WAIVER_DESK_PATH },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">Radar · {formatLabel(format)}</p>
      <h1>Waiver radar, week {weekNum}</h1>
      <PhotoFigure photo="yardline" />
      <p>
        The dated editorial note for the current week is{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 fantasy waiver pickups</Link>. The previous
        note is <Link href="/waiver-radar/2026-week-6/">Week 6 fantasy waiver pickups</Link>.
        Those pages cite public reporting. The list below is separate from them.
      </p>
      <p>
        Urgency from sample estimates, usage change, and listed status. The numbers demonstrate
        the tool. They are not live licensed NFL stats and not a claim that any name is available
        on a host platform. No OAuth. <Link href="/guide/waiver-radar/">How to read the tags</Link>.
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
