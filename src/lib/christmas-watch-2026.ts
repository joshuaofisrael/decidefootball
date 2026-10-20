/**
 * Christmas Day 2026 how-to-watch facts.
 * Matchups, Eastern kickoffs, and national windows are copied from the May 14,
 * 2026 NFL schedule release, NFL.com, and Netflix Tudum. Other clock columns
 * are conversions. No price, local channel number, or roster note belongs here.
 */

export const CHRISTMAS_WATCH_PATH = "/guide/christmas-nfl-how-to-watch/";
export const CHRISTMAS_WATCH_UPDATED = "2026-10-20";
export const CHRISTMAS_WATCH_TITLE = "NFL Christmas Day 2026: How to Watch Every Game";
export const CHRISTMAS_WATCH_H1 = "NFL Christmas Day 2026: How to Watch Every Game";
export const CHRISTMAS_WATCH_DESCRIPTION =
  "How to watch all 3 NFL games on Friday, December 25, 2026: kickoffs in ET, CT, MT, PT, and UK time, and the announced channel or stream for each game. Not affiliated with the NFL. Not gambling advice.";

export const NFL_CHRISTMAS_ARTICLE =
  "https://www.nfl.com/news/christmas-netflix-2026-nfl-schedule-release";
export const NFL_WEEK_16_SCHEDULE = "https://www.nfl.com/schedules/2026/by-week/week-16";
export const NFL_MEDIA_RELEASE =
  "https://media.nfl.com/football-information/2026/news/2026-nfl-schedule-announced";
export const NETFLIX_TUDUM_SCHEDULE =
  "https://www.netflix.com/tudum/features/nfl-on-netflix-schedule";
export const NETFLIX_TUDUM_EXPANSION =
  "https://www.netflix.com/tudum/articles/nfl-games-on-netflix";

/** Public operations.nfl.com paths checked on 2026-10-20. None returned a 2026 schedule. */
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

