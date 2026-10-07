/**
 * Public copy for /guide/listed-status/.
 * League facts are limited to what NFL.com and NFL Football Operations publish.
 * Questionable, Doubtful, and Out: the August 21, 2016 Competition Committee
 * revision on NFL.com. Filing clock: NFL Football Operations' 2026 important
 * dates (the same Sunday-game Friday deadline is on NFL.com's 2026–27 dates).
 * Inactive list: the 90-minute officiating meeting on NFL Football Operations.
 */

export const LISTED_STATUS_PATH = "/guide/listed-status/";

/** 64 characters. The layout template may append the brand. */
export const LISTED_STATUS_TITLE =
  "Questionable, Doubtful, Out: NFL injury designations for fantasy";

export const LISTED_STATUS_H1 = LISTED_STATUS_TITLE;

export const LISTED_STATUS_DESCRIPTION =
  "What Questionable, Doubtful, and Out mean on the NFL injury report, plus injured reserve and inactive, and how each one changes a fantasy lineup.";

export const LISTED_STATUS_CRUMB = "Injury designations";

export const NFL_INJURY_REVISION_URL =
  "https://www.nfl.com/news/competition-committee-approves-revisions-to-injury-report-0ap3000000688693";

export const NFL_OPS_IMPORTANT_DATES_URL =
  "https://operations.nfl.com/calendar-events/nfl-important-dates";

export const NFL_COM_IMPORTANT_DATES_URL =
  "https://www.nfl.com/news/2026-27-national-football-league-important-dates";

export const NFL_OPS_KICKOFF_URL =
  "https://operations.nfl.com/game-operations-logistics/preparation-safety/game-and-stadium-prep";

export const LISTED_STATUS_SOURCES = [
  {
    url: NFL_INJURY_REVISION_URL,
    label: "Competition Committee revisions to the injury report (NFL.com, August 21, 2016)",
  },
  {
    url: NFL_OPS_IMPORTANT_DATES_URL,
    label: "2026 important dates (NFL Football Operations)",
  },
  {
    url: NFL_COM_IMPORTANT_DATES_URL,
    label: "2026–27 important dates (NFL.com)",
  },
  {
    url: NFL_OPS_KICKOFF_URL,
    label: "Countdown to kickoff (NFL Football Operations)",
  },
] as const;

export const LISTED_STATUS_TABLE = [
  {
    designation: "Questionable",
    league: "Uncertain whether the player will play.",
    lineup:
      "Still a possible play. Keep a replacement for the same lineup spot if the game is late.",
  },
  {
    designation: "Doubtful",
    league: "Unlikely to participate.",
    lineup: "Have the replacement ready. This is not the same label as Out.",
  },
  {
    designation: "Out",
    league: "The player will not play.",
    lineup: "Do not start the player.",
  },
  {
    designation: "IR (injured reserve)",
    league:
      "A roster list, Reserve/Injured, not a game-status tag. Not the 53-player Active/Inactive List. A return later in the season is allowed only under league procedures.",
    lineup: "Do not start the player this week. Do not invent the week of a return.",
  },
  {
    designation: "Inactive",
    league:
      "The game-day inactive list, delivered to the referee one hour and 30 minutes before kickoff. A different report from Out.",
    lineup: "The player will not play in that game. Treat this list as the final word for that kickoff.",
  },
  {
    designation: "Not listed",
    league:
      "Left off the game status report when the club is certain the player will play, even after a practice-report mention that week.",
    lineup:
      "Plan on the player, then check the inactive list. A later deactivation has to be explained to the league.",
  },
] as const;

export const LISTED_STATUS_FAQS = [
  {
    question: "What do Questionable, Doubtful, and Out mean?",
    answer:
      "On the NFL game status report, Questionable means it is uncertain whether the player will play. Doubtful means it is unlikely the player will participate. Out means the player will not play. Those definitions are from the Competition Committee revision NFL.com published on August 21, 2016. They are not percentages. For a lineup, Questionable is still a possible play, so keep a replacement for the same spot if the game is late. Doubtful means have that replacement ready. Out means do not start the player.",
  },
  {
    question: "What does it mean if a player is not on the injury report?",
    answer:
      "If the club is certain the player will play, the player is left off the game status report, even after appearing on that week's practice report. That is the 2016 rule. It is not a promise of snaps. The player can still be deactivated. If a player the club filed as certain to play is then deactivated, the club has to explain that to the league and may be disciplined. Check the inactive list before kickoff.",
  },
  {
    question: "What is the difference between Out and inactive?",
    answer:
      "Out is a game-status designation: the player will not play. Inactive is the game-day list included in the Game Day Administration Report delivered to the referee one hour and 30 minutes before kickoff. They are different reports, filed at different times. A player can be Questionable on the game status report and still be inactive for the game. For that kickoff, treat the inactive list as the final word.",
  },
  {
    question: "What does injured reserve mean for a fantasy lineup this week?",
    answer:
      "Injured reserve (Reserve/Injured) is a roster list, not a Questionable, Doubtful, or Out tag on the weekly game status report. While a player is on Reserve/Injured, the player is not on the club's 53-player Active/Inactive List. NFL Football Operations' 2026 calendar says a player placed on Reserve/Injured during the regular season or postseason may be designated for return later in the season, subject to the applicable procedures. This page does not state a return week. Until a return is completed, do not start the player.",
  },
  {
    question: "When is the NFL game status report due for a Sunday game?",
    answer:
      "For a Sunday game, NFL Football Operations' 2026 important dates say the game status report is due Friday by 4:00 p.m. New York time, or as soon as possible after practice. NFL.com's 2026–27 important dates publish the same deadline. Practice reports for that Sunday game are due Wednesday, Thursday, and Friday on the same clock. If a player's condition changes after the game status report, the club must report an update. The inactive list is separate: it is part of the Game Day Administration Report delivered to the referee one hour and 30 minutes before kickoff.",
  },
  {
    question: "Was Probable removed, and is Questionable a 50/50?",
    answer:
      "The August 21, 2016 revision eliminated Probable. The league's stated reason was that approximately 95 percent of players listed Probable in prior years did play. Questionable was defined as uncertain whether the player will play, not as a fixed percentage. If there is any question about availability, the club should list the player as Questionable. A fixed 50/50 reading is not the definition the league published.",
  },
  {
    question: "How does Decide Football treat these labels on its cards?",
    answer:
      "Decide Football reads the label before the projection. When no designation is listed, the card says Healthy and does not discount the estimate. Questionable and Doubtful are a soft discount, and Doubtful is heavier, because the card treats Doubtful as unlikely and Questionable as uncertain. The size of that discount is methodology v0 and can change. OUT, IR, and INACTIVE are a hard zero: mean, floor, and ceiling are 0. The model does not invent a return date. Last verified is when the designation was last checked. Page rendered is when the HTML was baked. The card is not an official NFL or club injury report.",
  },
] as const;
