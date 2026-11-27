"use client";

import { useEffect } from "react";

/** Ferma neve e luci quando la scheda non è visibile. */
export function PausaAnimazioni() {
  useEffect(() => {
    const sync = () => {
      document.documentElement.toggleAttribute("data-pausa", document.hidden);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return null;
}
