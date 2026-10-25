/**
 * 2026-season NFL playoff facts for January and February 2027.
 * Dates, the 14-team format, and named broadcasters are copied from
 * NFL communications, NFL.com, NFL Football Operations, and ESPN Press Room
 * releases checked 2026-10-25. Unannounced kickoffs, matchups, sites, and
 * networks stay "TBA". No prices. No resale or sportsbook links.
 * "Super Bowl" appears only as the name of the February 14, 2027 game.
 */

export const PLAYOFF_WATCH_PATH = "/guide/nfl-playoffs-2027-schedule-how-to-watch/";
export const PLAYOFF_WATCH_UPDATED = "2026-10-25";
export const PLAYOFF_WATCH_TITLE = "2026 NFL playoffs schedule and how to watch (January 2027)";
export const PLAYOFF_WATCH_H1 = "2026 NFL playoffs schedule and how to watch (January 2027)";
export const PLAYOFF_WATCH_DESCRIPTION =
  "Dates for the 2026 NFL playoffs in January 2027: Wild Card, Divisional, and Championship rounds, and how to watch. Kickoffs and most networks are TBA.";

export const NFL_MEDIA_RELEASE =
  "https://media.nfl.com/football-information/2026/news/2026-nfl-schedule-announced";
export const NFL_IMPORTANT_DATES =
  "https://www.nfl.com/news/2026-27-national-football-league-important-dates";
export const NFL_OPS_DATES = "https://operations.nfl.com/calendar-events/nfl-important-dates";
export const NFL_TICKETS = "https://www.nfl.com/tickets";
export const ESPN_PORTFOLIO =
  "https://espnpressroom.com/press-release/espn-to-deliver-companys-largest-nfl-game-portfolio-ever-headlined-by-top-tier-matchups-on-monday-night-football-and-the-international-series-on-nfl-network-super-bowl-lxi-punctuates-the-se/";
export const ESPN_DISNEY =
  "https://espnpressroom.com/press-release/disney-to-stream-super-bowl-lxi-joining-espn-and-abc-to-give-fans-more-ways-to-watch/";
export const WILD_CARD_2026_RELEASE =
  "https://media.nfl.com/news-and-releases/nfl-announces-wild-card-weekend-schedule";
export const WILD_CARD_2025_RELEASE =
  "https://media.nfl.com/news-and-releases/corporate-communications/wild-card-weekend-schedule";
export const DIVISIONAL_2026_RELEASE =
  "https://media.nfl.com/news-and-releases/nfl-announces-final-divisional-weekend-schedule";

export const CITATION_HOSTS = [
  "www.nfl.com",
  "media.nfl.com",
  "operations.nfl.com",
  "espnpressroom.com",
] as const;

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

const release = (label: string) => `[${label}](${NFL_MEDIA_RELEASE})`;
const dates = (label: string) => `[${label}](${NFL_IMPORTANT_DATES})`;
const ops = (label: string) => `[${label}](${NFL_OPS_DATES})`;
const espn = (label: string) => `[${label}](${ESPN_PORTFOLIO})`;
const disney = (label: string) => `[${label}](${ESPN_DISNEY})`;