export const CHRISTMAS_ZONES = [
  { id: "ET", label: "ET", offsetHours: 0 },
  { id: "CT", label: "CT", offsetHours: -1 },
  { id: "MT", label: "MT", offsetHours: -2 },
  { id: "PT", label: "PT", offsetHours: -3 },
  { id: "UK", label: "UK", offsetHours: 5 },
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

/** Adds "Sat" when the converted clock falls on the next calendar day. */
export function formatZoneCell(et: KickoffEt, offsetHours: number): string {
  const day = 24 * 60;
  const raw = et.hour * 60 + et.minute + offsetHours * 60;
  const time = formatKickoff(et, offsetHours);
  return raw >= day ? `${time} Sat` : time;
}

/** Eastern standard time. December 25, 2026 is after the November 1 clock change. */
export function startDateIso(date: string, et: KickoffEt): string {
  const hh = String(et.hour).padStart(2, "0");
  const mm = String(et.minute).padStart(2, "0");
  return `${date}T${hh}:${mm}:00-05:00`;
}

export interface ChristmasGame {
  id: string;
  away: string;
  home: string;
  date: string;
  dateLabel: string;
  et: KickoffEt;
  venue: string;
  locality: string;
  region: string;
  /** National window named by NFL.com for this game. */
  national: string;
  watchCell: string;
  notes: readonly string[];
  fantasy: string;
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
const article = (label: string) => `[${label}](${NFL_CHRISTMAS_ARTICLE})`;
const schedule = (label: string) => `[${label}](${NFL_WEEK_16_SCHEDULE})`;
const tudum = (label: string) => `[${label}](${NETFLIX_TUDUM_SCHEDULE})`;
const expansion = (label: string) => `[${label}](${NETFLIX_TUDUM_EXPANSION})`;

export const CHRISTMAS_GAMES: readonly ChristmasGame[] = [
  {
    id: "packers-bears",
    away: "Green Bay Packers",
    home: "Chicago Bears",
    date: "2026-12-25",
    dateLabel: "Friday, December 25, 2026",
    et: { hour: 13, minute: 0 },
    venue: "Soldier Field",
    locality: "Chicago",
    region: "IL",
    national: "Netflix",
    watchCell: "Netflix",
    notes: [
      `${release("The May 14, 2026 NFL schedule release")} says that, for the third consecutive season, Netflix will stream two NFL games on Christmas Day in Week 16, and that the Green Bay Packers visit the Chicago Bears at 1 p.m. ET. That sentence does not name the stadium.`,
      `${article("The NFL.com Christmas article")} places Packers at Bears at Soldier Field in Chicago and lists 1 p.m. ET on Netflix. ${schedule("The NFL.com Week 16 schedule")} labels the same game "Packers at Bears, Friday, December 25th, 1:00 PM, NETFLIX" and stamps 2026-12-25T18:00:00Z. That instant is 1:00 p.m. Eastern on December 25.`,
      `${tudum("Netflix Tudum's NFL schedule")}, updated September 11, 2026, lists Green Bay Packers at Chicago Bears on Friday, Dec. 25, at Soldier Field in Chicago, Illinois, at 1 p.m. ET / 10 a.m. PT, live on Netflix. ${expansion("Tudum's expansion article")} repeats Soldier Field, 1 p.m. ET / 10 a.m. PT. It also says Netflix's 2026 NFL games will be available in over 200 countries and on local over-the-air television in the team markets. No station and no price are named here.`,
    ],
    fantasy:
      "Both clubs play in the 1 p.m. ET window, the first of the three Christmas games. Start a player you roster only if that player is active for Green Bay or Chicago in this game. Weigh the floor when you are protecting a lead, and the ceiling when you need to catch up. This page has no mean, floor, ceiling, or injury designation for any player, and it does not rank a Packers name against a Bears name.",
  },
  {
    id: "bills-broncos",
    away: "Buffalo Bills",
    home: "Denver Broncos",
    date: "2026-12-25",
    dateLabel: "Friday, December 25, 2026",
    et: { hour: 16, minute: 30 },
    venue: "Empower Field at Mile High",
    locality: "Denver",
    region: "CO",
    national: "Netflix",
    watchCell: "Netflix",
    notes: [
      `${release("The May 14 release")} says the Denver Broncos host the Buffalo Bills at 4:30 p.m. ET on Netflix, the second Christmas Day game in that sentence. It does not name the stadium.`,
      `${article("The NFL.com Christmas article")} places the Bills at the Broncos at Empower Field at Mile High in Denver and lists 4:30 p.m. ET on Netflix. ${schedule("The NFL.com Week 16 schedule")} labels it "Bills at Broncos, Friday, December 25th, 4:30 PM, NETFLIX" and stamps 2026-12-25T21:30:00Z. That instant is 4:30 p.m. Eastern on December 25.`,
      `${tudum("Netflix Tudum's schedule")} lists Buffalo Bills at Denver Broncos on Friday, Dec. 25, at Empower Field at Mile High in Denver, Colorado, at 4:30 p.m. ET / 1:30 p.m. PT, live on Netflix. ${expansion("Tudum's expansion article")} says the Buffalo Bills play the Denver Broncos from Empower Field at Mile High at 4:30 p.m. ET / 1:30 p.m. PT. The local over-the-air line on that page covers Netflix's 2026 NFL games. No station and no price are named here.`,
    ],
    fantasy:
      "Both clubs play in the 4:30 p.m. ET window. A player in this game is not in the Packers at Bears game. Start someone you roster only if that player is active for Buffalo or Denver. This page does not add a point total for altitude, weather, or the venue, and it does not print a projection.",
  },
  {
    id: "rams-seahawks",
    away: "Los Angeles Rams",
    home: "Seattle Seahawks",
    date: "2026-12-25",
    dateLabel: "Friday, December 25, 2026",
    et: { hour: 20, minute: 15 },
    venue: "Lumen Field",
    locality: "Seattle",
    region: "WA",
    national: "FOX",
    watchCell: "FOX",
    notes: [
      `${schedule("The NFL.com Week 16 schedule")} labels this game "Rams at Seahawks, Friday, December 25th, 8:15 PM, FOX" and stamps 2026-12-26T01:15:00Z. That instant is 8:15 p.m. Eastern on December 25. ${article("The NFL.com Christmas article")} places the game that concludes the Christmas tripleheader at Lumen Field in Seattle, at 8:15 p.m. ET on FOX, and the article text identifies that game as Rams at Seahawks.`,
      `${release("The May 14 release")} names two Netflix Christmas games and does not give a kickoff or a network for Rams at Seahawks in that sentence. ${tudum("Netflix Tudum's schedule")} and ${expansion("Tudum's expansion article")} do not list this game. This page does not call it a Netflix game. The national window on the NFL.com sources is FOX. No local station and no price are named here.`,
    ],
    fantasy:
      "Both clubs play in the 8:15 p.m. ET window, the last of the three. The national channel is FOX. A player in this game is not in either Netflix game. The channel does not say who is active. Start someone you roster only if that player is active for the Rams or Seattle. This page still has no projection and does not rank one name over another.",
  },
];

export const CHRISTMAS_ANSWER =
  "Three NFL games are on the announced Christmas Day slate for Friday, December 25, 2026. The Green Bay Packers play at the Chicago Bears at 1 p.m. ET on Netflix. The Buffalo Bills play at the Denver Broncos at 4:30 p.m. ET on Netflix. The Los Angeles Rams play at the Seattle Seahawks at 8:15 p.m. ET on FOX. Central, Mountain, Pacific, and UK clock times are in the table. They are conversions of those Eastern kickoffs, except that Netflix Tudum also prints the Pacific times for the two Netflix games. No subscription price is listed on this page.";

export const CHRISTMAS_ZONE_NOTE = `${schedule("The NFL.com Week 16 schedule")} is the source of the Eastern labels and of the time stamps 2026-12-25T18:00:00Z, 2026-12-25T21:30:00Z, and 2026-12-26T01:15:00Z. Those instants are 1:00 p.m., 4:30 p.m., and 8:15 p.m. Eastern on December 25. CT, MT, and PT subtract one, two, and three hours. UK adds five hours. December 25, 2026 is after the United States turns the clocks back on November 1, 2026, and after the United Kingdom turns the clocks back on October 25, 2026, so the U.S. columns are standard time and the UK column is Greenwich Mean Time. Arizona stays on Mountain Standard Time all year, so its clock matches the MT column. ${tudum("Netflix Tudum")} publishes 10 a.m. PT and 1:30 p.m. PT for the two Netflix games. Those cells match that page. The 5:15 p.m. PT cell for Rams at Seahawks is the conversion of 8:15 p.m. ET. Tudum does not list that game. The UK cell for Rams at Seahawks reads 1:15 a.m. Sat, meaning Saturday, December 26, because 8:15 p.m. Eastern plus five hours crosses midnight. No source on this page publishes a UK kickoff.`;

export const CHRISTMAS_RADIO = `${release("The May 14 release")} says Westwood One will broadcast NFL primetime games on radio and digital, including the three Thanksgiving Day games, international games, and the playoffs. It does not name the three Christmas Day windows. The same release says SiriusXM subscribers have access to every live NFL game. No channel number and no price are printed here.`;

export const CHRISTMAS_NFL_PLUS = `${release("The May 14 release")} says all live and local primetime games will be available to stream on mobile devices with NFL+. It does not name NFL+ on Packers at Bears, Bills at Broncos, or Rams at Seahawks. This page does not say any of the three is a national NFL+ stream.`;

export const CHRISTMAS_EVE = `${schedule("The NFL.com Week 16 schedule")} lists a Thursday game that is not part of this page: Texans at Eagles, Thursday, December 24th, 8:15 PM, with the window labeled PRIME. This page does not give that game a watch section, a stadium, or a price. The Friday table is the Christmas Day slate.`;

export const CHRISTMAS_OPERATIONS_GAP = `On October 20, 2026, these NFL Football Operations addresses did not return a 2026 schedule page: [the Game updates path](${OPERATIONS_URLS_CHECKED[0]}), [the football-ops path](${OPERATIONS_URLS_CHECKED[1]}), and [the regular-season schedule path](${OPERATIONS_URLS_CHECKED[2]}). This page does not cite an operations.nfl.com schedule for these kickoffs. The kickoffs above are from the May 14 media release, NFL.com, and Netflix Tudum.`;

export const CHRISTMAS_SOURCES: readonly WatchSource[] = [
  {
    id: "media-release",
    label: "NFL media release: 2026 NFL Schedule Announced (May 14, 2026)",
    href: NFL_MEDIA_RELEASE,
    usedFor: "Packers at Bears at 1 p.m. ET and Broncos hosting Bills at 4:30 p.m. ET, both on Netflix, on Christmas Day in Week 16. Not the Rams at Seahawks kickoff.",
  },
  {
    id: "christmas-article",
    label: "NFL.com: Christmas Day 2026 tripleheader",
    href: NFL_CHRISTMAS_ARTICLE,
    usedFor: "Soldier Field, Empower Field at Mile High, and Lumen Field, with the same three Eastern kickoffs, Netflix, and FOX.",
  },
  {
    id: "week-16",
    label: "NFL.com: 2026 Week 16 schedule",
    href: NFL_WEEK_16_SCHEDULE,
    usedFor: "Friday, December 25 labels, Eastern kickoffs, Netflix and FOX, and the UTC time stamps. Also the Thursday, December 24 label, which is not a Friday game.",
  },
  {
    id: "tudum-schedule",
    label: "Netflix Tudum: NFL on Netflix 2026 schedule (updated September 11, 2026)",
    href: NETFLIX_TUDUM_SCHEDULE,
    usedFor: "The two Netflix games: matchups, Friday, Dec. 25, stadiums, Eastern and Pacific kickoffs. It does not list Rams at Seahawks.",
  },
  {
    id: "tudum-expansion",
    label: "Netflix Tudum: NFL games on Netflix in 2026",
    href: NETFLIX_TUDUM_EXPANSION,
    usedFor: "The same two Netflix kickoffs, plus local over-the-air television in the team markets for Netflix's 2026 NFL games.",
  },
];

export const CHRISTMAS_FAQS: readonly WatchFaq[] = [
  {
    question: "What channel is each NFL Christmas Day 2026 game on?",
    answer:
      "Friday, December 25, 2026: Packers at Bears on Netflix at 1 p.m. ET, Bills at Broncos on Netflix at 4:30 p.m. ET, and Rams at Seahawks on FOX at 8:15 p.m. ET. The May 14 NFL schedule release names the two Netflix games. The NFL.com Week 16 schedule and the NFL.com Christmas article name all three, including FOX for the night game.",
  },
  {
    question: "What time do the Christmas games start in the UK?",
    answer:
      "These UK times convert the Eastern kickoffs into Greenwich Mean Time. Packers at Bears is 6 p.m., Bills at Broncos is 9:30 p.m., and Rams at Seahawks is 1:15 a.m. on Saturday, December 26. No source on this page prints a UK kickoff. The Saturday date is only the night game.",
  },
  {
    question: "Do I need Netflix to watch every Christmas game?",
    answer:
      "No. The first two games are live on Netflix. The night game's national window is FOX. Netflix Tudum says Netflix's 2026 NFL games are also on local over-the-air television in the team markets, and the May 14 release says regular-season games are on free over-the-air television in local markets. This page does not name a station, a ZIP code, or a subscription price.",
  },
  {
    question: "Is the Christmas Eve game on this page?",
    answer:
      "No. The NFL.com Week 16 schedule lists Texans at Eagles on Thursday, December 24, 2026, at 8:15 p.m. ET, and labels that window PRIME. That game is not one of the three Friday games. This page does not give it a stadium or a watch section.",
  },
  {
    question: "Who should I start on Christmas Day?",
    answer:
      "Start a player you roster only if that player is active in one of these three games. Weigh the floor to protect a lead and the ceiling when you need to catch up. This page does not print a mean, a floor, a ceiling, or an injury designation, and it does not rank one name over another. The Week 7 start/sit and waiver notes on this site are October slates, not this Friday.",
  },
];

export const CHRISTMAS_OMISSIONS = [
  "No subscription price. None was verified, so none is printed.",
  "No local channel number. The sources say local over-the-air television exists. They do not name the station.",
  "No FOX One listing. The NFL.com schedule label and the NFL.com Christmas article say FOX for the night game. They do not say FOX One.",
  "No national NFL+ claim for these three games. The May 14 release describes NFL+ in general and does not name these windows.",
  "No NFL Football Operations schedule page. The three operations.nfl.com addresses checked on October 20, 2026 did not return one.",
  "No player name, injury designation, or projection. The NFL.com Christmas article discusses players. This page does not repeat those sentences as starts.",
  "No UK kickoff in the sources. The UK column is a conversion, and the night game falls on Saturday, December 26 in the UK.",
  "The rest of Week 16 is outside the Friday table. Thursday, December 24 is named only to say it is not Christmas Day.",
] as const;

export function christmasWatchBodies(): string[] {
  return [
    CHRISTMAS_ANSWER,
    CHRISTMAS_ZONE_NOTE,
    CHRISTMAS_RADIO,
    CHRISTMAS_NFL_PLUS,
    CHRISTMAS_EVE,
    CHRISTMAS_OPERATIONS_GAP,
    ...CHRISTMAS_GAMES.flatMap((game) => [...game.notes, game.fantasy]),
    ...CHRISTMAS_FAQS.map((faq) => `${faq.question} ${faq.answer}`),
    ...CHRISTMAS_OMISSIONS,
    ...CHRISTMAS_SOURCES.map((source) => `${source.label} ${source.usedFor} ${source.href}`),
  ];
}
