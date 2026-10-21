import type { CSSProperties } from "react";

/**
 * Palette e colori della base (livello 0).
 * I componenti usano le variabili CSS, non questi valori scritti a mano.
 * Senza stagione, hero e accento restano inchiostro e tiffany.
 */
export const theme = {
  inchiostro: "#1E282B",
  carta: "#F6EFDF",
  biglietto: "#FFFCF4",
  burro: "#F3DFA2",
  salvia: "#A9BCA0",
  terracotta: "#E3A08A",
  rame: "#C98A63",
  inchiostroMano: "#B8604A",
  tiffany: "#A6DCCB",
  /** Fondo pagina già in uso. Non è la carta dei capitoli. */
  fondo: "#F4F0E6",
  burroBase: "#F3E2B8",
  salviaBase: "#8EAE9A",
  coccio: "#C56A45",
  muto: "#556163",
  mutoChiaro: "#A9B4B2",
  statoNeutro: "#8A9096",
  statoChiuso: "#E3A6A0",
  bianco: "#FFFFFF",
  demo: "#11181A",
  corda: "#D9D3C4",
  blush: "#F3D2CE",
  crema: "#F7F1E4",
  avorio: "#FFFDF8",
  muschio: "#3D4A46",
  ardesia: "#5C6A64",
  testoMuto: "#3C4A4E",
  testoFaq: "#2C3A3E",
  barra: "rgba(30, 40, 43, 0.9)",
  linea: "rgba(30, 40, 43, 0.18)",
  lineaMedia: "rgba(30, 40, 43, 0.3)",
  lineaForte: "rgba(30, 40, 43, 0.55)",
  lineaChiara: "rgba(244, 240, 230, 0.2)",
  velo: "rgba(244, 240, 230, 0.06)",
  veloForte: "rgba(244, 240, 230, 0.72)",
  ombraMorbida: "rgba(244, 240, 230, 0.08)",
  ombra: "rgba(0, 0, 0, 0.7)",
  bagliore: "rgba(166, 220, 203, 0.5)",
  baglioreSpento: "rgba(166, 220, 203, 0)",
  tratteggio: "rgba(243, 223, 162, 0.45)",
  cartaMorbida: "rgba(246, 239, 223, 0.88)",
  cartaVelata: "rgba(246, 239, 223, 0.85)",
  rigaSalvia: "rgba(169, 188, 160, 0.45)",
} as const;

export type Theme = typeof theme;

function kebab(name: string) {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/** Variabili applicate su <html>. I nomi storici (--ink, --paper, …) restano alias. */
export function themeStyle(season?: { fondoHero: string; accento: string } | null): React.CSSProperties {
  const style: Record<string, string> = {};
  for (const [name, value] of Object.entries(theme)) {
    style[`--${kebab(name)}`] = value;
  }
  style["--ink"] = theme.inchiostro;
  style["--paper"] = theme.fondo;
  style["--accent"] = theme.tiffany;
  style["--spot"] = theme.tiffany;
  style["--hero-bg"] = theme.inchiostro;
  style["--mutedL"] = theme.muto;
  style["--mutedD"] = theme.mutoChiaro;
  style["--lineL"] = theme.linea;
  style["--lineD"] = theme.lineaChiara;
  style["--status-neutral"] = theme.statoNeutro;
  style["--status-open"] = theme.tiffany;
  style["--status-closed"] = theme.statoChiuso;
  style["--butter"] = theme.burroBase;
  style["--sage"] = theme.salviaBase;
  style["--coccio"] = theme.coccio;
  style["--fondo-hero"] = season?.fondoHero ?? theme.inchiostro;
  style["--accento"] = season?.accento ?? theme.tiffany;
  return style as CSSProperties;
}
