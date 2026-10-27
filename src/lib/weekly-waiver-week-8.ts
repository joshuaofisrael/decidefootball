/**
 * Week 8 editorial waiver note. Facts stay in this file; the page renders
 * them. Citations use [label](https://...) inside body strings.
 */

import { citationParts, type CitationPart, type WaiverPosition } from "./weekly-waiver";

export type { WaiverPosition };

export const WEEK_8_WAIVER_PATH = "/waiver-radar/2026-week-8/";
export const WEEK_8_WAIVER_UPDATED = "2026-10-27";
export const WEEK_8_WAIVER_TITLE = "Week 8 waiver wire pickups 2026";
export const WEEK_8_WAIVER_H1 = "Week 8 fantasy waiver pickups";
export const WEEK_8_WAIVER_DESCRIPTION =
  "Week 8 fantasy waiver pickups for 29 October-2 November 2026, cited from Week 7 reports and NFL.com logs. Editorial notes, not the sample radar or live stats.";

const WEEK_8_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-8";
const ESPN_WEEK_8 = "https://www.espn.com/nfl/schedule/_/week/8/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const TEXANS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/houston-texans";
const SAINTS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/new-orleans-saints";
const GIANTS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/new-york-giants";
const NINERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/san-francisco-49ers";
const WEEK_7_INJURY = "https://www.nfl.com/injuries/league/2026/reg7";
const WEEK_8_INJURY = "https://www.nfl.com/injuries/league/2026/reg8";
const PREGAME = "https://www.nfl.com/news/week-7-injuries-sunday-pregame-2026-nfl-season";
const SUNDAY_INJURIES = "https://www.nfl.com/news/notable-injuries-news-sunday-week-7-games-2026";
const LEARNED = "https://www.nfl.com/news/2026-nfl-season-week-7-what-we-learned-from-sunday-s-games";
const BARKLEY =
  "https://www.nfl.com/news/eagles-rb-saquon-barkley-hamstring-active-for-monday-night-game-vs-cowboys";
const MNF_GAME = "https://www.nfl.com/games/cowboys-at-eagles-2026-reg-7";
const JACKSON_LOG = "https://www.nfl.com/players/lamar-jackson/stats/logs/";
const HUNTLEY_LOG = "https://www.nfl.com/players/tyler-huntley/stats/logs/";
const MCKEE_LOG = "https://www.nfl.com/players/tanner-mckee/stats/logs/";
const ALLEN_LOG = "https://www.nfl.com/players/braelon-allen/stats/logs/";
const WILSON_LOG = "https://www.nfl.com/players/emanuel-wilson/stats/logs/2026/";
const GORDON_LOG = "https://www.nfl.com/players/ollie-gordon-ii/stats/logs/";
const JONES_LOG = "https://www.nfl.com/players/aaron-jones/stats/logs/";
const MASON_LOG = "https://www.nfl.com/players/jordan-mason/stats/logs/";
const MARKS_LOG = "https://www.nfl.com/players/woody-marks/stats/logs/";
const COOPER_LOG = "https://www.nfl.com/players/omar-cooper-jr/stats/logs/";
const TAYLOR_LOG = "https://www.nfl.com/players/mason-taylor/stats/logs/";
const DOUGLAS_LOG = "https://www.nfl.com/players/caleb-douglas/stats/logs/";
const KNIGHT_LOG = "https://www.nfl.com/players/bam-knight/stats/logs/";
const MAYFIELD_LOG = "https://www.nfl.com/players/baker-mayfield/stats/logs/";
const DANIELS_LOG = "https://www.nfl.com/players/jalon-daniels/stats/logs/";

export const WEEK_8_CITATION_HOSTS = ["www.nfl.com", "www.espn.com"] as const;

export interface Week8WaiverPick {
  position: WaiverPosition;
  name: string;
  club: string;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  /** Club is on bye, so the name is a stash rather than a Week 8 start. */
  byeStash?: boolean;
  /** Verified Week 8 game, when the club is not on bye. */
  nextGame?: string;
}

