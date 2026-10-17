/**
 * 2026-27 College Football Playoff schedule facts.
 * Dates, sites, and networks are copied from collegefootballplayoff.com,
 * the ESPN Press Room release, and official bowl pages checked 2026-10-17.
 * Unannounced matchups, campus sites, and kickoffs stay "to be announced".
 * No prices. No resale or sportsbook links.
 */

export const CFP_WATCH_PATH = "/guide/college-football-playoff-2026-schedule-how-to-watch/";
export const CFP_WATCH_UPDATED = "2026-10-17";
export const CFP_WATCH_TITLE = "2026-27 College Football Playoff schedule and how to watch";
export const CFP_WATCH_H1 = "2026-27 College Football Playoff schedule and how to watch";
export const CFP_WATCH_DESCRIPTION =
  "Dates, bowls, TV networks, and streams for the 2026-27 College Football Playoff, plus ranking days and selection day. Matchups and some kickoffs are to be announced. Not affiliated. Not gambling advice.";

export const CFP_BROADCAST =
  "https://collegefootballplayoff.com/news/2026/6/1/26-27-broadcast-sked";
export const CFP_BOWL_DATES =
  "https://collegefootballplayoff.com/news/2026/2/3/2627-2728-bowls";
export const CFP_SCHEDULE =
  "https://collegefootballplayoff.com/sports/collegefootballplayoff/schedule";
export const CFP_FORMAT =
  "https://collegefootballplayoff.com/news/2026/1/23/2627-format";
export const CFP_COMMITTEE_PREP =
  "https://collegefootballplayoff.com/news/2026/8/6/sc-aug-2627";
export const CFP_BRACKET =
  "https://collegefootballplayoff.com/sports/2026/8/9/bracket-place-holder";
export const CFP_COMMITTEE =
  "https://collegefootballplayoff.com/sports/2021/9/8/about-selection-committee";
export const CFP_ABOUT_RANKINGS =
  "https://collegefootballplayoff.com/sports/2016/10/11/about-rankings";
export const CFP_TICKETS =
  "https://collegefootballplayoff.com/sports/2018/9/25/cfp-tickets";
export const CFP_FIESTA = "https://collegefootballplayoff.com/sports/2021/9/7/fiesta-bowl";
export const CFP_COTTON = "https://collegefootballplayoff.com/sports/2021/9/7/cotton-bowl";
export const CFP_PEACH = "https://collegefootballplayoff.com/sports/2021/9/7/peach-bowl";
export const CFP_ROSE = "https://collegefootballplayoff.com/sports/2021/9/7/rose-bowl";
export const CFP_ORANGE = "https://collegefootballplayoff.com/sports/2021/9/7/orange-bowl";
export const CFP_SUGAR = "https://collegefootballplayoff.com/sports/2021/9/7/sugar-bowl";
export const ESPN_PRESS =
  "https://espnpressroom.com/press-release/2026-27-cfp-broadcast-schedule-revealed/";
export const WBD_PRESS =
  "https://press.wbd.com/na/property/college-football-playoffs/media-releases";
export const ORANGE_NEWS =
  "https://www.orangebowl.org/capital-one-orange-bowl-cfp-semifinal-set-for-primetime-on-january-14-2027/";
export const SUGAR_NEWS =
  "https://allstatesugarbowl.org/news/2026/6/1/game-date-time.aspx";
export const PEACH_NEWS =
  "https://chick-fil-apeachbowl.com/news/2026/2/3/general-chick-fil-a-peach-bowl-dates-announced-for-2026-2027.aspx";
export const COTTON_TICKETS = "https://www.cottonbowl.com/feature/tickets-parking";
export const FIESTA_TICKETS = "https://www.fiestasportsfoundation.org/sports/vrbofb";
export const ORANGE_TICKETS = "https://www.orangebowl.org/thegame/tickets/";
export const PEACH_TICKETS = "https://chick-fil-apeachbowl.com/sports/2021/12/9/2023-tickets";
export const ROSE_TICKETS = "https://rosebowlgame.com/sports/2021/10/6/tickets-vip-packages.aspx";
export const SUGAR_TICKETS =
  "https://allstatesugarbowl.org/sports/2022/4/6/official-allstate-sugar-bowl-tickets.aspx";
export const PLAYOFF_PREMIUM = "https://playoffpremium.com/";
export const CFP_RSVP = "https://cfp-rsvp.com/home";

