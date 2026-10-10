"use client";

import { useEffect, useState } from "react";
import { computeOpening, serverOpening, type OpeningSnapshot } from "@/lib/opening";

export function useOpeningStatus(): OpeningSnapshot {
  const [snapshot, setSnapshot] = useState<OpeningSnapshot>(serverOpening);

  useEffect(() => {
    const update = () => setSnapshot(computeOpening());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return snapshot;
}
