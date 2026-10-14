/**
 * Dated editorial waiver note. Copy the module for a later week and point a
 * new route under /waiver-radar/ at it. Facts stay in this file; the page
 * renders them. Citations use [label](https://...) inside body strings.
 */

export const WEEKLY_WAIVER_PATH = "/waiver-radar/2026-week-6/";
export const WEEKLY_WAIVER_UPDATED = "2026-10-14";
export const WEEKLY_WAIVER_TITLE = "Week 6 waiver wire pickups 2026";
export const WEEKLY_WAIVER_H1 = "Week 6 fantasy waiver pickups";
export const WEEKLY_WAIVER_DESCRIPTION =
  "Week 6 fantasy waiver pickups for 15-19 October 2026, with adds cited from Week 5 injury reports and NFL.com game logs. Editorial notes, not the sample waiver radar and not live licensed stats.";

const WEEK_6_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-6";
const ESPN_WEEK_6 = "https://www.espn.com/nfl/schedule/_/week/6/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const LIONS_SCHEDULE = "https://www.detroitlions.com/news/lions-announce-2026-schedule";
const WEEK_5_INJURY_ROUNDUP =
  "https://www.nfl.com/news/nfl-week-5-injury-report-player-statuses-for-all-15-games";
const WEEK_5_SUNDAY_INJURIES =
  "https://www.nfl.com/news/notable-injuries-news-sunday-week-5-games-2026";
const WEEK_5_LEARNED =
  "https://www.nfl.com/news/2026-nfl-season-week-5-what-we-learned-from-sunday-s-games";
const HUNTLEY_START =
  "https://www.nfl.com/news/ravens-qb-lamar-jackson-ankle-out-falcons-tyler-huntley-start";
const WEEK_6_INJURY_URL = "https://www.nfl.com/injuries/league/2026/reg6";
const EAGLES_SIGNING =
  "https://www.philadelphiaeagles.com/news/eagles-sign-jake-majors-and-carson-steele";
const ESPN_EAGLES_RECAP = "https://www.espn.com/nfl/recap/_/gameId/401872981";

export const CITATION_HOSTS = [
  "www.nfl.com",
  "www.espn.com",
  "www.philadelphiaeagles.com",
  "www.detroitlions.com",
] as const;

export type WaiverPosition = "QB" | "RB" | "WR" | "TE";

export interface WaiverPick {
  position: WaiverPosition;
  name: string;
  club: string;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  /** Club is on bye, so the name is a stash rather than a Week 6 start. */
  byeStash?: boolean;
  /** Verified Week 6 game, when the club is not on bye. */
  nextGame?: string;
}

export interface WeeklyWaiverNote {
  path: string;
  updated: string;
  week: number;
  season: number;
  title: string;
  h1: string;
  description: string;
  answer: string;
  window: string;
  byes: string;
  reportGap: string;
  picks: WaiverPick[];
  tightEnd: string;
  streaming: string;
  opinion: string;
  sources: { label: string; href: string }[];
}

