import type { Metadata } from "next";
import Link from "next/link";
import { CertaintyMeter } from "@/components/CertaintyMeter";
import { FixtureBanner } from "@/components/FixtureBanner";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Timestamps } from "@/components/Timestamps";
import { WatchlistHome } from "@/components/WatchlistHome";
import { isKillSwitchActive } from "@/lib/compliance";
import {
  fixtureWeekMeta,
  getInjury,
  getPlayers,
  getProjection,
  getSlate,
  getStartSitPairs,
  getStartSitRecommendation,
  getTeam,
} from "@/lib/data";
import { FIXTURE_VERIFIED_AT, kickWindowLabel } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";
import { nowIso } from "@/lib/timestamps";

export const metadata: Metadata = {
  title: "Decide Football: start, sit, and the Sunday card",
  description:
    "Independent fantasy desk for start/sit, availability, waivers, and rankings. Structured estimates. Not a sports news blog. Not NFL-affiliated. Not gambling.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function HomePage() {
  const renderedAt = nowIso();
  const { week, season } = fixtureWeekMeta();
  const pairs = getStartSitPairs();
  const featured = pairs[0] ? getStartSitRecommendation(pairs[0].left, pairs[0].right) : null;
  const withheld = isKillSwitchActive();
  const slate = getSlate();

  return (
    <div className="wrap desk">
      <FixtureBanner />
      <section className="masthead">
        <p className="kicker">
          {season} · week {week} · fixture desk
        </p>
        <h1>The call, not the recap.</h1>
        <p className="lede">
          Decide Football is a roster desk. Start or sit. Is he up. Who is worth a claim. The
          numbers are computed. The status is listed. We do not invent a return date.
        </p>
      </section>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />

      {!withheld && featured ? (
        <article className="card rec-hero featured-call">
          <p className="kicker">Lead call · week {week}</p>
          <h2>{startLabel(featured)}</h2>
          <p>
            {featured.left.displayName} {featured.leftProjection.pointsMean.toFixed(1)} against{" "}
            {featured.right.displayName} {featured.rightProjection.pointsMean.toFixed(1)}. Delta{" "}
            {featured.scoreDelta.toFixed(1)}.
          </p>
          <CertaintyMeter certainty={featured.certainty} />
          <p>
            <Link href={`/start-sit/${featured.left.slug}-vs-${featured.right.slug}/`}>
              Open the full card
            </Link>
            {" · "}
            <Link href="/start-sit/">All pairs</Link>
            {" · "}
            <Link href="/methodology/">How the mean is built</Link>
            {" · "}
            <Link href="/guide/start-sit/">How to read the card</Link>
          </p>
        </article>
      ) : null}

      <div className="cards three">
        <article className="card">
          <h2>Sunday slate</h2>
          <p>Kick windows, the names on each sideline, and a Sunday Mode toggle.</p>
          <p>
            <Link href="/slate/">Open the week slate</Link>
          </p>
        </article>
        <article className="card">
          <h2>Waiver radar</h2>
          <p>Urgency first. Hot, rising, stash, or fade. Not a platform waiver claim.</p>
          <p>
            <Link href="/waiver-wire/week-3/">Week 3 radar</Link>
            {" · "}
            <Link href="/guide/waiver-radar/">How to read the tags</Link>
          </p>
        </article>
        <article className="card">
          <h2>Availability</h2>
          <p>Status from the fixture row. The model does not guess a designation.</p>
          <p>
            <Link href="/is-playing/">Is he playing</Link>
            {" · "}
            <Link href="/guide/listed-status/">How to read the status</Link>
          </p>
        </article>
      </div>

      <WatchlistHome
        players={getPlayers().map((player) => {
          const injury = getInjury(player.id);
          return {
            slug: player.slug,
            name: player.displayName,
            line: `${player.position} · ${injury?.statusCode ?? "n/a"}`,
          };
        })}
      />

      <section className="card">
        <p className="kicker">Week {week} windows</p>
        <h2>The card at a glance</h2>
        <ul className="slate-glance">
          {slate.map((row) => (
            <li key={row.game.id}>
              <strong>{kickWindowLabel(row.window)}</strong>
              {" · "}
              {row.away?.displayNameText} at {row.home?.displayNameText}
            </li>
          ))}
        </ul>
        <p>
          <Link href="/slate/">Full slate with Sunday Mode</Link>
        </p>
      </section>

      <section className="card">
        <h2>Fixture club</h2>
        <div className="club-grid">
          {getPlayers().map((player) => {
            const team = getTeam(player.teamId);
            const proj = getProjection(player);
            const injury = getInjury(player.id);
            return (
              <Link className="club-row" key={player.id} href={`/players/${player.slug}/`}>
                <PlayerAvatar slug={player.slug} name={player.displayName} position={player.position} size={48} />
                <span>
                  <strong>{player.displayName}</strong>
                  <em>
                    {player.position} · {team?.displayNameText ?? "n/a"} ·{" "}
                    {injury?.statusCode ?? "n/a"}
                  </em>
                </span>
                <b>{withheld ? "n/a" : proj.pointsMean.toFixed(1)}</b>
              </Link>
            );
          })}
        </div>
        <p>
          <Link href="/players/">Every hub</Link>
          {" · "}
          <Link href="/week-3/rb-rankings/">RB rankings</Link>
          {" · "}
          <Link href="/about/">About the desk</Link>
        </p>
      </section>
    </div>
  );
}
