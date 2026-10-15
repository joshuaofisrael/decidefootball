/**
 * Dated editorial start/sit note. Copy the module for a later week and point a
 * new route under /start-sit/ at it. Facts stay in this file; the page
 * renders them. Citations use [label](https://...) inside body strings.
 */

export const WEEKLY_START_SIT_PATH = "/start-sit/2026-week-6/";
export const WEEKLY_START_SIT_UPDATED = "2026-10-15";
export const WEEKLY_START_SIT_TITLE = "Week 6 start sit 2026";
export const WEEKLY_START_SIT_H1 = "Who to start Week 6 fantasy";
export const WEEKLY_START_SIT_DESCRIPTION =
  "Who to start in Week 6 fantasy football, 15-19 October 2026. Week 6 start sit 2026: sit Zach Charbonnet and the four bye clubs, and do not treat a blank Sunday game status as a designation. Editorial notes, not the sample start/sit desk and not live licensed stats.";

const WEEK_6_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-6";
const ESPN_WEEK_6 = "https://www.espn.com/nfl/schedule/_/week/6/year/2026/seasontype/2";
const NFL_BYES = "https://www.nfl.com/news/2026-nfl-schedule-release-every-team-bye-week";
const LIONS_SCHEDULE = "https://www.detroitlions.com/news/lions-announce-2026-schedule";
const WEEK_6_INJURY_NEWS = "https://www.nfl.com/news/nfl-week-6-injury-report-2026-season";
const WEEK_6_INJURY_URL = "https://www.nfl.com/injuries/league/2026/reg6";
const WEEK_5_INJURY_ROUNDUP =
  "https://www.nfl.com/news/nfl-week-5-injury-report-player-statuses-for-all-15-games";
const WEEK_5_SUNDAY_INJURIES =
  "https://www.nfl.com/news/notable-injuries-news-sunday-week-5-games-2026";
const WEEK_5_LEARNED =
  "https://www.nfl.com/news/2026-nfl-season-week-5-what-we-learned-from-sunday-s-games";
const SEAHAWKS_INJURY = "https://www.seahawks.com/team/injury-report/week/reg-6";
const PRICE_IR = "https://www.nfl.com/news/seahawks-placing-rb-jadarian-price-chest-on-injured-reserve";
const PENIX_START =
  "https://www.nfl.com/news/falcons-qb-michael-penix-jr-ribs-expected-to-start-week-6-vs-bears";
const WILLIAMS_FLUID =
  "https://www.nfl.com/news/caleb-williams-hamstring-to-practice-in-full-as-bears-qb-situation-remains-fluid-ahead-of-week-6";
const WILSON_LOG = "https://www.nfl.com/players/emanuel-wilson/stats/logs/2026/";
const HOLANI_LOG = "https://www.nfl.com/players/george-holani/stats/logs/";
const HUNTLEY_LOG = "https://www.nfl.com/players/tyler-huntley/stats/logs/";
const ALLEN_LOG = "https://www.nfl.com/players/braelon-allen/stats/logs/";
const MARKS_LOG = "https://www.nfl.com/players/woody-marks/stats/logs/";
const PIERCE_LOG = "https://www.nfl.com/players/dameon-pierce/stats/logs/";
const COOPER_LOG = "https://www.nfl.com/players/darius-cooper/stats/logs/";

export const CITATION_HOSTS = [
  "www.nfl.com",
  "www.espn.com",
  "www.seahawks.com",
  "www.detroitlions.com",
] as const;

export type StartSitPosition = "QB" | "RB" | "WR" | "TE";
export type StartSitCall = "sit" | "start" | "recheck";
export type StartSitWindow = "thursday" | "later";

export interface StartSitPick {
  position: StartSitPosition;
  name: string;
  club: string;
  call: StartSitCall;
  window: StartSitWindow;
  /** One to three sentences. Inline citations are [label](https://...). */
  body: string;
  nextGame?: string;
}

export interface ByeClubNote {
  club: string;
  /** One to three sentences. */
  body: string;
}

export interface WeeklyStartSitNote {
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
  byeClubs: ByeClubNote[];
  reportGap: string;
  picks: StartSitPick[];
  opinion: string;
  sources: { label: string; href: string }[];
}