export const CITATION_HOSTS = [
  "collegefootballplayoff.com",
  "espnpressroom.com",
  "press.wbd.com",
  "www.orangebowl.org",
  "allstatesugarbowl.org",
  "chick-fil-apeachbowl.com",
  "www.cottonbowl.com",
  "www.fiestasportsfoundation.org",
  "rosebowlgame.com",
  "playoffpremium.com",
  "cfp-rsvp.com",
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

const broadcast = (label: string) => `[${label}](${CFP_BROADCAST})`;
const espn = (label: string) => `[${label}](${ESPN_PRESS})`;
const bracket = (label: string) => `[${label}](${CFP_BRACKET})`;
const prep = (label: string) => `[${label}](${CFP_COMMITTEE_PREP})`;

export interface CfpKeyDate {
  id: string;
  label: string;
  when: string;
  detail: string;
  watch: string;
}

export interface CfpGame {
  id: string;
  round: string;
  dateLabel: string;
  kickoff: string;
  /** Confirmed start. Date only when the clock is not announced. */
  startDate: string;
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

export const CFP_ANSWER =
  "The 2026-27 College Football Playoff schedule has 11 dated games and no named teams yet. The first round is Friday, December 18, 2026, at 8 p.m. ET on ESPN, and Saturday, December 19, at noon ET on ABC and ESPN, 3:30 p.m. ET on TNT, truTV, and HBO Max, and 7:30 p.m. ET on TNT, truTV, and HBO Max. Those four games are at campus sites to be announced on selection day. The quarterfinals are Wednesday, December 30, at the Vrbo Fiesta Bowl in Glendale, and Friday, January 1, 2027, at the Goodyear Cotton Bowl Classic, the Chick-fil-A Peach Bowl, and the Rose Bowl Game presented by Prudential. The semifinals are Thursday, January 14, at the Capital One Orange Bowl, and Friday, January 15, at the Allstate Sugar Bowl. The national championship is Monday, January 25, 2027, at 7:30 p.m. ET at Allegiant Stadium in Las Vegas, on ABC and ESPN. Matchups, first-round campuses, and the January 1 kickoff times are to be announced.";

export const CFP_KEY_DATES: readonly CfpKeyDate[] = [
  {
    id: "rank-1",
    label: "First ranking release",
    when: "Tuesday, November 3, 2026",
    detail: "7-8 p.m. ET",
    watch: "ESPN",
  },
  {
    id: "rank-2",
    label: "Ranking release",
    when: "Tuesday, November 10, 2026",
    detail: "9-9:30 p.m. ET",
    watch: "ESPN",
  },
  {
    id: "rank-3",
    label: "Ranking release",
    when: "Tuesday, November 17, 2026",
    detail: "9-9:30 p.m. ET",
    watch: "ESPN",
  },
  {
    id: "rank-4",
    label: "Ranking release",
    when: "Tuesday, November 24, 2026",
    detail: "7:30-8 p.m. ET",
    watch: "ESPN",
  },
  {
    id: "rank-5",
    label: "Ranking release",
    when: "Tuesday, December 1, 2026",
    detail: "7-7:30 p.m. ET",
    watch: "ESPN",
  },
  {
    id: "title-weekend",
    label: "Selection weekend",
    when: "Friday, December 4 through Sunday, December 6, 2026",
    detail: "Conference championship kickoffs are to be announced",
    watch: "to be announced",
  },
  {
    id: "selection",
    label: "Selection day",
    when: "Sunday, December 6, 2026",
    detail: "Noon-3 p.m. ET",
    watch: "ESPN and the ESPN app",
  },
];

export const CFP_KEY_DATE_NOTE = `${prep("The August 6, 2026 selection-committee release")} lists six ranking shows on ESPN: Tuesday, November 3, 7-8 p.m. ET; November 10, 9-9:30 p.m. ET; November 17, 9-9:30 p.m. ET; November 24, 7:30-8 p.m. ET; December 1, 7-7:30 p.m. ET; and selection day, Sunday, December 6, noon-3 p.m. ET. It says the committee reveals the weekly rankings on ESPN, and that selection day also announces the 12-team bracket pairings and game sites. ${bracket("The bracket page")} says selection day is live on ESPN and the ESPN app. ${`[The selection committee page](${CFP_COMMITTEE})`} prints the same six times and says that in 2026 selection weekend is Friday through Sunday, December 4-6, when the committee watches the conference championship games. That page does not list a conference championship kickoff or channel. This page does not invent one. ${`[The about-rankings page](${CFP_ABOUT_RANKINGS})`} still prints TBA next to those six dates. The times in the table are the August 6 release and the selection committee page, not that TBA table.`;

const noonWindow =
  "The three January 1 windows in the CFP table are noon ET, 4 p.m. ET, and 8 p.m. ET. Which bowl is in which window is to be announced on selection day.";

export const CFP_GAMES: readonly CfpGame[] = [
  {
    id: "fr-fri",
    round: "First round",
    dateLabel: "Friday, December 18, 2026",
    kickoff: "8 p.m. ET",
    startDate: "2026-12-18T20:00:00-05:00",
    site: "Campus site, to be announced",
    watch: "ESPN. ESPN-network games are on the ESPN App.",
    eventName: "CFP first-round game",
    eventDescription:
      "CFP first-round game on Friday, December 18, 2026, at 8 p.m. ET on ESPN. Campus site and teams are to be announced.",
    locationName: "Campus site of the higher seed",
    notes: [
      `${broadcast("The June 1, 2026 CFP broadcast release")} and ${espn("the ESPN Press Room release")} put one first-round game on Friday, December 18, at 8 p.m. ET on ESPN, at a campus site. Both say every first-round campus site is announced on selection day, Sunday, December 6. Both say games on ESPN networks are available on the ESPN App. The teams are to be announced.`,
    ],
  },
  {
    id: "fr-sat-noon",
    round: "First round",
    dateLabel: "Saturday, December 19, 2026",
    kickoff: "Noon ET",
    startDate: "2026-12-19T12:00:00-05:00",
    site: "Campus site, to be announced",
    watch: "ABC and ESPN. ESPN-network games are on the ESPN App.",
    eventName: "CFP first-round game",
    eventDescription:
      "CFP first-round game on Saturday, December 19, 2026, at noon ET on ABC and ESPN. Campus site and teams are to be announced.",
    locationName: "Campus site of the higher seed",
    notes: [
      `${broadcast("The CFP table")} and ${espn("the ESPN Press Room table")} both list Saturday, December 19, at noon ET on ABC and ESPN, at a campus site. The teams and the campus are to be announced.`,
    ],
  },
  {
    id: "fr-sat-330",
    round: "First round",
    dateLabel: "Saturday, December 19, 2026",
    kickoff: "3:30 p.m. ET",
    startDate: "2026-12-19T15:30:00-05:00",
    site: "Campus site, to be announced",
    watch: "TNT, truTV, and HBO Max",
    eventName: "CFP first-round game",
    eventDescription:
      "CFP first-round game on Saturday, December 19, 2026, at 3:30 p.m. ET on TNT, truTV, and HBO Max. Campus site and teams are to be announced.",
    locationName: "Campus site of the higher seed",
    notes: [
      `${broadcast("The CFP table")} and ${espn("the ESPN Press Room table")} both list Saturday, December 19, at 3:30 p.m. ET on TNT, truTV, and HBO Max. The CFP prose says first-round games on TNT and truTV also stream on HBO Max. The teams and the campus are to be announced.`,
    ],
  },
  {
    id: "fr-sat-730",
    round: "First round",
    dateLabel: "Saturday, December 19, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-19T19:30:00-05:00",
    site: "Campus site, to be announced",
    watch: "TNT, truTV, and HBO Max",
    eventName: "CFP first-round game",
    eventDescription:
      "CFP first-round game on Saturday, December 19, 2026, at 7:30 p.m. ET on TNT, truTV, and HBO Max. Campus site and teams are to be announced.",
    locationName: "Campus site of the higher seed",
    notes: [
      `${broadcast("The CFP table")} and ${espn("the ESPN Press Room table")} both list Saturday, December 19, at 7:30 p.m. ET on TNT, truTV, and HBO Max. The teams and the campus are to be announced.`,
    ],
  },
  {
    id: "qf-fiesta",
    round: "Quarterfinal",
    dateLabel: "Wednesday, December 30, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-30T19:30:00-05:00",
    site: "Vrbo Fiesta Bowl, State Farm Stadium, Glendale, Arizona",
    watch: "TNT, truTV, and HBO Max",
    eventName: "CFP quarterfinal at the Vrbo Fiesta Bowl",
    eventDescription:
      "CFP quarterfinal at the Vrbo Fiesta Bowl, State Farm Stadium, Glendale, Arizona, Wednesday, December 30, 2026, at 7:30 p.m. ET, on TNT, truTV, and HBO Max. Teams are to be announced.",
    locationName: "State Farm Stadium",
    addressLocality: "Glendale",
    addressRegion: "AZ",
    notes: [
      `${broadcast("The CFP broadcast table")} lists Wednesday, December 30, at 7:30 p.m. ET at the Vrbo Fiesta Bowl in Glendale, Arizona, on TNT, truTV, and HBO Max. ${espn("The ESPN Press Room table")} lists the same window. ${`[The CFP Fiesta Bowl page](${CFP_FIESTA})`} names State Farm Stadium in Glendale, Arizona, the same date and time, and TNT, truTV, and HBO Max. ${`[The February 3, 2026 bowl announcement](${CFP_BOWL_DATES})`} had already assigned December 30, 2026, to the Vrbo Fiesta Bowl. The teams are to be announced.`,
    ],
  },
  {
    id: "qf-cotton",
    round: "Quarterfinal",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    site: "Goodyear Cotton Bowl Classic, AT&T Stadium, Arlington, Texas",
    watch: "to be announced",
    eventName: "CFP quarterfinal at the Goodyear Cotton Bowl Classic",
    eventDescription:
      "CFP quarterfinal at the Goodyear Cotton Bowl Classic, AT&T Stadium, Arlington, Texas, on Friday, January 1, 2027. Kickoff time, TV network, and teams are to be announced.",
    locationName: "AT&T Stadium",
    addressLocality: "Arlington",
    addressRegion: "TX",
    notes: [
      `${`[The CFP Cotton Bowl page](${CFP_COTTON})`} dates the game Friday, January 1, 2027, at AT&T Stadium in Arlington, Texas, and marks the time and the TV TBA. ${broadcast("The CFP broadcast footnote")} says the Cotton Bowl, the Peach Bowl, and the Rose Bowl are assigned to their January 1 windows on selection day. ${noonWindow}`,
    ],
  },
  {
    id: "qf-peach",
    round: "Quarterfinal",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    site: "Chick-fil-A Peach Bowl, Mercedes-Benz Stadium, Atlanta, Georgia",
    watch: "to be announced",
    eventName: "CFP quarterfinal at the Chick-fil-A Peach Bowl",
    eventDescription:
      "CFP quarterfinal at the Chick-fil-A Peach Bowl, Mercedes-Benz Stadium, Atlanta, Georgia, on Friday, January 1, 2027. Kickoff time, TV network, and teams are to be announced.",
    locationName: "Mercedes-Benz Stadium",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    notes: [
      `${`[The CFP Peach Bowl page](${CFP_PEACH})`} dates the game Friday, January 1, 2027, at Mercedes-Benz Stadium in Atlanta, Georgia, and marks the time and the TV TBA. ${`[The Peach Bowl's February 3, 2026 announcement](${PEACH_NEWS})`} says the 2026-27 quarterfinal is Friday, January 1, 2027, and that the time and television network come later. ${noonWindow}`,
    ],
  },
  {
    id: "qf-rose",
    round: "Quarterfinal",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    site: "Rose Bowl Game presented by Prudential, Rose Bowl Stadium, Pasadena, California",
    watch: "to be announced",
    eventName: "CFP quarterfinal at the Rose Bowl Game presented by Prudential",
    eventDescription:
      "CFP quarterfinal at the Rose Bowl Game presented by Prudential, Rose Bowl Stadium, Pasadena, California, on Friday, January 1, 2027. Kickoff time, TV network, and teams are to be announced.",
    locationName: "Rose Bowl Stadium",
    addressLocality: "Pasadena",
    addressRegion: "CA",
    notes: [
      `${`[The CFP Rose Bowl page](${CFP_ROSE})`} dates the game Friday, January 1, 2027, at Rose Bowl Stadium in Pasadena, California, and marks the time and the TV TBA. ${`[The CFP schedule page](${CFP_SCHEDULE})`} also lists that bowl on January 1, 2027, with the time TBD. ${noonWindow}`,
    ],
  },
  {
    id: "sf-orange",
    round: "Semifinal",
    dateLabel: "Thursday, January 14, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-14T19:30:00-05:00",
    site: "Capital One Orange Bowl, Hard Rock Stadium, Miami Gardens, Florida",
    watch: "TNT, truTV, and HBO Max",
    eventName: "CFP semifinal at the Capital One Orange Bowl",
    eventDescription:
      "CFP semifinal at the Capital One Orange Bowl, Hard Rock Stadium, Miami Gardens, Florida, Thursday, January 14, 2027, at 7:30 p.m. ET, on TNT, truTV, and HBO Max. Teams are to be announced.",
    locationName: "Hard Rock Stadium",
    addressLocality: "Miami Gardens",
    addressRegion: "FL",
    notes: [
      `${broadcast("The CFP broadcast table")} lists Thursday, January 14, at 7:30 p.m. ET at the Capital One Orange Bowl in Miami Gardens, Florida, on TNT, truTV, and HBO Max. ${`[The CFP Orange Bowl page](${CFP_ORANGE})`} names Hard Rock Stadium in Miami Gardens, Florida, the same date, time, and networks. ${`[The Orange Bowl's June 1, 2026 release](${ORANGE_NEWS})`} says the semifinal is Thursday, January 14, 2027, at 7:30 p.m. ET at Hard Rock Stadium in Miami Gardens, on TNT, truTV, and HBO Max. The teams are to be announced.`,
    ],
  },
  {
    id: "sf-sugar",
    round: "Semifinal",
    dateLabel: "Friday, January 15, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-15T19:30:00-05:00",
    site: "Allstate Sugar Bowl, Caesars Superdome, New Orleans, Louisiana",
    watch: "ABC and ESPN. ESPN-network games are on the ESPN App.",
    eventName: "CFP semifinal at the Allstate Sugar Bowl",
    eventDescription:
      "CFP semifinal at the Allstate Sugar Bowl, Caesars Superdome, New Orleans, Louisiana, Friday, January 15, 2027, at 7:30 p.m. ET, on ABC and ESPN. Teams are to be announced.",
    locationName: "Caesars Superdome",
    addressLocality: "New Orleans",
    addressRegion: "LA",
    notes: [
      `${broadcast("The CFP broadcast table")} lists Friday, January 15, at 7:30 p.m. ET at the Allstate Sugar Bowl in New Orleans, Louisiana, on ABC and ESPN. ${`[The CFP Sugar Bowl page](${CFP_SUGAR})`} names Caesars Superdome in New Orleans, Louisiana, the same date and time, and ABC and ESPN. ${`[The Sugar Bowl's June 1, 2026 release](${SUGAR_NEWS})`} says the game is Friday, January 15, 2027, at 6:30 p.m. Central, on ABC and ESPN. 6:30 p.m. Central is the same clock as 7:30 p.m. ET. The teams are to be announced.`,
    ],
  },
  {
    id: "championship",
    round: "National championship",
    dateLabel: "Monday, January 25, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-25T19:30:00-05:00",
    site: "Allegiant Stadium, Las Vegas, Nevada",
    watch: "ABC and ESPN. ESPN-network games are on the ESPN App.",
    eventName: "2027 CFP National Championship Presented by AT&T",
    eventDescription:
      "2027 CFP National Championship Presented by AT&T, Allegiant Stadium, Las Vegas, Nevada, Monday, January 25, 2027, at 7:30 p.m. ET, on ABC and ESPN. Teams are to be announced.",
    locationName: "Allegiant Stadium",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    notes: [
      `${broadcast("The CFP broadcast release")} says the 2027 CFP National Championship Presented by AT&T airs on ESPN networks, including ABC, on Monday, January 25, 2027, from Allegiant Stadium in Las Vegas, Nevada. The table lists 7:30 p.m. ET on ABC and ESPN. ${espn("The ESPN Press Room release")} says the same. ${`[The January 23, 2026 format release](${CFP_FORMAT})`} had already set that championship for Allegiant Stadium in Las Vegas on January 25, 2027. The teams are to be announced.`,
    ],
  },
];

export const CFP_NOON_DISAGREEMENT = `${broadcast("The CFP broadcast table")} lists the Friday, January 1, noon ET quarterfinal window as TNT, truTV, and HBO Max. ${espn("The ESPN Press Room table")} and ${`[the Sugar Bowl's reprint of the schedule](${SUGAR_NEWS})`} list that same noon window as TNT and HBO Max, and they do not name truTV. The other TNT windows in all three tables do name truTV. The window is not assigned to a bowl yet. This page does not pick a side.`;

export const CFP_FORMAT_NOTE = `${`[The January 23, 2026 format release](${CFP_FORMAT})`} says the 12-team playoff continues for 2026-27, with first-round games on campus sites, quarterfinals and semifinals at the bowl hosts, and the championship at Allegiant Stadium in Las Vegas on January 25, 2027. ${prep("The August 6 release")} says the 12 schools are the champions of the Atlantic Coast Conference, the Big Ten Conference, the Big 12 Conference, and the Southeastern Conference, the highest-ranked champion from the American, Conference USA, the Mid-American Conference, the Mountain West, the Pac-12 Conference, or the Sun Belt Conference, and the next seven highest-ranked teams. It says Notre Dame is included if it is ranked in the top 12. ${bracket("The bracket page")} says that if Notre Dame is in the top 12, Notre Dame receives an automatic bid and six at-large bids are awarded, so the field stays 12. The same page says seeds 1 through 4 receive a first-round bye, seeds 5 through 12 play at the higher seed's home stadium, and an automatic qualifier ranked outside the top 12 is placed in order at the bottom of the seeding. The first-round pairings on that page are 12 against 5, 11 against 6, 10 against 7, and 9 against 8. Which pairing is in which first-round window is to be announced. The bracket is not reseeded. In the quarterfinals, seed 1 plays the winner of 8 against 9, seed 4 plays the winner of 5 against 12, seed 2 plays the winner of 7 against 10, and seed 3 plays the winner of 6 against 11. The August 6 release says the top three seeds, in rank order, select their bowl path. The bracket page says seed 1 selects its quarterfinal bowl and the semifinal it would reach, seeds 2 and 3 then select from the remaining quarterfinal bowls and are assigned to the other semifinal, and seed 4 is assigned the last quarterfinal bowl.`;

export const CFP_TICKET_NOTE = `${`[The CFP tickets page](${CFP_TICKETS})`} says most national championship tickets are allocated to the two participating schools and sold by those schools. The schools are to be announced. The same page lists the CFP ticketing department at tickets@collegefootballplayoff.com, ${`[Playoff Premium](${PLAYOFF_PREMIUM})`} as the official premium hospitality program for the national championship, and ${`[CFP RSVP](${CFP_RSVP})`} as a reservation program for that game. No price is printed here. The CFP tickets page also names a fan-to-fan resale exchange. This guide does not link it. For the quarterfinals and semifinals, that page lists the bowl ticket offices: ${`[Cotton Bowl](${COTTON_TICKETS})`}, ${`[Fiesta Bowl](${FIESTA_TICKETS})`}, ${`[Orange Bowl](${ORANGE_TICKETS})`}, ${`[Rose Bowl](${ROSE_TICKETS})`}, and ${`[Sugar Bowl](${SUGAR_TICKETS})`}. Its Peach Bowl ticket-office link goes to a Ticketmaster event page. This guide does not link that marketplace. It links ${`[the Peach Bowl's own tickets page](${PEACH_TICKETS})`} instead. ${`[The Orange Bowl tickets page](${ORANGE_TICKETS})`} says tickets for the January 14, 2027 semifinal at Hard Rock Stadium are officially on sale. ${`[The Sugar Bowl's June 1 release](${SUGAR_NEWS})`} says annual ticket holders can attend and that more ticket information will be released. First-round campus sites are to be announced, and this page does not name a seller for those games.`;

export const CFP_WBD_GAP = `On October 17, 2026, ${`[the Warner Bros. Discovery press index](${WBD_PRESS})`} for this competition listed releases dated December 15, 2025, and did not list a June 2026 schedule release. This page does not cite a TNT Sports press release for these windows. TNT, truTV, and HBO Max are named from the CFP article, the ESPN Press Room release, and the bowl pages above.`;

export const CFP_MEGACAST = `${broadcast("The CFP broadcast release")} says full MegaCast information will be announced later. MegaCast channels are to be announced.`;

export const CFP_SOURCES: readonly WatchSource[] = [
  {
    id: "broadcast",
    label: "College Football Playoff: 2026-27 broadcast schedule (June 1, 2026)",
    href: CFP_BROADCAST,
    usedFor:
      "Kickoff times, campus-site first round, bowl windows, networks, Allegiant Stadium, ESPN App, and the January 1 assignment note.",
  },
  {
    id: "espn",
    label: "ESPN Press Room: 2026-27 broadcast schedule (June 1, 2026)",
    href: ESPN_PRESS,
    usedFor:
      "The same dates and networks, except the January 1 noon window, where this table does not name truTV.",
  },
  {
    id: "bowls",
    label: "College Football Playoff: quarterfinal and semifinal bowls (February 3, 2026)",
    href: CFP_BOWL_DATES,
    usedFor: "Which bowls host the quarterfinals and semifinals in 2026-27.",
  },
  {
    id: "schedule",
    label: "College Football Playoff schedule page",
    href: CFP_SCHEDULE,
    usedFor: "The same dates, with TBD on the Cotton, Peach, and Rose kickoffs.",
  },
  {
    id: "format",
    label: "College Football Playoff: 12-team format continued (January 23, 2026)",
    href: CFP_FORMAT,
    usedFor: "The decision to keep 12 teams, campus first-round games, and the championship date and stadium.",
  },
  {
    id: "prep",
    label: "College Football Playoff: selection committee schedule (August 6, 2026)",
    href: CFP_COMMITTEE_PREP,
    usedFor: "Ranking dates and times, selection day, and who receives a bid.",
  },
  {
    id: "bracket",
    label: "College Football Playoff: 2026-27 bracket page",
    href: CFP_BRACKET,
    usedFor: "Byes, first-round pairings, no reseeding, bowl-path selection, and the selection-day TV window.",
  },
  {
    id: "committee",
    label: "College Football Playoff: selection committee page",
    href: CFP_COMMITTEE,
    usedFor: "The same ranking times, and selection weekend of December 4-6, 2026.",
  },
  {
    id: "rankings-tba",
    label: "College Football Playoff: about the rankings",
    href: CFP_ABOUT_RANKINGS,
    usedFor: "Checked October 17, 2026. This page still prints TBA for the ranking times, so it is not the time source.",
  },
  {
    id: "fiesta",
    label: "College Football Playoff: Vrbo Fiesta Bowl page",
    href: CFP_FIESTA,
    usedFor: "State Farm Stadium, Glendale, December 30, 7:30 p.m. ET, TNT, truTV, and HBO Max.",
  },
  {
    id: "cotton",
    label: "College Football Playoff: Goodyear Cotton Bowl Classic page",
    href: CFP_COTTON,
    usedFor: "AT&T Stadium, Arlington, January 1, 2027, with time and TV TBA.",
  },
  {
    id: "peach",
    label: "College Football Playoff: Chick-fil-A Peach Bowl page",
    href: CFP_PEACH,
    usedFor: "Mercedes-Benz Stadium, Atlanta, January 1, 2027, with time and TV TBA.",
  },
  {
    id: "rose",
    label: "College Football Playoff: Rose Bowl page",
    href: CFP_ROSE,
    usedFor: "Rose Bowl Stadium, Pasadena, January 1, 2027, with time and TV TBA.",
  },
  {
    id: "orange",
    label: "College Football Playoff: Capital One Orange Bowl page",
    href: CFP_ORANGE,
    usedFor: "Hard Rock Stadium, Miami Gardens, January 14, 7:30 p.m. ET, TNT, truTV, and HBO Max.",
  },
  {
    id: "sugar",
    label: "College Football Playoff: Allstate Sugar Bowl page",
    href: CFP_SUGAR,
    usedFor: "Caesars Superdome, New Orleans, January 15, 7:30 p.m. ET, ABC and ESPN.",
  },
  {
    id: "orange-news",
    label: "Capital One Orange Bowl release (June 1, 2026)",
    href: ORANGE_NEWS,
    usedFor: "Hard Rock Stadium, January 14, 7:30 p.m. ET, TNT, truTV, and HBO Max.",
  },
  {
    id: "sugar-news",
    label: "Allstate Sugar Bowl release (June 1, 2026)",
    href: SUGAR_NEWS,
    usedFor:
      "January 15, 6:30 p.m. Central, ABC and ESPN, and the schedule reprint that omits truTV from the January 1 noon window.",
  },
  {
    id: "peach-news",
    label: "Chick-fil-A Peach Bowl dates (February 3, 2026)",
    href: PEACH_NEWS,
    usedFor: "January 1, 2027 quarterfinal, with time and network still to come.",
  },
  {
    id: "wbd",
    label: "Warner Bros. Discovery press index, checked October 17, 2026",
    href: WBD_PRESS,
    usedFor: "No June 2026 schedule release was listed. Not used as a network source.",
  },
  {
    id: "tickets",
    label: "College Football Playoff tickets page",
    href: CFP_TICKETS,
    usedFor: "Championship allocation, Playoff Premium, CFP RSVP, and the bowl ticket-office list.",
  },
  {
    id: "premium",
    label: "Playoff Premium",
    href: PLAYOFF_PREMIUM,
    usedFor: "Official premium hospitality for the national championship, as named on the CFP tickets page.",
  },
  {
    id: "rsvp",
    label: "CFP RSVP",
    href: CFP_RSVP,
    usedFor: "National championship reservation program named on the CFP tickets page.",
  },
  {
    id: "cotton-tickets",
    label: "Goodyear Cotton Bowl Classic ticket office",
    href: COTTON_TICKETS,
    usedFor: "Ticket office link published on the CFP tickets page. No price is copied here.",
  },
  {
    id: "fiesta-tickets",
    label: "Vrbo Fiesta Bowl ticket office",
    href: FIESTA_TICKETS,
    usedFor: "Ticket office link published on the CFP tickets page. No price is copied here.",
  },
  {
    id: "orange-tickets",
    label: "Capital One Orange Bowl tickets",
    href: ORANGE_TICKETS,
    usedFor: "Official bowl page stating that January 14, 2027 tickets are on sale. No price is copied here.",
  },
  {
    id: "peach-tickets",
    label: "Chick-fil-A Peach Bowl tickets",
    href: PEACH_TICKETS,
    usedFor: "The bowl's own tickets page. The Ticketmaster address is not linked from this guide.",
  },
  {
    id: "rose-tickets",
    label: "Rose Bowl Game tickets",
    href: ROSE_TICKETS,
    usedFor: "Ticket office link published on the CFP tickets page. No price is copied here.",
  },
  {
    id: "sugar-tickets",
    label: "Allstate Sugar Bowl tickets",
    href: SUGAR_TICKETS,
    usedFor: "Ticket office link published on the CFP tickets page. No price is copied here.",
  },
];

export const CFP_FAQS: readonly WatchFaq[] = [
  {
    question: "When is selection day for the 2026 College Football Playoff?",
    answer:
      "Sunday, December 6, 2026, from noon to 3 p.m. ET, on ESPN and the ESPN app. The August 6 selection-committee release says that show includes the final rankings, the 12-team bracket pairings, and the game sites. Weekly ranking shows before that are on ESPN on November 3, November 10, November 17, November 24, and December 1. The selection committee page says selection weekend, when the committee watches conference championship games, is Friday through Sunday, December 4-6, 2026. Conference championship kickoffs are to be announced.",
  },
  {
    question: "What channel is the 2027 national championship on?",
    answer:
      "ABC and ESPN, Monday, January 25, 2027, at 7:30 p.m. ET, from Allegiant Stadium in Las Vegas. The June 1 CFP and ESPN releases say games on ESPN networks are available on the ESPN App. The teams are to be announced. MegaCast channels are to be announced.",
  },
  {
    question: "Where are the 2026-27 quarterfinals and semifinals?",
    answer:
      "Quarterfinals: Vrbo Fiesta Bowl on Wednesday, December 30, 2026, at 7:30 p.m. ET at State Farm Stadium in Glendale, on TNT, truTV, and HBO Max; and on Friday, January 1, 2027, the Goodyear Cotton Bowl Classic at AT&T Stadium in Arlington, the Chick-fil-A Peach Bowl at Mercedes-Benz Stadium in Atlanta, and the Rose Bowl Game presented by Prudential at Rose Bowl Stadium in Pasadena. Those three kickoffs and networks are to be announced. Semifinals: Capital One Orange Bowl on Thursday, January 14, 2027, at 7:30 p.m. ET at Hard Rock Stadium in Miami Gardens, on TNT, truTV, and HBO Max; and Allstate Sugar Bowl on Friday, January 15, 2027, at 7:30 p.m. ET at Caesars Superdome in New Orleans, on ABC and ESPN.",
  },
  {
    question: "Have the 2026-27 playoff teams been announced?",
    answer:
      "No. Matchups are to be announced on selection day, Sunday, December 6, 2026. First-round campus sites are to be announced the same day. This page does not guess a team, a seed, or a stadium for the first round.",
  },
  {
    question: "How does the 12-team bracket work?",
    answer:
      "The field is 12 teams: four named conference champions, the highest-ranked champion from the listed group of six conferences, and seven at-large teams. If Notre Dame is in the top 12, the bracket page says Notre Dame has an automatic bid and the at-large count is six. Seeds 1 through 4 have a first-round bye. Seeds 5 through 12 play at the higher seed's home stadium, paired 12 against 5, 11 against 6, 10 against 7, and 9 against 8. The bracket is not reseeded. The top three seeds select their bowl path, and seed 4 is assigned the quarterfinal that remains.",
  },
  {
    question: "Where do I buy tickets?",
    answer:
      "Use the CFP tickets page and the official bowl ticket pages linked on this guide. Most national championship tickets go to the two schools, which are to be announced. Playoff Premium is the official premium hospitality program, and CFP RSVP is the reservation program named on the CFP tickets page. The Orange Bowl site says its January 14 tickets are on sale. This page does not list a price and does not link a resale exchange.",
  },
];

export const CFP_OMISSIONS = [
  "Matchups and seeds are to be announced on selection day.",
  "First-round campus sites are to be announced on selection day.",
  "Which first-round pairing plays in which window is to be announced.",
  "Kickoff time and TV network for the Cotton Bowl, Peach Bowl, and Rose Bowl are to be announced. The three January 1 windows exist. The bowl assigned to each window does not.",
  "The CFP table names truTV on the January 1 noon window. The ESPN Press Room table and the Sugar Bowl reprint do not. This page does not choose.",
  "MegaCast channels are to be announced.",
  "Conference championship kickoffs and channels are to be announced. The dated fact is selection weekend, December 4-6, 2026.",
  "No ticket price. None is printed here.",
  "No resale link and no wagering link.",
  "No first-round ticket seller. The campus sites are to be announced.",
  "No TNT Sports press release. The Warner Bros. Discovery index checked on October 17, 2026 did not list a June 2026 schedule release.",
] as const;

export function cfpWatchBodies(): string[] {
  return [
    CFP_ANSWER,
    CFP_KEY_DATE_NOTE,
    CFP_NOON_DISAGREEMENT,
    CFP_FORMAT_NOTE,
    CFP_TICKET_NOTE,
    CFP_WBD_GAP,
    CFP_MEGACAST,
    ...CFP_GAMES.flatMap((game) => game.notes),
    ...CFP_FAQS.map((faq) => `${faq.question} ${faq.answer}`),
    ...CFP_OMISSIONS,
    ...CFP_SOURCES.map((source) => `${source.label} ${source.usedFor} ${source.href}`),
  ];
}
