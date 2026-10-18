/**
 * Week 7 editorial waiver note. Facts stay in this file; the page renders
 * them. Citations use [label](https://...) inside body strings.
 */

import { citationParts, type CitationPart, type WaiverPosition } from "./weekly-waiver";

export type { WaiverPosition };

export const WEEK_7_WAIVER_PATH = "/waiver-radar/2026-week-7/";
export const WEEK_7_WAIVER_UPDATED = "2026-10-18";
export const WEEK_7_WAIVER_TITLE = "Week 7 waiver wire pickups 2026";
export const WEEK_7_WAIVER_H1 = "Week 7 fantasy waiver pickups";
export const WEEK_7_WAIVER_DESCRIPTION =
  "Week 7 fantasy waiver pickups for 22-26 October 2026, with adds cited from the Week 6 injury report and NFL.com game logs. Editorial notes, not the sample waiver radar and not live licensed stats.";

const WEEK_7_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-7";
const ESPN_WEEK_7 = "https://www.espn.com/nfl/schedule/_/week/7/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const BILLS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/buffalo-bills";
const JAGUARS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/jacksonville-jaguars";
const CHARGERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/los-angeles-chargers";
const COMMANDERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/washington-commanders";
const WEEK_6_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-6";
const TNF_LEARNED =
  "https://www.nfl.com/news/seahawks-broncos-on-thursday-night-football-what-we-learned-from-denver-s-17-14-overtime-victory";
const WEEK_6_INJURY = "https://www.nfl.com/injuries/league/2026/reg6";
const HURTS_IR =
  "https://www.nfl.com/news/eagles-place-qb-jalen-hurts-on-injured-reserve-due-to-superficial-blood-clot-in-calf";
const HUNTLEY_AGAIN =
  "https://www.nfl.com/news/ravens-qb-lamar-jackson-ankle-out-sunday-vs-browns-tyler-huntley-to-start-again";
const MAYFIELD =
  "https://www.nfl.com/news/buccaneers-qb-baker-mayfield-thumb-out-at-least-three-weeks-jalon-daniels";
const DANIELS_LOG = "https://www.nfl.com/players/jalon-daniels/stats/logs/";
const WILSON_LOG = "https://www.nfl.com/players/emanuel-wilson/stats/logs/2026/";
const HOLANI_LOG = "https://www.nfl.com/players/george-holani/stats/logs/";
const ALLEN_LOG = "https://www.nfl.com/players/braelon-allen/stats/logs/";
const MARKS_LOG = "https://www.nfl.com/players/woody-marks/stats/logs/";
const PIERCE_LOG = "https://www.nfl.com/players/dameon-pierce/stats/logs/";

export const WEEK_7_CITATION_HOSTS = ["www.nfl.com", "www.espn.com"] as const;

export interface Week7WaiverPick {
  position: WaiverPosition;
  name: string;
  club: string;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  /** Club is on bye, so the name is a stash rather than a Week 7 start. */
  byeStash?: boolean;
  /** Verified Week 7 game, when the club is not on bye. */
  nextGame?: string;
}

export interface Week7WaiverFaq {
  question: string;
  answer: string;
}

export interface Week7WaiverNote {
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
  picks: Week7WaiverPick[];
  wideReceiver: string;
  tightEnd: string;
  streaming: string;
  omitted: string;
  opinion: string;
  faqs: Week7WaiverFaq[];
  sources: { label: string; href: string }[];
}

