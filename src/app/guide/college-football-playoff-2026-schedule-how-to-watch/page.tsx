import Link from "next/link";
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
  CFP_ANSWER,
  CFP_FAQS,
  CFP_FORMAT_NOTE,
  CFP_GAMES,
  CFP_KEY_DATE_NOTE,
  CFP_KEY_DATES,
  CFP_MEGACAST,
  CFP_NOON_DISAGREEMENT,
  CFP_OMISSIONS,
  CFP_SOURCES,
  CFP_TICKET_NOTE,
  CFP_WATCH_DESCRIPTION,
  CFP_WATCH_H1,
  CFP_WATCH_PATH,
  CFP_WATCH_TITLE,
  CFP_WBD_GAP,
  citationParts,
} from "@/lib/cfp-watch-2026-27";

const title = CFP_WATCH_TITLE;
const description = CFP_WATCH_DESCRIPTION;

/** Sitemap lastmod reads this literal. Keep it equal to CFP_WATCH_UPDATED. */
const NOTE_DATE = { lastModified: "2026-10-17" } as const;

export const metadata = {
  ...pageMetadata({
    path: CFP_WATCH_PATH,
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

export default function CfpWatchPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "2026-27 playoff schedule", path: CFP_WATCH_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: CFP_WATCH_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({
          path: CFP_WATCH_PATH,
          headline: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...CFP_FAQS])} />
      <JsonLd
        data={confirmedSportsEventItemListJsonLd(
          CFP_GAMES.map((game) => ({
            name: game.eventName,
            startDate: game.startDate,
            description: game.eventDescription,
            locationName: game.locationName,
            addressLocality: game.addressLocality,
            addressRegion: game.addressRegion,
          })),
        )}
      />
      <p className="kicker">How to watch · 2026-27</p>
      <h1>{CFP_WATCH_H1}</h1>
      <p>{CFP_ANSWER}</p>
      <p>
        Dates, bowls, and networks below are copied from the College Football Playoff, the ESPN
        Press Room, and the bowl pages linked in the notes. Where those sources do not announce a
        fact, the cell says to be announced. This is a viewing list. It is not the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> and not the sample desk. NFL holiday
        windows are on the{" "}
        <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link>.
        The rest of the announced 2026-27 bowls are on the{" "}
        <Link href="/guide/bowl-schedule-2026-how-to-watch/">2026-27 bowl schedule</Link>.
      </p>
      <p>{`Last checked: ${NOTE_DATE.lastModified}.`}</p>

      <h2>Dates before the games</h2>
      <p>
        <Cited source={CFP_KEY_DATE_NOTE} />
      </p>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            Ranking releases, selection weekend, and selection day for 2026
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">When</th>
              <th scope="col">What</th>
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            {CFP_KEY_DATES.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.label}</th>
                <td>{row.when}</td>
                <td>{row.detail}</td>
                <td>{row.watch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Schedule</h2>
      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            2026-27 playoff games by round, with date, site, and where to watch
          </caption>
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Date</th>
              <th scope="col">Kickoff</th>
              <th scope="col">Bowl and site</th>
              <th scope="col">Where to watch</th>
            </tr>
          </thead>
          <tbody>
            {CFP_GAMES.map((game) => (
              <tr key={game.id}>
                <th scope="row">{game.round}</th>
                <td>{game.dateLabel}</td>
                <td>{game.kickoff}</td>
                <td>{game.site}</td>
                <td>{game.watch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Round by round</h2>
      {CFP_GAMES.map((game) => (
        <article key={game.id}>
          <h3>
            {game.round}: {game.dateLabel}
          </h3>
          {game.notes.map((note) => (
            <p key={note}>
              <Cited source={note} />
            </p>
          ))}
        </article>
      ))}
      <p>
        <Cited source={CFP_NOON_DISAGREEMENT} />
      </p>
      <p>
        <Cited source={CFP_MEGACAST} />
      </p>
      <p>
        <Cited source={CFP_WBD_GAP} />
      </p>

      <h2>How the 12-team bracket works</h2>
      <p>
        <Cited source={CFP_FORMAT_NOTE} />
      </p>

      <h2>Tickets</h2>
      <p>
        <Cited source={CFP_TICKET_NOTE} />
      </p>

      <h2>FAQ</h2>
      {CFP_FAQS.map((faq) => (
        <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}

      <h2>Sources</h2>
      <ul>
        {CFP_SOURCES.map((source) => (
          <li key={source.id}>
            <a href={source.href}>{source.label}</a>. {source.usedFor}
          </li>
        ))}
      </ul>

      <h2>Still to be announced</h2>
      <ul>
        {CFP_OMISSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the College Football Playoff, a
          conference, a bowl, or a network. {SITE_NAME} uses those names to identify the announced
          games.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>Not a lineup note, and not live licensed statistics.</li>
        <li>Not a ticket offer. No price is listed. No resale link is listed.</li>
      </ul>
      <p>
        More reading notes live on the <Link href="/guide/">guides hub</Link>. The other viewing
        lists are the{" "}
        <Link href="/guide/thanksgiving-nfl-how-to-watch/">Thanksgiving how-to-watch guide</Link> and
        the <Link href="/guide/bowl-schedule-2026-how-to-watch/">2026-27 bowl schedule</Link>.
      </p>
    </div>
  );
}
