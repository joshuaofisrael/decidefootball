import Link from "next/link";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  articleJsonLd,
  confirmedSportsEventItemListJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import {
  PLAYOFF_ANNOUNCEMENT,
  PLAYOFF_ANSWER,
  PLAYOFF_FAQS,
  PLAYOFF_FANTASY,
  PLAYOFF_FORMAT_NOTE,
  PLAYOFF_NATIONAL,
  PLAYOFF_NFL_PLUS,
  PLAYOFF_OMISSIONS,
  PLAYOFF_RADIO,
  PLAYOFF_ROUNDS,
  PLAYOFF_SOURCES,
  PLAYOFF_TICKETS,
  PLAYOFF_TITLE_GAME,
  PLAYOFF_WATCH_DESCRIPTION,
  PLAYOFF_WATCH_H1,
  PLAYOFF_WATCH_PATH,
  PLAYOFF_WATCH_TITLE,
  citationParts,
} from "@/lib/nfl-playoffs-2027";

const title = PLAYOFF_WATCH_TITLE;
const description = PLAYOFF_WATCH_DESCRIPTION;

/** Sitemap lastmod reads this literal. Keep it equal to PLAYOFF_WATCH_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-25" } as const;

const events = [...PLAYOFF_ROUNDS, PLAYOFF_TITLE_GAME];

export const metadata = {
  ...pageMetadata({
    path: PLAYOFF_WATCH_PATH,
    title,
    description,
    indexation: { kind: "editorial" },
  }),
};

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

export default function NflPlayoffs2027Page() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "2026 NFL playoffs", path: PLAYOFF_WATCH_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: PLAYOFF_WATCH_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          path: PLAYOFF_WATCH_PATH,
          headline: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...PLAYOFF_FAQS])} />
      <JsonLd
        data={confirmedSportsEventItemListJsonLd(
          events.map((round) => ({
            name: round.eventName,
            startDate: round.startDate,
            endDate: round.endDate,
            description: round.eventDescription,
            locationName: round.locationName,
            addressLocality: round.addressLocality,
            addressRegion: round.addressRegion,
          })),
        )}
      />
      <p className="kicker">How to watch · January 2027</p>
      <h1>{PLAYOFF_WATCH_H1}</h1>
      <PhotoFigure photo="winter" />
      <p>{PLAYOFF_ANSWER}</p>
      <p>
        Dates below are copied from the May 14, 2026 NFL schedule release, the NFL.com important
        dates, and the NFL Football Operations calendar. Networks are copied only where those
        pages or an ESPN Press Room release name them. Where a source does not announce a fact,
        the cell says TBA. This is a viewing list. It is not the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, not the{" "}
        <Link href="/guide/waiver-radar/">waiver-radar guide</Link>, and not the sample desk. The
        desks are <Link href="/start-sit/">/start-sit/</Link> and{" "}
        <Link href="/waiver-radar/">/waiver-radar/</Link>. The latest dated notes are{" "}
        <Link href="/start-sit/2026-week-8/">Week 8 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-8/">Week 8 waiver radar</Link>. Earlier notes include{" "}
        <Link href="/start-sit/2026-week-7/">Week 7 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 waiver radar</Link>. Holiday windows are
        the <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>{" "}
        and the <Link href="/guide/christmas-nfl-how-to-watch/">Christmas Day how-to-watch guide</Link>.
        The college bracket for the same month is the{" "}
        <Link href="/guide/college-football-playoff-2026-schedule-how-to-watch/">
          2026-27 College Football Playoff schedule
        </Link>
        .
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}. Last checked: ${NOTE_DATE.lastModified}.`}</p>

      <h2>How the playoff format works</h2>
      <p>
        <Cited source={PLAYOFF_FORMAT_NOTE} />
      </p>

      <h2>Round by round</h2>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            January 2027 NFL playoff rounds, with date, site, and where to watch
          </caption>
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Dates</th>
              <th scope="col">Kickoff</th>
              <th scope="col">Site</th>
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            {PLAYOFF_ROUNDS.map((round) => (
              <tr key={round.id}>
                <th scope="row">{round.round}</th>
                <td>{round.dateLabel}</td>
                <td>{round.kickoff}</td>
                <td>{round.site}</td>
                <td>{round.watch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {PLAYOFF_ROUNDS.map((round) => (
        <article key={round.id}>
          <h3>
            {round.round}: {round.dateLabel}
          </h3>
          {round.notes.map((note) => (
            <p key={note}>
              <Cited source={note} />
            </p>
          ))}
        </article>
      ))}
      <p>
        <Cited source={PLAYOFF_ANNOUNCEMENT} />
      </p>

      <h2>How to watch</h2>
      <p>
        <Cited source={PLAYOFF_NATIONAL} />
      </p>
      <p>
        <Cited source={PLAYOFF_RADIO} />
      </p>
      <p>
        <Cited source={PLAYOFF_NFL_PLUS} />
      </p>

      <h2>The February title game</h2>
      <p>
        The conference winners meet two weeks after the championship games. The date, the stadium,
        and the networks that have been named are below. The kickoff time is TBA.
      </p>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            February 2027 title game date, site, and where to watch
          </caption>
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Date</th>
              <th scope="col">Kickoff</th>
              <th scope="col">Site</th>
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{PLAYOFF_TITLE_GAME.round}</th>
              <td>{PLAYOFF_TITLE_GAME.dateLabel}</td>
              <td>{PLAYOFF_TITLE_GAME.kickoff}</td>
              <td>{PLAYOFF_TITLE_GAME.site}</td>
              <td>{PLAYOFF_TITLE_GAME.watch}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {PLAYOFF_TITLE_GAME.notes.map((note) => (
        <p key={note}>
          <Cited source={note} />
        </p>
      ))}

      <h2>Playoff fantasy football tips</h2>
      {PLAYOFF_FANTASY.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        The method for weighing two names is the <Link href="/guide/start-sit/">start/sit guide</Link>.
        The designation to read first is the{" "}
        <Link href="/guide/listed-status/">injury-designations guide</Link>. How a claim works in
        the regular season is the <Link href="/guide/waiver-radar/">waiver-radar guide</Link>. The
        sample tools are <Link href="/start-sit/">/start-sit/</Link> and{" "}
        <Link href="/waiver-radar/">/waiver-radar/</Link>.
      </p>

      <h2>Tickets</h2>
      <p>
        <Cited source={PLAYOFF_TICKETS} />
      </p>

      <h2>FAQ</h2>
      {PLAYOFF_FAQS.map((faq) => (
        <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}

      <h2>Sources</h2>
      <ul>
        {PLAYOFF_SOURCES.map((source) => (
          <li key={source.id}>
            <a href={source.href}>{source.label}</a>. {source.usedFor}
          </li>
        ))}
      </ul>

      <h2>Still TBA</h2>
      <ul>
        {PLAYOFF_OMISSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs.{" "}
          {SITE_NAME} uses the league name to identify the announced games.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>Not a lineup projection, and not live licensed NFL statistics.</li>
        <li>Not a ticket offer. No price is listed. No resale link is listed.</li>
      </ul>
      <p>
        More reading notes live on the <Link href="/guide/">guides hub</Link>. The other viewing
        lists are the{" "}
        <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>,
        the <Link href="/guide/christmas-nfl-how-to-watch/">Christmas Day how-to-watch guide</Link>,
        and the{" "}
        <Link href="/guide/college-football-playoff-2026-schedule-how-to-watch/">
          2026-27 College Football Playoff schedule
        </Link>
        . The latest dated lineup note is <Link href="/start-sit/2026-week-8/">Week 8 start/sit</Link>
        , and the latest dated waiver note is{" "}
        <Link href="/waiver-radar/2026-week-8/">Week 8 waiver radar</Link>. Earlier notes include{" "}
        <Link href="/start-sit/2026-week-7/">Week 7 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 waiver radar</Link>.
      </p>
    </div>
  );
}