export interface Week8WaiverFaq {
  question: string;
  answer: string;
}

export interface Week8WaiverNote {
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
  picks: Week8WaiverPick[];
  wideReceiver: string;
  tightEnd: string;
  streaming: string;
  drops: string;
  omitted: string;
  opinion: string;
  faqs: Week8WaiverFaq[];
  sources: { label: string; href: string }[];
}

export const WEEK_8_WAIVER: Week8WaiverNote = {
  path: WEEK_8_WAIVER_PATH,
  updated: WEEK_8_WAIVER_UPDATED,
  week: 8,
  season: 2026,
  title: WEEK_8_WAIVER_TITLE,
  h1: WEEK_8_WAIVER_H1,
  description: WEEK_8_WAIVER_DESCRIPTION,
  answer:
    "Add candidates for Week 8: quarterbacks Tyler Huntley (Baltimore Ravens) and Tanner McKee (Philadelphia Eagles); running backs Braelon Allen (New York Jets), Emanuel Wilson (Seattle Seahawks), Ollie Gordon II (Miami Dolphins), and Jordan Mason (Minnesota Vikings); wide receiver Omar Cooper Jr. (New York Jets); tight end Mason Taylor (New York Jets). Bye-week stash, not a Week 8 start: Woody Marks (Houston Texans). No defense or kicker is listed. Monday's Cowboys-Eagles game was still in progress on NFL.com when this note was checked on 2026-10-27.",
  window: `NFL.com's Week 8 schedule runs from Thursday 29 October (Carolina Panthers at Green Bay Packers, 8:15 p.m.) through Monday 2 November (Chicago Bears at Seattle Seahawks, 8:15 p.m.). Sunday 1 November includes Baltimore at Buffalo at 1:00 p.m. and ends with Philadelphia at Washington at 8:20 p.m. ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})). ESPN's Week 8 schedule lists the same Thursday-to-Monday window ([ESPN Week 8 schedule](${ESPN_WEEK_8})).`,
  byes: `Week 8 byes are the Houston Texans, New Orleans Saints, New York Giants, and San Francisco 49ers. NFL.com's bye-week list names those four clubs ([NFL.com bye weeks](${NFL_BYES})). NFL.com's team schedules mark Week 8 as a bye for the Texans, the Saints, the Giants, and the 49ers ([Texans schedule](${TEXANS_SCHEDULE}); [Saints schedule](${SAINTS_SCHEDULE}); [Giants schedule](${GIANTS_SCHEDULE}); [49ers schedule](${NINERS_SCHEDULE})). The NFL.com Week 8 game list has no Texans, Saints, Giants, or 49ers game ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})). ESPN's Week 8 bye row lists New Orleans, New York, San Francisco, and Houston, and the same page lists Las Vegas at New York among the games, so that bye row is not the Jets ([ESPN Week 8 schedule](${ESPN_WEEK_8})).`,
  reportGap: `Sunday 25 October is final on NFL.com's Week 7 recap, including Seattle's 20-3 win ([NFL.com](${LEARNED})). When this note was checked on ${WEEK_8_WAIVER_UPDATED}, NFL.com's Cowboys at Eagles game page still showed the game in progress in the fourth quarter, so this note does not use a Monday box score ([game page](${MNF_GAME})). The NFL.com injury-report address for Week 8 still displayed the Week 7 report ([Week 8 injury address](${WEEK_8_INJURY})). Nothing below is a Week 8 Out, Doubtful, or Questionable label. Recheck the club report before a claim runs.`,
  picks: [
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      nextGame: "Ravens at Bills, Sunday 1 November",
      body: `The Week 7 injury report lists Lamar Jackson out with an ankle injury, and his log has no passing line for 11 October, 18 October, or 25 October 2026 ([injury report](${WEEK_7_INJURY}); [game log](${JACKSON_LOG})). Tyler Huntley's log for the 13-35 loss lists 23 completions on 34 attempts for 298 yards, a touchdown, and an interception ([game log](${HUNTLEY_LOG})). Huntley is a Week 8 add only if Jackson is not the starter at Buffalo, and the Sunday recap says Baltimore can't welcome Jackson back quickly enough ([NFL.com](${LEARNED})).`,
    },
    {
      position: "QB",
      name: "Tanner McKee",
      club: "Philadelphia Eagles",
      nextGame: "Eagles at Commanders, Sunday 1 November",
      body: `NFL.com reported that blood clots forced Jalen Hurts out for what is likely the rest of the season, and that Tanner McKee is the starting quarterback against Dallas ([NFL.com](${BARKLEY})). McKee's Week 6 log lists 26 completions on 45 attempts for 215 yards and a touchdown ([game log](${MCKEE_LOG})). The Cowboys-Eagles game page still showed the game in progress on the check date, so this note uses no Week 7 passing line and the club report should be rechecked before Sunday night ([game page](${MNF_GAME})).`,
    },
    {
      position: "RB",
      name: "Braelon Allen",
      club: "New York Jets",
      nextGame: "Raiders at Jets, Sunday 1 November",
      body: `Week 7 pregame notes say Breece Hall (quad) was unlikely to play and officially inactive against Miami ([NFL.com](${PREGAME})). Braelon Allen's log for the 25-28 loss lists 17 carries for 104 yards, long 27, and six receptions for 30 yards ([game log](${ALLEN_LOG})). The Sunday recap says Hall is nearing a return, so Allen is a Week 8 add only if Hall is not the starter against the Raiders ([NFL.com](${LEARNED})).`,
    },
    {
      position: "RB",
      name: "Emanuel Wilson",
      club: "Seattle Seahawks",
      nextGame: "Bears at Seahawks, Monday 2 November",
      body: `The Week 7 injury report lists Zach Charbonnet out with a knee injury ([injury report](${WEEK_7_INJURY})). Emanuel Wilson's log for the 20-3 win lists 24 carries for 100 yards and a touchdown, long 21, and one reception for 15 yards ([game log](${WILSON_LOG})). The Sunday night recap describes that 100-yard game on 24 carries, and Charbonnet's Week 8 status was not in that Week 7 report, so recheck it before Monday ([NFL.com](${LEARNED})).`,
    },
    {
      position: "RB",
      name: "Ollie Gordon II",
      club: "Miami Dolphins",
      nextGame: "Patriots at Dolphins, Sunday 1 November",
      body: `Ollie Gordon II's log for Miami's 28-25 win lists 25 carries for 103 yards and a touchdown, long 25, and one reception for no yards ([game log](${GORDON_LOG})). The Sunday recap describes that line as another outing in place of De'Von Achane ([NFL.com](${LEARNED})). He is a Week 8 add only if Achane is not the starter against New England, because no Week 8 designation was posted on the injury address checked for this note ([Week 8 injury address](${WEEK_8_INJURY})).`,
    },
    {
      position: "RB",
      name: "Jordan Mason",
      club: "Minnesota Vikings",
      nextGame: "Vikings at Lions, Sunday 1 November",
      body: `Aaron Jones (knee) did not return to Minnesota's win over Indianapolis ([NFL.com](${SUNDAY_INJURIES})). Jones's log lists 8 carries for 26 yards and a lost fumble, and Jordan Mason's log lists 15 carries for 68 yards, long 12 ([Jones log](${JONES_LOG}); [Mason log](${MASON_LOG})). Mason is a Week 8 add only if Jones is not the starter at Detroit, and no Week 8 designation for Jones was on the injury address checked for this note ([Week 8 injury address](${WEEK_8_INJURY})).`,
    },
    {
      position: "RB",
      name: "Woody Marks",
      club: "Houston Texans",
      byeStash: true,
      body: `The Week 7 injury report lists David Montgomery out with a groin injury, and Woody Marks's log for the 21-27 loss lists 19 carries for 66 yards, long 11, and one reception for 15 yards ([injury report](${WEEK_7_INJURY}); [game log](${MARKS_LOG})). The Texans' schedule marks Week 8 as a bye ([Texans schedule](${TEXANS_SCHEDULE})). Marks is a stash for after the bye, not a Week 8 start.`,
    },
    {
      position: "WR",
      name: "Omar Cooper Jr.",
      club: "New York Jets",
      nextGame: "Raiders at Jets, Sunday 1 November",
      body: `Omar Cooper Jr.'s log lists 6 receptions for 103 yards and a touchdown on 18 October, then 5 receptions for 115 yards and a touchdown, long 60, in the 25-28 loss ([game log](${COOPER_LOG})). The Sunday recap says those are back-to-back 100-yard games, the first by a Jets rookie since Al Toon in 1985 ([NFL.com](${LEARNED})). The same recap says Hall is nearing a return, which can change the target share, so recheck the club report before Sunday.`,
    },
    {
      position: "TE",
      name: "Mason Taylor",
      club: "New York Jets",
      nextGame: "Raiders at Jets, Sunday 1 November",
      body: `Mason Taylor's log for that 25-28 loss lists 5 receptions for 62 yards and two touchdowns, long 20 ([game log](${TAYLOR_LOG})). The Sunday recap names him among the Jets who scored, with two touchdowns ([NFL.com](${LEARNED})). No Week 8 designation for Taylor was on the injury address checked for this note ([Week 8 injury address](${WEEK_8_INJURY})).`,
    },
  ],
  wideReceiver: `Caleb Douglas is not a separate card. His log for the same Dolphins win lists 2 receptions for 70 yards and two touchdowns, long 63, and the recap describes a 63-yard score ([game log](${DOUGLAS_LOG}); [NFL.com](${LEARNED})). Two catches are a spike, not a trend this note ranks ahead of Cooper.`,
  tightEnd: `No other tight end is listed. The Week 7 injury report lists Indianapolis tight end Tyler Warren out with a groin injury, and the reports checked did not name a replacement tight end ([injury report](${WEEK_7_INJURY})).`,
  streaming: `No streaming defense or kicker is listed. Green Bay rookie kicker Trey Smack missed a 26-yarder and a 35-yarder in the loss at Detroit ([NFL.com](${LEARNED})). A kicker who missed two short kicks is not a Week 8 stream on Thursday against Carolina.`,
  drops: `Jalon Daniels is a drop. Baker Mayfield's Week 7 log lists 7 completions on 11 attempts for 64 yards and a touchdown, and Daniels's log for that game lists no passing line and two rushes for minus 3 yards ([Mayfield log](${MAYFIELD_LOG}); [Daniels log](${DANIELS_LOG})). Dameon Pierce is a drop if the only reason to hold him was a Barkley absence: NFL.com says Saquon Barkley is officially active for Monday after a two-game hamstring absence ([NFL.com](${BARKLEY})). Do not drop a Texans, Saints, Giants, or 49ers player only for the bye. Those clubs are back in Week 9 ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})).`,
  omitted: `Bam Knight's log lists 7 carries for 48 yards and 3 receptions for 15 yards in the loss to Denver, and Jeremiyah Love (ankle) was out ([game log](${KNIGHT_LOG}); [injury report](${WEEK_7_INJURY})). This note does not have Tyler Allgeier's touch count, so Knight is not a separate card. Tyrone Tracy Jr. (hamstring) did not return, and Cam Skattebo said he felt something in his hamstring on a 42-yard overtime run ([NFL.com](${SUNDAY_INJURIES})). Devin Singletary's overtime score is described as a 30-yard touchdown ([NFL.com](${LEARNED})). A full carry line was not taken from Singletary's game log, and the Giants are on bye, so he is not a separate stash card.`,
  opinion:
    "Bid guidance on this page is opinion, not a model output. On a remaining FAAB budget, a rule of thumb is 10% to 18% for Huntley or McKee if the injured starter is still out, 8% to 15% for Allen or Wilson, 5% to 10% for Gordon or Cooper, 3% to 8% for Mason or Taylor, and 1% to 4% for the Marks bye-week stash. Spend a Week 8 claim on a player who can play this week before you spend it on a bye-week stash. Recheck the injured starter before the bid.",
  faqs: [
    {
      question: "When is NFL Week 8 in 2026?",
      answer:
        "Thursday 29 October through Monday 2 November 2026. Thursday is Panthers at Packers. Monday is Bears at Seahawks. Sunday 1 November includes Ravens at Bills and ends with Eagles at Commanders.",
    },
    {
      question: "Which NFL teams are on bye in Week 8?",
      answer:
        "The Houston Texans, New Orleans Saints, New York Giants, and San Francisco 49ers.",
    },
    {
      question: "Has Week 7 Monday Night Football been played?",
      answer:
        "When this note was checked on 2026-10-27, NFL.com's Cowboys at Eagles page still showed the game in progress in the fourth quarter. This note does not use a Monday box score.",
    },
    {
      question: "Who is the Week 8 bye-week stash?",
      answer:
        "Woody Marks, Houston Texans. David Montgomery was out with a groin injury in Week 7, and the Texans are on bye in Week 8, so Marks cannot be started this week.",
    },
  ],
  sources: [
    { label: "NFL.com Week 8 schedule", href: WEEK_8_SCHEDULE },
    { label: "ESPN Week 8 schedule", href: ESPN_WEEK_8 },
    { label: "NFL.com 2026 bye weeks", href: NFL_BYES },
    { label: "NFL.com Houston Texans 2026 schedule", href: TEXANS_SCHEDULE },
    { label: "NFL.com New Orleans Saints 2026 schedule", href: SAINTS_SCHEDULE },
    { label: "NFL.com New York Giants 2026 schedule", href: GIANTS_SCHEDULE },
    { label: "NFL.com San Francisco 49ers 2026 schedule", href: NINERS_SCHEDULE },
    { label: "NFL.com injury report, Week 7", href: WEEK_7_INJURY },
    { label: "NFL.com injury report address for Week 8, still showing Week 7 on 2026-10-27", href: WEEK_8_INJURY },
    { label: "NFL.com Week 7 Sunday pregame injury notes", href: PREGAME },
    { label: "NFL.com notable Week 7 Sunday injuries", href: SUNDAY_INJURIES },
    { label: "NFL.com Week 7 What We Learned", href: LEARNED },
    { label: "NFL.com: Barkley active, Hurts out with blood clots", href: BARKLEY },
    { label: "NFL.com game page, Cowboys at Eagles, checked 2026-10-27", href: MNF_GAME },
    { label: "Lamar Jackson game log", href: JACKSON_LOG },
    { label: "Tyler Huntley game log", href: HUNTLEY_LOG },
    { label: "Tanner McKee game log", href: MCKEE_LOG },
    { label: "Braelon Allen game log", href: ALLEN_LOG },
    { label: "Emanuel Wilson game log", href: WILSON_LOG },
    { label: "Ollie Gordon II game log", href: GORDON_LOG },
    { label: "Aaron Jones game log", href: JONES_LOG },
    { label: "Jordan Mason game log", href: MASON_LOG },
    { label: "Woody Marks game log", href: MARKS_LOG },
    { label: "Omar Cooper Jr. game log", href: COOPER_LOG },
    { label: "Mason Taylor game log", href: TAYLOR_LOG },
    { label: "Caleb Douglas game log", href: DOUGLAS_LOG },
    { label: "Bam Knight game log", href: KNIGHT_LOG },
    { label: "Baker Mayfield game log", href: MAYFIELD_LOG },
    { label: "Jalon Daniels game log", href: DANIELS_LOG },
  ],
};

export function week8WaiverBodies(note: Week8WaiverNote = WEEK_8_WAIVER): string[] {
  return [
    note.answer,
    note.window,
    note.byes,
    note.reportGap,
    note.wideReceiver,
    note.tightEnd,
    note.streaming,
    note.drops,
    note.omitted,
    note.opinion,
    ...note.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    ...note.picks.map((pick) => pick.body),
  ];
}

export function week8CitationParts(source: string): CitationPart[] {
  return citationParts(source);
}
