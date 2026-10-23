import Link from "next/link";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  callLabel,
  citationParts,
  WEEK_6_START_SIT,
  type StartSitPosition,
  type StartSitWindow,
} from "@/lib/weekly-start-sit";
import { articleJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const note = WEEK_6_START_SIT;
const title = note.title;
const description = note.description;

/** Sitemap lastmod reads this literal. Keep it equal to WEEKLY_START_SIT_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-15" } as const;

export const metadata = {
  ...pageMetadata({
    path: note.path,
    title,
    description,
    indexation: { kind: "editorial" },
  }),
  twitter: {
    card: "summary" as const,
    title,
    description,
  },
};

const POSITIONS: StartSitPosition[] = ["QB", "RB", "WR", "TE"];

function Cited({ source }: { source: string }) {
  const parts = citationParts(source);
  return (
    <>
      {parts.map((part, index) =>
        part.type === "link" ? (
          <a key={`${part.href}-${index}`} href={part.href}>
            {part.text}
          </a>
        ) : (
          <span key={`text-${index}`}>{part.text}</span>
        ),
      )}
    </>
  );
}

function PickGroup({ window }: { window: StartSitWindow }) {
  const picks = note.picks.filter((pick) => pick.window === window);
  return POSITIONS.map((position) => {
    const rows = picks.filter((pick) => pick.position === position);
    if (rows.length === 0) return null;
    return (
      <section key={`${window}-${position}`}>
        <h3>{position}</h3>
        {rows.map((pick) => (
          <article key={pick.name}>
            <h3>
              {callLabel(pick.call)}: {pick.name}, {pick.club}
            </h3>
            <p>
              <Cited source={pick.body} />
            </p>
            {pick.nextGame ? (
              <p>
                Week 6 game: {pick.nextGame}. See the{" "}
                <a href="https://www.nfl.com/schedules/2026/by-week/week-6">
                  NFL.com Week 6 schedule
                </a>
                .
              </p>
            ) : null}
          </article>
        ))}
      </section>
    );
  });
}

export default function Week6StartSitPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Start / sit", path: "/start-sit/" },
          { name: "Week 6 start/sit", path: note.path },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: note.path,
          name: title,
          description,
        })}
      />
      <JsonLd data={articleJsonLd({ path: note.path, headline: title, description })} />
      <p className="kicker">
        Start/sit · Week {note.week} · {note.season}
      </p>
      <h1>{note.h1}</h1>
      <PhotoFigure photo="turf" />
      <p>{note.answer}</p>
      <p>
        People search for who to start in Week 6. The address stays under{" "}
        <Link href="/start-sit/">/start-sit/</Link>. This page is editorial copy with cited public
        reporting. It is not the sample start/sit desk on that hub, and it is not live licensed
        NFL statistics. Sit, start, and recheck labels are editorial opinion grounded in the
        cited facts.
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Week 6 window</h2>
      <p>
        <Cited source={note.window} />
      </p>

      <h2>Bye-week sits</h2>
      <p>
        <Cited source={note.byes} />
      </p>
      {note.byeClubs.map((club) => (
        <article key={club.club}>
          <h3>Sit: {club.club}</h3>
          <p>
            <Cited source={club.body} />
          </p>
        </article>
      ))}

      <h2>Thursday designations</h2>
      <p>
        <Cited source={note.reportGap} />
      </p>
      <PickGroup window="thursday" />

      <h2>Sunday and Monday, no game status yet</h2>
      <p>
        The cards below use Week 5 results and the Week 6 practice table. They do not upgrade a
        blank game status into Out, Doubtful, or Questionable.
      </p>
      <PickGroup window="later" />

      <h2>How to use a start/sit note</h2>
      <p>
        Use this note as a reading list for a lineup. It does not know your roster, your scoring,
        or your bench.
      </p>
      <ul>
        <li>
          <Link href="/guide/start-sit/">How to decide who to start</Link> covers floor, mean,
          ceiling, and when a close call is a toss-up.
        </li>
        <li>
          The <Link href="/start-sit/">start/sit hub</Link> is the sample desk. Its numbers
          demonstrate the tool. They are not this list and not live licensed NFL stats.
        </li>
        <li>
          <Link href="/waiver-radar/2026-week-6/">Week 6 fantasy waiver pickups</Link> is a
          different question: who to add, not who to start among players already rostered. The
          next add note is{" "}
          <Link href="/waiver-radar/2026-week-7/">Week 7 fantasy waiver pickups</Link>. The next
          lineup note is <Link href="/start-sit/2026-week-7/">Week 7 fantasy start/sit</Link>.
        </li>
        <li>
          <Link href="/guide/listed-status/">Questionable, Doubtful, and Out</Link> is the page
          for what a posted designation means. A blank game status is not one of those labels.
        </li>
      </ul>
      <p>{note.opinion}</p>

      <h2>What this note leaves out</h2>
      <ul>
        <li>No roster percentage. None was verified, so none is printed.</li>
        <li>No fantasy-point projection. The start and sit sentences above are labeled opinion.</li>
        <li>
          No Sunday or Monday Out, Doubtful, or Questionable label. The league table left Game
          Status blank for those games when this page was updated.
        </li>
        <li>
          No tight end start on a club that plays in Week 6. Sam LaPorta and T.J. Hockenson are
          bye-week sits. Reports checked for this note did not verify another tight-end role
          change for a club that plays.
        </li>
        <li>
          Patrick Surtain II, Talanoa Hufanga, and Riley Moss are on the Thursday report. This
          note does not turn those defensive designations into a skill-position start.
        </li>
      </ul>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs.{" "}
          {SITE_NAME} uses team and player names to identify them for fantasy analysis.
        </li>
        <li>Not the sample start/sit desk, and not live licensed NFL statistics.</li>
        <li>Not a claim that any name is rostered on ESPN, Yahoo, Sleeper, or any other host.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
      </ul>

      <h2>Sources</h2>
      <ul>
        {note.sources.map((source) => (
          <li key={source.href}>
            <a href={source.href}>{source.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
