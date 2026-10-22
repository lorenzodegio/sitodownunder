import {
  formatGiornoBreve,
  formatMartedi,
  formatMartediShort,
  romeToday,
} from "@/data/calendario";

/**
 * Schema di un evento (livello 2). Un evento nuovo è un blocco in `eventi`.
 * Sparisce da solo il giorno dopo `dataFine`, calendario di Roma.
 *
 * Esempio:
 * {
 *   id: "esempio",
 *   titolo: "Titolo della serata",
 *   tag: ["Etichetta"],
 *   descrizione: "Testo. [dato da confermare]",
 *   orario: "[orario da confermare]",
 *   dataFine: "2026-12-01",
 *   prenotazione: "Ciao! Vorrei prenotare per {data}",
 *   date: [
 *     { data: "2026-12-01", piatto: "Piatto o titolo di quella data", prezzo: "00€", amount: "00" }
 *   ]
 * }
 *
 * `piatto` è il piatto della data, oppure il titolo se non c'è un piatto.
 * `foto` è facoltativa. `amount` è l'importo senza simbolo, per i dati strutturati.
 * In `prenotazione`, `{data}` diventa la data breve (es. "3 novembre").
 */
export type DataEvento = {
  data: string;
  /** Piatto, oppure titolo di quella data. */
  piatto: string;
  prezzo: string;
  /** Importo per il JSON-LD, senza simbolo. */
  amount: string;
  foto?: string;
};

export type Evento = {
  id: string;
  titolo: string;
  tag: readonly string[];
  descrizione: string;
  orario: string;
  /** Ultimo giorno incluso. Dal giorno dopo l'evento non si pubblica. */
  dataFine: string;
  prenotazione: string;
  date: readonly DataEvento[];
};

export const eventi: readonly Evento[] = [
  {
    id: "martedi-nonna",
    titolo: "I martedì della nonna",
    tag: ["Novembre · ogni martedì", "Solo su prenotazione"],
    descrizione:
      "Cucina lombarda dal quaderno di ricette della nonna: un piatto per martedì, quattro martedì. Cena dalle 18:30.",
    orario: "18:30–00:30",
    dataFine: "2026-11-24",
    prenotazione: "Ciao! Vorrei prenotare per il martedì della nonna del {data}",
    date: [
      {
        data: "2026-11-03",
        piatto: "Polenta e gorgonzola DOP con costine di maiale al vino bianco",
        prezzo: "15€",
        amount: "15",
        foto: "/images/martedi/polenta.jpg",
      },
      {
        data: "2026-11-10",
        piatto: "Pizzoccheri valtellinesi",
        prezzo: "15€",
        amount: "15",
        foto: "/images/martedi/pizzoccheri.jpg",
      },
      {
        data: "2026-11-17",
        piatto: "Polpette di carne e salsiccia al sugo con patate rustiche al forno",
        prezzo: "14€",
        amount: "14",
        foto: "/images/martedi/polpette.jpg",
      },
      {
        data: "2026-11-24",
        piatto: "Cassoeula & polenta",
        prezzo: "17€",
        amount: "17",
        foto: "/images/martedi/cassoeula.jpg",
      },
    ],
  },
];

export type DataVista = DataEvento & {
  label: string;
  breve: string;
  short: string;
  isNext: boolean;
};

export type EventoVista = Omit<Evento, "date"> & {
  date: DataVista[];
  next: DataVista;
};

export function whatsappEvento(prenotazione: string, short: string): string {
  const text = prenotazione.replaceAll("{data}", short);
  return `https://wa.me/393384395727?text=${encodeURIComponent(text)}`;
}

export function eventiAttivi(now = new Date()): EventoVista[] {
  const today = romeToday(now);
  const visibili: EventoVista[] = [];
  for (const evento of eventi) {
    if (today > evento.dataFine) continue;
    const nextDate = evento.date.find((item) => item.data >= today)?.data;
    if (!nextDate) continue;
    const date = evento.date.map((item) => ({
      ...item,
      label: formatMartedi(item.data),
      breve: formatGiornoBreve(item.data),
      short: formatMartediShort(item.data),
      isNext: item.data === nextDate,
    }));
    const next = date.find((item) => item.isNext);
    if (!next) continue;
    visibili.push({ ...evento, date, next });
  }
  return visibili;
}

export type EventoHero = {
  oggi: boolean;
  day: DataVista;
  evento: EventoVista;
};

/** L'evento di oggi, se c'è una data oggi. Altrimenti il prossimo ancora in corso. */
export function eventoInHero(now = new Date()): EventoHero | null {
  const today = romeToday(now);
  const attivi = eventiAttivi(now);
  for (const evento of attivi) {
    const oggi = evento.date.find((item) => item.data === today);
    if (oggi) return { oggi: true, day: oggi, evento };
  }
  const prossimo = attivi
    .map((evento) => ({ evento, day: evento.next }))
    .sort((a, b) => a.day.data.localeCompare(b.day.data))[0];
  return prossimo ? { oggi: false, day: prossimo.day, evento: prossimo.evento } : null;
}

export function prossimoMartedi(now = new Date()): DataVista | null {
  return eventiAttivi(now).find((evento) => evento.id === "martedi-nonna")?.next ?? null;
}
