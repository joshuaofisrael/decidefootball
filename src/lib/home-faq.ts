/**
 * Homepage FAQ. Visible copy and FAQPage JSON-LD both read this list.
 * Paths are plain text so the answer string matches the rendered text.
 */

export interface HomeFaq {
  question: string;
  answer: string;
}

export const HOME_FAQS: readonly HomeFaq[] = [
  {
    question: "What is Decide Football, and how do I use it?",
    answer:
      "Decide Football is an independent fantasy football decision site for roster calls: start or sit, whether a player is listed as available, who is worth a claim, and how a position ranks this week. From the homepage, open a start/sit card, the week slate, Waiver Radar, the availability board, the watchlist, or a positional rankings board. The guides at /guide/ explain how to read those cards. It is not a sports news blog and not gambling advice.",
  },
  {
    question: "What are the start/sit notes, and when are they published?",
    answer:
      "Start/sit notes are dated editorial pages under /start-sit/. They cite public reporting. Sit, start, and recheck are editorial opinion. A note does not print the sample estimates, and it does not know your roster, your scoring, or your bench. The notes on the site are Week 6 at /start-sit/2026-week-6/, last updated 2026-10-15, for 15-19 October 2026, and Week 7 at /start-sit/2026-week-7/, last updated 2026-10-19, for 22-26 October 2026. Each page prints its own last-updated date. The site does not print a standing weekday for the next note. These notes are separate from the sample start/sit desk at /start-sit/.",
  },
  {
    question: "What is Waiver Radar?",
    answer:
      "Waiver Radar is the board at /waiver-radar/. The sample list marks each row hot, rising, stash, or fade, using sample estimates, usage change, and listed status. It is not a waiver claim on a fantasy host, and it does not sign in to a platform. Dated editorial add notes, separate from that sample list, are at /waiver-radar/2026-week-6/ and /waiver-radar/2026-week-7/. How to read the tags is the guide at /guide/waiver-radar/.",
  },
  {
    question: "How does the Certainty Score work?",
    answer:
      "The certainty score on a start/sit card is a desk grade, not a win probability. The bands are thin, lean, clear, and strong. At 78 and above the band is strong. At 58 and above it is clear. At 40 and above it is lean. Below that it is thin. On the card those bands read as a thin edge, a soft lean, a clear lean, or a strong call. The same grade is on the calculator at /guide/certainty/, where you type two means and the desk flags. The cuts are methodology v0 and can change. They are not a published accuracy rate.",
  },
  {
    question: "How do the watchlist and the rankings work?",
    answer:
      "The watchlist at /watchlist/ keeps names you pin in this browser only, under the key df_watchlist. There is no account, and it does not sync to a fantasy platform. Rankings at /rankings/ are one position, quarterback, running back, wide receiver, or tight end, ordered by the mean. Listed status, floor, and ceiling sit on the row. If two means match, the higher ceiling ranks first. OUT, IR, and INACTIVE force mean, floor, and ceiling to zero. The sample boards are week 3. A rank is that order. It is not a start/sit verdict and not a free-agent claim. The certainty score is not a column on that board.",
  },
  {
    question: "Is Decide Football free, and are the numbers labelled as sample?",
    answer:
      "Yes. You can read the pages without an account and without a paid tier. The site loads the Google AdSense script. No ad units are shown yet. The homepage and the sample desks label their numbers as sample data for demonstrating the tool. Those pages include start/sit cards, Waiver Radar, rankings, player hubs, availability, the slate, and the watchlist.",
  },
  {
    question: "Is Decide Football affiliated with the NFL or any team, and how do I contact you?",
    answer:
      "No. Decide Football is not affiliated with, endorsed by, or sponsored by the NFL, its member clubs, the NFL Players Association, ESPN, Yahoo, or Sleeper. Team and player names are used in plain text to identify them. The site does not use league or team logos. To contact us, use the Contact page at /contact/.",
  },
];

/** Longer paths first so /start-sit/ does not swallow /start-sit/2026-week-6/. */
const FAQ_LINKS = [
  "/start-sit/2026-week-6/",
  "/start-sit/2026-week-7/",
  "/waiver-radar/2026-week-6/",
  "/waiver-radar/2026-week-7/",
  "/guide/waiver-radar/",
  "/guide/certainty/",
  "/waiver-radar/",
  "/start-sit/",
  "/watchlist/",
  "/rankings/",
  "/contact/",
  "/guide/",
] as const;

const FAQ_LINK_RE = new RegExp(`(${FAQ_LINKS.map(escapeRegExp).join("|")})`, "g");

export type FaqTextPart = { type: "text" | "link"; value: string };

export function linkFaqAnswer(text: string): FaqTextPart[] {
  return text
    .split(FAQ_LINK_RE)
    .filter((part) => part.length > 0)
    .map((part) =>
      (FAQ_LINKS as readonly string[]).includes(part)
        ? { type: "link", value: part }
        : { type: "text", value: part },
    );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
