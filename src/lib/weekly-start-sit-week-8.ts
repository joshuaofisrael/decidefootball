/**
 * Week 8 editorial start/sit note. Facts stay in this file; the page renders
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

export const WEEK_8_START_SIT_PATH = "/start-sit/2026-week-8/";
export const WEEK_8_START_SIT_UPDATED = "2026-10-28";
export const WEEK_8_START_SIT_TITLE = "Week 8 start sit 2026";
export const WEEK_8_START_SIT_H1 = "Who to start Week 8 fantasy";
export const WEEK_8_START_SIT_DESCRIPTION =
  "Who to start in Week 8 fantasy football, 29 October-2 November 2026. Week 8 start sit 2026: sit the four bye clubs and Jalen Hurts, and do not treat a Week 7 game status as a Week 8 designation. Editorial notes, not the sample start/sit desk and not live licensed stats.";

const WEEK_8_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-8";
const ESPN_WEEK_8 = "https://www.espn.com/nfl/schedule/_/week/8/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const TEXANS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/houston-texans";
const SAINTS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/new-orleans-saints";
const GIANTS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/new-york-giants";
const NINERS_SCHEDULE = "https://www.nfl.com/schedules/2026/by-team/san-francisco-49ers";
const WEEK_8_INJURY_URL = "https://www.nfl.com/injuries/league/2026/reg8";
const PACKERS_REPORT = "https://www.packers.com/news/packers-panthers-injury-report-oct-27-2026";
const HURTS_SEASON = "https://www.nfl.com/news/eagles-qb-jalen-hurts-out-2026-season-blood-clots";
const HURTS_IR =
  "https://www.nfl.com/news/eagles-place-qb-jalen-hurts-on-injured-reserve-due-to-superficial-blood-clot-in-calf";
const MCKEE_LOG = "https://www.nfl.com/players/tanner-mckee/stats/logs/";
const MNF_LEARNED =
  "https://www.nfl.com/news/cowboys-eagles-on-monday-night-football-what-we-learned-from-dallas-38-21-win";

export const WEEK_8_START_SIT_CITATION_HOSTS = ["www.nfl.com", "www.espn.com", "www.packers.com"] as const;

export interface Week8StartSitPick {
  position: StartSitPosition;
  name: string;
  club: string;
  call: StartSitCall;
  window: StartSitWindow;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  nextGame?: string;
}

export interface Week8ByeClubNote {
  club: string;
  /** One to three sentences. */
  body: string;
}

export interface Week8StartSitFaq {
  question: string;
  answer: string;
}

export interface Week8StartSitNote {
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
  byeClubs: Week8ByeClubNote[];
  reportGap: string;
  picks: Week8StartSitPick[];
  opinion: string;
  faqs: Week8StartSitFaq[];
  sources: { label: string; href: string }[];
}

