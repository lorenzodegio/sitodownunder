import { showGarden } from "@/data/flags";

const ROMANI = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/** Dopo il capitolo IV (il menù). Il garden, se è pubblicato, sposta di uno le feste. */
export function capitolo(slot: "garden" | "eventi"): string {
  let numero = 5;
  if (slot === "garden") return `capitolo ${ROMANI[numero]}`;
  if (showGarden) numero += 1;
  return `capitolo ${ROMANI[numero]}`;
}
