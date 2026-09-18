"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SUNDAY_MODE_STORAGE_KEY } from "@/lib/watchlist";

export function SundayToggle({ children }: { children: ReactNode }) {
  const [sundayOnly, setSundayOnly] = useState(false);

  useEffect(() => {
    setSundayOnly(window.localStorage.getItem(SUNDAY_MODE_STORAGE_KEY) === "true");
  }, []);

  function toggle() {
    const next = !sundayOnly;
    setSundayOnly(next);
    window.localStorage.setItem(SUNDAY_MODE_STORAGE_KEY, String(next));
  }

  return (
    <div className={sundayOnly ? "slate-root sunday-on" : "slate-root"}>
      <div className="sunday-bar">
        <p>
          {sundayOnly
            ? "Sunday Mode is on. Monday windows are parked."
            : "Full week slate. Flip Sunday Mode if you only want the Sunday windows."}
        </p>
        <button type="button" className="btn" onClick={toggle}>
          {sundayOnly ? "Show full slate" : "Sunday Mode"}
        </button>
      </div>
      {children}
    </div>
  );
}
