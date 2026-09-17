"use client";

import { useEffect, useState } from "react";
import { CONSENT_STORAGE_KEY, parseConsentChoice, type ConsentChoice } from "@/lib/consent";

export function useConsent() {
  const [choice, setChoice] = useState<ConsentChoice>("unset");

  useEffect(() => {
    setChoice(parseConsentChoice(window.localStorage.getItem(CONSENT_STORAGE_KEY)));
  }, []);

  function save(next: Exclude<ConsentChoice, "unset">) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    setChoice(next);
  }

  return { choice, save };
}
