/**
 * Public copy for /guide/waiver-radar/.
 * Host facts are limited to help pages fetched for this rewrite:
 * ESPN Fan Support (football waivers overview, and the waiver-order article),
 * Yahoo Help's fantasy-football waivers overview, and Sleeper Support
 * (waiver types, FAAB bidding, and regular-season waivers).
 * support.nfl.com did not load, so no NFL Fantasy product default is stated.
 */

export const WAIVER_RADAR_PATH = "/guide/waiver-radar/";

/** 58 characters. The layout template may append the brand. */
export const WAIVER_RADAR_TITLE =
  "How fantasy football waivers work: priority, rolling, FAAB";

export const WAIVER_RADAR_H1 = WAIVER_RADAR_TITLE;

/** 150 characters. */
export const WAIVER_RADAR_DESCRIPTION =
  "How rolling waiver priority, reverse standings, and FAAB blind bids decide a fantasy football waiver claim, and when that player becomes a free agent.";

export const WAIVER_RADAR_CRUMB = "How waivers work";

export const WAIVER_RADAR_DIRECT_ANSWER =
  "A player on waivers is not a free agent yet. Every manager can file a claim, and the league's rule picks the winner: rolling waiver priority, reverse-standings order, or a FAAB bid. When that period ends, a player nobody claimed becomes a free agent on hosts that clear waivers, and the first manager to add the player gets them. The hour claims process depends on your league settings.";

export const WAIVER_RADAR_ARITHMETIC =
  "Remaining budget divided by remaining weeks is arithmetic, not a bid. $40 left and 8 weeks left is 40 divided by 8, which is $5. That $5 is the budget spread evenly across those weeks. It is not a recommended bid, not a percentage of the original budget, and not a figure for what other managers will bid.";

export const ESPN_WAIVERS_OVERVIEW_URL =
  "https://support.espn.com/hc/en-us/articles/360000041152-Waivers-Overview";

export const ESPN_WAIVER_ORDER_URL =
  "https://support.espn.com/hc/en-us/articles/4669787227668-Waiver-Order-Overview-and-Free-Agent-Budget-Tiebreakers";

export const YAHOO_WAIVERS_URL =
  "https://help.yahoo.com/kb/fantasy-football/overview-waivers-fantasy-football-sln6427.html";

export const SLEEPER_WAIVER_TYPES_URL =
  "https://support.sleeper.com/en/articles/9656662-what-types-of-waivers-do-you-support";

export const SLEEPER_FAAB_URL =
  "https://support.sleeper.com/en/articles/1876040-how-does-faab-bidding-work";

export const SLEEPER_SEASON_WAIVERS_URL =
  "https://support.sleeper.com/en/articles/3978868-waivers-for-regular-season-playoffs";

export const WAIVER_RADAR_SOURCES = [
  {
    url: ESPN_WAIVERS_OVERVIEW_URL,
    label: "Waivers Overview (ESPN Fan Support, fantasy football)",
  },
  {
    url: ESPN_WAIVER_ORDER_URL,
    label: "Waiver Order Overview and Free Agent Budget Tiebreakers (ESPN Fan Support)",
  },
  {
    url: YAHOO_WAIVERS_URL,
    label: "Overview of Waivers in Fantasy Football (Yahoo Help)",
  },
  {
    url: SLEEPER_WAIVER_TYPES_URL,
    label: "What types of waivers do you support? (Sleeper Support)",
  },
  {
    url: SLEEPER_FAAB_URL,
    label: "How does FAAB bidding work? (Sleeper Support)",
  },
  {
    url: SLEEPER_SEASON_WAIVERS_URL,
    label: "Waivers for Regular Season & Playoffs (Sleeper Support)",
  },
] as const;

export const WAIVER_TYPE_TABLE = [
  {
    type: "Rolling waiver priority",
    order:
      "One ranked list. A successful claim moves that team to the bottom. The list is not rebuilt from the standings.",
    cost: "The spot in line. There is no separate dollar budget.",
    favors: "The team nearest the top: a team that has not just won a claim.",
  },
  {
    type: "Reverse standings",
    order:
      "The list is rebuilt from the current standings. The lowest team claims first.",
    cost:
      "The lasting order is the record. Whether a claim also drops that team until the next reset depends on your league settings.",
    favors: "The teams lowest in the standings.",
  },
  {
    type: "FAAB",
    order: "The highest bid wins. An equal bid is broken by a priority list.",
    cost: "The dollars bid, deducted from the budget that remains.",
    favors:
      "The highest bidder. Standings matter only when the bids tie and that tie-break uses the standings.",
  },
] as const;

