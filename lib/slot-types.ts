import type { FotoSection } from "@/lib/archivio-shared";

export type SlotStato = "bozza" | "pubblicata";

export type SlotVersione = {
  url: string;
  pathname: string;
  width: number;
  height: number;
  aggiornata: string;
};

export type SlotRecord = {
  slot: string;
  sezione: FotoSection;
  piatto: string;
  slug: string;
  descrizione: string;
  url: string;
  pathname: string;
  width: number;
  height: number;
  focusX: number;
  focusY: number;
  stato: SlotStato;
  aggiornata: string;
  versioniPrecedenti: SlotVersione[];
};

export type SlotArchivio = {
  items: Record<string, SlotRecord>;
};

export type SlotVista = {
  indicazioni: boolean;
  items: Record<string, SlotRecord | null>;
};

export function fotoVisibile(record: SlotRecord | undefined, bozze: boolean): SlotRecord | null {
  if (!record?.url || !record.pathname) return null;
  if (record.stato === "pubblicata") return record;
  if (record.stato === "bozza" && bozze) return record;
  return null;
}

export function pathnamesSlot(archivio: SlotArchivio): Set<string> {
  const paths = new Set<string>();
  for (const record of Object.values(archivio.items)) {
    if (record.pathname) paths.add(record.pathname);
    for (const versione of record.versioniPrecedenti) {
      if (versione.pathname) paths.add(versione.pathname);
    }
  }
  return paths;
}
