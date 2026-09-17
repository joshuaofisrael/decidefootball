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

export function adsTxtBody(clientId: string | null, enabled: boolean): string {
  const pub = clientId ? publisherIdFromClient(clientId) : null;
  if (enabled && pub) {
    return `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  }
  return `# Decide Football ads.txt template
# Display ads are off unless NEXT_PUBLIC_ADS_ENABLED=true and
# NEXT_PUBLIC_ADSENSE_CLIENT_ID is set at export time.
# Do not invent a publisher ID. When configured, this file becomes:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
}
