import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  citationParts,
  WEEK_6_WAIVER,
  type WaiverPosition,
} from "@/lib/weekly-waiver";
import { articleJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const note = WEEK_6_WAIVER;
const title = note.title;
const description = note.description;

/** Sitemap lastmod reads this literal. Keep it equal to WEEKLY_WAIVER_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-14" } as const;

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

const POSITIONS: WaiverPosition[] = ["QB", "RB", "WR", "TE"];

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

export default function Week6WaiverPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver radar", path: "/waiver-radar/" },
          { name: "Week 6 pickups", path: note.path },
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
        Waiver radar · Week {note.week} · {note.season}
      </p>
      <h1>{note.h1}</h1>
      <p>{note.answer}</p>
      <p>
        People search for this note as a waiver wire list. The address stays under{" "}
        <Link href="/waiver-radar/">/waiver-radar/</Link>. This page is editorial copy with
        cited public reporting. It is not the sample radar on that hub, and it is not live
        licensed NFL statistics.
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Week 6 window</h2>
      <p>
        <Cited source={note.window} />
      </p>

      <h2>Bye-week teams</h2>
      <p>
        <Cited source={note.byes} />
      </p>
      <p>
        <Cited source={note.reportGap} />
      </p>

      <h2>Add candidates</h2>
      {POSITIONS.map((position) => {
        const picks = note.picks.filter((pick) => pick.position === position);
        return (
          <section key={position}>
            <h3>{position}</h3>
            {picks.length === 0 ? (
              <p>
                <Cited source={note.tightEnd} />
              </p>
            ) : (
              picks.map((pick) => (
                <article key={pick.name}>
                  <h3>
                    {pick.name}, {pick.club}
                    {pick.byeStash ? " (bye-week stash)" : ""}
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
              ))
            )}
          </section>
        );
      })}

      <h2>Defense and kicker</h2>
      <p>
        <Cited source={note.streaming} />
      </p>

      <h2>How to use our Waiver Radar</h2>
      <p>
        Use this note as a reading list for a claim. It does not know your roster, your waiver
        order, or your budget.
      </p>
      <ul>
        <li>
          <Link href="/guide/waiver-radar/">How waivers work</Link> covers rolling priority,
          reverse standings, FAAB, and when a player becomes a free agent.
        </li>
        <li>
          <Link href="/guide/add-drop/">Add/drop</Link> is the comparison if you are choosing
          which rostered name to drop. The sample cards at <Link href="/add-drop/">/add-drop/</Link>{" "}
          are sample data.
        </li>
        <li>
          <Link href="/guide/start-sit/">Start/sit</Link> is a different question: who to start
          among players already on the roster. The dated note is{" "}
          <Link href="/start-sit/2026-week-6/">Week 6 fantasy start/sit</Link>.
        </li>
        <li>
          The next dated add note is{" "}
          <Link href="/waiver-radar/2026-week-7/">Week 7 fantasy waiver pickups</Link>.
        </li>
        <li>
          The <Link href="/waiver-radar/">waiver radar hub</Link> is the sample urgency board.
          Its numbers demonstrate the tool. They are not this list and not live licensed NFL
          stats.
        </li>
      </ul>
      <p>{note.opinion}</p>

      <h2>What this note leaves out</h2>
      <ul>
        <li>No roster percentage. None was verified, so none is printed.</li>
        <li>No FAAB percent. The bid sentence above is labeled opinion.</li>
        <li>
          No tight end, defense, or kicker add. The Hockenson and Reichard notes explain why
          those names are not Week 6 streams.
        </li>
        <li>
          No Week 6 Out, Doubtful, or Questionable label. The official Week 6 report was not
          the document at the league injury-report address when this page was updated.
        </li>
        <li>
          Snap counts, practice-squad elevations that were not in a club announcement, and
          backup names that were not in an NFL.com, ESPN, or club-site report checked for
          this note.
        </li>
      </ul>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs.{" "}
          {SITE_NAME} uses team and player names to identify them for fantasy analysis.
        </li>
        <li>Not the sample waiver radar, and not live licensed NFL statistics.</li>
        <li>Not a claim that any name is available on ESPN, Yahoo, Sleeper, or any other host.</li>
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