export const WEEK_8_START_SIT: Week8StartSitNote = {
  path: WEEK_8_START_SIT_PATH,
  updated: WEEK_8_START_SIT_UPDATED,
  week: 8,
  season: 2026,
  title: WEEK_8_START_SIT_TITLE,
  h1: WEEK_8_START_SIT_H1,
  description: WEEK_8_START_SIT_DESCRIPTION,
  answer:
    "Sit every Texans, Saints, Giants, and 49ers player. Sit Jalen Hurts (Philadelphia Eagles): the club says he cannot play contact football while treated with blood thinners, and NFL.com reports he is expected to miss the rest of the 2026 season. Editorial lean: start Tanner McKee over Hurts. Do not treat a Week 7 Out or Questionable tag as a Week 8 tag. That includes Lamar Jackson, Zach Charbonnet, Baker Mayfield, Breece Hall, Saquon Barkley, and DeVonta Smith. On 2026-10-28 the league Week 8 injury address still showed the Week 7 report. Check Friday's final injury report before Sunday and Monday, and recheck Thursday before lock.",
  window: `NFL.com's Week 8 schedule runs from Thursday 29 October (Carolina Panthers at Green Bay Packers, 8:15 p.m.) through Monday 2 November (Chicago Bears at Seattle Seahawks, 8:15 p.m.). Sunday 1 November on that page includes the 1:00 p.m. group, Los Angeles Chargers at Los Angeles Rams at 4:05 p.m., Kansas City at Denver and New England at Miami at 4:25 p.m., and Philadelphia at Washington at 8:20 p.m. ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})). ESPN's Week 8 schedule lists the same Thursday-to-Monday window ([ESPN Week 8 schedule](${ESPN_WEEK_8})).`,
  byes: `Week 8 byes are the Houston Texans, New Orleans Saints, New York Giants, and San Francisco 49ers. NFL.com's bye-week list names those four clubs ([NFL.com bye weeks](${NFL_BYES})). NFL.com's team schedules mark Week 8 as a bye for the Texans, the Giants, and the 49ers, and the Saints schedule does not list a Week 8 game ([Texans schedule](${TEXANS_SCHEDULE}); [Giants schedule](${GIANTS_SCHEDULE}); [49ers schedule](${NINERS_SCHEDULE}); [Saints schedule](${SAINTS_SCHEDULE})). The NFL.com Week 8 game list has no game for those four clubs. ESPN's Week 8 bye row lists New Orleans, New York, San Francisco, and Houston, and the same page lists Las Vegas at New York among the games, so that bye row is not the Jets ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE}); [ESPN Week 8 schedule](${ESPN_WEEK_8})). Sit every player on those four clubs. They have no Week 8 game.`,
  byeClubs: [
    {
      club: "Houston Texans",
      body: `NFL.com's Texans schedule marks Week 8 as a bye after the Week 7 final, Giants 27, Texans 21, on Sunday 25 October, and the bye list names the Texans ([Texans schedule](${TEXANS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Texans player, because the Week 8 game list has no Texans game ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})).`,
    },
    {
      club: "New Orleans Saints",
      body: `NFL.com's Saints schedule lists the Week 7 final, Steelers 16, Saints 10, on Sunday 25 October in Saint-Denis, and it does not list a Week 8 game before Browns at Saints in Week 9 ([Saints schedule](${SAINTS_SCHEDULE})). The bye list names the Saints, and the Week 8 game list has no Saints game, so sit every Saints player ([NFL.com bye weeks](${NFL_BYES}); [NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})).`,
    },
    {
      club: "New York Giants",
      body: `NFL.com's Giants schedule marks Week 8 as a bye after the Week 7 final, Giants 27, Texans 21, on Sunday 25 October, and the bye list names the Giants ([Giants schedule](${GIANTS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every Giants player, because the Week 8 game list has no Giants game ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})).`,
    },
    {
      club: "San Francisco 49ers",
      body: `NFL.com's 49ers schedule marks Week 8 as a bye after the Week 7 final, Falcons 29, 49ers 20, on Sunday 25 October, and the bye list names the 49ers ([49ers schedule](${NINERS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})). Sit every 49ers player, because the Week 8 game list has no 49ers game ([NFL.com Week 8 schedule](${WEEK_8_SCHEDULE})).`,
    },
  ],
  reportGap: `On ${WEEK_8_START_SIT_UPDATED}, the league address for Week 8 still presented the Week 7 injury report, headed Week 7 and opening with Thursday 22 October ([NFL.com injury report](${WEEK_8_INJURY_URL})). The Packers' 27 October note for Panthers at Packers leaves every game-status cell blank, and it says the Monday and Tuesday participation figures are an estimation ([Packers injury report](${PACKERS_REPORT})). A Week 7 Out, Doubtful, or Questionable label is not a Week 8 label. For Sunday and Monday, check Friday's final injury report. For Thursday, recheck the final report before lock.`,
  picks: [
    {
      position: "QB",
      name: "Bryce Young",
      club: "Carolina Panthers",
      call: "recheck",
      window: "thursday",
      nextGame: "Panthers at Packers, Thursday 29 October",
      body: `The 27 October report lists Bryce Young (knee) at full participation on Monday and Tuesday, with the game-status cell blank ([Packers injury report](${PACKERS_REPORT})). Full participation and a blank game status are not an Out. Editorial opinion: do not sit him on that blank, and recheck the final Thursday report before lock.`,
    },
    {
      position: "WR",
      name: "Matthew Golden",
      club: "Green Bay Packers",
      call: "recheck",
      window: "thursday",
      nextGame: "Panthers at Packers, Thursday 29 October",
      body: `The Packers' 27 October report lists Matthew Golden (shoulder and foot) as did not participate on Monday and Tuesday, with the Wednesday and game-status cells blank ([Packers injury report](${PACKERS_REPORT})). A blank game status is not an Out. Recheck the final Thursday report before lock, because Friday's injury report is after this game.`,
    },
    {
      position: "QB",
      name: "Jalen Hurts",
      club: "Philadelphia Eagles",
      call: "sit",
      window: "later",
      nextGame: "Eagles at Commanders, Sunday 1 November",
      body: `Sit Jalen Hurts. The Eagles and his agent said the current diagnosis is a deep vein thrombosis and bilateral pulmonary emboli, that treatment is blood thinners, and that he will not be allowed to play contact football, and NFL.com reported he is expected to miss the remainder of the 2026 season ([NFL.com](${HURTS_SEASON})). He was placed on injured reserve to miss at least the next four games after the earlier calf finding ([NFL.com](${HURTS_IR})).`,
    },
    {
      position: "QB",
      name: "Tanner McKee",
      club: "Philadelphia Eagles",
      call: "start",
      window: "later",
      nextGame: "Eagles at Commanders, Sunday 1 November",
      body: `Tanner McKee's Week 7 log lists 23 completions on 35 attempts for 211 yards, a touchdown, and an interception in the 21-38 loss to Dallas, and the Monday recap calls that night his fourth career start ([game log](${MCKEE_LOG}); [What We Learned](${MNF_LEARNED})). The same recap says the Eagles are likely losing Jalen Hurts for the season due to blood clots ([NFL.com](${MNF_LEARNED})). Editorial opinion: start McKee over Hurts at Washington, and check Friday's final injury report only to confirm the club has not named a different quarterback.`,
    },
    {
      position: "QB",
      name: "Lamar Jackson",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Ravens at Bills, Sunday 1 November",
      body: `Lamar Jackson (ankle) is out on the Week 7 table for the Browns game ([injury report](${WEEK_8_INJURY_URL})). That Sunday designation is not a Week 8 Out label for Ravens at Bills. Check Friday's final injury report before you sit him or start a backup.`,
    },
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Ravens at Bills, Sunday 1 November",
      body: `The Week 7 injury page carries the headline that Tyler Huntley would start again with Jackson out against the Browns ([injury report](${WEEK_8_INJURY_URL})). That line does not name the Week 8 starter at Buffalo. Editorial opinion: start Huntley over Jackson in Week 8 only if Friday's final injury report still has Jackson out.`,
    },
    {
      position: "QB",
      name: "Baker Mayfield",
      club: "Tampa Bay Buccaneers",
      call: "recheck",
      window: "later",
      nextGame: "Falcons at Buccaneers, Sunday 1 November",
      body: `Baker Mayfield (thumb) is questionable on the Week 7 table ([injury report](${WEEK_8_INJURY_URL})). That Sunday label is not a Week 8 Questionable label for Falcons at Buccaneers. Check Friday's final injury report before you sit him.`,
    },
    {
      position: "RB",
      name: "Saquon Barkley",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Eagles at Commanders, Sunday 1 November",
      body: `Saquon Barkley was questionable with a hamstring on the Week 7 table, then the Monday recap says he logged nine snaps and 71 yards before leaving in the third quarter with what was labeled a back injury ([injury report](${WEEK_8_INJURY_URL}); [What We Learned](${MNF_LEARNED})). That Monday label is not a Week 8 Out for Eagles at Commanders. Check Friday's final injury report before you start him.`,
    },
    {
      position: "RB",
      name: "Breece Hall",
      club: "New York Jets",
      call: "recheck",
      window: "later",
      nextGame: "Raiders at Jets, Sunday 1 November",
      body: `Breece Hall (quadricep) is questionable on the Week 7 table ([injury report](${WEEK_8_INJURY_URL})). That Sunday label is not a Week 8 Questionable label for Raiders at Jets. Check Friday's final injury report before you sit him or start a backup.`,
    },
    {
      position: "RB",
      name: "Zach Charbonnet",
      club: "Seattle Seahawks",
      call: "recheck",
      window: "later",
      nextGame: "Bears at Seahawks, Monday 2 November",
      body: `Zach Charbonnet (knee) is out on the Week 7 table for Sunday night ([injury report](${WEEK_8_INJURY_URL})). That Sunday label is not a Week 8 Out label for Bears at Seahawks. Check Friday's final injury report before Monday.`,
    },
    {
      position: "WR",
      name: "DeVonta Smith",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Eagles at Commanders, Sunday 1 November",
      body: `DeVonta Smith (hamstring) is out on the Week 7 table for the Cowboys game, and the Monday recap says the Eagles faced Dallas without him ([injury report](${WEEK_8_INJURY_URL}); [What We Learned](${MNF_LEARNED})). That Monday absence is not a Week 8 Out label. Check Friday's final injury report before you sit him at Washington.`,
    },
  ],
  opinion:
    "Lineup leans on this page are editorial opinion, not a model output and not licensed projections. A bye is a sit. A player the club says cannot play contact football is a sit. A Week 7 game status is not a Week 8 game status. For Sunday night, the lean at quarterback is Tanner McKee because Jalen Hurts is not allowed to play contact while on blood thinners. For every other injury-dependent Sunday or Monday name, check Friday's final injury report, and for Thursday check the final report before lock. This desk is not publishing a point projection.",
  faqs: [
    {
      question: "When is NFL Week 8 in 2026?",
      answer:
        "Thursday 29 October through Monday 2 November 2026. Thursday is Panthers at Packers at 8:15 p.m. Monday is Bears at Seahawks at 8:15 p.m. Sunday 1 November includes the 1:00 p.m. group and ends with Eagles at Commanders at 8:20 p.m.",
    },
    {
      question: "Which NFL teams are on bye in Week 8?",
      answer:
        "The Houston Texans, New Orleans Saints, New York Giants, and San Francisco 49ers. Sit every player on those four clubs. They have no Week 8 game.",
    },
    {
      question: "Is a Week 7 Out a Week 8 sit?",
      answer:
        "No. On 2026-10-28 the Week 8 injury-report address still showed the Week 7 table. A Week 7 designation is not a Week 8 designation. Check Friday's final injury report before Sunday and Monday. Jalen Hurts is a separate sit because the club says he cannot play contact football while on blood thinners.",
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
    { label: "NFL.com injury report address checked 2026-10-28", href: WEEK_8_INJURY_URL },
    { label: "Packers-Panthers injury report, 27 October 2026", href: PACKERS_REPORT },
    { label: "NFL.com: Hurts expected to miss the rest of the 2026 season", href: HURTS_SEASON },
    { label: "NFL.com: Eagles place Jalen Hurts on injured reserve", href: HURTS_IR },
    { label: "Tanner McKee game log", href: MCKEE_LOG },
    { label: "NFL.com: What We Learned from Cowboys 38, Eagles 21", href: MNF_LEARNED },
  ],
};

export function week8StartSitBodies(note: Week8StartSitNote = WEEK_8_START_SIT): string[] {
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