export interface PlayoffRound {
  id: string;
  round: string;
  dateLabel: string;
  kickoff: string;
  startDate: string;
  endDate?: string;
  site: string;
  watch: string;
  eventName: string;
  eventDescription: string;
  locationName: string;
  addressLocality?: string;
  addressRegion?: string;
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

export const PLAYOFF_ANSWER =
  "The 2026 NFL season playoffs are a 14-team bracket played in January 2027. Wild Card Weekend is Saturday, January 16 through Monday, January 18, six games, and the No. 1 seed in each conference has a bye. The Divisional round is Saturday, January 23 and Sunday, January 24. The AFC and NFC Championship Games are Sunday, January 31. Matchups, kickoff times, hosting stadiums for the later rounds, and most networks are TBA. The conference winners meet on Sunday, February 14, 2027, in Super Bowl LXI at SoFi Stadium. NFL communications names ESPN for that game. ESPN's press releases also name ABC, Disney+, and the ESPN App. The kickoff time is TBA.";

export const PLAYOFF_FORMAT_NOTE = `${release("The May 14, 2026 NFL schedule release")} says 14 teams make the postseason, seven in the American Football Conference and seven in the National Football Conference. It says this is the seventh consecutive year of that field, introduced in 2020. The No. 1 seed in each conference receives a bye in the Wild Card round. The other division champions are seeded 2, 3, and 4 by record, and the next three clubs in each conference are seeded 5, 6, and 7. Wild Card pairings are the 2 seed hosting the 7 seed, the 3 seed hosting the 6 seed, and the 4 seed hosting the 5 seed. The same release says Wild Card winners join the top seeds in the Divisional round. It does not say which club hosts a Divisional game or a Championship game. Those sites are TBA. ${dates("The NFL.com 2026-27 important dates")} and ${ops("the NFL Football Operations calendar")} list the same three windows and do not add seeds or sites. The Operations page says all dates are subject to change.`;

export const PLAYOFF_ROUNDS: readonly PlayoffRound[] = [
  {
    id: "wild-card",
    round: "Wild Card",
    dateLabel: "Saturday, January 16 through Monday, January 18, 2027",
    kickoff: "TBA",
    startDate: "2027-01-16",
    endDate: "2027-01-18",
    site: "Home stadium of the No. 2, No. 3, or No. 4 seed. The stadium is TBA.",
    watch: "TBA for each game. ESPN will present one game, also on ABC.",
    eventName: "NFL Wild Card Weekend",
    eventDescription:
      "Six NFL Wild Card games from Saturday, January 16 through Monday, January 18, 2027. The No. 2, No. 3, and No. 4 seeds host. Matchups, kickoff times, stadiums, and most networks are TBA. ESPN will present one game, also on ABC.",
    locationName: "Home stadiums of the No. 2, No. 3, and No. 4 seeds",
    notes: [
      `${release("The May 14, 2026 schedule release")} says Wild Card Weekend for the 2026 season is six games, starting Saturday, January 16. ${dates("The NFL.com important-dates article")} and ${ops("the Football Operations calendar")} both date that weekend January 16-18. Neither source assigns a game to Saturday, Sunday, or Monday, and neither states a kickoff time. The hosting rule is the 2, 3, and 4 seeds. The clubs, and therefore the stadiums, are TBA. ${espn("The May 14, 2026 ESPN Press Room release")} says ESPN will present one Wild Card playoff game, simulcast on ABC, and that a Spanish-language telecast will be available for ESPN games, with most on ESPN Deportes. It does not name the clubs, the day, or the clock. The other five games have no network in these sources. Those networks are TBA.`,
    ],
  },
  {
    id: "divisional",
    round: "Divisional",
    dateLabel: "Saturday, January 23 and Sunday, January 24, 2027",
    kickoff: "TBA",
    startDate: "2027-01-23",
    endDate: "2027-01-24",
    site: "TBA",
    watch: "TBA for each game. ESPN will present one game, also on ABC.",
    eventName: "NFL Divisional round",
    eventDescription:
      "NFL Divisional round on Saturday, January 23 and Sunday, January 24, 2027. Sites, kickoff times, matchups, and most networks are TBA. ESPN will present one game, also on ABC.",
    locationName: "Sites to be announced",
    notes: [
      `${release("The May 14, 2026 schedule release")} puts the Divisional round on Saturday and Sunday, January 23-24, and says Wild Card winners join the top seeds. ${dates("The NFL.com important-dates article")} and ${ops("the Football Operations calendar")} list January 23-24 for the Divisional Playoffs. None of the three names a site, a kickoff, or which game is on which day. ${espn("The ESPN Press Room release")} says ESPN will present one Divisional Round matchup, simulcast on ABC, with a Spanish-language telecast for ESPN games, most of them on ESPN Deportes. It does not name the clubs, the day, or the clock. The other Divisional games have no network in these sources. Those networks are TBA.`,
    ],
  },
  {
    id: "championship",
    round: "Conference championships",
    dateLabel: "Sunday, January 31, 2027",
    kickoff: "TBA",
    startDate: "2027-01-31",
    site: "TBA",
    watch: "TBA",
    eventName: "AFC and NFC Championship Games",
    eventDescription:
      "AFC and NFC Championship Games on Sunday, January 31, 2027. Sites, kickoff times, matchups, and networks are TBA.",
    locationName: "Sites to be announced",
    notes: [
      `${release("The May 14, 2026 schedule release")} says the AFC and NFC Championship Games will be played on Sunday, January 31. ${dates("The NFL.com important-dates article")} and ${ops("the Football Operations calendar")} list January 31 for those games. None of the three states a kickoff time, a site, which conference plays first, or a network. The May 14 ESPN Press Room release names a Wild Card game, a Divisional game, and the February 14 title game. It does not name a Championship game. Championship networks are TBA.`,
    ],
  },
];

export const PLAYOFF_TITLE_GAME: PlayoffRound = {
  id: "title-game",
  round: "Super Bowl LXI",
  dateLabel: "Sunday, February 14, 2027",
  kickoff: "TBA",
  startDate: "2027-02-14",
  site: "SoFi Stadium, Inglewood, California",
  watch: "ESPN in the NFL release. ESPN and ABC, Disney+, and the ESPN App in the ESPN releases.",
  eventName: "Super Bowl LXI",
  eventDescription:
    "Super Bowl LXI at SoFi Stadium, Inglewood, California, on Sunday, February 14, 2027. Kickoff time and the clubs are TBA. NFL communications names ESPN. ESPN's releases also name ABC, Disney+, and the ESPN App.",
  locationName: "SoFi Stadium",
  addressLocality: "Inglewood",
  addressRegion: "CA",
  notes: [
    `${release("The May 14, 2026 schedule release")} says the conference winners meet two weeks after January 31, on Sunday, February 14, in Super Bowl LXI at SoFi Stadium in Los Angeles, California, and it puts ESPN in parentheses. ${dates("The NFL.com important-dates article")} and ${ops("the Football Operations calendar")} both list February 14 as Super Bowl LXI at SoFi Stadium in Inglewood, California, and they do not name a network or a kickoff time. Inglewood is the city on those calendars. The schedule release says Los Angeles. Both name SoFi Stadium. ${espn("The May 14, 2026 ESPN Press Room release")} says Super Bowl LXI is on February 14, 2027, live from SoFi Stadium, across ESPN and ABC. ${disney("The October 7, 2026 ESPN Press Room release")} says Disney+, in collaboration with the NFL, will livestream that game on Sunday, February 14, 2027, and that Disney+ subscribers in the United States can stream the presentation airing on ESPN and ABC, including the Spanish-language telecast on ESPN Deportes. The same release says the ESPN App will carry that presentation, the Spanish-language telecast, and the ManningCast on ESPN2. None of these pages states a kickoff clock. The kickoff is TBA.`,
  ],
};

export const PLAYOFF_ANNOUNCEMENT = `${release("The May 14, 2026 schedule release")} does not give a date for publishing Wild Card kickoff times. ${`[The January 4, 2026 Wild Card communications release](${WILD_CARD_2026_RELEASE})`} and ${`[the January 5, 2025 Wild Card communications release](${WILD_CARD_2025_RELEASE})`} each came on or the day after that regular season ended, and each said the Divisional schedule would be announced the next weekend. ${`[The January 12, 2026 Divisional release](${DIVISIONAL_2026_RELEASE})`}, issued the night that Wild Card round ended, also set the Championship kickoff times and networks for that postseason. ${dates("The 2026-27 important dates")} put Week 18 on January 9-10, 2027. This page does not treat that earlier pattern as a published 2027 announcement. It does not copy those earlier kickoffs or networks. For January 2027, the kickoff times are TBA until NFL communications posts them.`;

export const PLAYOFF_NATIONAL = `${release("The May 14, 2026 schedule release")} says all postseason games are distributed nationally, and that regular-season and postseason games are on free over-the-air television in the local markets of the clubs. It does not name a local channel number. This page does not invent one. The same release does not assign CBS, FOX, NBC, or Prime Video to a January 2027 playoff game. Those windows stay TBA except where an ESPN press release, cited above, names a game.`;

export const PLAYOFF_RADIO = `${release("The May 14, 2026 schedule release")} says Westwood One will broadcast the entire NFL playoffs on radio and digital, and that SiriusXM subscribers will have access to every live NFL game.`;

export const PLAYOFF_NFL_PLUS = `${release("The May 14, 2026 schedule release")} says all live and local prime time games will be available to stream on mobile devices with NFL+. It does not say that every postseason game is an NFL+ stream. This page does not add that claim. The October 7 ESPN release, cited with the February 14 game, is the source for the ESPN App on that game.`;

export const PLAYOFF_FANTASY = [
  "Only the 14 clubs in the bracket have a game in these rounds. A player whose club is out of the tournament has nothing to score here. The two No. 1 seeds do not play on Wild Card weekend, so a lineup that scores that weekend gets nothing from them until the Divisional round, and only if they are still on the roster.",
  "The slate then shrinks from six games to four, then to two. One player who is Out or inactive removes a larger share of the week than the same label does in September. Read the designation before you weigh two names who both have a game. Floor, mean, and ceiling are still the three numbers for that choice.",
  "Playoff claim rules are set by the league host. This page does not state an ESPN, Yahoo, or Sleeper playoff default, and it does not invent a bid. The sample desks on this site are sample data. They are not a January roster.",
];

export const PLAYOFF_TICKETS = `${release("The May 14, 2026 schedule release")} says that once each matchup is announced, individual game tickets go on sale, and it tells readers to visit ${`[NFL.com/tickets](${NFL_TICKETS})`}. The matchups are TBA, so that sale is not open for a named January game on this page. The release also names other sellers. This guide does not link them. No price is printed here. No resale page is linked.`;

export const PLAYOFF_SOURCES: readonly WatchSource[] = [
  {
    id: "schedule-release",
    label: "NFL communications: 2026 NFL schedule announced (May 14, 2026)",
    href: NFL_MEDIA_RELEASE,
    usedFor:
      "The 14-team field, byes, Wild Card pairings, the January 16, January 23-24, January 31, and February 14 dates, SoFi Stadium, ESPN for the February 14 game, national postseason distribution, Westwood One, SiriusXM, the NFL+ sentence, and NFL.com/tickets.",
  },
  {
    id: "nfl-dates",
    label: "NFL.com: 2026-27 important dates",
    href: NFL_IMPORTANT_DATES,
    usedFor:
      "Wild Card January 16-18, Divisional January 23-24, Championship games January 31, Week 18 on January 9-10, and Super Bowl LXI on February 14 at SoFi Stadium in Inglewood. No kickoff and no network.",
  },
  {
    id: "ops-dates",
    label: "NFL Football Operations: important dates, 2026 season calendar",
    href: NFL_OPS_DATES,
    usedFor:
      "The same January and February dates, SoFi Stadium in Inglewood, and the line that dates are subject to change.",
  },
  {
    id: "espn-portfolio",
    label: "ESPN Press Room: 2026-27 NFL portfolio (May 14, 2026)",
    href: ESPN_PORTFOLIO,
    usedFor:
      "One Wild Card game and one Divisional game on ESPN and ABC, Spanish-language coverage on ESPN Deportes for ESPN games, and Super Bowl LXI on February 14, 2027, from SoFi Stadium on ESPN and ABC.",
  },
  {
    id: "espn-disney",
    label: "ESPN Press Room: Disney+ stream (October 7, 2026)",
    href: ESPN_DISNEY,
    usedFor:
      "Disney+ livestream of the February 14 game, the ESPN and ABC presentation, ESPN Deportes, and the ESPN App, including the ManningCast on ESPN2. No kickoff time.",
  },
  {
    id: "tickets",
    label: "NFL.com/tickets",
    href: NFL_TICKETS,
    usedFor: "The ticket address printed in the May 14 schedule release. No price is copied here.",
  },
  {
    id: "wc-2026",
    label: "NFL communications: Wild Card schedule (January 4, 2026)",
    href: WILD_CARD_2026_RELEASE,
    usedFor:
      "When the previous Wild Card schedule was posted, and that the Divisional schedule would be announced the next weekend. Not a source for 2027 kickoffs or networks.",
  },
  {
    id: "wc-2025",
    label: "NFL communications: Wild Card schedule (January 5, 2025)",
    href: WILD_CARD_2025_RELEASE,
    usedFor:
      "The same announcement pattern one postseason earlier. Not a source for 2027 kickoffs or networks.",
  },
  {
    id: "div-2026",
    label: "NFL communications: Divisional schedule (January 12, 2026)",
    href: DIVISIONAL_2026_RELEASE,
    usedFor:
      "The previous Divisional release also set that postseason's Championship kickoff times. Not a source for 2027 kickoffs or networks.",
  },
];

export const PLAYOFF_FAQS: readonly WatchFaq[] = [
  {
    question: "When is Wild Card weekend for the 2026 NFL season?",
    answer:
      "Saturday, January 16 through Monday, January 18, 2027. The May 14, 2026 schedule release says the weekend is six games, starting Saturday, January 16. The NFL.com and Football Operations calendars date it January 16-18. Kickoff times are TBA. Which game is on which day is TBA. ESPN's May 14, 2026 release says ESPN will present one Wild Card game, simulcast on ABC, without naming the day or the clock.",
  },
  {
    question: "How does the 14-team bracket work, and who gets a bye?",
    answer:
      "Seven clubs from each conference. The No. 1 seed in each conference does not play in the Wild Card round. Seeds 2, 3, and 4 are the other division champions, ordered by record. Seeds 5, 6, and 7 are the next three clubs in that conference. The 2 seed hosts the 7 seed, the 3 seed hosts the 6 seed, and the 4 seed hosts the 5 seed. The May 14, 2026 schedule release is the source. It does not name the Divisional or Championship host. Those sites are TBA.",
  },
  {
    question: "When are the Divisional round and the conference championship games?",
    answer:
      "The Divisional round is Saturday, January 23 and Sunday, January 24, 2027. The AFC and NFC Championship Games are Sunday, January 31, 2027. Kickoff times, sites, and which game is in which window are TBA. ESPN will present one Divisional game on ESPN and ABC. The network for the other Divisional games, and for both Championship games, is TBA.",
  },
  {
    question: "Which channel carries the January 2027 playoff games?",
    answer:
      "The May 14, 2026 NFL schedule release says every postseason game is distributed nationally and is on free over-the-air television in the clubs' local markets. It does not name the channel for a Wild Card, Divisional, or Championship game. ESPN's May 14, 2026 release assigns one Wild Card game and one Divisional game to ESPN and ABC, with Spanish-language coverage of ESPN games, most on ESPN Deportes. The other games in those rounds, and both Championship games, are TBA. Westwood One has the playoffs on radio and digital. SiriusXM has every live NFL game. The NFL+ sentence in the schedule release is limited to live local and prime time games on mobile. It does not say every postseason game is on NFL+.",
  },
  {
    question: "When is Super Bowl LXI, and where is it played?",
    answer:
      "Sunday, February 14, 2027, at SoFi Stadium. The NFL.com and Football Operations calendars place the stadium in Inglewood, California. The May 14, 2026 schedule release says Los Angeles and names ESPN. ESPN's May 14, 2026 release says the game is on ESPN and ABC from SoFi Stadium. ESPN's October 7, 2026 release adds a Disney+ livestream of the ESPN and ABC presentation, the ESPN Deportes telecast, and the ESPN App, including the ManningCast on ESPN2. The kickoff time is TBA. The clubs are TBA.",
  },
  {
    question: "Have the matchups or kickoff times been announced?",
    answer:
      "No. Week 18, the last weekend of the 2026 regular season, is January 9-10, 2027. In the previous two postseasons, NFL communications posted the Wild Card schedule on or the day after the regular season ended, and posted the Divisional schedule the next weekend. The January 12, 2026 Divisional release also set that year's Championship times. The league has not said it will repeat that timing for 2027. This page does not guess a club, a seed, a stadium, or a clock.",
  },
  {
    question: "Where do tickets go on sale?",
    answer:
      "The May 14, 2026 schedule release says individual game tickets go on sale once each matchup is announced, and it points to NFL.com/tickets. Matchups are TBA, so this page does not name a seller for a specific January game beyond that address. No price is listed. No resale page is linked.",
  },
];

export const PLAYOFF_OMISSIONS = [
  "Matchups and seeds are TBA. Week 18 is January 9-10, 2027. The field is not set on this page.",
  "Kickoff times for every January round, and for the February 14 game, are TBA.",
  "Which Wild Card game falls on Saturday, Sunday, or Monday is TBA. The dated fact is the January 16-18 window.",
  "Which Divisional game falls on Saturday, January 23 or Sunday, January 24 is TBA.",
  "Divisional and Championship sites are TBA. The schedule release does not name the host.",
  "Networks are TBA for five Wild Card games, for every Divisional game except the one ESPN assigned to ESPN and ABC, and for both Championship games.",
  "The NFL schedule release names ESPN for February 14. The ESPN releases also name ABC, Disney+, ESPN Deportes, and the ESPN App. This page prints both.",
  "No local channel number.",
  "No ticket price, and no resale link.",
  "The January 2025 and January 2026 communications releases are cited only for when those schedules were posted. Their kickoffs and networks are not reused.",
] as const;

export function playoffWatchBodies(): string[] {
  return [
    PLAYOFF_ANSWER,
    PLAYOFF_FORMAT_NOTE,
    PLAYOFF_ANNOUNCEMENT,
    PLAYOFF_NATIONAL,
    PLAYOFF_RADIO,
    PLAYOFF_NFL_PLUS,
    ...PLAYOFF_FANTASY,
    PLAYOFF_TICKETS,
    ...PLAYOFF_ROUNDS.flatMap((round) => round.notes),
    ...PLAYOFF_TITLE_GAME.notes,
    ...PLAYOFF_FAQS.map((faq) => `${faq.question} ${faq.answer}`),
    ...PLAYOFF_OMISSIONS,
    ...PLAYOFF_SOURCES.map((source) => `${source.label} ${source.usedFor} ${source.href}`),
  ];
}
