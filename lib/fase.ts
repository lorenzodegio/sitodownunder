import { romeNow } from "@/lib/opening";

/**
 * Fine della fase Natale dentro la stagione inverno.
 * [2027-01-06 da confermare con Lorenzo]
 * Si sposta con NEXT_PUBLIC_NATALE_FINE, formato AAAA-MM-GG.
 */
export const FINE_NATALE_PREDEFINITA = "2027-01-06";

export type FaseInverno = "natale" | "inverno";

export function fineNatale(valore = process.env.NEXT_PUBLIC_NATALE_FINE): string {
  const testo = valore?.trim() ?? "";
  return /^\d{4}-\d{2}-\d{2}$/.test(testo) ? testo : FINE_NATALE_PREDEFINITA;
}

/** Giorno di Roma come AAAA-MM-GG, con l’orologio di `romeNow`. */
export function giornoRomaISO(now: Date): string {
  const clock = romeNow(now);
  const mese = String(clock.getMonth() + 1).padStart(2, "0");
  const giorno = String(clock.getDate()).padStart(2, "0");
  return `${clock.getFullYear()}-${mese}-${giorno}`;
}

/**
 * Dentro la stagione inverno.
 * Il  giorno di fine è ancora Natale, anche a tarda sera.
 * `faseRichiesta` vale solo fuori dalla produzione.
 */
export function calcolaFase(input: {
  giorno: string;
  fine: string;
  faseRichiesta: string | null;
  produzione: boolean;
}): FaseInverno {
  if (!input.produzione && (input.faseRichiesta === "natale" || input.faseRichiesta === "inverno")) {
    return input.faseRichiesta;
  }
  return input.giorno <= input.fine ? "natale" : "inverno";
}
