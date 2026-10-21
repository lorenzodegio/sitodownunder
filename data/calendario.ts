export function romeToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function romeWeekday(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();
}

function utcNoon(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function formatDayIt(iso: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(utcNoon(iso));
}

export function formatMartedi(iso: string): string {
  const label = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(utcNoon(iso));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatMartediShort(iso: string): string {
  return formatDayIt(iso);
}

export function formatGiornoBreve(iso: string): string {
  const day = Number(iso.slice(8, 10));
  const month = new Intl.DateTimeFormat("it-IT", { month: "short", timeZone: "UTC" })
    .format(utcNoon(iso))
    .replace(".", "");
  return `${day} ${month}`;
}

export function formatTabGiorno(iso: string): string {
  const raw = new Intl.DateTimeFormat("it-IT", { weekday: "short", timeZone: "UTC" })
    .format(utcNoon(iso))
    .replace(".", "");
  const weekday = raw.charAt(0).toUpperCase() + raw.slice(1);
  return `${weekday} ${Number(iso.slice(8, 10))}`;
}

export function formatPeriodo(from: string, to: string): string {
  const fromDay = formatDayIt(from);
  const toDay = formatDayIt(to);
  const fromParts = fromDay.split(" ");
  const toParts = toDay.split(" ");
  if (fromParts[1] === toParts[1]) return `dal ${fromParts[0]} al ${toDay}`;
  return `dal ${fromDay} al ${toDay}`;
}

export function formatWeekdayLong(iso: string): string {
  const label = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(utcNoon(iso));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
