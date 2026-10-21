import type { ColoriNeve } from "@/data/stagioni";
import type { SlotDecorazione } from "@/components/Foglie";

/** Punto di aggancio dell'inverno. Non disegna nulla finché una stagione non usa tipo "neve". */
export function Neve({ dove, colori }: { dove: SlotDecorazione; colori: ColoriNeve }) {
  void dove;
  void colori;
  return null;
}
