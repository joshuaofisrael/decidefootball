/**
 * Thanksgiving week 2026 how-to-watch facts.
 * Kickoffs and national windows are copied from the May 14, 2026 NFL schedule
 * release and NFL.com articles. Clock columns other than ET are conversions.
 * TODO: a future disclosed how-to-watch affiliate, if any, belongs in the
 * disclaimer. Do not add a live affiliate URL here.
 */

export const THANKSGIVING_WATCH_PATH = "/guide/thanksgiving-nfl-how-to-watch/";
export const THANKSGIVING_WATCH_UPDATED = "2026-10-16";
export const THANKSGIVING_WATCH_TITLE = "NFL Thanksgiving 2026: How to Watch All 5 Games";
export const THANKSGIVING_WATCH_H1 = "NFL Thanksgiving 2026: How to Watch All 5 Games";
export const THANKSGIVING_WATCH_DESCRIPTION =
  "How to watch all 5 NFL Thanksgiving week games in 2026: kickoffs in ET and PT, and the announced channel or stream for each game. Not affiliated with the NFL. Not gambling advice.";

export const NFL_THANKSGIVING_ARTICLE =
  "https://www.nfl.com/news/thanksgiving-2026-nfl-schedule-release";
export const NFL_PACKERS_RAMS_ARTICLE =
  "https://www.nfl.com/news/packers-rams-thanksgiving-eve-netflix-2026-nfl-schedule-release";
export const NFL_MEDIA_RELEASE =
  "https://media.nfl.com/football-information/2026/news/2026-nfl-schedule-announced";
export const NFL_PLUS_PLAN =
  "https://www.nfl.com/news/nfl-make-your-plan-to-watch-the-2026-nfl-season";
export const NETFLIX_TUDUM_SCHEDULE =
  "https://www.netflix.com/tudum/features/nfl-on-netflix-schedule";
export const NETFLIX_TUDUM_EXPANSION =
  "https://www.netflix.com/tudum/articles/nfl-games-on-netflix";

/** Public operations.nfl.com paths checked on 2026-10-16. None returned a 2026 schedule. */
export const OPERATIONS_URLS_CHECKED = [
  "https://operations.nfl.com/updates/the-game/2026-nfl-schedule-announced/",
  "https://operations.nfl.com/updates/football-ops/2026-nfl-schedule-announced/",
  "https://operations.nfl.com/calendar-events/nfl-schedule/2026-regular-season-schedule/",
] as const;

export const CITATION_HOSTS = ["www.nfl.com", "media.nfl.com", "www.netflix.com", "operations.nfl.com"] as const;

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

export interface KickoffEt {
  /** 24-hour clock in Eastern time, as stated by the NFL sources. */
  hour: number;
  minute: number;
}

export const US_KICKOFF_ZONES = [
  { id: "ET", label: "ET", offsetHours: 0 },
  { id: "CT", label: "CT", offsetHours: -1 },
  { id: "MT", label: "MT", offsetHours: -2 },
  { id: "PT", label: "PT", offsetHours: -3 },
  { id: "AKT", label: "AKT", offsetHours: -4 },
  { id: "HT", label: "HT", offsetHours: -5 },
] as const;

export function formatKickoff(et: KickoffEt, offsetHours: number): string {
  const day = 24 * 60;
  const raw = et.hour * 60 + et.minute + offsetHours * 60;
  const minutes = ((raw % day) + day) % day;
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "p.m." : "a.m.";
  const hour12 = hour24 % 12 || 12;
  const minuteText = minute === 0 ? "" : `:${String(minute).padStart(2, "0")}`;
  return `${hour12}${minuteText} ${suffix}`;
}

/** Eastern standard time. November 25-27, 2026 is after the November 1 clock change. */
export function startDateIso(date: string, et: KickoffEt): string {
  const hh = String(et.hour).padStart(2, "0");
  const mm = String(et.minute).padStart(2, "0");
  return `${date}T${hh}:${mm}:00-05:00`;
}

export interface ThanksgivingGame {
  id: string;
  away: string;
  home: string;
  date: string;
  dateLabel: string;
  holiday: string;
  et: KickoffEt;
  venue: string;
  locality: string;
  region: string;
  /** National window named in the May 14, 2026 NFL schedule release. */
  national: string;
  watchCell: string;
  notes: readonly string[];
}

export interface WatchSource {
  id: string;
  label: string;
  href: string;
  usedFor: string;
}

export interface WatchFaq {
  question: string;
  answer: string;
}

