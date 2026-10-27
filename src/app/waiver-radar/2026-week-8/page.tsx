import Link from "next/link";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import {
  week8CitationParts,
  WEEK_8_WAIVER,
  type WaiverPosition,
} from "@/lib/weekly-waiver-week-8";

const note = WEEK_8_WAIVER;
const title = note.title;
const description = note.description;

/** Sitemap lastmod reads this literal. Keep it equal to WEEK_8_WAIVER_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-27" } as const;

export const metadata = {
  ...pageMetadata({
    path: note.path,
    title,
    description,
    indexation: { kind: "editorial" },
  }),
};

const POSITIONS: WaiverPosition[] = ["QB", "RB", "WR", "TE"];

const EXTRA: Partial<Record<WaiverPosition, string>> = {
  WR: note.wideReceiver,
  TE: note.tightEnd,
};

function Cited({ source }: { source: string }) {
  const parts = week8CitationParts(source);
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

export default function Week8WaiverPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver radar", path: "/waiver-radar/" },
          { name: "Week 8 pickups", path: note.path },
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
      <JsonLd data={faqPageJsonLd([...note.faqs])} />
      <p className="kicker">
        Waiver radar · Week {note.week} · {note.season}
      </p>
      <h1>{note.h1}</h1>
      <PhotoFigure photo="yardline" />
      <p>{note.answer}</p>
      <p>
        People search for this note as a waiver wire list. The address stays under{" "}
        <Link href="/waiver-radar/">/waiver-radar/</Link>. This page is editorial copy with
        cited public reporting. It is not the sample radar on that hub, and it is not live
        licensed NFL statistics.
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}. Last checked: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Week 8 window</h2>
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
        const extra = EXTRA[position];
        return (
          <section key={position}>
            <h3>{position}</h3>
            {picks.map((pick) => (
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
                    Week 8 game: {pick.nextGame}. See the{" "}
                    <a href="https://www.nfl.com/schedules/2026/by-week/week-8">
                      NFL.com Week 8 schedule
                    </a>
                    .
                  </p>
                ) : null}
              </article>
            ))}
            {extra ? (
              <p>
                <Cited source={extra} />
              </p>
            ) : null}
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
          among players already on the roster. The dated lineup note for this week is not up yet.
          The latest lineup note is{" "}
          <Link href="/start-sit/2026-week-7/">Week 7 fantasy start/sit</Link>. The previous
          lineup note is <Link href="/start-sit/2026-week-6/">Week 6 fantasy start/sit</Link>.
        </li>
        <li>
          <Link href="/guide/listed-status/">Questionable, Doubtful, and Out</Link> is the page
          for what a posted designation means. A Week 7 label is not a Week 8 label.
        </li>
        <li>
          The previous dated add note is{" "}
          <Link href="/waiver-radar/2026-week-7/">Week 7 fantasy waiver pickups</Link>. The note
          before that is{" "}
          <Link href="/waiver-radar/2026-week-6/">Week 6 fantasy waiver pickups</Link>.
        </li>
        <li>
          The <Link href="/waiver-radar/">waiver radar hub</Link> is the sample urgency board.
          Its numbers demonstrate the tool. They are not this list and not live licensed NFL
          stats.
        </li>
      </ul>
      <p>{note.opinion}</p>

      <h2>Drops</h2>
      <p>
        <Cited source={note.drops} />
      </p>

      <h2>What this note leaves out</h2>
      <p>
        <Cited source={note.omitted} />
      </p>
      <ul>
        <li>No roster percentage. None was verified, so none is printed.</li>
        <li>
          FAAB ranges in the opinion paragraph above are opinion. They are not a model output.
        </li>
        <li>
          One bye-week stash: Woody Marks. The Texans, Saints, Giants, and 49ers do not play in
          Week 8.
        </li>
        <li>
          Caleb Douglas is named under wide receiver and is not a separate card. No defense or
          kicker add is listed. The Smack note explains why that kicker is not a stream.
        </li>
        <li>
          No Monday box score. On 2026-10-27, NFL.com still showed Cowboys at Eagles in progress
          in the fourth quarter.
        </li>
        <li>
          No Week 8 Out, Doubtful, or Questionable label. The injury address for Week 8 still
          displayed the Week 7 report.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>These answers restate the cited sections above.</p>
      {note.faqs.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}

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
