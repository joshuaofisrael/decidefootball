import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  ESPN_WAIVERS_OVERVIEW_URL,
  ESPN_WAIVER_ORDER_URL,
  SLEEPER_FAAB_URL,
  SLEEPER_SEASON_WAIVERS_URL,
  SLEEPER_WAIVER_TYPES_URL,
  WAIVER_RADAR_ARITHMETIC,
  WAIVER_RADAR_CRUMB,
  WAIVER_RADAR_DESCRIPTION,
  WAIVER_RADAR_DIRECT_ANSWER,
  WAIVER_RADAR_FAQS,
  WAIVER_RADAR_H1,
  WAIVER_RADAR_PATH,
  WAIVER_RADAR_SOURCES,
  WAIVER_RADAR_TITLE,
  WAIVER_TYPE_TABLE,
  YAHOO_WAIVERS_URL,
} from "@/lib/waiver-radar-guide";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = WAIVER_RADAR_TITLE;
const description = WAIVER_RADAR_DESCRIPTION;

export const metadata = {
  ...pageMetadata({
    path: WAIVER_RADAR_PATH,
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

export default function WaiverRadarGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: WAIVER_RADAR_CRUMB, path: WAIVER_RADAR_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: WAIVER_RADAR_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd
        data={articleJsonLd({ path: WAIVER_RADAR_PATH, headline: title, description })}
      />
      <JsonLd data={faqPageJsonLd([...WAIVER_RADAR_FAQS])} />
      <p className="kicker">Fantasy waivers</p>
      <h1>{WAIVER_RADAR_H1}</h1>
      <p>{WAIVER_RADAR_DIRECT_ANSWER}</p>

      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            Rolling waiver priority, reverse standings, and FAAB: how the order is set, what a
            claim costs, and who it favors
          </caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">How the order is set</th>
              <th scope="col">What a claim costs</th>
              <th scope="col">Who it favors</th>
            </tr>
          </thead>
          <tbody>
            {WAIVER_TYPE_TABLE.map((row) => (
              <tr key={row.type}>
                <th scope="row">{row.type}</th>
                <td>{row.order}</td>
                <td>{row.cost}</td>
                <td>{row.favors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Waiver priority is the ranked list. Rolling waivers are that list when a claim spends
        the spot. Reverse standings replaces the list with one built from the record. FAAB
        awards the player by the bid, and uses the list when two bids match. The starting spot,
        and which of these three a league uses, depends on your league settings.
      </p>

      <h2>Rolling priority and reverse standings</h2>
      <p>
        <a href={SLEEPER_WAIVER_TYPES_URL}>Sleeper&apos;s waiver-types article</a> says rolling
        waivers are the default. A successful claim moves that team to the bottom, and everyone
        else moves up one.{" "}
        <a href={YAHOO_WAIVERS_URL}>Yahoo&apos;s fantasy football help</a> calls the same rule a
        continual rolling list. The last draft slot starts first in a live or autopick draft.
        In an offline draft, the last manager to register starts first. A successful claim
        drops that manager to the bottom, and the list is never reset.
      </p>
      <p>
        Reverse standings gives the claim to the teams at the bottom of the record. Sleeper
        resets that priority every week, at the beginning of each game week, with lower-placed
        teams first. Yahoo resets after each regular-season game week. The lowest standing gets
        first rank, a successful claim does not change that rank, and the list stops resetting
        when the playoffs begin. A stat correction that lands after the week&apos;s rank is set
        does not move it.
      </p>
      <p>
        Yahoo also offers a weekly rolling list based on standings. It resets like reverse
        standings, then drops a successful claimant to the bottom until the next reset.
      </p>
      <p>
        <a href={ESPN_WAIVERS_OVERVIEW_URL}>ESPN&apos;s football waiver overview</a> gives a
        standard-waiver player to the team with the highest priority and moves that team to the
        end of the order.{" "}
        <a href={ESPN_WAIVER_ORDER_URL}>ESPN&apos;s waiver-order article</a> describes two ways
        that list can refresh. One resets each Monday at 12:00 a.m. PT (3:00 a.m. ET) to inverse
        standings. The other moves a successful claimant to the bottom and does not reset on its
        own. The same article says that under either option a successful claim moves the team to
        the bottom. Whether an ESPN league resets weekly depends on your league settings. On a
        snake draft, that article starts the list as the inverse of the draft order. On a
        salary-cap draft, the team with the most money left after the draft starts first.
      </p>

      <h2>When waivers clear</h2>
      <p>
        A waiver claim waits. A free-agent add does not. On ESPN and on Sleeper, adding a player
        who is already a free agent does not change waiver priority. After Yahoo&apos;s waiver
        period ends, a player still unclaimed can be added by the first manager to claim them.
      </p>
      <p>
        On Yahoo&apos;s default, and in the setup Sleeper calls common, a player locks onto
        waivers when that player&apos;s game begins and clears midweek. The hour depends on your
        league settings.
      </p>
      <p>
        Yahoo&apos;s default weekly rule is Game Time – Tuesday. An unclaimed player goes on
        waivers as soon as that player&apos;s first game of the week begins. A player with no
        game that week goes on waivers at 5:30 p.m. PT Monday. Waivers end after 11:59 p.m. PT
        Tuesday, and a player still unclaimed can then be added by the first manager to claim
        them. Yahoo also offers a window that starts at the first game of the week, a window
        that starts at 10:00 a.m. PT Sunday, continuous waivers, and no waivers. Continuous
        waivers keep every unclaimed player on waivers. The default timer is 2 days, and a
        private-league commissioner can set it from no waivers to 7 days. Only the Game Time –
        Tuesday setting lets a Monday drop register for the current game week. The other weekly
        settings need the drop by 11:59 p.m. PT Sunday.
      </p>
      <p>
        <a href={SLEEPER_SEASON_WAIVERS_URL}>Sleeper&apos;s regular-season waiver article</a>{" "}
        describes the common setup as free agents until a player&apos;s own game begins, then a
        lock onto waivers, then processing on the league&apos;s selected clear day. Its example
        of a Tuesday clear holds a Thursday player until 12:05 a.m. PST on Wednesday. A dropped
        player stays on waivers for the number of days the league chose. Sleeper&apos;s 2-day
        example is 47 hours on waivers, with claims processed in the 48th hour. A player added
        as a free agent has to be rostered at least 24 hours before a drop. Dropped sooner, that
        player goes back to free agency instead of onto waivers.
      </p>
      <p>
        ESPN&apos;s football overview puts unsigned players on waivers from the start of the
        first game until a few hours past the end of the last, and when a player is dropped. The
        waiver period usually expires between 3 a.m. and 5 a.m. ET. The overview does not name
        one weekday for every league. Players nobody claimed become free agents, except under
        continuous free-agent budget, where every unrostered player stays on waivers and there
        is no first-come add. ESPN also offers no waivers, which makes a player a free agent as
        soon as that player is dropped or left undrafted. Those four acquisition systems are
        locked at the start of the draft.
      </p>

      <h2>FAAB bids</h2>
      <p>
        FAAB means free agent acquisition budget. Yahoo and ESPN call their version a free agent
        budget (FAB). Each team has a budget. The highest offer wins when waivers process, and
        that amount comes off the winner&apos;s remaining budget.
      </p>
      <p>
        Yahoo and Sleeper state that the bids are blind. Other managers cannot see the amount.
        Yahoo&apos;s default football budget is $100. A private-league commissioner can change
        it. The budget setting ranges from $1 to $999. An offer can be $0, up to whatever budget
        remains. A tie uses one of the other three priorities, and the commissioner picks which:
        continual rolling list, reverse order of standings, or the weekly rolling list based on
        standings. The waiver order does not change except on that tie.
      </p>
      <p>
        <a href={SLEEPER_FAAB_URL}>Sleeper&apos;s FAAB article</a> also defaults the budget to
        $100, and the commissioner can change it. The minimum bid is $0 unless the commissioner
        changes that, so a team that has spent the budget can still submit a $0 claim. An equal
        bid uses waiver priority that works like rolling waivers. Teams that drafted later start
        with better priority. The team with the first overall pick starts with the worst
        priority, and the last pick starts with the best. A successful claim moves that team to
        the end. Claim order follows the bid amount first. Claims can be reordered only when
        the bids are the same amount.
      </p>
      <p>
        ESPN&apos;s football overview awards the player to the highest offer and subtracts that
        amount from the budget. A win, whether by a higher bid or by the tie-break, moves that
        team to the bottom of the tie-break list. The overview does not publish a default dollar
        amount, and it does not state a minimum bid. Both depend on your league settings.
        Continuous FAB never turns an unclaimed player into a free agent. Standard FAB does,
        after processing.
      </p>
      <p>
        Yahoo lets a manager file more than one conditional claim. If the first claim is voided,
        because the player to drop is already gone or the add was lost, the next claim can still
        process.
      </p>
      <p>{WAIVER_RADAR_ARITHMETIC}</p>

      <h2>A weekly checklist</h2>
      <ul>
        <li>
          Check the injury designation first.{" "}
          <Link href="/guide/listed-status/">
            What Questionable, Doubtful, Out, injured reserve, and inactive mean
          </Link>{" "}
          comes before a bid. A player who will not play is a different add from a healthy
          player whose job grew.
        </li>
        <li>
          Then the role. Look at snap share and whether the job changed. Once the name is a
          lineup question,{" "}
          <Link href="/guide/start-sit/">who to start using floor, mean, and ceiling</Link>{" "}
          is the start/sit guide.
        </li>
        <li>
          Then the transaction. If the player is still on waivers, file a claim under the
          league&apos;s rule. If the player has cleared and is a free agent, it is a first-come
          pickup. On ESPN and on Sleeper, that pickup does not move waiver priority.{" "}
          <Link href="/guide/add-drop/">Which rostered name to drop</Link> is a separate
          comparison.
        </li>
      </ul>

      <h2>How {SITE_NAME} tags a waiver row</h2>
      <p>
        A {SITE_NAME} waiver row prints one urgency tag: hot, rising, stash, or fade. The tag
        uses the same weekly estimates as the rest of the site, plus the change in snap share
        and the listed status. It ranks how hard the row would be chased. It does not say the
        player is available on Yahoo, ESPN, Sleeper, or any other host.
      </p>
      <p>
        How the estimates are built is the <Link href="/methodology/">methodology</Link>. What
        the product is, and is not, is the <Link href="/about/">about page</Link>.
      </p>

      <h3>The four tags</h3>
      <ul>
        <li>
          <strong>Hot.</strong> The claim tag. Listed status is healthy, and the estimate
          supports spending a waiver claim if the bench is dead weight. This is the strongest
          urgency the board prints. It is still not a start order.
        </li>
        <li>
          <strong>Rising.</strong> Snap share is up versus the prior week, and the role is
          moving the right way. The row has not cleared hot. Rising is a direction, not a
          finished add.
        </li>
        <li>
          <strong>Stash.</strong> Hold if there is a bench spot. The row is not urgent enough to
          chase and not weak enough to fade. A bench decision. Not a start for this week.
        </li>
        <li>
          <strong>Fade.</strong> Do not spend waiver budget chasing this. Snap share is down,
          the estimate is soft, or listed status has taken the name off the week. A pass on the
          claim.
        </li>
      </ul>

      <h3>Same estimates, two extra inputs</h3>
      <p>
        Start/sit, the weekly rankings, and this board share one mean. That mean is the ranking
        number. Floor and ceiling are a range around that mean, not a promise of points. The
        ordered positional list is the <Link href="/guide/rankings/">rankings guide</Link>.
        Certainty, on a start/sit card, is a grade of how hard the math can lean. It is not the
        probability of winning the fantasy week.{" "}
        <Link href="/guide/start-sit/">Who to start using floor, mean, and ceiling</Link>{" "}
        is the start/sit guide.
      </p>
      <p>
        Waiver urgency adds the two inputs the tag is for. Snap share versus the prior week can
        lift a row into rising, or into hot when the listing is healthy and the mean already
        supports a claim. A sharp drop in snap share can put the row on fade even when the mean
        has not collapsed. Listed status sits on top of both.
      </p>

      <h3>Status before the tag</h3>
      <p>
        OUT, IR, and INACTIVE are not adds to start this week. The model sets that estimate to
        zero. It does not invent a return date or a practice window. Hot requires a healthy
        listing, so those rows do not print hot. If the status and the tag disagree, believe
        the status.
      </p>
      <p>
        Questionable and doubtful are a discount. They are not the healthy listing hot uses. A
        designation other than healthy does not print hot. If snap share is up, the row can
        still read rising. That is a direction under a dirty status, not a cleared start.{" "}
        <Link href="/guide/listed-status/">
          What Questionable, Doubtful, Out, injured reserve, and inactive mean
        </Link>{" "}
        is the page to read before a tag.
      </p>

      <h3>Not a free-agent list</h3>
      <p>
        The tag does not know the league&apos;s waiver order, the FAAB balance, or who is
        already rostered. A hot row can already be owned. A fade row can be the best name still
        free in a thin league. Check the host. Then use the tag to judge whether the row is
        worth a claim.
      </p>
      <p>
        FAAB on a fade line means waiver budget: do not chase the name with it. That is a roster
        call. It is not a spread, a moneyline, or advice on a wager.
      </p>
      <p>
        <Link href="/guide/add-drop/">Which rostered name to drop</Link>, by adding one name over
        the other, is the add/drop guide. That comparison is not this tag.
      </p>

      <h3>Where the board is</h3>
      <p>
        The <Link href="/waiver-wire/week-3/">waiver board</Link> is on the site so the product
        can be used and reviewed. Those URLs use sample data. They stay out of search until
        licensed sports data is in place. This page does not set a date for that, and it does
        not promise those URLs will enter a search index.
      </p>
      <p>
        The public description of the tag is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>, and the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL, its member clubs, ESPN, Yahoo, or Sleeper. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official waiver list, club report, or injury wire.</li>
        <li>Not a claim that any name is available on a host platform.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Questions</h2>
      {WAIVER_RADAR_FAQS.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        {WAIVER_RADAR_SOURCES.map((source) => (
          <li key={source.url}>
            <a href={source.url}>{source.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
