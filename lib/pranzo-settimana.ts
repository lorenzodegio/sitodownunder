import { formatPeriodo, formatTabGiorno, formatWeekdayLong, romeToday, romeWeekday } from "@/data/calendario";

export const PRANZO_PATH = "menu/pranzo-settimana.json";
export const WEEK_PENDING = "[menù della settimana in arrivo]";
export const REGOLA_PRANZO =
  "Primo + secondo con contorno da 14€. Primi e secondi da 7€, bevande escluse. A pranzo c'è anche tutto il menù della sera.";

export const TIPI = ["Primo", "Secondo", "Piatto unico", "Contorno", "Sempre"] as const;
export type TipoVoce = (typeof TIPI)[number];

/** Contorni fissi. Il contorno del giorno resta nella voce «Contorno» di ogni giorno. */
export const CONTORNI_SEMPRE: readonly VocePranzo[] = [
  { tipo: "Sempre", nome: "Verdure grigliate", prezzo: "", nota: "" },
  { tipo: "Sempre", nome: "Insalata mista", prezzo: "", nota: "" },
  { tipo: "Sempre", nome: "Patatine fritte", prezzo: "", nota: "" },
];

const ORDINE_GIORNO: readonly TipoVoce[] = ["Primo", "Piatto unico", "Secondo", "Contorno"];

export function tipoCorto(tipo: string): string {
  return tipo === "Piatto unico" ? "Piatto" : tipo;
}

export type VocePranzo = {
  tipo: TipoVoce;
  nome: string;
  prezzo: string;
  nota: string;
};

export type GiornoPranzo = {
  data: string;
  voci: VocePranzo[];
};

export type MenuPranzo = {
  from: string;
  to: string;
  giorni: GiornoPranzo[];
  sempre: VocePranzo[];
};

export type RigaPranzo = {
  tipo: string;
  nome: string;
  prezzo: string;
  nota: string;
};

export type GiornoVista = {
  data: string;
  tab: string;
  titolo: string;
  voci: RigaPranzo[];
  contorni: RigaPranzo[];
};

export type MenuPranzoView =
  | { status: "pending" }
  | { status: "current"; menu: MenuPranzo; periodo: string; giorni: GiornoVista[]; selected: string };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

export function isDay(value: string): boolean {
  if (!DAY.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function voce(value: unknown, allowSempre: boolean): VocePranzo | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<VocePranzo>;
  if (typeof raw.tipo !== "string" || !TIPI.includes(raw.tipo as TipoVoce)) return null;
  if (!allowSempre && raw.tipo === "Sempre") return null;
  if (typeof raw.nome !== "string") return null;
  const nome = raw.nome.trim().slice(0, 160);
  if (!nome) return null;
  return {
    tipo: raw.tipo as TipoVoce,
    nome,
    prezzo: typeof raw.prezzo === "string" ? raw.prezzo.trim().slice(0, 20) : "",
    nota: typeof raw.nota === "string" ? raw.nota.trim().slice(0, 180) : "",
  };
}

function voci(value: unknown, allowSempre: boolean, limit: number): VocePranzo[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => voce(item, allowSempre))
    .filter((item): item is VocePranzo => item !== null)
    .slice(0, limit);
}

export function parseMenuPranzo(value: unknown): MenuPranzo | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MenuPranzo>;
  if (typeof raw.from !== "string" || typeof raw.to !== "string") return null;
  if (!isDay(raw.from) || !isDay(raw.to) || raw.to < raw.from) return null;
  if (!Array.isArray(raw.giorni)) return null;
  const giorni: GiornoPranzo[] = [];
  for (const item of raw.giorni.slice(0, 5)) {
    if (!item || typeof item !== "object") continue;
    const day = item as Partial<GiornoPranzo>;
    if (typeof day.data !== "string" || !isDay(day.data)) continue;
    if (day.data < raw.from || day.data > raw.to) continue;
    const dow = romeWeekday(day.data);
    if (dow < 1 || dow > 5) continue;
    const lines = voci(day.voci, false, 16);
    if (!lines.length) continue;
    giorni.push({ data: day.data, voci: lines });
  }
  giorni.sort((a, b) => a.data.localeCompare(b.data));
  if (!giorni.length) return null;
  return {
    from: raw.from,
    to: raw.to,
    giorni,
    sempre: CONTORNI_SEMPRE.map((item) => ({ ...item })),
  };
}

function riga(item: VocePranzo): RigaPranzo {
  return {
    tipo: tipoCorto(item.tipo),
    nome: item.nome,
    prezzo: "",
    nota: item.nota,
  };
}

function righeGiorno(giorno: GiornoPranzo): RigaPranzo[] {
  return giorno.voci
    .filter((item) => item.tipo !== "Sempre")
    .slice()
    .sort((a, b) => ORDINE_GIORNO.indexOf(a.tipo) - ORDINE_GIORNO.indexOf(b.tipo))
    .map(riga);
}

export function presentMenuPranzo(menu: MenuPranzo | null, today = romeToday()): MenuPranzoView {
  // Resta in pagina anche dopo l'ultimo giorno, finché non arriva un menù nuovo.
  if (!menu) return { status: "pending" };
  const giorni = menu.giorni.map((giorno) => ({
    data: giorno.data,
    tab: formatTabGiorno(giorno.data),
    titolo: formatWeekdayLong(giorno.data),
    voci: righeGiorno(giorno),
    contorni: CONTORNI_SEMPRE.map(riga),
  }));
  const selected = giorni.find((giorno) => giorno.data === today)?.data ?? giorni[0].data;
  return { status: "current", menu, periodo: formatPeriodo(menu.from, menu.to), giorni, selected };
}
