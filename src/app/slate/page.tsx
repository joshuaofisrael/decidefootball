import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { StatusLabel } from "@/components/StatusLabel";
import { SundayToggle } from "@/components/SundayToggle";
import { Timestamps } from "@/components/Timestamps";
import { getInjury, getProjection, getSlate } from "@/lib/data";
import { FIXTURE_VERIFIED_AT, FIXTURE_WEEK, kickWindowLabel } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { formatTimestamp, nowIso } from "@/lib/timestamps";

export const metadata: Metadata = {
  title: "Week slate and Sunday Mode",
  description:
    "Fixture week slate by kick window. Sunday Mode parks Monday games. Sample data, not a live NFL schedule.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function SlatePage() {
  const slate = getSlate();
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Slate", path: "/slate/" },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">Week {FIXTURE_WEEK} · kick windows</p>
      <h1>The week slate</h1>
      <p>
        Games are grouped by window. Sunday Mode hides Monday. This is a labeled fixture card,
        not a licensed league schedule.
      </p>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />
      <SundayToggle>
        {slate.map((row) => (
          <section className="card slate-game" data-window={row.window} key={row.game.id}>
            <p className="kicker">{kickWindowLabel(row.window)}</p>
            <h2>
              {row.away?.displayNameText} at {row.home?.displayNameText}
            </h2>
            <p className="stamp">Kickoff {formatTimestamp(row.game.kickoffAt)}</p>
            <ul className="slate-players">
              {row.players.map((player) => {
                const injury = getInjury(player.id);
                const proj = getProjection(player);
                return (
                  <li key={player.id}>
                    <PlayerAvatar
                      slug={player.slug}
                      name={player.displayName}
                      position={player.position}
                      size={40}
                    />
                    <Link href={`/players/${player.slug}/`}>{player.displayName}</Link>
                    <span>{player.position}</span>
                    {injury ? <StatusLabel code={injury.statusCode} /> : null}
                    <b>{proj.pointsMean.toFixed(1)}</b>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </SundayToggle>
      <p>
        <Link href="/start-sit/">Start/sit pairs</Link>
        {" · "}
        <Link href="/watchlist/">Watchlist</Link>
        {" · "}
        <Link href="/is-playing/">Availability</Link>
      </p>
    </div>
  );
}