const release = (label: string) => `[${label}](${NFL_MEDIA_RELEASE})`;
const thanksgiving = (label: string) => `[${label}](${NFL_THANKSGIVING_ARTICLE})`;
const plusPlan = (label: string) => `[${label}](${NFL_PLUS_PLAN})`;

export const THANKSGIVING_GAMES: readonly ThanksgivingGame[] = [
  {
    id: "packers-rams",
    away: "Green Bay Packers",
    home: "Los Angeles Rams",
    date: "2026-11-25",
    dateLabel: "Wednesday, November 25, 2026",
    holiday: "Thanksgiving Eve",
    et: { hour: 20, minute: 0 },
    venue: "SoFi Stadium",
    locality: "Inglewood",
    region: "CA",
    national: "Netflix",
    watchCell: "Netflix",
    notes: [
      `${release("The May 14, 2026 NFL schedule release")} says Netflix will stream the first Thanksgiving Eve game when Green Bay visits the Los Angeles Rams on Wednesday, November 25, at 8 p.m. ET in Week 12. ${thanksgiving("The NFL.com Thanksgiving week article")} gives the same kickoff and network and places the game at SoFi Stadium in Inglewood, California. ${`[A separate NFL.com article](${NFL_PACKERS_RAMS_ARTICLE})`} repeats Week 12, November 25, 8 p.m. ET, SoFi Stadium, and Netflix.`,
      `${`[Netflix Tudum's NFL schedule](${NETFLIX_TUDUM_SCHEDULE})`}, updated September 11, 2026, lists the Green Bay Packers at the Los Angeles Rams on Wednesday, November 25, at SoFi Stadium, live on Netflix, and marks the kickoff time TBA. This page prints 8 p.m. ET because the NFL release and NFL.com state that time. It does not treat the Tudum page as a confirmation of the clock. ${`[Tudum's expansion article](${NETFLIX_TUDUM_EXPANSION})`} says Netflix's 2026 NFL games are also available on local over-the-air television in the team markets. No local station and no price are named here.`,
    ],
  },
  {
    id: "bears-lions",
    away: "Chicago Bears",
    home: "Detroit Lions",
    date: "2026-11-26",
    dateLabel: "Thursday, November 26, 2026",
    holiday: "Thanksgiving Day",
    et: { hour: 13, minute: 0 },
    venue: "Ford Field",
    locality: "Detroit",
    region: "MI",
    national: "CBS",
    watchCell: "CBS; NFL.com also lists Paramount+ and NFL+",
    notes: [
      `${release("The May 14 release")} says the Bears travel to Detroit to face the Lions at 1 p.m. ET on CBS. ${thanksgiving("The NFL.com Thanksgiving article")} places the game at Ford Field in Detroit and lists CBS, Paramount+, and NFL+. ${plusPlan("The NFL+ season plan")} dates it Thursday, November 26, at 1 p.m. ET.`,
    ],
  },
  {
    id: "eagles-cowboys",
    away: "Philadelphia Eagles",
    home: "Dallas Cowboys",
    date: "2026-11-26",
    dateLabel: "Thursday, November 26, 2026",
    holiday: "Thanksgiving Day",
    et: { hour: 16, minute: 30 },
    venue: "AT&T Stadium",
    locality: "Arlington",
    region: "TX",
    national: "FOX",
    watchCell: "FOX; NFL.com also lists FOX One and NFL+",
    notes: [
      `${release("The May 14 release")} says the Philadelphia Eagles visit the Dallas Cowboys at 4:30 p.m. ET on FOX. ${thanksgiving("The NFL.com Thanksgiving article")} places the game at AT&T Stadium in Arlington, Texas, and lists FOX, FOX One, and NFL+. ${plusPlan("The NFL+ season plan")} dates it Thursday, November 26, at 4:30 p.m. ET.`,
    ],
  },
  {
    id: "chiefs-bills",
    away: "Kansas City Chiefs",
    home: "Buffalo Bills",
    date: "2026-11-26",
    dateLabel: "Thursday, November 26, 2026",
    holiday: "Thanksgiving Day",
    et: { hour: 20, minute: 20 },
    venue: "Highmark Stadium",
    locality: "Orchard Park",
    region: "NY",
    national: "NBC",
    watchCell: "NBC; NFL.com also lists Peacock and NFL+",
    notes: [
      `${release("The May 14 release")} says Kansas City at Buffalo is at 8:20 p.m. ET on NBC on Thanksgiving night. ${thanksgiving("The NFL.com Thanksgiving article")} places the game at Highmark Stadium in Orchard Park, New York, and lists NBC, Peacock, and NFL+. ${plusPlan("The NFL+ season plan")} dates it Thursday, November 26, at 8:20 p.m. ET.`,
    ],
  },
  {
    id: "broncos-steelers",
    away: "Denver Broncos",
    home: "Pittsburgh Steelers",
    date: "2026-11-27",
    dateLabel: "Friday, November 27, 2026",
    holiday: "Black Friday",
    et: { hour: 15, minute: 0 },
    venue: "Acrisure Stadium",
    locality: "Pittsburgh",
    region: "PA",
    national: "Prime Video",
    watchCell: "Prime Video",
    notes: [
      `${release("The May 14 release")} says Prime Video will exclusively stream the fourth annual Black Friday game when the Pittsburgh Steelers host the Denver Broncos in Week 12 at 3 p.m. ET. ${thanksgiving("The NFL.com Thanksgiving article")} places that game at Acrisure Stadium in Pittsburgh and lists Prime Video at 3 p.m. ET. ${plusPlan("The NFL+ season plan")} dates it Friday, November 27, at 3 p.m. ET. The release's exclusive-stream line is the national window. The same release says regular-season games are on free over-the-air television in local markets. No local station and no price are named here.`,
    ],
  },
];

