import Link from "next/link";
import { CertaintyMeter } from "@/components/CertaintyMeter";
import { FixtureBanner } from "@/components/FixtureBanner";
import { JsonLd } from "@/components/JsonLd";
import { PhotoFigure } from "@/components/PhotoFigure";
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
import { HOME_FAQS, linkFaqAnswer } from "@/lib/home-faq";
import { startLabel } from "@/lib/recommendations";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { nowIso } from "@/lib/timestamps";

/** Sitemap lastmod reads this literal. Homepage FAQ landed on this date. */
const HOME_UPDATED = { lastModified: "2026-10-26" } as const;

export const metadata = pageMetadata({
  path: "/",
  title: "Decide Football: start, sit, and the Sunday card",
  description:
    "Independent fantasy desk for start/sit, availability, waivers, and rankings. Sample data demonstrates the tool. Not live licensed NFL stats. Not NFL-affiliated. Not gambling.",
  indexation: { sourceClass: "FIXTURE" },
});

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
        <PhotoFigure photo="hero" priority />
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
            <Link href="/guide/start-sit/">Floor vs ceiling</Link>
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
            <Link href="/waiver-radar/">Week 3 radar</Link>
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
            <Link href="/guide/listed-status/">What Questionable, Doubtful, and Out mean</Link>
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
          <Link href="/guide/rankings/">How to read the board</Link>
          {" · "}
          <Link href="/about/">About the desk</Link>
        </p>
      </section>

      <section className="card home-faq" aria-labelledby="home-faq-heading">
        <JsonLd data={faqPageJsonLd([...HOME_FAQS])} />
        <h2 id="home-faq-heading">Questions</h2>
        <p className="stamp">{`Last updated: ${HOME_UPDATED.lastModified}.`}</p>
        {HOME_FAQS.map((item) => (
          <details key={item.question} open>
            <summary>
              <h3>{item.question}</h3>
            </summary>
            <p>
              {linkFaqAnswer(item.answer).map((part, index) =>
                part.type === "link" ? (
                  <Link key={`${part.value}-${index}`} href={part.value}>
                    {part.value}
                  </Link>
                ) : (
                  <span key={`text-${index}`}>{part.value}</span>
                ),
              )}
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}