export const WEEK_7_WAIVER: Week7WaiverNote = {
  path: WEEK_7_WAIVER_PATH,
  updated: WEEK_7_WAIVER_UPDATED,
  week: 7,
  season: 2026,
  title: WEEK_7_WAIVER_TITLE,
  h1: WEEK_7_WAIVER_H1,
  description: WEEK_7_WAIVER_DESCRIPTION,
  answer:
    "Add candidates for Week 7: quarterbacks Tanner McKee (Philadelphia Eagles), Tyler Huntley (Baltimore Ravens), and Jalon Daniels (Tampa Bay Buccaneers); running backs Emanuel Wilson and George Holani (Seattle Seahawks), Braelon Allen (New York Jets), Woody Marks (Houston Texans), and Dameon Pierce (Philadelphia Eagles). No bye-week stash, wide receiver, tight end, defense, or kicker is listed. Sunday's Week 6 games and Monday Night Football had not been played when this note was checked on 2026-10-18.",
  window: `NFL.com's Week 7 schedule runs from Thursday 22 October (New England Patriots at Chicago Bears, 8:15 p.m.) through Monday 26 October (Dallas Cowboys at Philadelphia Eagles, 8:15 p.m.). Sunday 25 October includes Pittsburgh vs. New Orleans in Saint-Denis and ends with Kansas City at Seattle at 8:20 p.m. ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})). ESPN's Week 7 schedule lists the same Thursday-to-Monday window and places the Paris game at Stade de France at 9:30 a.m. ([ESPN Week 7 schedule](${ESPN_WEEK_7})).`,
  byes: `Week 7 byes are the Buffalo Bills, Jacksonville Jaguars, Los Angeles Chargers, and Washington Commanders. NFL.com's bye-week list names those four clubs ([NFL.com bye weeks](${NFL_BYES})). NFL.com's team schedules mark Week 7 as a bye for the Bills, the Jaguars, the Chargers, and the Commanders ([Bills schedule](${BILLS_SCHEDULE}); [Jaguars schedule](${JAGUARS_SCHEDULE}); [Chargers schedule](${CHARGERS_SCHEDULE}); [Commanders schedule](${COMMANDERS_SCHEDULE})). The NFL.com Week 7 game list has no Bills, Jaguars, Chargers, or Commanders game ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})). ESPN's Week 7 game list does not include those four clubs ([ESPN Week 7 schedule](${ESPN_WEEK_7})). No bye-week stash is listed. Those four clubs still had a Week 6 game ahead of them when this note was checked, so a Week 6 result on a Week 7 bye club is not used here.`,
  reportGap: `Thursday 15 October is final: Denver beat Seattle 17-14 in overtime ([NFL.com](${TNF_LEARNED})). When this note was checked on ${WEEK_7_WAIVER_UPDATED}, the Sunday 18 October slate had not been played, and Monday Night Football was still pending: Washington Commanders at San Francisco 49ers, 19 October, 8:15 p.m. ([NFL.com Week 6 schedule](${WEEK_6_SCHEDULE})). This note does not invent those results. The Week 6 injury report is a Week 6 document. Nothing below is a Week 7 Out, Doubtful, or Questionable label. Recheck the club report before a claim runs.`,
  picks: [
    {
      position: "QB",
      name: "Tanner McKee",
      club: "Philadelphia Eagles",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `The Eagles placed Jalen Hurts on injured reserve with a superficial blood clot in his calf, and the report says he will miss at least the next four games, with Tanner McKee starting Sunday against the Panthers ([NFL.com](${HURTS_IR})). That reported absence is longer than one week, so the Week 7 game is inside it unless a later update says otherwise, and the club report should be rechecked before the Monday claim.`,
    },
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      nextGame: "Bengals at Ravens, Sunday 25 October",
      body: `Coach Jesse Minter ruled Lamar Jackson out for Sunday at Cleveland and said Tyler Huntley would start again ([NFL.com](${HUNTLEY_AGAIN})). The same report says Huntley finished the prior start 24 of 32 for 201 yards, two touchdown passes, and a touchdown run. He is a Week 7 add only if Jackson is not the starter against Cincinnati, and Sunday's game has not been played, so this note has no new box score.`,
    },
    {
      position: "QB",
      name: "Jalon Daniels",
      club: "Tampa Bay Buccaneers",
      nextGame: "Buccaneers at Panthers, Sunday 25 October",
      body: `Todd Bowles said Baker Mayfield would miss a minimum of three weeks after dislocating his right thumb, and the same report said Jalon Daniels would start in Week 4, with the earliest return described as Week 7 at the Panthers ([NFL.com](${MAYFIELD})). The Week 6 injury report lists Mayfield out with a thumb injury, and Daniels's log lists passing lines for 4 October 2026 and 8 October 2026 ([injury report](${WEEK_6_INJURY}); [game log](${DANIELS_LOG})). He is a Week 7 add only if Mayfield is not the starter at Carolina.`,
    },
    {
      position: "RB",
      name: "Emanuel Wilson",
      club: "Seattle Seahawks",
      nextGame: "Chiefs at Seahawks, Sunday 25 October",
      body: `Zach Charbonnet (knee) was out for Thursday at Denver ([injury report](${WEEK_6_INJURY})). Emanuel Wilson's log for the 14-17 loss lists 14 carries for 52 yards, long 11, and no receptions ([game log](${WILSON_LOG})). Charbonnet's Week 7 status was not in that report, so recheck it before Sunday night.`,
    },
    {
      position: "RB",
      name: "George Holani",
      club: "Seattle Seahawks",
      nextGame: "Chiefs at Seahawks, Sunday 25 October",
      body: `George Holani's log for that 14-17 loss lists 5 carries for 20 yards and a touchdown, long 13 ([game log](${HOLANI_LOG})). The Thursday recap describes the score as a 1-yard run with 5:41 left in regulation ([NFL.com](${TNF_LEARNED})). Wilson's log for the same game lists 14 carries, so Holani is the touchdown share of that backfield, and Charbonnet's Week 7 status still has to be rechecked ([game log](${WILSON_LOG})).`,
    },
    {
      position: "RB",
      name: "Braelon Allen",
      club: "New York Jets",
      nextGame: "Dolphins at Jets, Sunday 25 October",
      body: `The Week 6 injury report lists Breece Hall out with a quadriceps injury for Sunday at New England ([injury report](${WEEK_6_INJURY})). Braelon Allen's Week 5 log, in the 17-12 win over the Browns, lists 24 carries for 116 yards and a touchdown, long 22, plus one reception for no yards and a fumble that was not lost ([game log](${ALLEN_LOG})). Sunday's game has not been played, and Hall's Week 7 status is not in that report, so recheck it.`,
    },
    {
      position: "RB",
      name: "Woody Marks",
      club: "Houston Texans",
      nextGame: "Giants at Texans, Sunday 25 October",
      body: `The Week 6 injury report lists David Montgomery out with a groin injury for the London game ([injury report](${WEEK_6_INJURY})). Woody Marks's Week 5 log in the 26-3 win lists 15 carries for 62 yards and four receptions for 23 yards ([game log](${MARKS_LOG})). The London game has not been played, and Montgomery's Week 7 status is not in that report, so recheck it.`,
    },
    {
      position: "RB",
      name: "Dameon Pierce",
      club: "Philadelphia Eagles",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `A Saturday report says Barkley is set to miss a second game with a hamstring injury, that Tank Bigsby and Will Shipley are on injured reserve, and that Philadelphia is turning to Dameon Pierce and Carson Steele ([NFL.com](${HURTS_IR})). Pierce's Week 5 log lists 11 carries for 14 yards and two receptions for minus 2 yards ([game log](${PIERCE_LOG})). The Panthers game has not been played, and Barkley's Week 7 status was not in those reports, so recheck both backs before Monday.`,
    },
  ],
  wideReceiver: `No wide receiver is listed. DeVonta Smith was a full practice participant with no game status on the Week 6 report, so this note does not repeat a Week 5 Eagles receiver as a Week 7 add ([injury report](${WEEK_6_INJURY})). Deebo Samuel (hamstring) is listed out for Monday's game on that same report. Monday Night Football has not been played, and the reports checked did not name a replacement receiver.`,
  tightEnd: `No tight end is listed. Matthew Hibner (hand) is out for Baltimore on the Week 6 report, and the reports checked did not name a replacement tight end for a club that plays in Week 7 ([injury report](${WEEK_6_INJURY})).`,
  streaming: `No streaming defense or kicker is listed. Wil Lutz made the kick that won Thursday's game ([NFL.com](${TNF_LEARNED})). That is the Broncos' kicker finishing a game, not a new Week 7 role.`,
  omitted: `Kyle Monangai (thumb and toe) is out for Chicago, and Jeremiyah Love (ankle) is out for Arizona, on the Week 6 report ([injury report](${WEEK_6_INJURY})). The reports checked did not name the back who replaces either of them, so neither absence is an add. Carson Steele is named with Pierce in the Saturday report, and he does not get a separate card because no touch count was published ([NFL.com](${HURTS_IR})).`,
  opinion:
    "Bid guidance on this page is opinion, not a model output. A rule of thumb: spend a Week 7 claim on a player who can play this week, and recheck the injured starter before you spend it. McKee is the quarterback note tied to injured reserve. Huntley and Daniels are Week 7 adds only if the injured starter is not back. This desk is not publishing a FAAB percent.",
  faqs: [
    {
      question: "When is NFL Week 7 in 2026?",
      answer:
        "Thursday 22 October through Monday 26 October 2026. Thursday is Patriots at Bears. Monday is Cowboys at Eagles. Sunday 25 October includes the game in Saint-Denis and ends with Chiefs at Seahawks.",
    },
    {
      question: "Which NFL teams are on bye in Week 7?",
      answer:
        "The Buffalo Bills, Jacksonville Jaguars, Los Angeles Chargers, and Washington Commanders.",
    },
    {
      question: "Has Week 6 Monday Night Football been played?",
      answer:
        "No. As of 2026-10-18, Commanders at 49ers on Monday 19 October is still pending, and the Sunday 18 October slate had not been played either.",
    },
  ],
  sources: [
    { label: "NFL.com Week 7 schedule", href: WEEK_7_SCHEDULE },
    { label: "ESPN Week 7 schedule", href: ESPN_WEEK_7 },
    { label: "NFL.com 2026 bye weeks", href: NFL_BYES },
    { label: "NFL.com Buffalo Bills 2026 schedule", href: BILLS_SCHEDULE },
    { label: "NFL.com Jacksonville Jaguars 2026 schedule", href: JAGUARS_SCHEDULE },
    { label: "NFL.com Los Angeles Chargers 2026 schedule", href: CHARGERS_SCHEDULE },
    { label: "NFL.com Washington Commanders 2026 schedule", href: COMMANDERS_SCHEDULE },
    { label: "NFL.com Week 6 schedule", href: WEEK_6_SCHEDULE },
    { label: "NFL.com Thursday Night Football recap, Broncos 17, Seahawks 14", href: TNF_LEARNED },
    { label: "NFL.com injury report, Week 6, checked 2026-10-18", href: WEEK_6_INJURY },
    { label: "NFL.com: Eagles place Jalen Hurts on injured reserve", href: HURTS_IR },
    { label: "NFL.com: Huntley to start again with Jackson out", href: HUNTLEY_AGAIN },
    { label: "NFL.com: Mayfield out at least three weeks, Daniels to start", href: MAYFIELD },
    { label: "Jalon Daniels game log", href: DANIELS_LOG },
    { label: "Emanuel Wilson game log", href: WILSON_LOG },
    { label: "George Holani game log", href: HOLANI_LOG },
    { label: "Braelon Allen game log", href: ALLEN_LOG },
    { label: "Woody Marks game log", href: MARKS_LOG },
    { label: "Dameon Pierce game log", href: PIERCE_LOG },
  ],
};

export function week7WaiverBodies(note: Week7WaiverNote = WEEK_7_WAIVER): string[] {
  return [
    note.answer,
    note.window,
    note.byes,
    note.reportGap,
    note.wideReceiver,
    note.tightEnd,
    note.streaming,
    note.omitted,
    note.opinion,
    ...note.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    ...note.picks.map((pick) => pick.body),
  ];
}

export function week7CitationParts(source: string): CitationPart[] {
  return citationParts(source);
}
