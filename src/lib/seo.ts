import type { Metadata } from "next";
import { decideIndexation, robotsMeta, type DecideIndexationArgs } from "./indexation";
import { absoluteUrl, getSiteUrl, SITE_LEGAL_NAME, SITE_NAME } from "./site";

const ORGANIZATION_ID = `${absoluteUrl("/")}#organization`;

/** Publisher is the LLC. Decide Football is its brand, not a separate business. */
export function publisherJsonLd() {
  return {
    "@type": "Organization" as const,
    "@id": ORGANIZATION_ID,
    name: SITE_LEGAL_NAME,
    legalName: SITE_LEGAL_NAME,
    url: absoluteUrl("/"),
    brand: {
      "@type": "Brand" as const,
      name: SITE_NAME,
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...publisherJsonLd(),
    description:
      "Independent fantasy football decision information. Not affiliated with the NFL, its member clubs, the NFL Players Association, ESPN, Yahoo, or Sleeper.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    publisher: publisherJsonLd(),
  };
}

/**
 * Editorial Article. Headline and description are the page title and meta
 * description. No author and no dateModified: this repo does not store a
 * real modified time for these pages.
 */
export function articleJsonLd(args: { path: string; headline: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: absoluteUrl(args.path),
    mainEntityOfPage: absoluteUrl(args.path),
    publisher: publisherJsonLd(),
  };
}

export function webPageJsonLd(args: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    publisher: publisherJsonLd(),
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${getSiteUrl()}${crumb.path.endsWith("/") ? crumb.path : `${crumb.path}/`}`,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface ItemListEntry {
  name: string;
  path: string;
  description: string;
}

/**
 * Path used for canonical and og:url. Relative, with a trailing slash, so
 * metadataBase can resolve it. Home stays `/`.
 */
export function canonicalPath(path: string): string {
  const trimmed = path.trim();
  if (trimmed === "" || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${withLeading.replace(/\/+$/, "")}/`;
}

export interface PageMetadataArgs {
  path: string;
  title: string;
  description?: string;
  /** Same inputs pages already pass to decideIndexation. */
  indexation: DecideIndexationArgs;
}

/**
 * Share image already used on the homepage. Empty stadium, no marks or logos.
 * 1280×720 is the file's real pixel size.
 */
const SOCIAL_IMAGE = {
  url: "/images/hero-stadium-dusk.webp",
  width: 1280,
  height: 720,
  alt: "Empty football stadium at dusk with floodlights glowing over the turf and yard lines",
} as const;

/**
 * Per-page metadata. Repeats layout openGraph siteName, locale, and type
 * because a page openGraph object replaces the layout object. Twitter is set
 * here so a page does not have to repeat the card.
 */
export function pageMetadata(args: PageMetadataArgs): Metadata {
  const path = canonicalPath(args.path);
  const description = args.description;
  return {
    title: args.title,
    ...(description !== undefined ? { description } : {}),
    ...robotsMeta(decideIndexation(args.indexation)),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: args.title,
      ...(description !== undefined ? { description } : {}),
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      ...(description !== undefined ? { description } : {}),
      images: [SOCIAL_IMAGE.url],
    },
  };
}

/** ItemList of real editorial URLs. Do not invent entries that are not on the page. */
export interface SportsEventInput {
  name: string;
  startDate: string;
  description: string;
  locationName: string;
  addressLocality: string;
  addressRegion: string;
  homeTeam: string;
  awayTeam: string;
}

/** ItemList of SportsEvent. No offers, prices, or attendance figures. */
export function sportsEventItemListJsonLd(events: SportsEventInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SportsEvent",
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "StadiumOrArena",
          name: event.locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.addressLocality,
            addressRegion: event.addressRegion,
            addressCountry: "US",
          },
        },
        homeTeam: { "@type": "SportsTeam", name: event.homeTeam },
        awayTeam: { "@type": "SportsTeam", name: event.awayTeam },
      },
    })),
  };
}

/**
 * ItemList of SportsEvent for games whose date is confirmed and whose teams
 * are not. Omits homeTeam, awayTeam, offers, and prices. Omits a postal
 * address when the city is not confirmed.
 */
export interface ConfirmedSportsEventInput {
  name: string;
  startDate: string;
  /** Inclusive end, date only, when the round spans more than one day and no kickoff is set. */
  endDate?: string;
  description: string;
  locationName: string;
  addressLocality?: string;
  addressRegion?: string;
}

export function confirmedSportsEventItemListJsonLd(events: ConfirmedSportsEventInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, i) => {
      const location: {
        "@type": "StadiumOrArena" | "Place";
        name: string;
        address?: {
          "@type": "PostalAddress";
          addressLocality: string;
          addressRegion: string;
          addressCountry: "US";
        };
      } = {
        "@type": event.addressLocality && event.addressRegion ? "StadiumOrArena" : "Place",
        name: event.locationName,
      };
      if (event.addressLocality && event.addressRegion) {
        location.address = {
          "@type": "PostalAddress",
          addressLocality: event.addressLocality,
          addressRegion: event.addressRegion,
          addressCountry: "US",
        };
      }
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SportsEvent",
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          ...(event.endDate ? { endDate: event.endDate } : {}),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location,
        },
      };
    }),
  };
}

export function itemListJsonLd(items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(item.path),
    })),
  };
}
