/**
 * Week 7 editorial start/sit note. Facts stay in this file; the page renders
 * them. Citations use [label](https://...) inside body strings.
 */

import {
  callLabel,
  citationParts,
  proseSentences,
  type StartSitCall,
  type StartSitPosition,
  type StartSitWindow,
} from "./weekly-start-sit";

export { callLabel, citationParts, proseSentences };
export type { StartSitCall, StartSitPosition, StartSitWindow };

export const WEEK_7_START_SIT_PATH = "/start-sit/2026-week-7/";
export const WEEK_7_START_SIT_UPDATED = "2026-10-19";
export const WEEK_7_START_SIT_TITLE = "Week 7 start sit 2026";
export const WEEK_7_START_SIT_H1 = "Who to start Week 7 fantasy";
export const WEEK_7_START_SIT_DESCRIPTION =
  "Who to start in Week 7 fantasy football, 22-26 October 2026. Week 7 start sit 2026: sit the four bye clubs and Jalen Hurts, and do not treat a Week 6 game status as a Week 7 designation. Editorial notes, not the sample start/sit desk and not live licensed stats.";

const WEEK_7_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-7";
const ESPN_WEEK_7 = "https://www.espn.com/nfl/schedule/_/week/7/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const BILLS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/buffalo-bills";
const JAGUARS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/jacksonville-jaguars";
const CHARGERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/los-angeles-chargers";
const COMMANDERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/washington-commanders";
const TNF_GAME = "https://www.nfl.com/games/patriots-at-bears-2026-reg-7";
const WEEK_7_INJURY_URL = "https://www.nfl.com/injuries/league/2026/reg7";
const HURTS_IR =
  "https://www.nfl.com/news/eagles-place-qb-jalen-hurts-on-injured-reserve-due-to-superficial-blood-clot-in-calf";
const RESERVE = "https://www.nfl.com/transactions/league/reserve-list/2026/10";
const HUNTLEY_AGAIN =
  "https://www.nfl.com/news/ravens-qb-lamar-jackson-ankle-out-sunday-vs-browns-tyler-huntley-to-start-again";
const MAYFIELD =
  "https://www.nfl.com/news/buccaneers-qb-baker-mayfield-thumb-out-at-least-three-weeks-jalon-daniels";

export const WEEK_7_START_SIT_CITATION_HOSTS = ["www.nfl.com", "www.espn.com"] as const;

export interface Week7StartSitPick {
  position: StartSitPosition;
  name: string;
  club: string;
  call: StartSitCall;
  window: StartSitWindow;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  nextGame?: string;
}

export interface Week7ByeClubNote {
  club: string;
  /** One to three sentences. */
  body: string;
}

export interface Week7StartSitFaq {
  question: string;
  answer: string;
}

export interface Week7StartSitNote {
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
  byeClubs: Week7ByeClubNote[];
  reportGap: string;
  picks: Week7StartSitPick[];
  opinion: string;
  faqs: Week7StartSitFaq[];
  sources: { label: string; href: string }[];
}

