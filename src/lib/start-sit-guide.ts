/**
 * Public copy for /guide/start-sit/.
 * Floor, mean, and ceiling are explained as a lineup decision, not as a
 * host product. The 1.5-point toss-up is this desk's existing line
 * (`TOSS_UP_DELTA`). No host lineup-lock clock is stated: this page does
 * not cite an ESPN, Yahoo, Sleeper, or NFL Fantasy settings page.
 */

import { TOSS_UP_DELTA } from "./recommendations";

export const START_SIT_PATH = "/guide/start-sit/";

/** 58 characters. The layout template may append the brand. */
export const START_SIT_TITLE = "Who to start in fantasy football: floor vs mean vs ceiling";

export const START_SIT_H1 = START_SIT_TITLE;

/** 149 characters. */
export const START_SIT_DESCRIPTION =
  "Floor is the low end, the mean ranks who to start, and ceiling is the upside. Weigh the floor to protect a lead and the ceiling when you need points.";

export const START_SIT_CRUMB = "Floor vs ceiling";

export const START_SIT_DIRECT_ANSWER =
  "Floor is the low end of a weekly fantasy estimate, the mean is the number used to rank who to start, and ceiling is the high end. Weigh the floor when you are protecting a lead and a collapse would give the week away. Weigh the ceiling when you need upside to catch up. A narrow gap between two means is soft evidence, not a settled start.";

export const START_SIT_LOCK =
  "Do this before the lineup locks for the players you would start. The hour depends on your league settings. This page does not name a host clock.";

const tossUpPoints = TOSS_UP_DELTA.toFixed(1);

export const START_SIT_TOSS_UP = `A narrow mean gap is soft evidence. This desk treats a gap under ${tossUpPoints} estimated points as a toss-up: do not lean on the mean alone, and keep the certainty grade thin. At ${tossUpPoints} or beyond, the higher mean is a lean. The injury designation and the role still matter. Floor and ceiling do not move that line. They are what you weigh once the means are too close to settle the start.`;

export const START_SIT_WEEK_TABLE = [
  {
    week: "Floor-first week",
    optimize: "The higher floor: the side with less room to fall apart.",
    fits: "You are ahead, and a collapse would give the week away.",
    accept: "You may leave a higher ceiling on the bench.",
  },
  {
    week: "Mean-first week",
    optimize: "The higher mean: the ranking number for the pair.",
    fits: "The matchup is close, and neither side needs a swing.",
    accept: "You stay with the mean unless the two means are nearly tied.",
  },
  {
    week: "Ceiling-first week",
    optimize: "The higher ceiling: the side with more room above the mean.",
    fits: "You are behind, and a modest mean will not close the gap.",
    accept: "You accept a lower floor and a wider miss.",
  },
] as const;

export const START_SIT_CHECKLIST = [
  {
    title: "Check the injury designation first",
    detail:
      "Questionable, Doubtful, and Out come before any estimate. Out, injured reserve, and inactive are not starts. If the designation and the mean disagree, believe the designation.",
    href: "/guide/listed-status/",
    linkLabel: "What Questionable, Doubtful, and Out mean",
  },
  {
    title: "Compare the means",
    detail:
      "The mean is the ranking number. When the gap is wide enough to trust, the higher mean is the lean.",
    href: null,
    linkLabel: null,
  },
  {
    title: "Read the range",
    detail:
      "Floor and ceiling are the low end and the high end around that mean. A wider range is a less stable estimate. It is not a promise of points.",
    href: null,
    linkLabel: null,
  },
  {
    title: "Apply the toss-up line",
    detail: `If the gap between the means is under ${tossUpPoints} estimated points, the pair is a toss-up on the mean alone. Weigh the floor or the ceiling for the week you have.`,
    href: "/guide/toss-up/",
    linkLabel: "Toss-up tool",
  },
  {
    title: "Do not treat certainty as a win probability",
    detail:
      "A certainty band — thin, lean, clear, or strong — grades how hard the math can lean. It is not the chance that the higher mean wins the fantasy week.",
    href: "/guide/certainty/",
    linkLabel: "Certainty tool",
  },
] as const;

export const START_SIT_NOT = [
  "Not affiliated with, endorsed by, or sponsored by the NFL, its member clubs, ESPN, Yahoo, or Sleeper. Names are identification for fantasy analysis only.",
  "Not an official projection, club report, or injury wire.",
  "Not gambling advice, odds, or a sportsbook.",
  "Not a backtest. The method is methodology v0, subject to change. No accuracy rate is published here, and none should be inferred.",
] as const;

export const START_SIT_FAQS = [
  {
    question: "What is floor vs ceiling in fantasy football?",
    answer:
      "Floor is the low end of a weekly fantasy estimate. The mean is the single number used to rank who to start. Ceiling is the high end. Together they are a range around one estimate, not a promise of points and not an official projection. A wider range means the estimate is less stable.",
  },
  {
    question: "When should I start the safer player?",
    answer:
      "Start the safer player when you are protecting a lead and a collapse would give the week away. Weigh the floor: the side with less room to fall apart. You may leave a higher ceiling on the bench. That is a lineup choice. It is not odds and not gambling advice.",
  },
  {
    question: "When should I chase upside?",
    answer:
      "Chase upside when you are behind and a modest mean will not close the gap. Weigh the ceiling: the side with more room above the mean. You accept a lower floor and a wider miss if the week goes the other way.",
  },
  {
    question: "What if the projected means are almost the same?",
    answer: `A narrow mean gap is soft evidence. This desk treats a gap under ${tossUpPoints} estimated points as a toss-up and does not lean on the mean alone. The certainty grade stays thin. Weigh the floor when you are protecting a lead, or the ceiling when you need upside, and still read the injury designation first. The toss-up tool applies that same ${tossUpPoints}-point line to two means you type. It is not a second rule.`,
  },
  {
    question: "Does a higher projection guarantee a win?",
    answer:
      "No. A higher mean is a lean, not a guarantee and not a win probability. Certainty bands — thin, lean, clear, and strong — grade how hard the math can lean. They are not the chance that the higher projection wins the fantasy week, and they are not a betting line.",
  },
  {
    question: "How do injury designations change a start/sit call?",
    answer:
      "Read the designation before the number. Questionable is still a possible play, so keep a replacement in mind. Doubtful means have that replacement ready. Out, injured reserve, and inactive are not starts. If the designation and the mean disagree, believe the designation. What Questionable, Doubtful, and Out mean on the injury report is the injury-designations guide.",
  },
  {
    question: "What does the certainty grade mean on a Decide Football card?",
    answer:
      "Certainty is a desk grade of how much the call can lean on the math: thin, lean, clear, or strong. On the card those bands read as a thin edge, a soft lean, a clear lean, or a strong call. It is not a win probability. Listed status is read first. The mean is the ranking number. Floor and ceiling are the model range around that mean. The method is methodology v0. No accuracy rate is published, and none should be inferred.",
  },
] as const;
