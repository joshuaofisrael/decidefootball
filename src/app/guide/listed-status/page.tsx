import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  LISTED_STATUS_CRUMB,
  LISTED_STATUS_DESCRIPTION,
  LISTED_STATUS_FAQS,
  LISTED_STATUS_H1,
  LISTED_STATUS_PATH,
  LISTED_STATUS_SOURCES,
  LISTED_STATUS_TABLE,
  LISTED_STATUS_TITLE,
  NFL_COM_IMPORTANT_DATES_URL,
  NFL_INJURY_REVISION_URL,
  NFL_OPS_IMPORTANT_DATES_URL,
  NFL_OPS_KICKOFF_URL,
} from "@/lib/listed-status-guide";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = LISTED_STATUS_TITLE;
const description = LISTED_STATUS_DESCRIPTION;

export const metadata = {
  ...pageMetadata({
    path: LISTED_STATUS_PATH,
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

export default function ListedStatusGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: LISTED_STATUS_CRUMB, path: LISTED_STATUS_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: LISTED_STATUS_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({ path: LISTED_STATUS_PATH, headline: title, description })}
      />
      <JsonLd data={faqPageJsonLd([...LISTED_STATUS_FAQS])} />
      <p className="kicker">NFL injury report</p>
      <h1>{LISTED_STATUS_H1}</h1>
      <p>
        On the NFL game status report, <strong>Questionable</strong> means it is uncertain
        whether the player will play, <strong>Doubtful</strong> means it is unlikely the player
        will participate, and <strong>Out</strong> means the player will not play. Those
        definitions are from the{" "}
        <a href={NFL_INJURY_REVISION_URL}>
          Competition Committee&apos;s 2016 injury-report revision
        </a>. Injured reserve and the game-day inactive list are separate reports. A player who is
        not listed is one the club has filed as certain to play.
      </p>

      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            NFL injury designations and what each one means for a fantasy lineup
          </caption>
          <thead>
            <tr>
              <th scope="col">Designation</th>
              <th scope="col">League meaning</th>
              <th scope="col">Fantasy lineup</th>
            </tr>
          </thead>
          <tbody>
            {LISTED_STATUS_TABLE.map((row) => (
              <tr key={row.designation}>
                <th scope="row">{row.designation}</th>
                <td>{row.league}</td>
                <td>{row.lineup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The weekly clock</h2>
      <p>
        Fantasy lineups move on three different filings. Practice participation is not the game
        status, and the game status is not the inactive list.
      </p>
      <p>
        <strong>Practice report.</strong> For a Sunday game, clubs file a practice report
        Wednesday, Thursday, and Friday by 4:00 p.m. New York time, or as soon as possible after
        practice if practice ends later. On a day the club practices, an estimated report is not
        acceptable. The{" "}
        <a href={NFL_OPS_IMPORTANT_DATES_URL}>2026 Football Operations calendar</a> sets that
        schedule, and{" "}
        <a href={NFL_COM_IMPORTANT_DATES_URL}>NFL.com&apos;s 2026–27 important dates</a> publish
        the same clock. The 2016 revision lists an injured player as Did Not Participate, Limited
        Participation (less than 100 percent of that player&apos;s normal repetitions), or Full
        Participation (100 percent of those repetitions). That revision removed Out from the
        practice report so it would not be confused with the game status report.
      </p>
      <p>
        <strong>Game status report.</strong> For a Sunday game, the weekly game status report is
        due Friday by 4:00 p.m. New York time, or as soon as possible after practice. Both of
        those 2026 calendars say Friday for a Sunday game. If the player&apos;s condition changes
        after the report is filed, the club has to report an update. Other kickoff days have
        their own deadline on the same calendar. A Monday game is due Saturday.
      </p>
      <p>
        <strong>Inactive list.</strong> One hour and 30 minutes before kickoff, club staff
        deliver the Game Day Administration Report to the referee. That report includes the
        club&apos;s inactive list.{" "}
        <a href={NFL_OPS_KICKOFF_URL}>NFL Football Operations&apos; countdown to kickoff</a>{" "}
        describes the meeting. That filing is the inactive list for the game.
      </p>
      <p>A practical checklist for the week:</p>
      <ul>
        <li>
          A Questionable player in a later window: keep a replacement who fills the same lineup
          spot and whose game has not started.
        </li>
        <li>
          The inactive list is the final word for that kickoff. Check it again after the Friday
          game status report.
        </li>
        <li>
          Out and inactive are different objects. Out is the game-status label that the player
          will not play. Inactive is the game-day list. A player can be Questionable on Friday
          and inactive 90 minutes before kickoff.
        </li>
        <li>Do not start a player who is Out, on injured reserve, or inactive.</li>
      </ul>
      <p>
        The same 2016 revision removed <strong>Probable</strong>. The league&apos;s stated reason
        was that approximately 95 percent of players listed Probable in prior years did play.
        Questionable was defined as uncertain whether the player will play, not as a fixed
        percentage. If there is any question about availability, the club should list the player
        as Questionable. Reading Questionable as a fixed 50/50 is not that definition.
      </p>

      <h2>How {SITE_NAME} cards use the label</h2>
      <p>
        {SITE_NAME} reads the label before any projection. The mean is a separate estimate. A
        number does not create a new label, and the label does not become the points. How the
        estimates are built is the <Link href="/methodology/">methodology</Link>. How to read the
        mean, the floor and ceiling, and the certainty grade is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>.
      </p>
      <p>
        When the card says <strong>Healthy</strong>, no injury designation was listed. The
        estimate is not discounted and not zeroed for status. That is not an official clearance,
        and it is not a promise of snaps. It matches a player the club left off the game status
        report as certain to play. It is still not the inactive list.
      </p>
      <p>
        <strong>Questionable</strong> and <strong>Doubtful</strong> leave a number, with a soft
        discount. Doubtful is discounted more than Questionable, because the card treats Doubtful
        as unlikely and Questionable as uncertain. The size of the discount is part of methodology
        v0 and can change. It is not a league rate. How the gate is applied is the{" "}
        <Link href="/methodology/">methodology</Link>.
      </p>
      <p>
        <strong>OUT</strong>, <strong>IR</strong>, and <strong>INACTIVE</strong> are a hard zero.
        Mean, floor, and ceiling are 0. Those rows are not starts this week. The model does not
        invent a return date or a practice window. If a projection still looks usable next to one
        of those labels, believe the label.
      </p>
      <p>
        The same label is the status column on the weekly rankings board. A rank does not replace
        it. How to read that ordered list is the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>. Waiver urgency reads the same gate. A
        hot tag is not printed over OUT, IR, or INACTIVE.{" "}
        <Link href="/guide/waiver-radar/">How fantasy football waivers work</Link> covers that
        gate, including the tag.
      </p>

      <h2>Last verified is not the render time</h2>
      <p>
        Availability pages print two clocks. <strong>Last verified</strong> is when the listed
        designation was last checked as an input. <strong>Page rendered</strong> is when this
        HTML was baked. A new render does not mean the designation was re-checked. Neither clock
        is a return date, and neither one means the label is the league&apos;s own report.
      </p>

      <h2>Not an official report</h2>
      <p>
        {SITE_NAME} is not affiliated with, endorsed by, or sponsored by the NFL or its member
        clubs. A listed status on this site is an input for a fantasy roster call. It is not an
        official injury wire, not a club report, and not the league inactive list. Names are
        identification for fantasy analysis only.
      </p>
      <p>
        Nothing here is gambling advice, a spread, or a sportsbook. The method is methodology v0,
        subject to change. No accuracy rate is published here, and none should be inferred.
      </p>
      <p>
        The <Link href="/is-playing/">is-playing board</Link>, the playing-today pages, and the
        injury timelines use sample data. They stay out of search until licensed sports data is
        in place. This page does not set a date for that. The public description of the label is
        this guide, the <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>,{" "}
        <Link href="/guide/waiver-radar/">how fantasy football waivers work</Link>, the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>, and the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official injury wire, club report, or league inactive list.</li>
        <li>Not a return date, a practice window, or a promise someone plays.</li>
        <li>Not a fixed 50/50, and not the old Probable tag.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Questions</h2>
      {LISTED_STATUS_FAQS.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        {LISTED_STATUS_SOURCES.map((source) => (
          <li key={source.url}>
            <a href={source.url}>{source.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
