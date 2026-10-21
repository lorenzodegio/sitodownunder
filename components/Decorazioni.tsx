import { Foglie, type SlotDecorazione } from "@/components/Foglie";
import { Neve } from "@/components/Neve";
import { stagioneAttiva } from "@/lib/season";

/** Un solo ingresso per le decorazioni. Le sezioni non sanno se è autunno o inverno. */
export async function Decorazioni({ dove }: { dove: SlotDecorazione }) {
  const stagione = await stagioneAttiva();
  const decorazioni = stagione?.decorazioni;
  if (!decorazioni) return null;
  if (decorazioni.tipo === "foglie") return <Foglie where={dove} colori={decorazioni.colori} />;
  return <Neve dove={dove} colori={decorazioni.colori} />;
}
