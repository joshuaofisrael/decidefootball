import Link from "next/link";
import { FixtureBanner } from "@/components/FixtureBanner";
import { Timestamps } from "@/components/Timestamps";
import { isKillSwitchActive } from "@/lib/compliance";
import {
  fixtureWeekMeta,
  getPlayers,
  getProjection,
  getStartSitPairs,
  getStartSitRecommendation,
} from "@/lib/data";
import { FIXTURE_VERIFIED_AT } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";
import { getTeam } from "@/lib/data";
import { nowIso } from "@/lib/timestamps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decide Football — start, sit, and availability",
  description:
    "High-intent fantasy football decision pages. Independent analysis. Not a sports news blog. Not NFL-affiliated. Not gambling.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function HomePage() {
  const renderedAt = nowIso();
  const { week, season } = fixtureWeekMeta();
  const pairs = getStartSitPairs();
  const featured = pairs[0] ? getStartSitRecommendation(pairs[0].left, pairs[0].right) : null;
  const withheld = isKillSwitchActive();

  return (
    <div className="wrap">
      <FixtureBanner />
      <section className="hero">
        <p className="kicker">Independent fantasy decisions</p>
        <h1>Decide who to start. Not another sports news feed.</h1>
        <p className="lede">
          Decide Football is a decision site: start/sit, is-playing, injuries, waivers, and
          weekly rankings from structured estimates. No gambling. No official NFL marks. No
          invented numbers.
        </p>
      </section>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />

      {!withheld && featured ? (
        <article className="card rec-hero" style={{ marginTop: "1.25rem" }}>
          <p className="kicker">
            Fixture start/sit · {season} week {week}
          </p>
          <h2>{startLabel(featured)}</h2>
          <p>
            {featured.left.displayName} {featured.leftProjection.pointsMean.toFixed(1)} vs{" "}
            {featured.right.displayName} {featured.rightProjection.pointsMean.toFixed(1)} mean
            estimated points. Delta {featured.scoreDelta.toFixed(1)}.
          </p>
          <p>
            <Link href={`/start-sit/${featured.left.slug}-vs-${featured.right.slug}/`}>
              Open this comparison
            </Link>
          </p>
        </article>
      ) : null}

      <div className="cards three" style={{ marginTop: "1.25rem" }}>
        <article className="card">
          <h2>Start or sit</h2>
          <p>Canonical pair pages. Reverse URLs redirect. Metrics first; AI explain off.</p>
          <p>
            <Link href="/start-sit/">Browse fixture pairs</Link>
          </p>
        </article>
        <article className="card">
          <h2>Is playing</h2>
          <p>Availability from fixture status labels — never from the projection model guessing.</p>
          <p>
            <Link href="/is-playing/">Open availability hub</Link>
          </p>
        </article>
        <article className="card">
          <h2>Player hubs</h2>
          <p>Status, usage, estimate, and links to injury and comparison pages.</p>
          <p>
            <Link href="/players/">All fixture players</Link>
          </p>
        </article>
      </div>

      <section className="card" style={{ marginTop: "1.25rem" }}>
        <h2>This week&apos;s fixture players</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Pos</th>
                <th>Team text</th>
                <th>Est. mean</th>
              </tr>
            </thead>
            <tbody>
              {getPlayers().map((player) => {
                const team = getTeam(player.teamId);
                const proj = getProjection(player);
                return (
                  <tr key={player.id}>
                    <td>
                      <Link href={`/players/${player.slug}/`}>{player.displayName}</Link>
                    </td>
                    <td>{player.position}</td>
                    <td>{team?.displayNameText ?? "—"}</td>
                    <td>{withheld ? "—" : proj.pointsMean.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          Also:{" "}
          <Link href="/week-3/rb-rankings/">week 3 RB rankings</Link>,{" "}
          <Link href="/waiver-wire/week-3/">waiver week 3</Link>,{" "}
          <Link href="/methodology/">methodology v0</Link>.
        </p>
      </section>
    </div>
  );
}
