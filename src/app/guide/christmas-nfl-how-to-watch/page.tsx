import Link from "next/link";
import { PhotoFigure } from "@/components/PhotoFigure";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  articleJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  pageMetadata,
  sportsEventItemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import {
  CHRISTMAS_ANSWER,
  CHRISTMAS_EVE,
  CHRISTMAS_FAQS,
  CHRISTMAS_GAMES,
  CHRISTMAS_NFL_PLUS,
  CHRISTMAS_OMISSIONS,
  CHRISTMAS_OPERATIONS_GAP,
  CHRISTMAS_RADIO,
  CHRISTMAS_SOURCES,
  CHRISTMAS_WATCH_DESCRIPTION,
  CHRISTMAS_WATCH_H1,
  CHRISTMAS_WATCH_PATH,
  CHRISTMAS_WATCH_TITLE,
  CHRISTMAS_ZONES,
  CHRISTMAS_ZONE_NOTE,
  citationParts,
  formatZoneCell,
  startDateIso,
} from "@/lib/christmas-watch-2026";

const title = CHRISTMAS_WATCH_TITLE;
const description = CHRISTMAS_WATCH_DESCRIPTION;

/** Sitemap lastmod reads this literal. Keep it equal to CHRISTMAS_WATCH_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-20" } as const;

export const metadata = {
  ...pageMetadata({
    path: CHRISTMAS_WATCH_PATH,
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

export default function ChristmasWatchPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Christmas Day 2026", path: CHRISTMAS_WATCH_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: CHRISTMAS_WATCH_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          path: CHRISTMAS_WATCH_PATH,
          headline: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...CHRISTMAS_FAQS])} />
      <JsonLd
        data={sportsEventItemListJsonLd(
          CHRISTMAS_GAMES.map((game) => ({
            name: `${game.away} at ${game.home}`,
            startDate: startDateIso(game.date, game.et),
            description: `${game.away} at ${game.home}, ${game.dateLabel}, ${formatZoneCell(game.et, 0)} Eastern, ${game.venue}. National window: ${game.national}.`,
            locationName: game.venue,
            addressLocality: game.locality,
            addressRegion: game.region,
            homeTeam: game.home,
            awayTeam: game.away,
          })),
        )}
      />
      <p className="kicker">How to watch · Week 16 · 2026</p>
      <h1>{CHRISTMAS_WATCH_H1}</h1>
      <PhotoFigure photo="winter" />
      <p>{CHRISTMAS_ANSWER}</p>
      <p>
        Matchups, Eastern kickoffs, and the national channel or stream are from the May 14, 2026
        NFL schedule release, NFL.com, and Netflix Tudum. Where a source does not name a game, the
        page says so. This is a viewing list. It is not the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, not the{" "}
        <Link href="/guide/waiver-radar/">waiver-radar guide</Link>, and not the sample desk. The
        latest dated notes are <Link href="/start-sit/2026-week-8/">Week 8 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-8/">Week 8 waiver radar</Link>. Earlier notes include{" "}
        <Link href="/start-sit/2026-week-7/">Week 7 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 waiver radar</Link>. Thanksgiving week is
        the{" "}
        <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>.
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Kickoff times</h2>
      <p>
        <Cited source={CHRISTMAS_ZONE_NOTE} />
      </p>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            Christmas Day 2026 kickoffs in ET, CT, MT, PT, and UK time
          </caption>
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Date</th>
              {CHRISTMAS_ZONES.map((zone) => (
                <th key={zone.id} scope="col">
                  {zone.label}
                </th>
              ))}
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            {CHRISTMAS_GAMES.map((game) => (
              <tr key={game.id}>
                <th scope="row">
                  {game.away} at {game.home}
                </th>
                <td>{game.dateLabel}</td>
                {CHRISTMAS_ZONES.map((zone) => (
                  <td key={zone.id}>{formatZoneCell(game.et, zone.offsetHours)}</td>
                ))}
                <td>{game.watchCell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to watch each game</h2>
      {CHRISTMAS_GAMES.map((game) => (
        <article key={game.id}>
          <h3>
            {game.away} at {game.home}
          </h3>
          {game.notes.map((note) => (
            <p key={note}>
              <Cited source={note} />
            </p>
          ))}
          <p>
            <strong>Fantasy.</strong> {game.fantasy} The method for weighing two names is the{" "}
            <Link href="/guide/start-sit/">start/sit guide</Link>. The designation to read before
            any number is the <Link href="/guide/listed-status/">injury-designations guide</Link>.
          </p>
        </article>
      ))}

      <h2>Radio and mobile</h2>
      <p>
        <Cited source={CHRISTMAS_RADIO} />
      </p>
      <p>
        <Cited source={CHRISTMAS_NFL_PLUS} />
      </p>

      <h2>FAQ</h2>
      {CHRISTMAS_FAQS.map((faq) => (
        <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}

      <h2>Sources</h2>
      <ul>
        {CHRISTMAS_SOURCES.map((source) => (
          <li key={source.id}>
            <a href={source.href}>{source.label}</a>. {source.usedFor}
          </li>
        ))}
      </ul>

      <h2>What this page leaves out</h2>
      <ul>
        {CHRISTMAS_OMISSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        <Cited source={CHRISTMAS_EVE} />
      </p>
      <p>
        <Cited source={CHRISTMAS_OPERATIONS_GAP} />
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs.{" "}
          {SITE_NAME} uses club names to identify the announced games.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>Not a lineup projection, and not live licensed NFL statistics.</li>
        <li>Not a ticket or subscription offer. No price is listed.</li>
      </ul>
      <p>
        More reading notes live on the <Link href="/guide/">guides hub</Link>. Thanksgiving week
        is the{" "}
        <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>.
        The January 2027 NFL playoff windows are the{" "}
        <Link href="/guide/nfl-playoffs-2027-schedule-how-to-watch/">
          2026 NFL playoffs schedule and how to watch
        </Link>
        . The latest dated lineup note is{" "}
        <Link href="/start-sit/2026-week-8/">Week 8 start/sit</Link>, and the latest dated waiver
        note is <Link href="/waiver-radar/2026-week-8/">Week 8 waiver radar</Link>. Earlier notes
        include <Link href="/start-sit/2026-week-7/">Week 7 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 waiver radar</Link>. How waivers
        work is the <Link href="/guide/waiver-radar/">waiver-radar guide</Link>.
      </p>
    </div>
  );
}
