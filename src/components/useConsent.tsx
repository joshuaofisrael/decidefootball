"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CONSENT_STORAGE_KEY, parseConsentChoice, type ConsentChoice } from "@/lib/consent";

type ConsentContextValue = {
  choice: ConsentChoice;
  save: (next: Exclude<ConsentChoice, "unset">) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice>("unset");

  useEffect(() => {
    setChoice(parseConsentChoice(window.localStorage.getItem(CONSENT_STORAGE_KEY)));
  }, []);

  function save(next: Exclude<ConsentChoice, "unset">) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    setChoice(next);
  }

  return <ConsentContext.Provider value={{ choice, save }}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
