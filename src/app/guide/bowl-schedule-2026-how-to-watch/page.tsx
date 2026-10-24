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
  BOWL_ANSWER,
  BOWL_ARIZONA_NOTE,
  BOWL_BOWL_SITES_NOTE,
  BOWL_CFP_NOTE,
  BOWL_ESPN_NOTE,
  BOWL_FAQS,
  BOWL_GAMES,
  BOWL_NCAA_GAP,
  BOWL_OMISSIONS,
  BOWL_REFRESH_NOTE,
  BOWL_SAN_DIEGO_NOTE,
  BOWL_SOURCES,
  BOWL_SUN_NOTE,
  BOWL_TEXAS_NOTE,
  BOWL_TICKET_NOTE,
  BOWL_WATCH_DESCRIPTION,
  BOWL_WATCH_H1,
  BOWL_WATCH_NOTE,
  BOWL_WATCH_PATH,
  BOWL_WATCH_TITLE,
  citationParts,
} from "@/lib/bowl-watch-2026-27";

const title = BOWL_WATCH_TITLE;
const description = BOWL_WATCH_DESCRIPTION;

/** Sitemap lastmod reads this literal. Keep it equal to BOWL_WATCH_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-21" } as const;

export const metadata = {
  ...pageMetadata({
    path: BOWL_WATCH_PATH,
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

export default function BowlWatchPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "2026-27 bowl schedule", path: BOWL_WATCH_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: BOWL_WATCH_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          path: BOWL_WATCH_PATH,
          headline: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...BOWL_FAQS])} />
      <JsonLd
        data={confirmedSportsEventItemListJsonLd(
          BOWL_GAMES.map((row) => ({
            name: row.eventName,
            startDate: row.startDate,
            description: row.eventDescription,
            locationName: row.locationName,
            addressLocality: row.addressLocality,
            addressRegion: row.addressRegion,
          })),
        )}
      />
      <p className="kicker">How to watch · 2026-27</p>
      <h1>{BOWL_WATCH_H1}</h1>
      <PhotoFigure photo="bowl" />
      <p>{BOWL_ANSWER}</p>
      <p>
        Dates, cities, and networks below are copied from the releases linked in the notes. Where a
        source does not announce a fact, the cell says to be announced. This is a viewing list. It
        is not the <Link href="/guide/start-sit/">start/sit guide</Link> and not the sample desk.
        The playoff windows, ranking days, and selection day are on the{" "}
        <Link href="/guide/college-football-playoff-2026-schedule-how-to-watch/">
          2026-27 College Football Playoff schedule
        </Link>
        .
      </p>
      <p>{`Last updated: ${NOTE_DATE.lastModified}.`}</p>
      <p>{BOWL_REFRESH_NOTE}</p>

      <h2>Bowl schedule</h2>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            2026-27 bowl games with a verified date, city or venue, network, and source
          </caption>
          <thead>
            <tr>
              <th scope="col">Bowl</th>
              <th scope="col">Date</th>
              <th scope="col">Kickoff</th>
              <th scope="col">City and venue</th>
              <th scope="col">Network</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {BOWL_GAMES.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.name}</th>
                <td>{row.dateLabel}</td>
                <td>{row.kickoff}</td>
                <td>{row.cityVenue}</td>
                <td>{row.network}</td>
                <td>
                  <a href={row.sourceHref}>{row.sourceLabel}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Where the dates come from</h2>
      <p>
        <Cited source={BOWL_ESPN_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_SAN_DIEGO_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_SUN_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_BOWL_SITES_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_TEXAS_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_CFP_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_ARIZONA_NOTE} />
      </p>
      <p>
        <Cited source={BOWL_NCAA_GAP} />
      </p>

      <h2>How to watch</h2>
      <p>
        <Cited source={BOWL_WATCH_NOTE} />
      </p>
      <p>
        The networks named above are ESPN, ABC, The CW, CBS, TNT, truTV, and HBO Max. Use the
        network the cited release names for that game. This page does not add a streaming bundle, a
        local channel number, or a signup link.
      </p>

      <h2>Tickets</h2>
      <p>
        <Cited source={BOWL_TICKET_NOTE} />
      </p>

      <h2>FAQ</h2>
      {BOWL_FAQS.map((faq) => (
        <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}

      <h2>Sources</h2>
      <ul>
        {BOWL_SOURCES.map((source) => (
          <li key={source.id}>
            <a href={source.href}>{source.label}</a>. {source.usedFor}
          </li>
        ))}
      </ul>

      <h2>Still to be announced</h2>
      <ul>
        {BOWL_OMISSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the College Football Playoff, the NCAA,
          a conference, a bowl, or a network. {SITE_NAME} uses those names to identify the announced
          games.
        </li>
        <li>Not a lineup note, and not live licensed statistics.</li>
        <li>Not a ticket offer. No price is listed. No resale link is listed.</li>
      </ul>
      <p>
        More reading notes live on the <Link href="/guide/">guides hub</Link>. The other viewing
        lists are the{" "}
        <Link href="/guide/college-football-playoff-2026-schedule-how-to-watch/">
          College Football Playoff schedule
        </Link>
        , the <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>
        , and the <Link href="/guide/christmas-nfl-how-to-watch/">Christmas Day how-to-watch guide</Link>
        . How to read a decision card is the <Link href="/guide/start-sit/">start/sit guide</Link>,
        the <Link href="/guide/waiver-radar/">waivers guide</Link>, the{" "}
        <Link href="/guide/listed-status/">injury designations guide</Link>, and the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>. Dated NFL notes are{" "}
        <Link href="/start-sit/2026-week-7/">Week 7 start/sit</Link> and{" "}
        <Link href="/waiver-radar/2026-week-7/">Week 7 waiver pickups</Link>.
      </p>
    </div>
  );
}
