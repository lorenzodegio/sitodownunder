import { visibileConSegnaposto } from "@/lib/segnaposto";

/**
 * Offerta dell'aperitivo. Resta spenta finché non arrivano orario, contenuto e prezzo.
 * A dati pronti, si accende il flag e si tolgono le [parentesi].
 */
export const aperitivoDomenicaPubblicato = false;

export const aperitivoDomenica = {
  id: "aperitivo-domenica",
  titolo: "Aperitivo della domenica",
  testo: "Il giro della domenica parte dal bancone: cocktail, bollicine e qualcosa da dividere.",
  orario: "[orario]",
  include: "[cosa include]",
  prezzo: "[prezzo]",
} as const;

export function aperitivoDomenicaVisibile(): boolean {
  if (!aperitivoDomenicaPubblicato) return false;
  return visibileConSegnaposto([
    aperitivoDomenica.orario,
    aperitivoDomenica.include,
    aperitivoDomenica.prezzo,
  ]);
}
