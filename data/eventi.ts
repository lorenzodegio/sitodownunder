import {
  formatGiornoBreve,
  formatMartedi,
  formatMartediShort,
  romeToday,
} from "@/data/calendario";

export type DataEvento = {
  data: string;
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
  /** Ultimo giorno incluso, calendario di Roma. Dal giorno dopo l'evento non si pubblica. */
  fine: string;
  date: readonly DataEvento[];
};

export const eventi: readonly Evento[] = [
  {
    id: "martedi-nonna",
    titolo: "I martedì della nonna",
    tag: ["Novembre · ogni martedì", "Solo su prenotazione"],
    descrizione:
      "Cucina lombarda dal quaderno di ricette della nonna: un piatto per martedì, quattro martedì. Cena dalle [orario da confermare].",
    orario: "[orario da confermare]",
    fine: "2026-11-24",
    date: [
      {
        data: "2026-11-03",
        piatto: "Polenta e gorgonzola DOP con costine di maiale al vino bianco",
        prezzo: "15€",
        amount: "15",
      },
      {
        data: "2026-11-10",
        piatto: "Pizzoccheri valtellinesi",
        prezzo: "15€",
        amount: "15",
      },
      {
        data: "2026-11-17",
        piatto: "Polpette di carne e salsiccia al sugo con patate rustiche al forno",
        prezzo: "14€",
        amount: "14",
      },
      {
        data: "2026-11-24",
        piatto: "Cassoeula & polenta",
        prezzo: "17€",
        amount: "17",
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

export function whatsappEvento(short: string): string {
  const text = `Ciao! Vorrei prenotare per il martedì della nonna del ${short}`;
  return `https://wa.me/393384395727?text=${encodeURIComponent(text)}`;
}

export function eventiAttivi(now = new Date()): EventoVista[] {
  const today = romeToday(now);
  const visibili: EventoVista[] = [];
  for (const evento of eventi) {
    if (today > evento.fine) continue;
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

export function prossimoMartedi(now = new Date()): DataVista | null {
  return eventiAttivi(now).find((evento) => evento.id === "martedi-nonna")?.next ?? null;
}