export const WEEK_6_START_SIT: WeeklyStartSitNote = {
  path: WEEKLY_START_SIT_PATH,
  updated: WEEKLY_START_SIT_UPDATED,
  week: 6,
  season: 2026,
  title: WEEKLY_START_SIT_TITLE,
  h1: WEEKLY_START_SIT_H1,
  description: WEEKLY_START_SIT_DESCRIPTION,
  answer:
    "Sit Zach Charbonnet (Seattle Seahawks, knee, out Thursday). Sit every Bengals, Lions, Dolphins, and Vikings player, including Ja'Marr Chase, Jahmyr Gibbs, Amon-Ra St. Brown, Justin Jefferson, and Ollie Gordon II. Editorial lean for Thursday: start Emanuel Wilson over George Holani, and do not sit Jaxon Smith-Njigba on a blank tag. Sunday and Monday game statuses were blank on the league report checked 15 October 2026, including Lamar Jackson, Breece Hall, David Montgomery, Saquon Barkley, Will Shipley, and DeVonta Smith.",
  window: `NFL.com's Week 6 schedule runs from Thursday 15 October (Seattle Seahawks at Denver Broncos, 8:15 p.m.) through Monday 19 October (Washington Commanders at San Francisco 49ers, 8:15 p.m.), with the Sunday 18 October slate in between ([NFL.com Week 6 schedule](${WEEK_6_SCHEDULE})). The Week 6 injury roundup lists that Thursday game at 8:15 p.m. ET at Empower Field at Mile High and the Monday game at 8:15 p.m. ET, and it places Houston vs. Jacksonville at Wembley Stadium on Sunday ([NFL.com Week 6 injury report](${WEEK_6_INJURY_NEWS})). ESPN's Week 6 schedule lists the same Thursday-to-Monday window ([ESPN Week 6 schedule](${ESPN_WEEK_6})).`,
  byes: `Week 6 byes are the Cincinnati Bengals, Detroit Lions, Miami Dolphins, and Minnesota Vikings ([NFL.com bye weeks](${NFL_BYES})). ESPN's Week 6 page lists the same bye group ([ESPN Week 6 schedule](${ESPN_WEEK_6})). The NFL.com Week 6 game list has no Bengals, Lions, Dolphins, or Vikings game ([NFL.com Week 6 schedule](${WEEK_6_SCHEDULE})). Sit every player on those four clubs. They have no Week 6 game.`,
  byeClubs: [
    {
      club: "Cincinnati Bengals",
      body: `NFL.com's Week 5 recap says Ja'Marr Chase caught six passes for 77 yards, including a 45-yard touchdown, in the win that sent Cincinnati into its bye ([What We Learned](${WEEK_5_LEARNED})). The same recap says Chase Brown did not lead the club in carries, Samaje Perine had 14 carries for 68 yards, and Brown has 22 carries for 49 yards over the last two games. The bye list names the Bengals in Week 6 ([NFL.com bye weeks](${NFL_BYES})).`,
    },
    {
      club: "Detroit Lions",
      body: `NFL.com's Week 5 recap says Jahmyr Gibbs had 25 carries for 151 yards and two touchdowns against the Cardinals, Amon-Ra St. Brown caught six passes for 69 yards, and Jameson Williams caught two passes for 47 yards and two touchdowns ([What We Learned](${WEEK_5_LEARNED})). The same recap names Sam LaPorta in that offense. Detroit's schedule marks Week 6 as a bye, and the bye list names the Lions ([Lions schedule](${LIONS_SCHEDULE}); [NFL.com bye weeks](${NFL_BYES})).`,
    },
    {
      club: "Miami Dolphins",
      body: `NFL.com's Week 5 recap says Ollie Gordon II led Miami with 18 carries for 88 yards and a touchdown, and it describes the ground game as going on despite the loss of De'Von Achane ([What We Learned](${WEEK_5_LEARNED})). The bye list names the Dolphins in Week 6 ([NFL.com bye weeks](${NFL_BYES})).`,
    },
    {
      club: "Minnesota Vikings",
      body: `NFL.com's Week 5 recap says Justin Jefferson caught six of seven targets for 79 yards and a touchdown, Aaron Jones had 25 carries for 113 yards and a touchdown, and T.J. Hockenson (concussion) was sidelined on the first drive ([What We Learned](${WEEK_5_LEARNED})). The bye list names the Vikings in Week 6 ([NFL.com bye weeks](${NFL_BYES})).`,
    },
  ],
  reportGap: `Thursday's game statuses are posted. The Week 6 injury roundup lists running back Zach Charbonnet (knee) out for Seattle, along with linebackers Chazz Surratt (calf) and Drake Thomas (ankle), and it lists cornerback Patrick Surtain II (ankle) and safety Talanoa Hufanga out for Denver, with cornerback Riley Moss (ribs) questionable ([NFL.com Week 6 injury report](${WEEK_6_INJURY_NEWS})). That Denver list does not name a quarterback, running back, wide receiver, or tight end. The same roundup lists the Sunday 18 October and Monday 19 October games without a player status. On the league injury-report table checked ${WEEKLY_START_SIT_UPDATED}, those Sunday and Monday rows show practice participation and leave Game Status blank ([NFL.com injury report](${WEEK_6_INJURY_URL})). A blank game status is not an Out, Doubtful, or Questionable label. Recheck the table before Sunday lock.`,
  picks: [
    {
      position: "RB",
      name: "Zach Charbonnet",
      club: "Seattle Seahawks",
      call: "sit",
      window: "thursday",
      nextGame: "Seahawks at Broncos, Thursday 15 October",
      body: `Sit Zach Charbonnet. The Week 6 injury roundup lists him out with a knee injury for Thursday's game at Denver ([NFL.com Week 6 injury report](${WEEK_6_INJURY_NEWS})). The league table lists limited practice and game status Out, and the Seahawks' own Week 6 report lists the same game status ([NFL.com injury report](${WEEK_6_INJURY_URL}); [Seahawks injury report](${SEAHAWKS_INJURY})).`,
    },
    {
      position: "RB",
      name: "Emanuel Wilson",
      club: "Seattle Seahawks",
      call: "start",
      window: "thursday",
      nextGame: "Seahawks at Broncos, Thursday 15 October",
      body: `Emanuel Wilson's Week 5 game log lists 20 carries for 61 yards and a touchdown, two receptions for 11 yards, and a lost fumble in the loss to the 49ers ([NFL.com game log](${WILSON_LOG})). The Thursday injury report does not list him out ([NFL.com injury report](${WEEK_6_INJURY_URL})). Editorial opinion: start him over Zach Charbonnet, who is out, and over George Holani, whose log shows four carries in that same game ([George Holani game log](${HOLANI_LOG})).`,
    },
    {
      position: "RB",
      name: "George Holani",
      club: "Seattle Seahawks",
      call: "recheck",
      window: "thursday",
      nextGame: "Seahawks at Broncos, Thursday 15 October",
      body: `George Holani's Week 5 log lists four carries for 7 yards and four receptions for 24 yards, with two fumbles and one lost ([NFL.com game log](${HOLANI_LOG})). He was questionable with ribs and a knee for Week 5 ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 Seahawks report lists full participation Wednesday and no game status, so this note is not calling him out ([Seahawks injury report](${SEAHAWKS_INJURY})).`,
    },
    {
      position: "WR",
      name: "Jaxon Smith-Njigba",
      club: "Seattle Seahawks",
      call: "recheck",
      window: "thursday",
      nextGame: "Seahawks at Broncos, Thursday 15 October",
      body: `Jaxon Smith-Njigba is not listed out. The Seahawks' Week 6 report shows an ankle, limited practice Monday and Tuesday, full practice Wednesday, and no game status ([Seahawks injury report](${SEAHAWKS_INJURY})). The league table also lists full participation and a blank game status ([NFL.com injury report](${WEEK_6_INJURY_URL})).`,
    },
    {
      position: "RB",
      name: "Jadarian Price",
      club: "Seattle Seahawks",
      call: "recheck",
      window: "thursday",
      nextGame: "Seahawks at Broncos, Thursday 15 October",
      body: `Do not treat Jadarian Price as a verified Week 6 start. NFL.com reported that the Seahawks placed him on injured reserve with a chest injury and that he was slated to miss at least the next four games ([NFL.com](${PRICE_IR})). This note did not find a later activation in the Week 6 injury report or the Thursday roundup.`,
    },
    {
      position: "QB",
      name: "Lamar Jackson",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Ravens at Browns, Sunday 18 October",
      body: `Lamar Jackson was out for Week 5 with an ankle injury ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 league table lists him as did not participate in practice and does not print an injury or a game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). That blank is not a Week 6 Out label, and it is not a start.`,
    },
    {
      position: "QB",
      name: "Tyler Huntley",
      club: "Baltimore Ravens",
      call: "recheck",
      window: "later",
      nextGame: "Ravens at Browns, Sunday 18 October",
      body: `Tyler Huntley's Week 5 game log, in the 30-23 overtime win at Atlanta, lists 24 completions on 32 attempts for 201 yards, two touchdown passes, no interceptions, and six rushes for 20 yards and a touchdown ([NFL.com game log](${HUNTLEY_LOG})). The Week 6 table does not list him ([NFL.com injury report](${WEEK_6_INJURY_URL})). Editorial opinion: he is the quarterback to start only if Jackson is not confirmed, and this note does not have a Week 6 starter announcement.`,
    },
    {
      position: "QB",
      name: "Michael Penix Jr",
      club: "Atlanta Falcons",
      call: "start",
      window: "later",
      nextGame: "Bears at Falcons, Sunday 18 October",
      body: `Coach Kevin Stefanski said "Yes" when asked if Michael Penix Jr would start against Chicago, and "As long as everything goes according to plan, yes" ([NFL.com](${PENIX_START})). The Week 6 table lists full participation and no game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). Editorial opinion: that is a start lean, not a posted Out or Questionable tag.`,
    },
    {
      position: "QB",
      name: "Caleb Williams",
      club: "Chicago Bears",
      call: "recheck",
      window: "later",
      nextGame: "Bears at Falcons, Sunday 18 October",
      body: `The Week 5 injury roundup listed Caleb Williams questionable with a hamstring injury ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). NFL.com reported Wednesday that he would be a full participant in that day's walkthrough after missing the past three weeks, and that Ben Johnson called the quarterback situation "still fluid" ([NFL.com](${WILLIAMS_FLUID})). The Week 6 table lists full participation and no game status, so this note is not calling him the starter ([NFL.com injury report](${WEEK_6_INJURY_URL})).`,
    },
    {
      position: "RB",
      name: "Breece Hall",
      club: "New York Jets",
      call: "recheck",
      window: "later",
      nextGame: "Jets at Patriots, Sunday 18 October",
      body: `Breece Hall was out for Week 5 with a quadriceps injury ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 table lists did not participate and leaves injury and game status blank ([NFL.com injury report](${WEEK_6_INJURY_URL})). That is not a Week 6 Out label.`,
    },
    {
      position: "RB",
      name: "Braelon Allen",
      club: "New York Jets",
      call: "recheck",
      window: "later",
      nextGame: "Jets at Patriots, Sunday 18 October",
      body: `Braelon Allen's Week 5 log lists 24 carries for 116 yards and a touchdown, long 22, plus one reception for no yards and a fumble that was not lost, in the Jets' 17-12 win over the Browns ([NFL.com game log](${ALLEN_LOG})). NFL.com's recap describes that 22-yard score as the play that ended New York's scoring ([What We Learned](${WEEK_5_LEARNED})). Editorial opinion: he is the back to start if Hall is not confirmed, and the Week 6 table has not confirmed that.`,
    },
    {
      position: "RB",
      name: "David Montgomery",
      club: "Houston Texans",
      call: "recheck",
      window: "later",
      nextGame: "Texans vs. Jaguars in London, Sunday 18 October",
      body: `David Montgomery was ruled out of Houston's Week 5 win over the Titans with a groin injury ([NFL.com Sunday injury notes](${WEEK_5_SUNDAY_INJURIES})). The Week 6 table lists did not participate and leaves game status blank ([NFL.com injury report](${WEEK_6_INJURY_URL})). That blank is not a Week 6 Out label.`,
    },
    {
      position: "RB",
      name: "Woody Marks",
      club: "Houston Texans",
      call: "recheck",
      window: "later",
      nextGame: "Texans vs. Jaguars in London, Sunday 18 October",
      body: `Woody Marks's Week 5 log in the 26-3 win lists 15 carries for 62 yards and four receptions for 23 yards ([NFL.com game log](${MARKS_LOG})). The Week 6 table does not list him out ([NFL.com injury report](${WEEK_6_INJURY_URL})). Editorial opinion: he is the Texans back to start if Montgomery is not confirmed.`,
    },
    {
      position: "RB",
      name: "Saquon Barkley",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `Saquon Barkley (hamstring) was out in Week 5 ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 table lists did not participate and no game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). That is not a Week 6 Out label.`,
    },
    {
      position: "RB",
      name: "Will Shipley",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `NFL.com's Week 5 recap says the Eagles lost Will Shipley to a foot injury after he scored the opening touchdown ([What We Learned](${WEEK_5_LEARNED})). The Week 6 table lists did not participate and no game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). That blank is not a Week 6 Out label.`,
    },
    {
      position: "RB",
      name: "Dameon Pierce",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `Dameon Pierce's Week 5 log lists 11 carries for 14 yards and two receptions for minus 2 yards in the 17-19 loss at Jacksonville ([NFL.com game log](${PIERCE_LOG})). NFL.com's recap says the Eagles finished with 22 rushing yards, their fewest since Week 7, 2015 ([What We Learned](${WEEK_5_LEARNED})). The Week 6 table does not list Pierce, so it does not rule him out ([NFL.com injury report](${WEEK_6_INJURY_URL})).`,
    },
    {
      position: "WR",
      name: "DeVonta Smith",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `DeVonta Smith (hamstring) was out for Week 5 ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 table lists did not participate and no game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). That blank is not a Week 6 Out label.`,
    },
    {
      position: "WR",
      name: "Marquise Brown",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `Marquise Brown (ankle) was out for Week 5 ([NFL.com Week 5 injury report](${WEEK_5_INJURY_ROUNDUP})). The Week 6 table lists limited participation and no game status ([NFL.com injury report](${WEEK_6_INJURY_URL})). That is not a Week 6 Questionable label.`,
    },
    {
      position: "WR",
      name: "Darius Cooper",
      club: "Philadelphia Eagles",
      call: "recheck",
      window: "later",
      nextGame: "Panthers at Eagles, Sunday 18 October",
      body: `Darius Cooper's Week 5 log lists two receptions for 71 yards and a touchdown, long 62, in the loss at Jacksonville ([NFL.com game log](${COOPER_LOG})). The Week 6 table does not list him ([NFL.com injury report](${WEEK_6_INJURY_URL})). Editorial opinion: he is a receiver to start only if DeVonta Smith is not confirmed, and Smith's Week 6 game status is blank.`,
    },
  ],
  opinion:
    "Lineup leans on this page are editorial opinion, not a model output and not licensed projections. A posted Out is a sit. A bye is a sit. A blank Sunday or Monday game status is neither a sit nor a start. For Thursday, the lean at running back is Emanuel Wilson because Zach Charbonnet is out and Wilson had the Week 5 carries. This desk is not publishing a point projection.",
  sources: [
    { label: "NFL.com Week 6 schedule", href: WEEK_6_SCHEDULE },
    { label: "ESPN Week 6 schedule", href: ESPN_WEEK_6 },
    { label: "NFL.com 2026 bye weeks", href: NFL_BYES },
    { label: "Detroit Lions 2026 schedule release", href: LIONS_SCHEDULE },
    { label: "NFL.com Week 6 injury report", href: WEEK_6_INJURY_NEWS },
    { label: "NFL.com injury report address checked 2026-10-15", href: WEEK_6_INJURY_URL },
    { label: "NFL.com Week 5 injury report", href: WEEK_5_INJURY_ROUNDUP },
    { label: "NFL.com Week 5 Sunday injury notes", href: WEEK_5_SUNDAY_INJURIES },
    { label: "NFL.com Week 5 What We Learned", href: WEEK_5_LEARNED },
    { label: "Seahawks Week 6 injury report", href: SEAHAWKS_INJURY },
    { label: "NFL.com: Jadarian Price placed on injured reserve", href: PRICE_IR },
    { label: "NFL.com: Penix expected to start Week 6", href: PENIX_START },
    { label: "NFL.com: Williams and a fluid quarterback plan", href: WILLIAMS_FLUID },
    { label: "Emanuel Wilson game log", href: WILSON_LOG },
    { label: "George Holani game log", href: HOLANI_LOG },
    { label: "Tyler Huntley game log", href: HUNTLEY_LOG },
    { label: "Braelon Allen game log", href: ALLEN_LOG },
    { label: "Woody Marks game log", href: MARKS_LOG },
    { label: "Dameon Pierce game log", href: PIERCE_LOG },
    { label: "Darius Cooper game log", href: COOPER_LOG },
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

export function callLabel(call: StartSitCall): string {
  if (call === "sit") return "Sit";
  if (call === "start") return "Start";
  return "Recheck";
}

export function weeklyStartSitBodies(note: WeeklyStartSitNote = WEEK_6_START_SIT): string[] {
  return [
    note.answer,
    note.window,
    note.byes,
    note.reportGap,
    note.opinion,
    ...note.byeClubs.map((club) => club.body),
    ...note.picks.map((pick) => pick.body),
  ];
}

/** Sentence count that does not split initials such as T.J. or St. */
export function proseSentences(body: string): string[] {
  const protectedBody = body.replace(/\b(?:[A-Z]|St|Jr)\./g, (token) => token.replaceAll(".", ""));
  return protectedBody.split(/(?<=\.)\s+/).filter((sentence) => sentence.length > 0);
}
