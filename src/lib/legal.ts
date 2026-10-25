import { SITE_NAME, SITE_YEAR } from "./site";

/** Legal entity. Render this only on legal pages, never in sitewide chrome. */
export const SITE_LEGAL_NAME = "Joshua Israel Ventures LLC";

/**
 * Exact notice required on every legal page.
 * Not rendered in the header, footer, or on non-legal pages.
 */
export const LEGAL_COPYRIGHT_LINE = `© ${SITE_YEAR} ${SITE_LEGAL_NAME}. All rights reserved. ${SITE_NAME} is a trade name of ${SITE_LEGAL_NAME}, a Florida limited liability company.`;

/** Shared governing-law sentence. No county, city, or street address. */
export const FLORIDA_GOVERNING_LAW =
  "governed by the laws of the State of Florida, without regard to conflict-of-law rules, with exclusive venue in the state or federal courts located in Florida";
