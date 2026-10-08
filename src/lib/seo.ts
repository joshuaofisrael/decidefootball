import type { Metadata } from "next";
import { decideIndexation, robotsMeta, type DecideIndexationArgs } from "./indexation";
import { absoluteUrl, getSiteUrl, SITE_LEGAL_NAME, SITE_NAME } from "./site";

export interface Crumb {
  name: string;
  path: string;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: absoluteUrl("/"),
    description:
      "Independent fantasy football decision information. Not affiliated with the NFL or its member clubs.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_LEGAL_NAME,
      url: absoluteUrl("/"),
    },
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
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_LEGAL_NAME,
      url: absoluteUrl("/"),
    },
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
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_LEGAL_NAME,
    },
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
 * Per-page metadata. Repeats layout openGraph siteName, locale, and type
 * because a page openGraph object replaces the layout object.
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
    },
  };
}

/** ItemList of real editorial URLs. Do not invent entries that are not on the page. */
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