export const THANKSGIVING_ANSWER =
  "Five NFL games are on the announced Thanksgiving week slate for 2026. On Wednesday, November 25, the Green Bay Packers play at the Los Angeles Rams at 8 p.m. ET on Netflix. On Thursday, November 26, the Chicago Bears play at the Detroit Lions at 1 p.m. ET on CBS, the Philadelphia Eagles play at the Dallas Cowboys at 4:30 p.m. ET on FOX, and the Kansas City Chiefs play at the Buffalo Bills at 8:20 p.m. ET on NBC. On Friday, November 27, the Denver Broncos play at the Pittsburgh Steelers at 3 p.m. ET on Prime Video. Pacific and other U.S. clock times are in the table. They are conversions of those Eastern kickoffs. No subscription price is listed on this page.";

export const THANKSGIVING_ZONE_NOTE =
  "ET is the kickoff in the league sources. CT, MT, PT, AKT, and HT subtract one, two, three, four, and five hours. November 25-27, 2026, is after the United States turns the clocks back on the first Sunday in November, which is November 1, 2026, so these columns are standard time. Arizona stays on Mountain Standard Time all year, so its clock matches the MT column in November. Netflix Tudum has not published a Pacific kickoff for the Wednesday game. The 5 p.m. PT cell is the conversion of the NFL's 8 p.m. ET.";

export const THANKSGIVING_RADIO = `${release("The May 14 release")} says Westwood One will broadcast the three Thanksgiving Day games on radio and digital. It does not say Westwood One carries the Wednesday game or the Friday game. The release also says SiriusXM subscribers have access to every live NFL game. No channel number and no price are printed here.`;

export const THANKSGIVING_NFL_PLUS = `${plusPlan("The NFL+ season plan")} groups all five games under Week 12 and describes NFL+ as live local and primetime games on mobile devices, with terms and conditions. ${thanksgiving("The Thanksgiving article")} names NFL+ on the three Thursday games only. This page does not say the Wednesday Netflix game or the Friday Prime Video game is a national NFL+ stream.`;

export const THANKSGIVING_OPERATIONS_GAP = `On October 16, 2026, these NFL Football Operations addresses did not return a 2026 schedule page: [the Game updates path](${OPERATIONS_URLS_CHECKED[0]}), [the football-ops path](${OPERATIONS_URLS_CHECKED[1]}), and [the regular-season schedule path](${OPERATIONS_URLS_CHECKED[2]}). This page does not cite an operations.nfl.com schedule for these kickoffs.`;

export const THANKSGIVING_SOURCES: readonly WatchSource[] = [
  {
    id: "media-release",
    label: "NFL media release: 2026 NFL Schedule Announced (May 14, 2026)",
    href: NFL_MEDIA_RELEASE,
    usedFor: "Matchups, Eastern kickoffs, Netflix, CBS, FOX, NBC, and the Prime Video Black Friday window.",
  },
  {
    id: "thanksgiving-article",
    label: "NFL.com: Thanksgiving week 2026 schedule",
    href: NFL_THANKSGIVING_ARTICLE,
    usedFor: "Stadiums, the same five kickoffs, and Paramount+, FOX One, Peacock, and NFL+ where that article lists them.",
  },
  {
    id: "packers-rams-article",
    label: "NFL.com: Packers at Rams on Thanksgiving Eve",
    href: NFL_PACKERS_RAMS_ARTICLE,
    usedFor: "Wednesday matchup, SoFi Stadium, November 25, 8 p.m. ET, Netflix.",
  },
  {
    id: "nfl-plus",
    label: "NFL.com: NFL+ plan for the 2026 season",
    href: NFL_PLUS_PLAN,
    usedFor: "Friday, November 27 date for the Black Friday game, and the same Eastern times for all five games.",
  },
  {
    id: "tudum-schedule",
    label: "Netflix Tudum: NFL on Netflix 2026 schedule (updated September 11, 2026)",
    href: NETFLIX_TUDUM_SCHEDULE,
    usedFor: "Wednesday matchup, date, SoFi Stadium, and Netflix. Kickoff on that page is still TBA.",
  },
  {
    id: "tudum-expansion",
    label: "Netflix Tudum: NFL games on Netflix in 2026",
    href: NETFLIX_TUDUM_EXPANSION,
    usedFor: "Wednesday game on Netflix at SoFi Stadium, and local over-the-air television in the team markets.",
  },
];

