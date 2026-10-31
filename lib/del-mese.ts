export const DEL_MESE_PATH = "mese/del-mese.json";
export const MESE_FOTO = {
  panino: "mese/panino.webp",
  pizza: "mese/pizza.webp",
} as const;

export type PiattoMese = {
  nome: string;
  descrizione: string;
  foto: string;
  mese: string;
};

export type DelMese = {
  panino: PiattoMese | null;
  pizza: PiattoMese | null;
};

const MESE = /^\d{4}-\d{2}$/;

export function meseCorrente(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
  })
    .format(now)
    .slice(0, 7);
}

export function meseNonPassato(mese: string, now = new Date()): boolean {
  return MESE.test(mese) && mese >= meseCorrente(now);
}

function piatto(value: unknown): PiattoMese | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<PiattoMese>;
  if (typeof raw.nome !== "string" || typeof raw.mese !== "string") return null;
  const nome = raw.nome.trim().slice(0, 80);
  if (!nome || !MESE.test(raw.mese)) return null;
  return {
    nome,
    descrizione: typeof raw.descrizione === "string" ? raw.descrizione.trim().slice(0, 240) : "",
    foto: typeof raw.foto === "string" ? raw.foto.trim().slice(0, 400) : "",
    mese: raw.mese,
  };
}

export function parseDelMese(value: unknown): DelMese {
  const raw = value && typeof value === "object" ? (value as Partial<DelMese>) : {};
  return { panino: piatto(raw.panino), pizza: piatto(raw.pizza) };
}

/** In pagina solo se il mese salvato è questo o uno successivo. */
export function piattoInPagina(item: PiattoMese | null, now = new Date()): PiattoMese | null {
  if (!item || !meseNonPassato(item.mese, now)) return null;
  return item;
}
