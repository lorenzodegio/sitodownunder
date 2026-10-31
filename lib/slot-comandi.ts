import { slotById } from "@/data/foto-slot";
import { isAllowedFotoPath } from "@/lib/archivio-shared";
import { loadSlotArchivio, putFotoWebp, readBlobBytes, saveSlotArchivio } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { percorsoSlot, percorsoUnivoco, slugPiatto } from "@/lib/foto-nome";
import { pathnamesSlot, type SlotRecord, type SlotStato, type SlotVersione } from "@/lib/slot-types";

export class SlotErrore extends Error {}

function conVersione(url: string, quando: string): string {
  const base = url.split("?")[0];
  return `${base}?v=${encodeURIComponent(quando)}`;
}

function ricorda(record: SlotRecord | undefined): SlotVersione[] {
  if (!record?.pathname || !record.url) return record?.versioniPrecedenti ?? [];
  return [
    {
      url: record.url,
      pathname: record.pathname,
      width: record.width,
      height: record.height,
      aggiornata: record.aggiornata,
    },
    ...record.versioniPrecedenti,
  ].slice(0, 3);
}

async function copia(from: string, to: string): Promise<string> {
  const token = readBlobToken();
  if (!token) throw new SlotErrore("Manca il token Blob di questo ambiente.");
  const bytes = await readBlobBytes(from, token);
  if (!bytes) throw new SlotErrore("Non trovo la foto precedente.");
  return putFotoWebp(to, Buffer.from(bytes));
}

export async function salvaSlot(input: {
  slot: string;
  piatto: string;
  descrizione: string;
  focusX: number;
  focusY: number;
  stato: SlotStato;
  file?: { buffer: Buffer; width: number; height: number } | null;
  ripristina?: number | null;
  elimina?: boolean;
}): Promise<SlotRecord> {
  const definizione = slotById(input.slot);
  const archivio = await loadSlotArchivio();
  const attuale = archivio.items[input.slot];
  const quando = new Date().toISOString();
  const piatto = input.piatto.trim().slice(0, 80);
  const descrizione = input.descrizione.trim().slice(0, 300);

  if (input.elimina) {
    if (!attuale) throw new SlotErrore("Questo slot non ha una foto.");
    const record: SlotRecord = {
      ...attuale,
      url: "",
      pathname: "",
      width: 0,
      height: 0,
      stato: "bozza",
      aggiornata: quando,
      versioniPrecedenti: ricorda(attuale),
    };
    archivio.items[input.slot] = record;
    await saveSlotArchivio(archivio);
    return record;
  }

  if (input.ripristina !== null && input.ripristina !== undefined) {
    if (!attuale) throw new SlotErrore("Nessuna versione da ripristinare.");
    const scelta = attuale.versioniPrecedenti[input.ripristina];
    if (!scelta) throw new SlotErrore("Versione non trovata.");
    const altre = attuale.versioniPrecedenti.filter((_, index) => index !== input.ripristina);
    const record: SlotRecord = {
      ...attuale,
      url: scelta.url,
      pathname: scelta.pathname,
      width: scelta.width,
      height: scelta.height,
      aggiornata: quando,
      versioniPrecedenti: ricorda({ ...attuale, versioniPrecedenti: altre }).slice(0, 3),
    };
    archivio.items[input.slot] = record;
    await saveSlotArchivio(archivio);
    return record;
  }

  if (input.stato === "pubblicata") {
    if (!piatto) throw new SlotErrore("Scrivi il nome del piatto.");
    if (!descrizione) throw new SlotErrore("Scrivi la descrizione: è il testo alternativo.");
  }

  const slug = slugPiatto(piatto);
  const desiderato = percorsoSlot(definizione.sezione, definizione.prefisso, slug);
  const occupati = pathnamesSlot(archivio);
  if (attuale?.pathname) occupati.delete(attuale.pathname);
  const percorso = percorsoUnivoco(desiderato, occupati);
  if (!isAllowedFotoPath(percorso)) throw new SlotErrore("Nome del file non valido.");

  let url = attuale?.url ?? "";
  let pathname = attuale?.pathname ?? "";
  let width = attuale?.width ?? 0;
  let height = attuale?.height ?? 0;
  let versioni = attuale?.versioniPrecedenti ?? [];

  if (input.file && attuale?.pathname && attuale.url && attuale.pathname === percorso) {
    const versionePath = percorso.replace(/\.webp$/, `-v-${Date.now()}.webp`);
    if (!isAllowedFotoPath(versionePath)) throw new SlotErrore("Nome del file non valido.");
    const vecchioUrl = await copia(attuale.pathname, versionePath);
    versioni = [
      {
        url: conVersione(vecchioUrl, attuale.aggiornata || quando),
        pathname: versionePath,
        width: attuale.width,
        height: attuale.height,
        aggiornata: attuale.aggiornata,
      },
      ...attuale.versioniPrecedenti,
    ].slice(0, 3);
  }

  if (input.file) {
    url = conVersione(await putFotoWebp(percorso, input.file.buffer), quando);
    if (pathname && pathname !== percorso) versioni = ricorda(attuale);
    pathname = percorso;
    width = input.file.width;
    height = input.file.height;
  } else if (pathname && pathname !== percorso) {
    url = conVersione(await copia(pathname, percorso), quando);
    versioni = ricorda(attuale);
    pathname = percorso;
  } else if (url) {
    url = conVersione(url, quando);
  }

  if (input.stato === "pubblicata" && !url) {
    throw new SlotErrore("Carica una foto prima di pubblicare.");
  }

  const record: SlotRecord = {
    slot: input.slot,
    sezione: definizione.sezione,
    piatto,
    slug,
    descrizione,
    url,
    pathname,
    width,
    height,
    focusX: input.focusX,
    focusY: input.focusY,
    stato: input.stato,
    aggiornata: quando,
    versioniPrecedenti: versioni.slice(0, 3),
  };
  archivio.items[input.slot] = record;
  await saveSlotArchivio(archivio);
  return record;
}
