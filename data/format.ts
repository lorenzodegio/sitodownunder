import { visibileConSegnaposto } from "@/lib/segnaposto";

/** Format ricorrenti. I dati tra [parentesi] si vedono in preview e restano nascosti in produzione. */
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
