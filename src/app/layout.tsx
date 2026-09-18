import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AdSlot } from "@/components/AdSlot";
import { AdsenseLoader } from "@/components/AdsenseLoader";
import { BottomNav } from "@/components/BottomNav";
import { ConsentStub } from "@/components/ConsentStub";
import { ConsentProvider } from "@/components/useConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { adsConfigured } from "@/lib/ads";
import { getComplianceGate, INDEPENDENT_MICROCOPY } from "@/lib/compliance";
import { decideIndexation } from "@/lib/indexation";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
});

const defaultIndex = decideIndexation({ sourceClass: "FIXTURE" });
const showAds = adsConfigured();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME}: independent fantasy decisions`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Start or sit. Is he playing. Waivers and rankings from structured estimates. Independent desk. Not NFL-affiliated. Not gambling.",
  applicationName: SITE_NAME,
  robots: defaultIndex.robots,
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gate = getComplianceGate();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <ConsentProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <Header />
          {showAds ? (
            <div className="ad-layout-wrap">
              <AdSlot placement="layout" />
            </div>
          ) : null}
          {showAds ? (
            <div className="page-shell with-ads">
              <main id="content">{children}</main>
              <AdSlot placement="sidebar" />
            </div>
          ) : (
            <main id="content">{children}</main>
          )}
          {showAds ? (
            <div className="ad-layout-wrap">
              <AdSlot placement="footer" />
            </div>
          ) : null}
          <Footer />
          <BottomNav />
          <AdsenseLoader />
          <ConsentStub />
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <p className="visually-hidden">
            {INDEPENDENT_MICROCOPY} Compliance gate {gate}.
          </p>
        </ConsentProvider>
      </body>
    </html>
  );
}
