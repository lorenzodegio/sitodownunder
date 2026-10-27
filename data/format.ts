import { visibileConSegnaposto } from "@/lib/segnaposto";

/**
 * Aperitivo della domenica. I dati sono confermati: la card è visibile anche in produzione.
 */
export const aperitivoDomenicaPubblicato = true;

export const aperitivoDomenica = {
  id: "aperitivo-domenica",
  titolo: "Aperitivo della domenica",
  offerta: "Aperitivo al tavolo",
  testo: "Ogni domenica, dalle 18:00 alle 20:00: aperitivo al tavolo, piatto abbondante e consumazione.",
  orario: "18:00–20:00",
  etichetta: "Domenica · 18:00–20:00",
  include: "Piatto abbondante + consumazione",
  prezzo: "da 13€",
  gruppi:
    "In gruppo? Lo stesso aperitivo al tavolo, con il piatto abbondante, lo facciamo anche gli altri giorni per almeno 10 persone: 15€ a testa, solo su prenotazione.",
} as const;

export const whatsappAperitivoGruppo = `https://wa.me/393384395727?text=${encodeURIComponent(
  "Ciao! Vorremmo prenotare l'aperitivo per un gruppo di [numero] persone il [giorno].",
)}`;

export function aperitivoDomenicaVisibile(): boolean {
  if (!aperitivoDomenicaPubblicato) return false;
  return visibileConSegnaposto([
    aperitivoDomenica.orario,
    aperitivoDomenica.include,
    aperitivoDomenica.prezzo,
  ]);
}
