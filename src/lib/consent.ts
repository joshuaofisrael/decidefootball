export const CONSENT_STORAGE_KEY = "df_consent";

export type ConsentChoice = "unset" | "accept" | "reject";

export function parseConsentChoice(raw: string | null): ConsentChoice {
  if (raw === "accept" || raw === "reject") return raw;
  return "unset";
}
