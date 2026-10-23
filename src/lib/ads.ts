export type AdPlacement = "layout" | "sidebar" | "footer";

export function adsEnabledAtBuild(): boolean {
  return process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
}

export function getAdsenseClientId(): string | null {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  return raw || null;
}

export function adsConfigured(): boolean {
  return adsEnabledAtBuild() && Boolean(getAdsenseClientId());
}

export function getAdSlotId(placement: AdPlacement): string | undefined {
  const raw =
    placement === "layout"
      ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_LAYOUT
      : placement === "sidebar"
        ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR
        : process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

/** ads.txt uses pub-…; AdSense client ids are often ca-pub-… */
export function publisherIdFromClient(clientId: string): string | null {
  const match = clientId.trim().match(/pub-\d+/);
  return match ? match[0] : null;
}

/** Publisher account used for the AdSense site-verification script and meta tag. */
export const ADSENSE_PUBLISHER_CLIENT = "ca-pub-5681559774142917";
export const ADSENSE_PUBLISHER_ID = "pub-5681559774142917";

export const ADSENSE_HEAD_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_CLIENT}`;

/** ads.txt always declares the publisher. Ad units still render only behind the ads gate. */
export function adsTxtBody(): string {
  return `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;
}
