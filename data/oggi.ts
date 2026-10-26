import { romeToday, romeWeekday } from "@/data/calendario";
import { aperitivoDomenica, aperitivoDomenicaVisibile } from "@/data/format";
import { eventiAttivi, prossimoMartedi } from "@/data/eventi";
import { hours } from "@/data/locale";

export type MomentoId = "evento" | "pranzo" | "nonna" | "aperitivo-domenica" | "ape-cena";

/**
 * Chi vince, dall'alto in basso. Per spingere il pranzo basta metterlo per primo:
 * i componenti non si toccano.
 */
export const prioritaMomenti: readonly MomentoId[] = [
  "evento",
  "pranzo",
  "nonna",
  "aperitivo-domenica",
  "ape-cena",
];

export type VistaMomento = {
  id: MomentoId;
  kicker: string;
  titolo: string;
  testo: string;
  href: string;
  cta: string;
};

const FORMULA_NONNA = "Solo a cena, solo su prenotazione.";

export function minutiRoma(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

function giornoDopo(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1, 12)).toISOString().slice(0, 10);
}

function attivo(id: MomentoId, now: Date): boolean {
  const today = romeToday(now);
  const weekday = romeWeekday(today);
  const minutes = minutiRoma(now);
  if (id === "evento") {
    return eventiAttivi(now).some((evento) => evento.date.some((giorno) => giorno.data === today));
  }
  if (id === "pranzo") return weekday >= 1 && weekday <= 5 && minutes < 15 * 60;
  if (id === "nonna") {
    const prossimo = prossimoMartedi(now);
    if (!prossimo) return false;
    if (prossimo.data === today) return minutes >= 15 * 60;
    return prossimo.data === giornoDopo(today);
  }
  if (id === "aperitivo-domenica") return weekday === 0 && aperitivoDomenicaVisibile();
  return hours[weekday]?.some(([start]) => start >= 18 * 60) ?? false;
}

export function scegliMomento(now = new Date()): MomentoId | null {
  return prioritaMomenti.find((id) => attivo(id, now)) ?? null;
}

export function presentaMomento(now = new Date(), piattiPranzo: readonly string[] = []): VistaMomento | null {
  const id = scegliMomento(now);
  if (!id) return null;
  const today = romeToday(now);

  if (id === "evento") {
    const trovato = eventiAttivi(now)
      .flatMap((evento) => evento.date.filter((giorno) => giorno.data === today).map((giorno) => ({ evento, giorno })))
      .at(0);
    const nonna = trovato?.evento.id === "martedi-nonna";
    return {
      id,
      kicker: "Oggi",
      titolo: trovato?.evento.titolo ?? "Stasera",
      testo: trovato ? `${trovato.giorno.piatto}.${nonna ? ` ${FORMULA_NONNA}` : ""}` : "C’è una data in calendario.",
      href: "#prossimamente",
      cta: "Vedi la serata",
    };
  }

  if (id === "pranzo") {
    const elenco = piattiPranzo.filter(Boolean).slice(0, 4).join(", ");
    return {
      id,
      kicker: "Oggi a pranzo",
      titolo: "Il giro in 60 minuti",
      testo: elenco
        ? `${elenco}. Primo + secondo con contorno da 14€.`
        : "Primo + secondo con contorno da 14€. Primi e secondi da 7€.",
      href: "#pranzo",
      cta: "Guarda il menù",
    };
  }

  if (id === "nonna") {
    const prossimo = prossimoMartedi(now);
    const domani = prossimo?.data === giornoDopo(today);
    return {
      id,
      kicker: domani ? "Domani" : "Stasera",
      titolo: "Dalla nonna",
      testo: prossimo ? `${prossimo.piatto}. ${FORMULA_NONNA}` : FORMULA_NONNA,
      href: "#format-nonna",
      cta: "I martedì della nonna",
    };
  }

  if (id === "aperitivo-domenica") {
    return {
      id,
      kicker: "Domenica",
      titolo: aperitivoDomenica.titolo,
      testo: `${aperitivoDomenica.orario} · ${aperitivoDomenica.include} · ${aperitivoDomenica.prezzo}`,
      href: "#format-domenica",
      cta: "Prenota",
    };
  }

  return {
    id: "ape-cena",
    kicker: "Stasera",
    titolo: "Aperitivo e cena",
    testo: "Burger, carne e pizza. Cocktail al bancone.",
    href: "#menu",
    cta: "Cosa si mangia",
  };
}
