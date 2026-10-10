"use client";

import { useOpeningStatus } from "@/components/useOpeningStatus";

export function OpeningBadge() {
  const status = useOpeningStatus();

  return (
    <div className="in status">
      <span className={`dot status-dot is-${status.kind}`} aria-hidden="true" />
      <span aria-live="polite">{status.text}</span>
    </div>
  );
}