export const THANKSGIVING_FAQS: readonly WatchFaq[] = [
  {
    question: "What channel is each NFL Thanksgiving 2026 game on?",
    answer:
      "Wednesday, November 25: Packers at Rams on Netflix at 8 p.m. ET. Thursday, November 26: Bears at Lions on CBS at 1 p.m. ET, Eagles at Cowboys on FOX at 4:30 p.m. ET, and Chiefs at Bills on NBC at 8:20 p.m. ET. Friday, November 27: Broncos at Steelers on Prime Video at 3 p.m. ET. The NFL.com Thanksgiving article also lists Paramount+ and NFL+ with the Lions game, FOX One and NFL+ with the Cowboys game, and Peacock and NFL+ with the Bills game.",
  },
  {
    question: "Do I need Netflix to watch the Thanksgiving Eve game?",
    answer:
      "The Wednesday Packers at Rams game is live on Netflix. Netflix Tudum says Netflix's 2026 NFL games are also on local over-the-air television in the team markets. This page does not name those stations, does not list a Netflix price, and does not say whether a given ZIP code gets a local broadcast. Tudum's schedule page, updated September 11, 2026, still marks this kickoff TBA. The 8 p.m. ET time is from the NFL schedule release and NFL.com.",
  },
  {
    question: "What is the Black Friday NFL game in 2026?",
    answer:
      "Denver Broncos at Pittsburgh Steelers, Friday, November 27, 2026, at 3 p.m. ET, at Acrisure Stadium in Pittsburgh, on Prime Video. The May 14 NFL schedule release calls that window an exclusive Prime Video stream and also says regular-season games are on free over-the-air television in local markets. This page does not name a local station or a Prime Video price.",
  },
  {
    question: "What time do the Thanksgiving games start in Pacific time?",
    answer:
      "These Pacific times convert the Eastern kickoffs using standard time. Packers at Rams is 5 p.m. PT, Bears at Lions is 10 a.m. PT, Eagles at Cowboys is 1:30 p.m. PT, Chiefs at Bills is 5:20 p.m. PT, and Broncos at Steelers is 12 p.m. PT. Netflix Tudum has not published a Pacific kickoff for the Wednesday game, so that 5 p.m. PT cell is the conversion of the NFL's 8 p.m. ET.",
  },
];

export const THANKSGIVING_OMISSIONS = [
  "No subscription price. None was verified, so none is printed.",
  "No local channel number. The sources name national windows and say local over-the-air television exists. They do not name the station.",
  "Netflix Tudum still marks the Wednesday kickoff TBA. The 8 p.m. ET time is the NFL time, not a Tudum time.",
  "No national NFL+ claim for the Wednesday Netflix game or the Friday Prime Video game. NFL.com names NFL+ on the three Thursday games.",
  "No NFL Football Operations schedule page. The three operations.nfl.com addresses checked on October 16, 2026 did not return one.",
  "No player availability, injury, or roster note. The NFL.com game stories include them. This page does not.",
  "No rest of Week 12. Sunday and Monday games are outside these five holiday windows.",
] as const;

export function thanksgivingWatchBodies(): string[] {
  return [
    THANKSGIVING_ANSWER,
    THANKSGIVING_ZONE_NOTE,
    THANKSGIVING_RADIO,
    THANKSGIVING_NFL_PLUS,
    THANKSGIVING_OPERATIONS_GAP,
    ...THANKSGIVING_GAMES.flatMap((game) => game.notes),
    ...THANKSGIVING_FAQS.map((faq) => `${faq.question} ${faq.answer}`),
    ...THANKSGIVING_OMISSIONS,
    ...THANKSGIVING_SOURCES.map((source) => `${source.label} ${source.usedFor} ${source.href}`),
  ];
}