export const WEEK_7_START_SIT: Week7StartSitNote = {
  path: WEEK_7_START_SIT_PATH,
  updated: WEEK_7_START_SIT_UPDATED,
  week: 7,
  season: 2026,
  title: WEEK_7_START_SIT_TITLE,
  h1: WEEK_7_START_SIT_H1,
  description: WEEK_7_START_SIT_DESCRIPTION,
  answer:
    "Sit every Bills, Jaguars, Chargers, and Commanders player. Sit Jalen Hurts (Philadelphia Eagles, injured reserve, at least four games), and sit Will Shipley and Tank Bigsby, who are on injured reserve. Editorial lean for Monday: start Tanner McKee over Hurts. Do not treat a Week 6 Out as a Week 7 Out. That includes Lamar Jackson, Baker Mayfield, Saquon Barkley, and Zach Charbonnet. Thursday injury reports for Patriots at Bears were not available when this note was checked on 2026-10-19.",
  window: `NFL.com's Week 7 schedule runs from Thursday 22 October (New England Patriots at Chicago Bears, 8:15 p.m.) through Monday 26 October (Dallas Cowboys at Philadelphia Eagles, 8:15 p.m.). Sunday 25 October on that page includes Pittsburgh vs New Orleans in Saint-Denis at 9:30 a.m., the 1:00 p.m. group, and Kansas City at Seattle at 8:20 p.m. ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})). ESPN's Week 7 schedule lists the same Thursday-to-Monday window, places the Paris game at Stade de France at 9:30 a.m., and lists Denver at Arizona at 4:05 p.m., Green Bay at Detroit at 4:25 p.m., and the Los Angeles Rams at Las Vegas at 4:25 p.m. ([ESPN Week 7 schedule](${ESPN_WEEK_7})).`,
  byes: `Week 7 byes are the Buffalo Bills, Jacksonville Jaguars, Los Angeles Chargers, and Washington Commanders. NFL.com's bye-week list names those four clubs ([NFL.com bye weeks](${NFL_BYES})). NFL.com's team schedules mark Week 7 as a bye for the Bills, the Jaguars, the Chargers, and the Commanders ([Bills schedule](${BILLS_SCHEDULE}); [Jaguars schedule](${JAGUARS_SCHEDULE}); [Chargers schedule](${CHARGERS_SCHEDULE}); [Commanders schedule](${COMMANDERS_SCHEDULE})). The NFL.com Week 7 game list has no game for those four clubs, and ESPN's Week 7 bye line names Buffalo, Los Angeles, Washington, and Jacksonville ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE}); [ESPN Week 7 schedule](${ESPN_WEEK_7})). Sit every player on those four clubs. They have no Week 7 game.`,
  byeClubs: [
    {
      club: "Buffalo Bills",
      body: `NFL.com's Bills schedule marks Week 7 as a bye after the Week 6 final, Bills 33, Raiders 30, on Sunday 18 October, and the bye list names the Bills ([Bills schedule](${BILLS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Bills player, because the Week 7 game list has no Bills game ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})).`,
    },
    {
      club: "Jacksonville Jaguars",
      body: `NFL.com's Jaguars schedule marks Week 7 as a bye after the Week 6 final, Texans 34, Jaguars 31, on Sunday 18 October in London, and the bye list names the Jaguars ([Jaguars schedule](${JAGUARS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Jaguars player. They have no Week 7 game ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})).`,
    },
    {
      club: "Los Angeles Chargers",
      body: `NFL.com's Chargers schedule marks Week 7 as a bye after the Week 6 final, Chargers 6, Chiefs 22, on Sunday 18 October, and the bye list names the Chargers ([Chargers schedule](${CHARGERS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Chargers player, because the Week 7 game list has no Chargers game ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})).`,
    },
    {
      club: "Washington Commanders",
      body: `NFL.com's Commanders schedule marks Week 7 as a bye and still lists the Week 6 game, at the 49ers on Monday 19 October, without a final score ([Commanders schedule](${COMMANDERS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Commanders player for Week 7. This note does not invent a Monday result ([NFL.com Week 7 schedule](${WEEK_7_SCHEDULE})).`,
    },
  ],
  reportGap: `On ${WEEK_7_START_SIT_UPDATED}, the Patriots at Bears game page says the Patriots injury report is not available and the Bears injury report is not available ([NFL.com game page](${TNF_GAME})). The league address for Week 7 still presented the Week 6 injury report, headed Week 6 and opening with Thursday 15 October ([NFL.com injury report](${WEEK_7_INJURY_URL})). A Week 6 Out, Doubtful, or Questionable label is not a Week 7 label. Recheck the club report before Thursday lock.`,
  picks: [
    {
      position: "QB",
      name: "Jalen Hurts",
      club: "Philadelphia Eagles",
      call: "sit",
      window: "later",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `Sit Jalen Hurts. The Eagles placed him on injured reserve with a superficial blood clot in his calf, and the report says he will miss at least the next four games, with Tanner McKee starting Sunday against the Panthers ([NFL.com](${HURTS_IR})). The October reserve list records that placement on 17 October, and the Week 6 table lists game status Out for the Panthers game, which is not itself the Week 7 label ([reserve list](${RESERVE}); [injury report](${WEEK_7_INJURY_URL})).`,
    },
    {
      position: "QB",
      name: "Tanner McKee",
      club: "Philadelphia Eagles",
      call: "start",
      window: "later",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `Tanner McKee is the quarterback the report names to start the Panthers game while Hurts is on injured reserve for at least four games ([NFL.com](${HURTS_IR})). Editorial opinion: start McKee over Hurts for the Monday game against the Cowboys, and recheck the club report because that article does not print a Week 7 starter line.`,
    },
    {
      position: "RB",
      name: "Will Shipley",
      club: "Philadelphia Eagles",
      call: "sit",
      window: "later",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `Sit Will Shipley. The October reserve list records him as Reserve/Injured on 16 October, the Hurts report says he is on injured reserve, and the Week 6 table lists him out with a foot injury for the Panthers game ([reserve list](${RESERVE}); [NFL.com](${HURTS_IR}); [injury report](${WEEK_7_INJURY_URL})). This note did not find an activation on that October list.`,
    },
    {
      position: "RB",
      name: "Tank Bigsby",
      club: "Philadelphia Eagles",
      call: "sit",
      window: "later",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `Sit Tank Bigsby. The report on Hurts says Bigsby and Will Shipley are on injured reserve, leaving Dameon Pierce and Carson Steele for the Panthers game ([NFL.com](${HURTS_IR})). This note did not find a Week 7 activation, and it does not have a Week 7 touch count for Pierce or Steele.`,
    },
    {
      position: "RB",
      name: "Saquon Barkley",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Cowboys at Eagles, Monday 26 October",
      body: `Saquon Barkley (hamstring) is out on the Week 6 table for the Panthers game, and the Hurts report says he is set to miss that second game ([injury report](${WEEK_7_INJURY_URL}); [NFL.com](${HURTS_IR})). That is not a Week 7 Out label. Recheck him before Monday.`,
    },
    {
      position: "QB",
      name: "Lamar Jackson",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Bengals at Ravens, Sunday 25 October",
      body: `Lamar Jackson (ankle) is out on the Week 6 table, and the report says coach Jesse Minter ruled him out for Sunday at Cleveland with Tyler Huntley starting again ([injury report](${WEEK_7_INJURY_URL}); [NFL.com](${HUNTLEY_AGAIN})). That Sunday designation is not a Week 7 Out label for Cincinnati at Baltimore.`,
    },
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Bengals at Ravens, Sunday 25 October",
      body: `The same report says Huntley would start against the Browns and that he finished the prior start 24 of 32 for 201 yards, two touchdown passes, and a touchdown run ([NFL.com](${HUNTLEY_AGAIN})). Editorial opinion: he is the quarterback to start in Week 7 only if Jackson is not confirmed, and this note does not have a Week 7 starter announcement.`,
    },
    {
      position: "QB",
      name: "Baker Mayfield",
      club: "Tampa Bay Buccaneers",
      call: "recheck",
      window: "later",
      nextGame: "Buccaneers at Panthers, Sunday 25 October",
      body: `Baker Mayfield (thumb) is out on the Week 6 table ([injury report](${WEEK_7_INJURY_URL})). Todd Bowles said Mayfield would miss a minimum of three weeks, and the same report described the earliest return as Week 7 at the Panthers ([NFL.com](${MAYFIELD})). That earliest-return line is not a Week 7 Out label and not a Week 7 start for Jalon Daniels.`,
    },
    {
      position: "QB",
      name: "Jalon Daniels",
      club: "Tampa Bay Buccaneers",
      call: "recheck",
      window: "later",
      nextGame: "Buccaneers at Panthers, Sunday 25 October",
      body: `The Mayfield report said Jalon Daniels would start in Week 4, when Tampa Bay hosted the Packers ([NFL.com](${MAYFIELD})). It does not say he is the Week 7 starter at Carolina. Recheck both quarterbacks before Sunday.`,
    },
    {
      position: "RB",
      name: "Zach Charbonnet",
      club: "Seattle Seahawks",
      call: "recheck",
      window: "later",
      nextGame: "Chiefs at Seahawks, Sunday 25 October",
      body: `Zach Charbonnet (knee) is out on the Week 6 table for Thursday at Denver ([injury report](${WEEK_7_INJURY_URL})). That Thursday label is not a Week 7 Out label for Chiefs at Seahawks. Recheck him before Sunday night.`,
    },
  ],
  opinion:
    "Lineup leans on this page are editorial opinion, not a model output and not licensed projections. A bye is a sit. Injured reserve, when the cited transaction or report still has the player there, is a sit. A Week 6 game status is not a Week 7 game status. For Monday, the lean at quarterback is Tanner McKee because Jalen Hurts is on injured reserve for at least four games. This desk is not publishing a point projection.",
  faqs: [
    {
      question: "When is NFL Week 7 in 2026?",
      answer:
        "Thursday 22 October through Monday 26 October 2026. Thursday is Patriots at Bears at 8:15 p.m. Monday is Cowboys at Eagles at 8:15 p.m. Sunday 25 October includes Steelers vs Saints in Saint-Denis at 9:30 a.m. and ends with Chiefs at Seahawks at 8:20 p.m.",
    },
    {
      question: "Which NFL teams are on bye in Week 7?",
      answer:
        "The Buffalo Bills, Jacksonville Jaguars, Los Angeles Chargers, and Washington Commanders. Sit every player on those four clubs. They have no Week 7 game.",
    },
    {
      question: "Is a Week 6 Out a Week 7 sit?",
      answer:
        "No. On 2026-10-19 the Week 7 injury-report address still showed the Week 6 table, and the Patriots at Bears game page said those injury reports were not available. A Week 6 designation is not a Week 7 designation. Jalen Hurts is a separate sit because he was placed on injured reserve for at least four games.",
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
    { label: "NFL.com Patriots at Bears game page, checked 2026-10-19", href: TNF_GAME },
    { label: "NFL.com injury report address checked 2026-10-19", href: WEEK_7_INJURY_URL },
    { label: "NFL.com: Eagles place Jalen Hurts on injured reserve", href: HURTS_IR },
    { label: "NFL.com October 2026 reserve list", href: RESERVE },
    { label: "NFL.com: Huntley to start again with Jackson out", href: HUNTLEY_AGAIN },
    { label: "NFL.com: Mayfield out at least three weeks, Daniels to start", href: MAYFIELD },
  ],
};

export function week7StartSitBodies(note: Week7StartSitNote = WEEK_7_START_SIT): string[] {
  return [
    note.answer,
    note.window,
    note.byes,
    note.reportGap,
    note.opinion,
    ...note.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    ...note.byeClubs.map((club) => club.body),
    ...note.picks.map((pick) => pick.body),
  ];
}
