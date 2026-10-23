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
  citationParts,
  formatKickoff,
  startDateIso,
  THANKSGIVING_ANSWER,
  THANKSGIVING_FAQS,
  THANKSGIVING_GAMES,
  THANKSGIVING_WATCH_H1,
  THANKSGIVING_NFL_PLUS,
  THANKSGIVING_OMISSIONS,
  THANKSGIVING_OPERATIONS_GAP,
  THANKSGIVING_RADIO,
  THANKSGIVING_SOURCES,
  THANKSGIVING_WATCH_DESCRIPTION,
  THANKSGIVING_WATCH_PATH,
  THANKSGIVING_WATCH_TITLE,
  THANKSGIVING_ZONE_NOTE,
  US_KICKOFF_ZONES,
} from "@/lib/thanksgiving-watch-2026";

const title = THANKSGIVING_WATCH_TITLE;
const description = THANKSGIVING_WATCH_DESCRIPTION;

/** Sitemap lastmod reads this literal. Keep it equal to THANKSGIVING_WATCH_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-16" } as const;

export const metadata = {
  ...pageMetadata({
    path: THANKSGIVING_WATCH_PATH,
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

export default function ThanksgivingWatchPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Thanksgiving 2026", path: THANKSGIVING_WATCH_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: THANKSGIVING_WATCH_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          path: THANKSGIVING_WATCH_PATH,
          headline: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...THANKSGIVING_FAQS])} />
      <JsonLd
        data={sportsEventItemListJsonLd(
          THANKSGIVING_GAMES.map((game) => ({
            name: `${game.away} at ${game.home}`,
            startDate: startDateIso(game.date, game.et),
            description: `${game.away} at ${game.home}, ${game.dateLabel}, ${formatKickoff(game.et, 0)} Eastern, ${game.venue}. National window: ${game.national}.`,
            locationName: game.venue,
            addressLocality: game.locality,
            addressRegion: game.region,
            homeTeam: game.home,
            awayTeam: game.away,
          })),
        )}
      />
      <p className="kicker">How to watch · Week 12 · 2026</p>
      <h1>{THANKSGIVING_WATCH_H1}</h1>
      <PhotoFigure photo="hero" />
      <p>{THANKSGIVING_ANSWER}</p>
      <p>
        Matchups, Eastern kickoffs, and the national channel or stream are from the May 14, 2026
        NFL schedule release and NFL.com. Where Netflix has not published a kickoff, the page says
        so. This is a viewing list. It is not the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> and not the sample desk.
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Kickoff times</h2>
      <p>{THANKSGIVING_ZONE_NOTE}</p>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            Thanksgiving week 2026 kickoffs in ET, CT, MT, PT, AKT, and HT
          </caption>
          <thead>
            <tr>
              <th scope="col">Game</th>
              <th scope="col">Date</th>
              {US_KICKOFF_ZONES.map((zone) => (
                <th key={zone.id} scope="col">
                  {zone.label}
                </th>
              ))}
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            {THANKSGIVING_GAMES.map((game) => (
              <tr key={game.id}>
                <th scope="row">
                  {game.away} at {game.home}
                </th>
                <td>{game.dateLabel}</td>
                {US_KICKOFF_ZONES.map((zone) => (
                  <td key={zone.id}>{formatKickoff(game.et, zone.offsetHours)}</td>
                ))}
                <td>{game.watchCell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to watch each game</h2>
      {THANKSGIVING_GAMES.map((game) => (
        <article key={game.id}>
          <h3>
            {game.holiday}: {game.away} at {game.home}
          </h3>
          {game.notes.map((note) => (
            <p key={note}>
              <Cited source={note} />
            </p>
          ))}
        </article>
      ))}

      <h2>Radio and mobile</h2>
      <p>
        <Cited source={THANKSGIVING_RADIO} />
      </p>
      <p>
        <Cited source={THANKSGIVING_NFL_PLUS} />
      </p>

      <h2>FAQ</h2>
      {THANKSGIVING_FAQS.map((faq) => (
        <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}

      <h2>Sources</h2>
      <ul>
        {THANKSGIVING_SOURCES.map((source) => (
          <li key={source.id}>
            <a href={source.href}>{source.label}</a>. {source.usedFor}
          </li>
        ))}
      </ul>

      <h2>What this page leaves out</h2>
      <ul>
        {THANKSGIVING_OMISSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        <Cited source={THANKSGIVING_OPERATIONS_GAP} />
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs.{" "}
          {SITE_NAME} uses club names to identify the announced games.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>Not a lineup note, and not live licensed NFL statistics.</li>
        <li>Not a ticket or subscription offer. No price is listed.</li>
      </ul>
      <p>
        More reading notes live on the <Link href="/guide/">guides hub</Link>. Christmas Day is a
        different page:{" "}
        <Link href="/guide/christmas-nfl-how-to-watch/">
          NFL Christmas Day 2026: how to watch every game
        </Link>
        . The postseason schedule is also separate:{" "}
        <Link href="/guide/college-football-playoff-2026-schedule-how-to-watch/">
          2026-27 College Football Playoff schedule and how to watch
        </Link>
        .
      </p>
    </div>
  );
}
