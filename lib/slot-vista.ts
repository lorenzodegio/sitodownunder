import { FOTO_SLOTS } from "@/data/foto-slot";
import { leggiArchivioSlot } from "@/lib/slot-comandi";
import { fotoVisibile, type SlotRecord, type SlotVista } from "@/lib/slot-types";

/** Albero di Natale, dopo l'ultimo slot dei piatti. */
export const SLOT_ALBERO = ["28", "29", "30", "31"] as const;

export function fotoAlbero(items: SlotVista["items"]): SlotRecord[] {
  return SLOT_ALBERO.flatMap((id) => {
    const record = items[id];
    return record ? [record] : [];
  });
}

export async function loadSlotVista(opts?: { bozze?: boolean; indicazioni?: boolean }): Promise<SlotVista> {
  const archivio = await leggiArchivioSlot();
  const bozze = opts?.bozze ?? process.env.VERCEL_ENV !== "production";
  const indicazioni = opts?.indicazioni ?? bozze;
  const items: SlotVista["items"] = {};
  for (const slot of FOTO_SLOTS) {
    items[slot.id] = fotoVisibile(archivio.items[slot.id], bozze);
  }
  return { indicazioni, items };
}