export const WAIVER_RADAR_FAQS = [
  {
    question: "How do fantasy football waivers work?",
    answer:
      "A player on waivers is frozen so every manager can file a claim before anyone adds that player. The league's rule picks the winner: rolling waiver priority, reverse-standings order, or a FAAB bid. When the period ends, a player nobody claimed becomes a free agent on hosts that clear waivers, and the first manager to add that player gets them. A free-agent add is immediate. A waiver claim waits until processing. The hour depends on your league settings.",
  },
  {
    question: "What is the difference between rolling waivers and reverse standings?",
    answer:
      "Rolling waivers keep one priority list. A successful claim moves that team to the bottom, and the list is not rebuilt from the standings. Reverse standings rebuilds the list from the current standings so the lowest teams claim first. On Yahoo, a successful claim does not change a reverse-standings list. Yahoo also offers a weekly rolling list based on standings, which resets that way and then drops a successful claimant to the bottom until the next reset. Sleeper's reverse-standings option resets at the beginning of each game week, with lower-placed teams first. ESPN's waiver-order article describes a Monday reset to inverse standings and a move-to-last option, and it says a successful claim moves the team to the bottom under either option. Which rule a league uses depends on your league settings.",
  },
  {
    question: "What is FAAB in fantasy football?",
    answer:
      "FAAB is a free agent acquisition budget. Each team bids from a budget, and the highest bid wins when waivers process. Yahoo and Sleeper state that the bids are blind, so other managers cannot see the amount. The winning amount is deducted from the remaining budget. If two bids are equal, a waiver-priority list breaks the tie. Which list is used depends on your league settings. Yahoo's default football budget is $100. Sleeper's default budget is $100. ESPN's football waiver overview awards the highest offer and does not publish a default dollar amount.",
  },
  {
    question: "When do fantasy football waivers clear?",
    answer:
      "It depends on your league settings. On Yahoo's default weekly rule, Game Time – Tuesday, an unclaimed player goes on waivers when that player's first game of the week begins, and waivers end after 11:59 p.m. PT Tuesday. A player with no game that week goes on waivers at 5:30 p.m. PT Monday. Sleeper locks a player when that player's game begins and holds the player until the league's selected clear time. Sleeper's Tuesday-clear example runs at 12:05 a.m. PST on Wednesday. ESPN says the waiver period usually expires between 3 a.m. and 5 a.m. ET and does not name one weekday for every league. After the clear, an unclaimed player is a free agent on hosts that release unclaimed players. ESPN's continuous free-agent budget does not do that: every unrostered player stays on waivers.",
  },
  {
    question: "Can you bid $0 in FAAB?",
    answer:
      "On Yahoo Fantasy Football, an offer can be $0, up to the budget that remains. On Sleeper, the minimum bid is $0 unless the commissioner changes it, so a team can still file a claim after the budget is spent. ESPN's football waiver overview does not state a minimum bid. Where a host page does not say, the minimum depends on your league settings.",
  },
  {
    question: "What is remaining budget divided by remaining weeks?",
    answer:
      "Remaining budget divided by remaining weeks is arithmetic, not a bid. $40 left and 8 weeks left is 40 divided by 8, which is $5. That $5 is the budget spread evenly across those weeks. It is not a recommended bid, not a percentage of the original budget, and not a figure for what other managers will bid.",
  },
  {
    question: "What do hot, rising, stash, and fade mean on Decide Football?",
    answer:
      "Hot is the claim tag: the listing is healthy, and the estimate supports spending a waiver claim if the bench is dead weight. Rising means snap share is up and the role is moving the right way, but the row has not cleared hot. Stash means hold if there is a bench spot. Fade means do not spend waiver budget chasing the name. None of the four tags means the player is free in a league, and none is a win probability.",
  },
] as const;
