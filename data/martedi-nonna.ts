export const martediNonna = {
  title: "I martedì della nonna",
  cuisine: "Cucina lombarda",
  booking: "solo su prenotazione",
  time: "[orario da confermare]",
  /** Ultimo giorno incluso, calendario di Roma. Dal giorno dopo la campagna non si pubblica. */
  lastDay: "2026-11-24",
  dates: [
    {
      date: "2026-11-03",
      dish: "Polenta e gorgonzola DOP con costine di maiale al vino bianco",
      price: "15€",
      amount: "15",
    },
    {
      date: "2026-11-10",
      dish: "Pizzoccheri valtellinesi",
      price: "15€",
      amount: "15",
    },
    {
      date: "2026-11-17",
      dish: "Polpette di carne e salsiccia al sugo con patate rustiche al forno",
      price: "14€",
      amount: "14",
    },
    {
      date: "2026-11-24",
      dish: "Cassoeula & polenta",
      price: "17€",
      amount: "17",
    },
  ],
} as const;

export type MartediDate = (typeof martediNonna.dates)[number];
export type MartediStatus = "finito" | "oggi" | "in-arrivo";

export type MartediGiorno = MartediDate & {
  status: MartediStatus;
  label: string;
  short: string;
};

export function romeToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function utcNoon(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
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
  return new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", timeZone: "UTC" }).format(utcNoon(iso));
}

export function whatsappMartedi(label: string): string {
  const text = `Ciao! Vorrei prenotare per il martedì della nonna del ${label}`;
  return `https://wa.me/393384395727?text=${encodeURIComponent(text)}`;
}

export function campaignState(now = new Date()): { visible: boolean; next: MartediGiorno | null; days: MartediGiorno[] } {
  const today = romeToday(now);
  if (today > martediNonna.lastDay) return { visible: false, next: null, days: [] };

  const days: MartediGiorno[] = martediNonna.dates.map((item) => ({
    ...item,
    label: formatMartedi(item.date),
    short: formatMartediShort(item.date),
    status: item.date < today ? "finito" : item.date === today ? "oggi" : "in-arrivo",
  }));
  const next = days.find((item) => item.date >= today) ?? null;
  return { visible: next !== null, next, days };
}
