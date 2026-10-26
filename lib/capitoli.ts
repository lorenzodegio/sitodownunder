import { showGarden } from "@/data/flags";
import { mostraNovita } from "@/data/novita";

const ROMANI = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/** Dopo il capitolo IV (il menù). I capitoli nascosti non lasciano un buco nel numero. */
export function capitolo(slot: "novita" | "garden" | "eventi"): string {
  let numero = 5;
  if (slot === "novita") return `capitolo ${ROMANI[numero]}`;
  if (mostraNovita()) numero += 1;
  if (slot === "garden") return `capitolo ${ROMANI[numero]}`;
  if (showGarden) numero += 1;
  return `capitolo ${ROMANI[numero]}`;
}
