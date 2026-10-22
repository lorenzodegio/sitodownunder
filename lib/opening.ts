import { site, type MinuteRange, type Weekday } from "@/content/site";
import { hoursPlaceholder } from "@/data/locale";

export type OpeningKind = "neutral" | "open" | "closed";

export type OpeningSnapshot = {
  text: string;
  kind: OpeningKind;
  /** -1 sul server: nessuna riga evidenziata, così l’HTML coincide con l’hydration. */
  today: number;
};

export const serverOpening: OpeningSnapshot = site.hours
  ? { text: site.openingCopy.neutral, kind: "neutral", today: -1 }
  : { text: hoursPlaceholder, kind: "neutral", today: -1 };

function isWeekday(value: number): value is Weekday {
  return value >= 0 && value <= 6;
}

/** Stessa conversione dello script originale: l’orologio di Roma, letto in locale. */
export function romeNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" }));
}

export function formatMinutes(total: number): string {
  const minutes = total % 1440;
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
}

export function formatDayRanges(ranges: readonly MinuteRange[]): string {
  return ranges.map(([start, end]) => `${formatMinutes(start)}–${formatMinutes(end)}`).join("\n");
}

export function computeOpening(now = romeNow()): OpeningSnapshot {
  if (!site.hours) return serverOpening;

  try {
    if (Number.isNaN(now.getTime())) return serverOpening;

    const day = now.getDay();
    if (!isWeekday(day)) return serverOpening;

    const minutes = now.getHours() * 60 + now.getMinutes();
    const yesterday = ((day + 6) % 7) as Weekday;
    let close: number | null = null;

    for (const range of site.hours[day]) {
      if (minutes >= range[0] && minutes < range[1]) close = range[1];
    }
    for (const range of site.hours[yesterday]) {
      if (minutes + 1440 >= range[0] && minutes + 1440 < range[1]) close = range[1];
    }

    if (close !== null) {
      return {
        text: site.openingCopy.open(formatMinutes(close)),
        kind: "open",
        today: day,
      };
    }

    const next = site.hours[day].find((range) => range[0] > minutes);
    return {
      text: next ? site.openingCopy.reopen(formatMinutes(next[0])) : site.openingCopy.closed,
      kind: "closed",
      today: day,
    };
  } catch {
    return serverOpening;
  }
}
