import { visibileConSegnaposto } from "@/lib/segnaposto";

/**
 * Offerta dell'aperitivo. Orario, contenuto e prezzo restano tra [parentesi]
 * finché il locale non manda i dati veri: in produzione, così, non si pubblica.
 */
export const aperitivoDomenica = {
  id: "aperitivo-domenica",
  titolo: "Aperitivo della domenica",
  testo: "Il giro della domenica parte dal bancone: cocktail, bollicine e qualcosa da dividere.",
  orario: "[orario]",
  include: "[cosa include]",
  prezzo: "[prezzo]",
} as const;

export function aperitivoDomenicaVisibile(): boolean {
  return visibileConSegnaposto([
    aperitivoDomenica.orario,
    aperitivoDomenica.include,
    aperitivoDomenica.prezzo,
  ]);
}
