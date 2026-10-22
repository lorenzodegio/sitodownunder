import { eventiAttivi, whatsappEvento } from "@/data/eventi";
import { romeToday } from "@/data/calendario";

export { romeToday } from "@/data/calendario";
export { formatMartedi, formatMartediShort } from "@/data/calendario";

const sorgente = {
  title: "I martedì della nonna",
  cuisine: "Cucina lombarda",
  booking: "solo su prenotazione",
  time: "18:30–00:30",
  lastDay: "2026-11-24",
} as const;

export const martediNonna = sorgente;

export type MartediStatus = "finito" | "oggi" | "in-arrivo";

export type MartediGiorno = {
  date: string;
  dish: string;
  price: string;
  amount: string;
  status: MartediStatus;
  label: string;
  short: string;
};

export function whatsappMartedi(label: string): string {
  const evento = eventiAttivi().find((item) => item.id === "martedi-nonna");
  return whatsappEvento(evento?.prenotazione ?? "Ciao! Vorrei prenotare per il martedì della nonna del {data}", label);
}

/** Compatibilità con la sezione precedente. I dati veri stanno in data/eventi.ts. */
export function campaignState(now = new Date()): { visible: boolean; next: MartediGiorno | null; days: MartediGiorno[] } {
  const today = romeToday(now);
  const evento = eventiAttivi(now).find((item) => item.id === "martedi-nonna");
  if (!evento) return { visible: false, next: null, days: [] };
  const days: MartediGiorno[] = evento.date.map((item) => ({
    date: item.data,
    dish: item.piatto,
    price: item.prezzo,
    amount: item.amount,
    label: item.label,
    short: item.short,
    status: item.data < today ? "finito" : item.data === today ? "oggi" : "in-arrivo",
  }));
  const next = days.find((item) => item.date >= today) ?? null;
  return { visible: next !== null, next, days };
}
