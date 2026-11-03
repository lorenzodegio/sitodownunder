"use client";

import { useEffect } from "react";

export function VivoAscolto() {
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();

    function alCambio(event: StorageEvent) {
      if (event.key !== "foto-vivo" || !event.newValue) return;
      const ancora = event.newValue.split("#")[1];
      const url = new URL(location.href);
      url.searchParams.set("v", String(Date.now()));
      if (ancora) url.hash = ancora;
      location.replace(url.toString());
    }

    window.addEventListener("storage", alCambio);
    return () => window.removeEventListener("storage", alCambio);
  }, []);

  return null;
}
