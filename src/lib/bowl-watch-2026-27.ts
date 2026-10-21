/**
 * 2026-27 college bowl dates, sites, and networks.
 * Facts are copied from the ESPN Press Room, The CW, bowl sites,
 * the Sun Bowl Association, NCAA.com, Coca-Cola Bowl Season, and
 * the College Football Playoff. Checked 2026-10-21.
 * Team matchups stay "to be announced". No prices. No resale or sportsbook links.
 */

export const BOWL_WATCH_PATH = "/guide/bowl-schedule-2026-how-to-watch/";
export const BOWL_WATCH_UPDATED = "2026-10-21";
export const BOWL_WATCH_TITLE = "2026-27 college football bowl schedule and how to watch";
export const BOWL_WATCH_H1 = "2026-27 college football bowl schedule and how to watch";
export const BOWL_WATCH_DESCRIPTION =
  "Dates, cities, venues, and announced TV networks for the 2026-27 college bowl games whose dates are official. Team matchups are to be announced. Not affiliated with a bowl, a conference, or a network.";

export const ESPN_32 =
  "https://espnpressroom.com/press-release/espn-unveils-32-game-college-football-bowl-season-slate-for-2026-27-season/";
export const ESPN_EVENTS =
  "https://espnpressroom.com/press-release/espn-events-announces-17-game-college-football-bowl-schedule-for-2026-27-season/";
export const CW_RELEASE =
  "https://www.cwtvpr.com/the-cw/releases/?view=102128-the-cw-network-to-broadcast-san-diegos-2026-poinsettia-bowl-and-holiday-bowl-games";
export const SUN_NEWS =
  "https://sunbowl.org/news-and-media/news/old-el-paso-named-title-sponsor-of-sun-bowl";
export const SUN_EVENT = "https://sunbowl.org/events/old-el-paso-sun-bowl-game";
export const NCAA_SCHEDULE =
  "https://www.ncaa.com/news/football/article/2026-07-22/2026-27-college-football-bowl-game-schedule-scores-tv-channels-times";
export const BOWL_SEASON = "https://bowlseason.com/sports/bowl/schedule/2026-27";
export const ARIZONA_SITE = "https://thearizonabowl.com/";
export const POPTARTS =
  "https://poptartsbowl.com/pop-tarts-bowl-returns-tuesday-dec-29-at-530-p-m-et-on-espn/";
export const CITRUS =
  "https://www.citrusbowlorlando.com/citrus-bowl-set-for-saturday-jan-2-at-noon-et-on-abc/";
export const ALAMO = "https://www.alamobowl.com/gamedate2026/";
export const RELIAQUEST =
  "https://reliaquestbowl.com/news/2026/6/2/general-2026-reliaquest-bowl-to-kickoff-at-noon-on-new-years-eve.aspx";
export const HOLIDAY = "https://holidaybowl.com/";
export const POINSETTIA = "https://poinsettiabowl.com/";
export const CFP_BROADCAST =
  "https://collegefootballplayoff.com/news/2026/6/1/26-27-broadcast-sked";
export const CFP_BOWL_DATES =
  "https://collegefootballplayoff.com/news/2026/2/3/2627-2728-bowls";
export const CFP_FIESTA = "https://collegefootballplayoff.com/sports/2021/9/7/fiesta-bowl";
export const CFP_COTTON = "https://collegefootballplayoff.com/sports/2021/9/7/cotton-bowl";
export const CFP_PEACH = "https://collegefootballplayoff.com/sports/2021/9/7/peach-bowl";
export const CFP_ROSE = "https://collegefootballplayoff.com/sports/2021/9/7/rose-bowl";
export const CFP_ORANGE = "https://collegefootballplayoff.com/sports/2021/9/7/orange-bowl";
export const CFP_SUGAR = "https://collegefootballplayoff.com/sports/2021/9/7/sugar-bowl";

