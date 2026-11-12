import { romeNow } from "@/lib/opening";

const SCADENZA = 20261231;

/** Giorno di Roma come numero AAAAMMGG, con l’orologio di `romeNow`. */
function giornoRoma(now: Date): number {
  const clock = romeNow(now);
  return clock.getFullYear() * 10000 + (clock.getMonth() + 1) * 100 + clock.getDate();
}

/**
 * Sezione "Cene di Natale".
 * Preview e sviluppo: accesa. Production: accesa solo con NATALE_ATTIVO=1.
 * Dopo il 31 dicembre 2026, fuso Europe/Rome, si spegne comunque.
 */
export function nataleAttivo(now: Date = new Date()): boolean {
  if (giornoRoma(now) > SCADENZA) return false;
  if (process.env.VERCEL_ENV !== "production") return true;
  return process.env.NATALE_ATTIVO === "1";
}
