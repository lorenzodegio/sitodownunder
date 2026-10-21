import { romeToday } from "@/data/martedi-nonna";

export const PRANZO_PATH = "menu/pranzo-settimana.json";
export const MENU_PLACEHOLDER = "[menù pranzo da confermare]";
export const PRICE_PLACEHOLDER = "[prezzo da confermare]";
export const WEEK_PENDING = "[menù della settimana in arrivo]";

export const PORTATE = ["primi", "secondi", "contorni", "dessert"] as const;
export type Portata = (typeof PORTATE)[number];

export const portataLabel: Record<Portata, string> = {
  primi: "Primi",
  secondi: "Secondi",
  contorni: "Contorni",
  dessert: "Dessert",
};

export type MenuPranzo = {
  from: string;
  to: string;
  voci: Record<Portata, string[]>;
  price: string;
  includes: string;
  notes: string;
};

export type MenuPranzoView =
  | { status: "empty" }
  | { status: "expired" }
  | { status: "current"; menu: MenuPranzo };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

function isDay(value: string): boolean {
  if (!DAY.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function lines(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 24)
    .map((item) => item.slice(0, 160));
}

export function parseMenuPranzo(value: unknown): MenuPranzo | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<MenuPranzo> & { voci?: Partial<Record<Portata, unknown>> };
  if (typeof raw.from !== "string" || typeof raw.to !== "string") return null;
  if (!isDay(raw.from) || !isDay(raw.to) || raw.to < raw.from) return null;
  const voci = {} as Record<Portata, string[]>;
  for (const portata of PORTATE) voci[portata] = lines(raw.voci?.[portata]);
  return {
    from: raw.from,
    to: raw.to,
    voci,
    price: typeof raw.price === "string" ? raw.price.trim().slice(0, 80) : "",
    includes: typeof raw.includes === "string" ? raw.includes.trim().slice(0, 280) : "",
    notes: typeof raw.notes === "string" ? raw.notes.trim().slice(0, 500) : "",
  };
}

export function formatDayIt(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function presentMenuPranzo(menu: MenuPranzo | null, today = romeToday()): MenuPranzoView {
  if (!menu) return { status: "empty" };
  if (today > menu.to) return { status: "expired" };
  return { status: "current", menu };
}