export const CITATION_HOSTS = [
  "espnpressroom.com",
  "www.cwtvpr.com",
  "sunbowl.org",
  "www.ncaa.com",
  "bowlseason.com",
  "thearizonabowl.com",
  "poptartsbowl.com",
  "www.citrusbowlorlando.com",
  "www.alamobowl.com",
  "reliaquestbowl.com",
  "holidaybowl.com",
  "poinsettiabowl.com",
  "collegefootballplayoff.com",
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

export interface BowlGame {
  id: string;
  name: string;
  dateLabel: string;
  kickoff: string;
  /** Confirmed start. Date only when the clock is not announced. */
  startDate: string;
  cityVenue: string;
  network: string;
  sourceLabel: string;
  sourceHref: string;
  eventName: string;
  eventDescription: string;
  locationName: string;
  addressLocality?: string;
  addressRegion?: string;
}

interface BowlInput {
  id: string;
  name: string;
  dateLabel: string;
  kickoff: string;
  startDate: string;
  cityVenue: string;
  network: string;
  sourceLabel: string;
  sourceHref: string;
  eventName?: string;
  locationName: string;
  addressLocality?: string;
  addressRegion?: string;
}

function describe(row: BowlInput): string {
  const clock =
    row.kickoff === "to be announced"
      ? "Kickoff time is to be announced."
      : `Kickoff is ${row.kickoff}.`;
  const network =
    row.network === "to be announced"
      ? "The TV network is to be announced."
      : `The announced network is ${row.network}.`;
  return `${row.eventName ?? row.name}, ${row.dateLabel}, ${row.cityVenue}. ${clock} ${network} Teams are to be announced.`;
}

function game(row: BowlInput): BowlGame {
  return {
    ...row,
    eventName: row.eventName ?? row.name,
    eventDescription: describe(row),
  };
}

const espn = "ESPN Press Room, June 3, 2026";
const cw = "CW press release, August 27, 2026";

export const BOWL_GAMES: readonly BowlGame[] = [
  game({
    id: "celebration",
    name: "Cricket Celebration Bowl",
    dateLabel: "Saturday, December 12, 2026",
    kickoff: "Noon ET",
    startDate: "2026-12-12T12:00:00-05:00",
    cityVenue: "Mercedes-Benz Stadium, Atlanta, Georgia",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Mercedes-Benz Stadium",
    addressLocality: "Atlanta",
    addressRegion: "GA",
  }),
  game({
    id: "salute",
    name: "IS4S Salute to Veterans Bowl",
    dateLabel: "Tuesday, December 15, 2026",
    kickoff: "5:30 p.m. ET",
    startDate: "2026-12-15T17:30:00-05:00",
    cityVenue: "Cramton Bowl, Montgomery, Alabama",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Cramton Bowl",
    addressLocality: "Montgomery",
    addressRegion: "AL",
  }),
  game({
    id: "frisco-classic",
    name: "Frisco Football Classic",
    dateLabel: "Tuesday, December 15, 2026",
    kickoff: "9 p.m. ET",
    startDate: "2026-12-15T21:00:00-05:00",
    cityVenue: "The Star at Ford Center, Frisco, Texas",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "The Star at Ford Center",
    addressLocality: "Frisco",
    addressRegion: "TX",
  }),
  game({
    id: "boca",
    name: "Boca Raton Bowl",
    dateLabel: "Friday, December 18, 2026",
    kickoff: "11 a.m. ET",
    startDate: "2026-12-18T11:00:00-05:00",
    cityVenue: "Flagler Credit Union Stadium, Boca Raton, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Flagler Credit Union Stadium",
    addressLocality: "Boca Raton",
    addressRegion: "FL",
  }),
  game({
    id: "gasparilla",
    name: "Union Home Mortgage Gasparilla Bowl",
    dateLabel: "Friday, December 18, 2026",
    kickoff: "2:30 p.m. ET",
    startDate: "2026-12-18T14:30:00-05:00",
    cityVenue: "Raymond James Stadium, Tampa, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Raymond James Stadium",
    addressLocality: "Tampa",
    addressRegion: "FL",
  }),
  game({
    id: "myrtle",
    name: "Myrtle Beach Bowl",
    dateLabel: "Monday, December 21, 2026",
    kickoff: "11 a.m. ET",
    startDate: "2026-12-21T11:00:00-05:00",
    cityVenue: "Brooks Stadium, Conway, South Carolina",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Brooks Stadium",
    addressLocality: "Conway",
    addressRegion: "SC",
  }),
  game({
    id: "potato",
    name: "Famous Idaho Potato Bowl",
    dateLabel: "Monday, December 21, 2026",
    kickoff: "2:30 p.m. ET",
    startDate: "2026-12-21T14:30:00-05:00",
    cityVenue: "Albertsons Stadium, Boise, Idaho",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Albertsons Stadium",
    addressLocality: "Boise",
    addressRegion: "ID",
  }),
  game({
    id: "puerto-rico",
    name: "Puerto Rico Bowl",
    dateLabel: "Tuesday, December 22, 2026",
    kickoff: "1:30 p.m. ET",
    startDate: "2026-12-22T13:30:00-05:00",
    cityVenue: "Juan Ramón Loubriel Stadium, Bayamón, Puerto Rico",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Juan Ramón Loubriel Stadium",
    addressLocality: "Bayamón",
    addressRegion: "PR",
  }),
  game({
    id: "cure",
    name: "StaffDNA Cure Bowl",
    dateLabel: "Tuesday, December 22, 2026",
    kickoff: "5 p.m. ET",
    startDate: "2026-12-22T17:00:00-05:00",
    cityVenue: "Acrisure Bounce House, Orlando, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Acrisure Bounce House",
    addressLocality: "Orlando",
    addressRegion: "FL",
  }),
  game({
    id: "independence",
    name: "Radiance Technologies Independence Bowl",
    dateLabel: "Tuesday, December 22, 2026",
    kickoff: "8:30 p.m. ET",
    startDate: "2026-12-22T20:30:00-05:00",
    cityVenue: "Independence Stadium, Shreveport, Louisiana",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Independence Stadium",
    addressLocality: "Shreveport",
    addressRegion: "LA",
  }),
  game({
    id: "new-orleans",
    name: "New Orleans Bowl",
    dateLabel: "Wednesday, December 23, 2026",
    kickoff: "2 p.m. ET",
    startDate: "2026-12-23T14:00:00-05:00",
    cityVenue: "Caesars Superdome, New Orleans, Louisiana",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Caesars Superdome",
    addressLocality: "New Orleans",
    addressRegion: "LA",
  }),
  game({
    id: "armed-forces",
    name: "Lockheed Martin Armed Forces Bowl",
    dateLabel: "Wednesday, December 23, 2026",
    kickoff: "5:30 p.m. ET",
    startDate: "2026-12-23T17:30:00-05:00",
    cityVenue: "Amon G. Carter Stadium, Fort Worth, Texas",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Amon G. Carter Stadium",
    addressLocality: "Fort Worth",
    addressRegion: "TX",
  }),
  game({
    id: "poinsettia",
    name: "SDCCU Poinsettia Bowl",
    dateLabel: "Wednesday, December 23, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-23T19:30:00-05:00",
    cityVenue: "Snapdragon Stadium, San Diego, California",
    network: "The CW",
    sourceLabel: cw,
    sourceHref: CW_RELEASE,
    locationName: "Snapdragon Stadium",
    addressLocality: "San Diego",
    addressRegion: "CA",
  }),
  game({
    id: "frisco",
    name: "Frisco Bowl",
    dateLabel: "Wednesday, December 23, 2026",
    kickoff: "9 p.m. ET",
    startDate: "2026-12-23T21:00:00-05:00",
    cityVenue: "The Star at Ford Center, Frisco, Texas",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "The Star at Ford Center",
    addressLocality: "Frisco",
    addressRegion: "TX",
  }),
  game({
    id: "new-mexico",
    name: "Isleta New Mexico Bowl",
    dateLabel: "Thursday, December 24, 2026",
    kickoff: "2:30 p.m. ET",
    startDate: "2026-12-24T14:30:00-05:00",
    cityVenue: "University Stadium, Albuquerque, New Mexico",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "University Stadium",
    addressLocality: "Albuquerque",
    addressRegion: "NM",
  }),
  game({
    id: "hawaii",
    name: "Sheraton Hawai'i Bowl",
    dateLabel: "Thursday, December 24, 2026",
    kickoff: "7 p.m. ET",
    startDate: "2026-12-24T19:00:00-05:00",
    cityVenue: "Clarence T.C. Ching Athletics Complex, Honolulu, Hawaii",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Clarence T.C. Ching Athletics Complex",
    addressLocality: "Honolulu",
    addressRegion: "HI",
  }),
  game({
    id: "pinstripe",
    name: "Bad Boy Mowers Pinstripe Bowl",
    dateLabel: "Saturday, December 26, 2026",
    kickoff: "Noon ET",
    startDate: "2026-12-26T12:00:00-05:00",
    cityVenue: "Yankee Stadium, Bronx, New York",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Yankee Stadium",
    addressLocality: "Bronx",
    addressRegion: "NY",
  }),
  game({
    id: "fenway",
    name: "Wasabi Fenway Bowl",
    dateLabel: "Saturday, December 26, 2026",
    kickoff: "2 p.m. ET",
    startDate: "2026-12-26T14:00:00-05:00",
    cityVenue: "Fenway Park, Boston, Massachusetts",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Fenway Park",
    addressLocality: "Boston",
    addressRegion: "MA",
  }),
  game({
    id: "dukes",
    name: "Duke's Mayo Bowl",
    dateLabel: "Saturday, December 26, 2026",
    kickoff: "3:30 p.m. ET",
    startDate: "2026-12-26T15:30:00-05:00",
    cityVenue: "Bank of America Stadium, Charlotte, North Carolina",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Bank of America Stadium",
    addressLocality: "Charlotte",
    addressRegion: "NC",
  }),
  game({
    id: "ventures",
    name: "68 Ventures Bowl",
    dateLabel: "Saturday, December 26, 2026",
    kickoff: "5:30 p.m. ET",
    startDate: "2026-12-26T17:30:00-05:00",
    cityVenue: "Hancock Whitney Stadium, Mobile, Alabama",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Hancock Whitney Stadium",
    addressLocality: "Mobile",
    addressRegion: "AL",
  }),
  game({
    id: "cactus",
    name: "Cactus Bowl",
    dateLabel: "Saturday, December 26, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-26T19:30:00-05:00",
    cityVenue: "Mountain America Stadium, Tempe, Arizona",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Mountain America Stadium",
    addressLocality: "Tempe",
    addressRegion: "AZ",
  }),
  game({
    id: "military",
    name: "Freedom Mortgage Military Bowl",
    dateLabel: "Monday, December 28, 2026",
    kickoff: "2 p.m. ET",
    startDate: "2026-12-28T14:00:00-05:00",
    cityVenue: "Navy-Marine Corps Memorial Stadium, Annapolis, Maryland",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Navy-Marine Corps Memorial Stadium",
    addressLocality: "Annapolis",
    addressRegion: "MD",
  }),
  game({
    id: "holiday",
    name: "Holiday Bowl",
    dateLabel: "Monday, December 28, 2026",
    kickoff: "5 p.m. ET",
    startDate: "2026-12-28T17:00:00-05:00",
    cityVenue: "Snapdragon Stadium, San Diego, California",
    network: "The CW",
    sourceLabel: cw,
    sourceHref: CW_RELEASE,
    locationName: "Snapdragon Stadium",
    addressLocality: "San Diego",
    addressRegion: "CA",
  }),
  game({
    id: "birmingham",
    name: "JLab Birmingham Bowl",
    dateLabel: "Tuesday, December 29, 2026",
    kickoff: "2 p.m. ET",
    startDate: "2026-12-29T14:00:00-05:00",
    cityVenue: "Protective Stadium, Birmingham, Alabama",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Protective Stadium",
    addressLocality: "Birmingham",
    addressRegion: "AL",
  }),
  game({
    id: "poptarts",
    name: "Pop-Tarts Bowl",
    dateLabel: "Tuesday, December 29, 2026",
    kickoff: "5:30 p.m. ET",
    startDate: "2026-12-29T17:30:00-05:00",
    cityVenue: "Camping World Stadium, Orlando, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Camping World Stadium",
    addressLocality: "Orlando",
    addressRegion: "FL",
  }),
  game({
    id: "alamo",
    name: "Valero Alamo Bowl",
    dateLabel: "Tuesday, December 29, 2026",
    kickoff: "9 p.m. ET",
    startDate: "2026-12-29T21:00:00-05:00",
    cityVenue: "Alamodome, San Antonio, Texas",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Alamodome",
    addressLocality: "San Antonio",
    addressRegion: "TX",
  }),
  game({
    id: "gator",
    name: "TaxSlayer Gator Bowl",
    dateLabel: "Wednesday, December 30, 2026",
    kickoff: "11:30 a.m. ET",
    startDate: "2026-12-30T11:30:00-05:00",
    cityVenue: "EverBank Stadium, Jacksonville, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "EverBank Stadium",
    addressLocality: "Jacksonville",
    addressRegion: "FL",
  }),
  game({
    id: "music-city",
    name: "Liberty Mutual Music City Bowl",
    dateLabel: "Wednesday, December 30, 2026",
    kickoff: "3 p.m. ET",
    startDate: "2026-12-30T15:00:00-05:00",
    cityVenue: "Nissan Stadium, Nashville, Tennessee",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Nissan Stadium",
    addressLocality: "Nashville",
    addressRegion: "TN",
  }),
  game({
    id: "fiesta",
    name: "Vrbo Fiesta Bowl",
    dateLabel: "Wednesday, December 30, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-30T19:30:00-05:00",
    cityVenue: "State Farm Stadium, Glendale, Arizona",
    network: "TNT, truTV, and HBO Max",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_BROADCAST,
    eventName: "CFP quarterfinal at the Vrbo Fiesta Bowl",
    locationName: "State Farm Stadium",
    addressLocality: "Glendale",
    addressRegion: "AZ",
  }),
  game({
    id: "reliaquest",
    name: "ReliaQuest Bowl",
    dateLabel: "Thursday, December 31, 2026",
    kickoff: "Noon ET",
    startDate: "2026-12-31T12:00:00-05:00",
    cityVenue: "Raymond James Stadium, Tampa, Florida",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Raymond James Stadium",
    addressLocality: "Tampa",
    addressRegion: "FL",
  }),
  game({
    id: "sun",
    name: "Old El Paso Sun Bowl",
    dateLabel: "Thursday, December 31, 2026",
    kickoff: "2 p.m. ET",
    startDate: "2026-12-31T14:00:00-05:00",
    cityVenue: "Sun Bowl Stadium, El Paso, Texas",
    network: "CBS",
    sourceLabel: "Sun Bowl Association, September 17, 2026",
    sourceHref: SUN_NEWS,
    locationName: "Sun Bowl Stadium",
    addressLocality: "El Paso",
    addressRegion: "TX",
  }),
  game({
    id: "las-vegas",
    name: "Las Vegas Bowl",
    dateLabel: "Thursday, December 31, 2026",
    kickoff: "3:45 p.m. ET",
    startDate: "2026-12-31T15:45:00-05:00",
    cityVenue: "Allegiant Stadium, Las Vegas, Nevada",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Allegiant Stadium",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
  }),
  game({
    id: "texas",
    name: "Kinder's Texas Bowl",
    dateLabel: "Thursday, December 31, 2026",
    kickoff: "7:30 p.m. ET",
    startDate: "2026-12-31T19:30:00-05:00",
    cityVenue: "Houston, Texas. NCAA.com: NRG Stadium. ESPN Press Room: Reliant Stadium.",
    network: "ESPN",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Houston, Texas",
  }),
  game({
    id: "cotton",
    name: "Goodyear Cotton Bowl Classic",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    cityVenue: "AT&T Stadium, Arlington, Texas",
    network: "to be announced",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_COTTON,
    eventName: "CFP quarterfinal at the Goodyear Cotton Bowl Classic",
    locationName: "AT&T Stadium",
    addressLocality: "Arlington",
    addressRegion: "TX",
  }),
  game({
    id: "peach",
    name: "Chick-fil-A Peach Bowl",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    cityVenue: "Mercedes-Benz Stadium, Atlanta, Georgia",
    network: "to be announced",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_PEACH,
    eventName: "CFP quarterfinal at the Chick-fil-A Peach Bowl",
    locationName: "Mercedes-Benz Stadium",
    addressLocality: "Atlanta",
    addressRegion: "GA",
  }),
  game({
    id: "rose",
    name: "Rose Bowl Game presented by Prudential",
    dateLabel: "Friday, January 1, 2027",
    kickoff: "to be announced",
    startDate: "2027-01-01",
    cityVenue: "Rose Bowl Stadium, Pasadena, California",
    network: "to be announced",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_ROSE,
    eventName: "CFP quarterfinal at the Rose Bowl Game presented by Prudential",
    locationName: "Rose Bowl Stadium",
    addressLocality: "Pasadena",
    addressRegion: "CA",
  }),
  game({
    id: "citrus",
    name: "Citrus Bowl",
    dateLabel: "Saturday, January 2, 2027",
    kickoff: "Noon ET",
    startDate: "2027-01-02T12:00:00-05:00",
    cityVenue: "Camping World Stadium, Orlando, Florida",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Camping World Stadium",
    addressLocality: "Orlando",
    addressRegion: "FL",
  }),
  game({
    id: "first-responder",
    name: "SERVPRO First Responder Bowl",
    dateLabel: "Saturday, January 2, 2027",
    kickoff: "3:30 p.m. ET",
    startDate: "2027-01-02T15:30:00-05:00",
    cityVenue: "Gerald J. Ford Stadium, Dallas, Texas",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Gerald J. Ford Stadium",
    addressLocality: "Dallas",
    addressRegion: "TX",
  }),
  game({
    id: "liberty",
    name: "AutoZone Liberty Bowl",
    dateLabel: "Saturday, January 2, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-02T19:30:00-05:00",
    cityVenue: "Simmons Bank Liberty Stadium, Memphis, Tennessee",
    network: "ABC",
    sourceLabel: espn,
    sourceHref: ESPN_32,
    locationName: "Simmons Bank Liberty Stadium",
    addressLocality: "Memphis",
    addressRegion: "TN",
  }),
  game({
    id: "orange",
    name: "Capital One Orange Bowl",
    dateLabel: "Thursday, January 14, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-14T19:30:00-05:00",
    cityVenue: "Hard Rock Stadium, Miami Gardens, Florida",
    network: "TNT, truTV, and HBO Max",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_BROADCAST,
    eventName: "CFP semifinal at the Capital One Orange Bowl",
    locationName: "Hard Rock Stadium",
    addressLocality: "Miami Gardens",
    addressRegion: "FL",
  }),
  game({
    id: "sugar",
    name: "Allstate Sugar Bowl",
    dateLabel: "Friday, January 15, 2027",
    kickoff: "7:30 p.m. ET",
    startDate: "2027-01-15T19:30:00-05:00",
    cityVenue: "Caesars Superdome, New Orleans, Louisiana",
    network: "ABC and ESPN",
    sourceLabel: "College Football Playoff",
    sourceHref: CFP_BROADCAST,
    eventName: "CFP semifinal at the Allstate Sugar Bowl",
    locationName: "Caesars Superdome",
    addressLocality: "New Orleans",
    addressRegion: "LA",
  }),
];

export const BOWL_ANSWER =
  "Team matchups for the 2026-27 bowls are not set. Selection is in December, and this page will be refreshed when the teams are announced. The table lists bowls whose 2026-27 dates are on an official release: 32 games on ESPN or ABC from the June 3, 2026 ESPN Press Room slate, the SDCCU Poinsettia Bowl and the Holiday Bowl from The CW and the bowls' own sites, the Old El Paso Sun Bowl from the Sun Bowl Association, and the six named College Football Playoff bowls. Kickoff times are Eastern. Where a kickoff or a network is not announced, the cell says to be announced.";

export const BOWL_ESPN_NOTE = `[The June 3, 2026 ESPN Press Room slate](${ESPN_32}) lists 32 games on ESPN, ABC, and the ESPN App from Saturday, December 12, 2026, through Saturday, January 2, 2027. The table's Time column is Eastern. The release says schedules are subject to change, and that commentator assignments follow bowl selections in December. It does not name teams. [The same day's ESPN Events release](${ESPN_EVENTS}) is the operator list for 17 of those games. Its prose says the Cricket Celebration Bowl is the MEAC champion and the SWAC champion, at Mercedes-Benz Stadium, at noon ET on ABC. It says the JLab Birmingham Bowl, at Protective Stadium in Birmingham, Alabama, at 2 p.m. on ESPN, features teams from the Southeastern Conference, the American Conference, or the Atlantic Coast Conference. It says the Puerto Rico Bowl is inaugural. The 32-game table shortens the Frisco site to The Star. The Events release prints The Star at Ford Center. This page uses The Star at Ford Center.`;

export const BOWL_SAN_DIEGO_NOTE = `[The August 27, 2026 CW release](${CW_RELEASE}) says the SDCCU Poinsettia Bowl is Wednesday, December 23, at 7:30 p.m. ET and 4:30 p.m. PT, and the 47th annual Holiday Bowl is Monday, December 28, at 5 p.m. ET and 2 p.m. PT. Both are at Snapdragon Stadium in San Diego, on The CW. [The Poinsettia Bowl site](${POINSETTIA}) dates the game December 23, 2026, with a 4:30 p.m. PST kickoff in San Diego. 4:30 p.m. Pacific is the same clock as 7:30 p.m. ET. [The Holiday Bowl site](${HOLIDAY}) dates the game December 28, 2026, at 2:00 p.m. PT at Snapdragon Stadium. 2:00 p.m. Pacific is the same clock as 5 p.m. ET. Neither page names the teams. The Holiday Bowl site still carries a December 7, 2025 story about a different game. That story is not the 2026-27 matchup, and this page does not use it.`;

export const BOWL_SUN_NOTE = `[The Sun Bowl Association's September 17, 2026 release](${SUN_NEWS}) says the 93rd Old El Paso Sun Bowl is December 31, 2026, at 2 p.m. ET and 12 p.m. MT, live on CBS, and that the game pairs schools from the ACC and Legacy Pac-12 Conferences. It does not name the schools. [The bowl's event page](${SUN_EVENT}) places the game at Sun Bowl Stadium in El Paso, Texas, on December 31, 2026. The release does not name a streaming app. A streaming app for this game is to be announced.`;

export const BOWL_BOWL_SITES_NOTE = `[The Pop-Tarts Bowl's June 3, 2026 post](${POPTARTS}) says Tuesday, December 29, at 5:30 p.m. ET on ESPN, at Camping World Stadium in Orlando, with schools from the Atlantic Coast Conference and the Big 12 Conference. [The Citrus Bowl's June 3, 2026 post](${CITRUS}) says Saturday, January 2, at noon ET on ABC, at Camping World Stadium, with schools from the Southeastern Conference and the Big Ten Conference. [The Valero Alamo Bowl's June 3, 2026 post](${ALAMO}) says Tuesday, December 29, at 8:00 p.m. CT at the Alamodome, on ESPN. 8:00 p.m. CT is the same clock as 9 p.m. ET on the ESPN table. [The ReliaQuest Bowl's June 2, 2026 post](${RELIAQUEST}) says Thursday, December 31, 2026, at noon ET at Raymond James Stadium in Tampa, on ESPN, with schools from the SEC and the Big Ten Conference. None of those posts name the teams.`;

export const BOWL_TEXAS_NOTE = `[The June 3, 2026 ESPN Press Room table](${ESPN_32}) and [the ESPN Events release](${ESPN_EVENTS}) print Reliant Stadium in Houston for the Kinder's Texas Bowl, at 7:30 p.m. ET on ESPN. [NCAA.com, updated October 8, 2026,](${NCAA_SCHEDULE}) prints NRG Stadium in Houston for the same date, time, and network. [The Coca-Cola Bowl Season schedule](${BOWL_SEASON}) also prints NRG Stadium. The time and the ESPN network match. The stadium name does not. The table shows both names. This page does not pick one.`;

export const BOWL_CFP_NOTE = `The six named playoff bowls are in the table because each one has an announced 2026-27 date. [The June 1, 2026 CFP broadcast release](${CFP_BROADCAST}) puts the quarterfinal at the Vrbo Fiesta Bowl on Wednesday, December 30, 2026, at 7:30 p.m. ET, on TNT, truTV, and HBO Max, in Glendale, Arizona, and the semifinal at the Capital One Orange Bowl on Thursday, January 14, 2027, at 7:30 p.m. ET, on TNT, truTV, and HBO Max, in Miami Gardens, Florida, and the semifinal at the Allstate Sugar Bowl on Friday, January 15, 2027, at 7:30 p.m. ET, on ABC and ESPN, in New Orleans. [The February 3, 2026 assignment](${CFP_BOWL_DATES}) puts January 1, 2027, at the Goodyear Cotton Bowl Classic, the Chick-fil-A Peach Bowl, and the Rose Bowl Game presented by Prudential. [The Cotton Bowl page](${CFP_COTTON}), [the Peach Bowl page](${CFP_PEACH}), and [the Rose Bowl page](${CFP_ROSE}) mark the time and the TV to be announced. [The Fiesta Bowl page](${CFP_FIESTA}), [the Orange Bowl page](${CFP_ORANGE}), and [the Sugar Bowl page](${CFP_SUGAR}) name the stadiums. Which January 1 bowl is in which window is to be announced. The playoff guide has the windows, the first-round campus games, and the national championship. Those campus games and the championship are not named bowls, so they are not rows in this table.`;

export const BOWL_ARIZONA_NOTE = `[The CW release](${CW_RELEASE}) says The CW will broadcast the Arizona Bowl, and that the Poinsettia Bowl, the Holiday Bowl, and the Arizona Bowl stream on the ESPN App for viewers with an ESPN Unlimited plan. The release does not give the Arizona Bowl a date, a kickoff, or a stadium. [The Arizona Bowl site](${ARIZONA_SITE}), checked October 21, 2026, still leads with December 27, 2025. [The Bowl Season schedule](${BOWL_SEASON}) lists a January 2, 2027 game. Because the bowl's own site does not show a 2026-27 date, this page does not print that date, kickoff, or stadium.`;

export const BOWL_NCAA_GAP = `[NCAA.com, updated October 8, 2026,](${NCAA_SCHEDULE}) reprints many of the same dates and says matchups will be added when they are announced. That article does not list the SDCCU Poinsettia Bowl, the Holiday Bowl, or the Arizona Bowl. This page does not treat that article as the complete list. It is a second source for the games it does print, including NRG Stadium for the Texas Bowl.`;

export const BOWL_WATCH_NOTE = `For the 32 ESPN and ABC games, [the June 3 release](${ESPN_32}) says the games are on ESPN, ABC, and the ESPN App, and it points readers to stream.espn.com. It says the ESPN App offers ESPN's networks, including with an ESPN Unlimited subscription. ABC games in that slate are on ABC. ESPN games in that slate are on ESPN. For the Poinsettia Bowl and the Holiday Bowl, [the CW release](${CW_RELEASE}) says the games air on The CW and stream on the ESPN App for viewers with an ESPN Unlimited plan. The same sentence covers the Arizona Bowl, which is not dated on this page. For the Old El Paso Sun Bowl, [the Sun Bowl release](${SUN_NEWS}) says the game airs live on CBS and does not name a streaming app. For the Fiesta Bowl and the Orange Bowl, [the CFP broadcast release](${CFP_BROADCAST}) names TNT, truTV, and HBO Max. The Sugar Bowl is on ABC and ESPN in that release. This page does not add a channel the cited release does not name.`;

export const BOWL_TICKET_NOTE = `No price is printed here. [The CW release](${CW_RELEASE}) points ticket and event information to [HolidayBowl.com](${HOLIDAY}) and [PoinsettiaBowl.com](${POINSETTIA}). [The Pop-Tarts Bowl post](${POPTARTS}) and [the Citrus Bowl post](${CITRUS}) say public tickets go on sale after teams are selected on Sunday, December 6, 2026. [The ReliaQuest Bowl post](${RELIAQUEST}) says public tickets go on sale in the fall, with details to come, and that premium packages are available through the bowl office. [The Sun Bowl event page](${SUN_EVENT}) and [the Alamo Bowl date post](${ALAMO}) are those bowls' own pages. Playoff bowl tickets are on the College Football Playoff guide, which links the playoff and the bowl ticket offices. This page does not link a resale exchange.`;

export const BOWL_REFRESH_NOTE =
  "This page will be refreshed when the 2026-27 matchups are set. Until then, a team, a seed, and a final kickoff that is still marked to be announced stay off the table.";

export interface WatchSource {
  id: string;
  label: string;
  href: string;
  usedFor: string;
}

export const BOWL_SOURCES: readonly WatchSource[] = [
  {
    id: "espn-32",
    label: "ESPN Press Room: 32-game bowl slate (June 3, 2026)",
    href: ESPN_32,
    usedFor: "Dates, Eastern kickoffs, sites, and ESPN or ABC for 32 games, plus the ESPN App.",
  },
  {
    id: "espn-events",
    label: "ESPN Press Room: ESPN Events bowls (June 3, 2026)",
    href: ESPN_EVENTS,
    usedFor:
      "The 17 owned games, Celebration Bowl conferences, Birmingham conferences, The Star at Ford Center, and Reliant Stadium.",
  },
  {
    id: "cw",
    label: "The CW: Poinsettia Bowl and Holiday Bowl (August 27, 2026)",
    href: CW_RELEASE,
    usedFor: "San Diego dates, Snapdragon Stadium, The CW, and the ESPN App. No Arizona Bowl date.",
  },
  {
    id: "poinsettia",
    label: "SDCCU Poinsettia Bowl",
    href: POINSETTIA,
    usedFor: "December 23, 2026, 4:30 p.m. PST, San Diego.",
  },
  {
    id: "holiday",
    label: "Holiday Bowl",
    href: HOLIDAY,
    usedFor: "December 28, 2026, 2:00 p.m. PT, Snapdragon Stadium.",
  },
  {
    id: "sun-news",
    label: "Sun Bowl Association (September 17, 2026)",
    href: SUN_NEWS,
    usedFor: "December 31, 2026, 2 p.m. ET and 12 p.m. MT, CBS, ACC and Legacy Pac-12.",
  },
  {
    id: "sun-event",
    label: "Old El Paso Sun Bowl event page",
    href: SUN_EVENT,
    usedFor: "Sun Bowl Stadium, El Paso, December 31, 2026.",
  },
  {
    id: "poptarts",
    label: "Pop-Tarts Bowl (June 3, 2026)",
    href: POPTARTS,
    usedFor: "December 29, 5:30 p.m. ET, ESPN, Camping World Stadium, ACC and Big 12.",
  },
  {
    id: "citrus",
    label: "Citrus Bowl (June 3, 2026)",
    href: CITRUS,
    usedFor: "January 2, noon ET, ABC, Camping World Stadium, SEC and Big Ten.",
  },
  {
    id: "alamo",
    label: "Valero Alamo Bowl (June 3, 2026)",
    href: ALAMO,
    usedFor: "December 29, 8:00 p.m. CT, Alamodome, ESPN.",
  },
  {
    id: "reliaquest",
    label: "ReliaQuest Bowl (June 2, 2026)",
    href: RELIAQUEST,
    usedFor: "December 31, 2026, noon ET, Raymond James Stadium, ESPN, SEC and Big Ten.",
  },
  {
    id: "ncaa",
    label: "NCAA.com bowl schedule, updated October 8, 2026",
    href: NCAA_SCHEDULE,
    usedFor: "A second copy of many dates, and NRG Stadium. It omits Poinsettia, Holiday, and Arizona.",
  },
  {
    id: "bowl-season",
    label: "Coca-Cola Bowl Season 2026-27 schedule",
    href: BOWL_SEASON,
    usedFor: "NRG Stadium for the Texas Bowl. The Arizona Bowl line is not used as a date.",
  },
  {
    id: "arizona",
    label: "Arizona Bowl site, checked October 21, 2026",
    href: ARIZONA_SITE,
    usedFor: "Still leads with December 27, 2025. Not used as a 2026-27 date.",
  },
  {
    id: "cfp-broadcast",
    label: "College Football Playoff broadcast schedule (June 1, 2026)",
    href: CFP_BROADCAST,
    usedFor: "Fiesta, Orange, and Sugar times and networks. January 1 windows are not assigned here.",
  },
  {
    id: "cfp-bowls",
    label: "College Football Playoff bowl dates (February 3, 2026)",
    href: CFP_BOWL_DATES,
    usedFor: "Which bowls host the quarterfinals and semifinals.",
  },
  {
    id: "fiesta",
    label: "College Football Playoff: Vrbo Fiesta Bowl",
    href: CFP_FIESTA,
    usedFor: "State Farm Stadium, Glendale.",
  },
  {
    id: "cotton",
    label: "College Football Playoff: Goodyear Cotton Bowl Classic",
    href: CFP_COTTON,
    usedFor: "AT&T Stadium, Arlington, January 1, 2027, time and TV to be announced.",
  },
  {
    id: "peach",
    label: "College Football Playoff: Chick-fil-A Peach Bowl",
    href: CFP_PEACH,
    usedFor: "Mercedes-Benz Stadium, Atlanta, January 1, 2027, time and TV to be announced.",
  },
  {
    id: "rose",
    label: "College Football Playoff: Rose Bowl",
    href: CFP_ROSE,
    usedFor: "Rose Bowl Stadium, Pasadena, January 1, 2027, time and TV to be announced.",
  },
  {
    id: "orange",
    label: "College Football Playoff: Capital One Orange Bowl",
    href: CFP_ORANGE,
    usedFor: "Hard Rock Stadium, Miami Gardens.",
  },
  {
    id: "sugar",
    label: "College Football Playoff: Allstate Sugar Bowl",
    href: CFP_SUGAR,
    usedFor: "Caesars Superdome, New Orleans.",
  },
];

export interface WatchFaq {
  question: string;
  answer: string;
}

export const BOWL_FAQS: readonly WatchFaq[] = [
  {
    question: "Have the 2026-27 bowl teams been announced?",
    answer:
      "No. The ESPN Press Room release says commentator assignments follow bowl selections in December, and it does not name teams. The bowl posts cited here name conferences for a few games and do not name schools. This page will be refreshed when the matchups are set.",
  },
  {
    question: "When does the 2026-27 bowl season start?",
    answer:
      "The ESPN slate starts Saturday, December 12, 2026, with the Cricket Celebration Bowl at noon ET on ABC at Mercedes-Benz Stadium in Atlanta. The dated bowls in this table run through the Allstate Sugar Bowl on Friday, January 15, 2027. First-round playoff games and the national championship are on the College Football Playoff guide. They are not named bowls.",
  },
  {
    question: "What channels carry the 2026-27 bowls?",
    answer:
      "The June 3, 2026 ESPN slate puts its 32 games on ESPN or ABC, and on the ESPN App. The CW release puts the Poinsettia Bowl and the Holiday Bowl on The CW, also streaming on the ESPN App for an ESPN Unlimited plan. The Sun Bowl Association puts the Old El Paso Sun Bowl on CBS and does not name a streaming app. The Fiesta Bowl and the Orange Bowl are on TNT, truTV, and HBO Max. The Sugar Bowl is on ABC and ESPN. The Cotton Bowl, the Peach Bowl, and the Rose Bowl do not have an announced network yet.",
  },
  {
    question: "Where are the College Football Playoff bowls?",
    answer:
      "Quarterfinals: Vrbo Fiesta Bowl on Wednesday, December 30, 2026, at 7:30 p.m. ET at State Farm Stadium in Glendale, on TNT, truTV, and HBO Max; and on Friday, January 1, 2027, the Goodyear Cotton Bowl Classic at AT&T Stadium in Arlington, the Chick-fil-A Peach Bowl at Mercedes-Benz Stadium in Atlanta, and the Rose Bowl Game presented by Prudential at Rose Bowl Stadium in Pasadena. Those three kickoffs and networks are to be announced. Semifinals: Capital One Orange Bowl on Thursday, January 14, 2027, at 7:30 p.m. ET at Hard Rock Stadium in Miami Gardens, on TNT, truTV, and HBO Max; and Allstate Sugar Bowl on Friday, January 15, 2027, at 7:30 p.m. ET at Caesars Superdome in New Orleans, on ABC and ESPN. The playoff guide has the rest of the bracket.",
  },
  {
    question: "Why is the Arizona Bowl not in the table?",
    answer:
      "The CW release says The CW will broadcast the Arizona Bowl and that it streams on the ESPN App. It does not give a date, a kickoff, or a stadium. The Arizona Bowl site, checked October 21, 2026, still leads with December 27, 2025. Until the bowl site or another primary announcement states a 2026-27 date, the date stays off this page.",
  },
  {
    question: "Where are tickets listed?",
    answer:
      "Use the bowl pages linked on this guide. The CW release names HolidayBowl.com and PoinsettiaBowl.com. The Pop-Tarts and Citrus posts say public tickets follow team selection on Sunday, December 6, 2026. The ReliaQuest post says a public sale is planned for the fall, with details still to come. Playoff games use the ticket pages on the College Football Playoff guide. This page does not list a price and does not link a resale exchange.",
  },
];

export const BOWL_OMISSIONS = [
  "Team matchups are to be announced. This page will be refreshed when they are set.",
  "Kickoff time and TV network for the Cotton Bowl, the Peach Bowl, and the Rose Bowl are to be announced.",
  "A streaming app for the Old El Paso Sun Bowl is to be announced. The cited release says CBS only.",
  "The Arizona Bowl has no 2026-27 date on this page. The CW release does not date it, and the bowl site still leads with December 27, 2025.",
  "The June 3 ESPN table says Reliant Stadium for the Texas Bowl. NCAA.com says NRG Stadium. Both names are printed. This page does not pick one.",
  "First-round playoff games are campus sites, not named bowls. The national championship is not a named bowl. Both are on the playoff guide.",
  "All-star games are not in this table.",
  "No ticket price. None is printed here.",
  "No resale link.",
  "NCAA.com does not list the Poinsettia Bowl, the Holiday Bowl, or the Arizona Bowl. Those omissions are noted. The article is not treated as complete.",
] as const;

export function bowlWatchBodies(): string[] {
  return [
    BOWL_ANSWER,
    BOWL_ESPN_NOTE,
    BOWL_SAN_DIEGO_NOTE,
    BOWL_SUN_NOTE,
    BOWL_BOWL_SITES_NOTE,
    BOWL_TEXAS_NOTE,
    BOWL_CFP_NOTE,
    BOWL_ARIZONA_NOTE,
    BOWL_NCAA_GAP,
    BOWL_WATCH_NOTE,
    BOWL_TICKET_NOTE,
    BOWL_REFRESH_NOTE,
    ...BOWL_GAMES.map((row) => `${row.name} ${row.cityVenue} ${row.network} ${row.eventDescription}`),
    ...BOWL_FAQS.map((faq) => `${faq.question} ${faq.answer}`),
    ...BOWL_OMISSIONS,
    ...BOWL_SOURCES.map((source) => `[${source.label}](${source.href}) ${source.usedFor}`),
  ];
}