export const WEEK_6_WAIVER: WeeklyWaiverNote = {
  path: WEEKLY_WAIVER_PATH,
  updated: WEEKLY_WAIVER_UPDATED,
  week: 6,
  season: 2026,
  title: WEEKLY_WAIVER_TITLE,
  h1: WEEKLY_WAIVER_H1,
  description: WEEKLY_WAIVER_DESCRIPTION,
  answer:
    "Add candidates for Week 6: quarterback Tyler Huntley (Baltimore Ravens); running backs Braelon Allen (New York Jets), Woody Marks (Houston Texans), and Dameon Pierce (Philadelphia Eagles); wide receiver Darius Cooper (Philadelphia Eagles). Bye-week stashes, not Week 6 starts: Ollie Gordon II (Miami Dolphins) and Samaje Perine (Cincinnati Bengals). No tight end, defense, or kicker is listed.",
  window: `NFL.com's Week 6 schedule runs from Thursday 15 October (Seattle Seahawks at Denver Broncos, 8:15 p.m.) through Monday 19 October (Washington Commanders at San Francisco 49ers, 8:15 p.m.), with the Sunday 18 October slate in between, including Houston vs. Jacksonville in London ([NFL.com Week 6 schedule](${WEEK_6_SCHEDULE})). ESPN's Week 6 schedule lists the same Thursday-to-Monday window and places the London game at Wembley Stadium ([ESPN Week 6 schedule](${ESPN_WEEK_6})).`,
  byes: `Week 6 byes are the Cincinnati Bengals, Detroit Lions, Miami Dolphins, and Minnesota Vikings. NFL.com's bye-week list names those four clubs ([NFL.com bye weeks](${NFL_BYES})). The Lions' own 2026 schedule marks Week 6 as a bye, with the next game on Sunday 25 October against the Green Bay Packers ([Lions schedule release](${LIONS_SCHEDULE})). ESPN's Week 6 page lists the same bye group: Cincinnati, Detroit, Miami, Minnesota ([ESPN Week 6 schedule](${ESPN_WEEK_6})). The NFL.com Week 6 game list has no Bengals, Lions, Dolphins, or Vikings game ([NFL.com Week 6 schedule](${WEEK_6_SCHEDULE})).`,
  reportGap: `Week 6 game designations were not taken from a posted Week 6 injury report. When this note was updated on ${WEEKLY_WAIVER_UPDATED}, the NFL.com league injury-report address for Week 6 still displayed the Week 5 report ([NFL.com injury report](${WEEK_6_INJURY_URL})). Recheck the club report before a claim runs. Nothing below is a Week 6 Out, Doubtful, or Questionable label.`,
  picks: [
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      nextGame: "Ravens at Browns, Sunday 18 October",
      body: `Head coach Jesse Minter ruled Lamar Jackson out for Week 5 with an ankle injury, after Jackson was hurt in the Week 4 win over the Tennessee Titans, and said Tyler Huntley would start against the Atlanta Falcons ([NFL.com](${HUNTLEY_START})). Huntley's game log for the 30-23 overtime win at Atlanta lists 24 completions on 32 attempts for 201 yards, two touchdown passes, no interceptions, and six rushes for 20 yards and a touchdown ([NFL.com game log](https://www.nfl.com/players/tyler-huntley/stats/logs/)). He is a Week 6 add only if Jackson is not the starter at Cleveland.`,
    },
    {
      position: "RB",
      name: "Braelon Allen",
      club: "New York Jets",
      nextGame: "Jets at Patriots, Sunday 18 October",
      body: `Breece Hall was out for Week 5 with a quadriceps injury ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). Braelon Allen's game log for the Jets' 17-12 win over the Cleveland Browns lists 24 carries for 116 yards and a touchdown, long 22, plus one reception for no yards and one fumble that was not lost ([NFL.com game log](https://www.nfl.com/players/braelon-allen/stats/logs/)). NFL.com's Sunday recap also describes that 22-yard score as the play that ended New York's scoring ([What We Learned](${WEEK_5_LEARNED})).`,
    },
    {
      position: "RB",
      name: "Woody Marks",
      club: "Houston Texans",
      nextGame: "Texans vs. Jaguars in London, Sunday 18 October",
      body: `David Montgomery was ruled out of Houston's Week 5 win over the Tennessee Titans with a groin injury ([NFL.com Sunday injury notes](${WEEK_5_SUNDAY_INJURIES})). Woody Marks's game log for that 26-3 win lists 15 carries for 62 yards and four receptions for 23 yards ([NFL.com game log](https://www.nfl.com/players/woody-marks/stats/logs/)).`,
    },
    {
      position: "RB",
      name: "Dameon Pierce",
      club: "Philadelphia Eagles",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `On 9 October the Eagles announced that Dameon Pierce and Carson Steele had been signed to the active roster after injuries to Saquon Barkley and Tank Bigsby, and that Bigsby had been placed on injured reserve ([philadelphiaeagles.com](${EAGLES_SIGNING})). Barkley (hamstring) was out in London, and Pierce's game log shows 11 carries for 14 yards and two receptions for minus 2 yards in the 17-19 loss ([Week 5 injury report](${WEEK_5_INJURY_ROUNDUP}); [NFL.com game log](https://www.nfl.com/players/dameon-pierce/stats/logs/)). NFL.com reported that Will Shipley scored the opening touchdown and then left with a foot injury, and that Philadelphia finished with 22 rushing yards, its fewest since Week 7 of 2015 ([What We Learned](${WEEK_5_LEARNED})).`,
    },
    {
      position: "RB",
      name: "Ollie Gordon II",
      club: "Miami Dolphins",
      byeStash: true,
      body: `NFL.com's Week 5 recap says Ollie Gordon II led Miami with 18 carries for 88 yards and a touchdown in the 31-24 loss to Cincinnati, in a ground game the recap describes as going on despite the loss of De'Von Achane ([What We Learned](${WEEK_5_LEARNED})). The Dolphins are on bye in Week 6, so this is a stash for after the bye, not a Week 6 start.`,
    },
    {
      position: "RB",
      name: "Samaje Perine",
      club: "Cincinnati Bengals",
      byeStash: true,
      body: `NFL.com's Week 5 recap says backup Samaje Perine led Cincinnati in carries for the first time this season, with 14 carries for 68 yards, while Chase Brown still played more snaps, lost a red-zone fumble, and has 22 carries for 49 yards over the last two games ([What We Learned](${WEEK_5_LEARNED})). The Bengals are on bye in Week 6, so Perine cannot be started this week.`,
    },
    {
      position: "WR",
      name: "Darius Cooper",
      club: "Philadelphia Eagles",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `DeVonta Smith (hamstring) and Marquise Brown (ankle) were both out for Philadelphia in London ([Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). Darius Cooper's game log for the 17-19 loss lists two receptions for 71 yards and a touchdown, long 62 ([NFL.com game log](https://www.nfl.com/players/darius-cooper/stats/logs/)). ESPN's recap describes the score as a 62-yard touchdown pass from Jalen Hurts ([ESPN recap](${ESPN_EAGLES_RECAP})).`,
    },
  ],
  tightEnd: `No tight end is listed. Minnesota's T.J. Hockenson was ruled out of the Vikings' Week 5 win with a concussion ([NFL.com Sunday injury notes](${WEEK_5_SUNDAY_INJURIES})), and the Vikings are on bye in Week 6. Reports checked for this note were NFL.com, ESPN, and club sites. Those reports did not verify another tight-end role change for a club that plays in Week 6.`,
  streaming: `No streaming defense or kicker is listed. NFL.com's Vikings recap says Will Reichard made three field goals in Week 5 and was 15 for 15 on field goals for the season, with eight extra points in eight tries, but Minnesota is on bye ([What We Learned](${WEEK_5_LEARNED})). A perfect kicker on a bye is not a Week 6 stream.`,
  opinion:
    "Bid guidance on this page is opinion, not a model output. A rule of thumb: spend a Week 6 claim on a player who can play this week before you spend it on a bye-week stash. Huntley belongs in the first group only if Jackson is not the starter. This desk is not publishing a FAAB percent.",
  sources: [
    { label: "NFL.com Week 6 schedule", href: WEEK_6_SCHEDULE },
    { label: "ESPN Week 6 schedule", href: ESPN_WEEK_6 },
    { label: "NFL.com 2026 bye weeks", href: NFL_BYES },
    { label: "Detroit Lions 2026 schedule release", href: LIONS_SCHEDULE },
    { label: "NFL.com Week 5 injury report", href: WEEK_5_INJURY_ROUNDUP },
    { label: "NFL.com Week 5 Sunday injury notes", href: WEEK_5_SUNDAY_INJURIES },
    { label: "NFL.com Week 5 What We Learned", href: WEEK_5_LEARNED },
    { label: "NFL.com: Huntley to start for Jackson", href: HUNTLEY_START },
    { label: "NFL.com injury report address checked 2026-10-14", href: WEEK_6_INJURY_URL },
    { label: "Eagles roster announcement, 9 October 2026", href: EAGLES_SIGNING },
    { label: "ESPN recap: Jaguars 19, Eagles 17", href: ESPN_EAGLES_RECAP },
    { label: "Tyler Huntley game log", href: "https://www.nfl.com/players/tyler-huntley/stats/logs/" },
    { label: "Braelon Allen game log", href: "https://www.nfl.com/players/braelon-allen/stats/logs/" },
    { label: "Woody Marks game log", href: "https://www.nfl.com/players/woody-marks/stats/logs/" },
    { label: "Dameon Pierce game log", href: "https://www.nfl.com/players/dameon-pierce/stats/logs/" },
    { label: "Darius Cooper game log", href: "https://www.nfl.com/players/darius-cooper/stats/logs/" },
  ],
};

const CITATION = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g;

export type CitationPart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

export function citationParts(source: string): CitationPart[] {
  const parts: CitationPart[] = [];
  let last = 0;
  for (const match of source.matchAll(CITATION)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ type: "text", text: source.slice(last, index) });
    parts.push({ type: "link", text: match[1] ?? "", href: match[2] ?? "" });
    last = index + match[0].length;
  }
  if (last < source.length) parts.push({ type: "text", text: source.slice(last) });
  return parts;
}

export function weeklyWaiverBodies(note: WeeklyWaiverNote = WEEK_6_WAIVER): string[] {
  return [
    note.answer,
    note.window,
    note.byes,
    note.reportGap,
    note.tightEnd,
    note.streaming,
    note.opinion,
    ...note.picks.map((pick) => pick.body),
  ];
}
