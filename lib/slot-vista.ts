import { FOTO_SLOTS } from "@/data/foto-slot";
import { loadSlotArchivio } from "@/lib/blob-archive";
import { fotoVisibile, type SlotVista } from "@/lib/slot-types";

export async function loadSlotVista(opts?: { bozze?: boolean; indicazioni?: boolean }): Promise<SlotVista> {
  const archivio = await loadSlotArchivio();
  const bozze = opts?.bozze ?? process.env.VERCEL_ENV !== "production";
  const indicazioni = opts?.indicazioni ?? bozze;
  const items: SlotVista["items"] = {};
  for (const slot of FOTO_SLOTS) {
    items[slot.id] = fotoVisibile(archivio.items[slot.id], bozze);
  }
  return { indicazioni, items };
}
