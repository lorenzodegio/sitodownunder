import { theme } from "@/data/theme";

export type ColoriFoglie = {
  quercia: string;
  rame: string;
  oro: string;
  mano: string;
  terra: string;
};

export type ColoriNeve = {
  fiocco: string;
};

/** Solo i campi che una stagione può cambiare. */
export type Stagione = {
  fondoHero: string;
  accento: string;
  rigaHero: boolean;
  decorazioni: { tipo: "foglie"; colori: ColoriFoglie } | { tipo: "neve"; colori: ColoriNeve };
};

export const stagioni = {
  autunno: {
    fondoHero: "#2B2420",
    accento: theme.terracotta,
    rigaHero: true,
    decorazioni: {
      tipo: "foglie",
      colori: {
        quercia: "#A9744F",
        rame: theme.rame,
        oro: "#D9B77A",
        mano: theme.inchiostroMano,
        terra: "#8C6A4A",
      },
    },
  },
} as const satisfies Record<string, Stagione>;

export type IdStagione = keyof typeof stagioni;

export function leggiStagione(id: string | null): Stagione | null {
  if (!id || !(id in stagioni)) return null;
  return stagioni[id as IdStagione];
}
