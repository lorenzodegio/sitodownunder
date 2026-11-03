import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { FOTO_SLOTS, isSlotId, type FotoSlot } from "@/data/foto-slot";
import { revalidatePublic } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { nomeFileApi, slugPiatto } from "@/lib/foto-nome";
import { SlotErrore, leggiArchivioSlot, salvaSlot } from "@/lib/slot-comandi";
import type { SlotRecord } from "@/lib/slot-types";

const FINESTRA_MS = 60_000;
const TETTO = 60;
const LIMITE_BYTE = 20 * 1024 * 1024;

const ritmo = new Map<string, { n: number; fino: number }>();

export type StatoApi = "vuoto" | "bozza" | "pubblicata";

export type RigaSlotApi = {
  slot: string;
  sezione: string;
  formato: string;
  piatto: string;
  descrizione: string;
  file: string;
  url: string;
  stato: StatoApi;
  aggiornata: string;
};

export function erroreApi(messaggio: string, campo: string, status = 400): NextResponse {
  return NextResponse.json(
    { errore: messaggio, campo },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function jsonApi(body: unknown, status = 200, extra?: Record<string, string>): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

function tokenUguale(presentato: string, atteso: string): boolean {
  const a = createHash("sha256").update(presentato, "utf8").digest();
  const b = createHash("sha256").update(atteso, "utf8").digest();
  return timingSafeEqual(a, b);
}

function ipDi(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const primo = forwarded?.split(",")[0]?.trim();
  return primo || request.headers.get("x-real-ip")?.trim() || "locale";
}

function consentiRitmo(ip: string): boolean {
  const ora = Date.now();
  if (ritmo.size > 500) {
    for (const [chiave, voce] of ritmo) {
      if (ora >= voce.fino) ritmo.delete(chiave);
    }
  }
  const voce = ritmo.get(ip);
  if (!voce || ora >= voce.fino) {
    ritmo.set(ip, { n: 1, fino: ora + FINESTRA_MS });
    return true;
  }
  voce.n += 1;
  return voce.n <= TETTO;
}

function tokenPresentato(request: Request): string {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)\s*$/i.exec(header.trim());
  return match?.[1] ?? "";
}

/** Null se la richiesta può proseguire. 404 se l'API è spenta. */
export function guardFotoApi(request: Request): NextResponse | null {
  const atteso = process.env.FOTO_API_TOKEN?.trim();
  if (!atteso) return new NextResponse(null, { status: 404, headers: { "Cache-Control": "no-store" } });
  if (!consentiRitmo(ipDi(request))) {
    return jsonApi({ errore: "troppe richieste" }, 429, { "Retry-After": "60" });
  }
  if (!tokenUguale(tokenPresentato(request), atteso)) {
    return jsonApi({ errore: "non autorizzato" }, 401);
  }
  return null;
}

export function accettaFoto(file: File): boolean {
  if (/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) return true;
  return ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(file.type);
}

export function statoApi(record: SlotRecord | undefined): StatoApi {
  if (!record?.url || !record.pathname) return "vuoto";
  return record.stato;
}

export function rigaSlot(def: FotoSlot, record: SlotRecord | undefined): RigaSlotApi {
  const stato = statoApi(record);
  const slug = record?.slug || (record?.piatto ? slugPiatto(record.piatto) : "");
  return {
    slot: def.id,
    sezione: def.gruppo,
    formato: def.formato,
    piatto: record?.piatto ?? "",
    descrizione: record?.descrizione ?? "",
    file: stato === "vuoto" || !slug ? "" : nomeFileApi(def.id, slug),
    url: stato === "vuoto" ? "" : (record?.url ?? ""),
    stato,
    aggiornata: record?.aggiornata ?? "",
  };
}

export async function elencoSlot(): Promise<RigaSlotApi[]> {
  const archivio = await leggiArchivioSlot();
  return FOTO_SLOTS.map((def) => rigaSlot(def, archivio.items[def.id]));
}

export function provaRichiesta(request: Request): boolean {
  return new URL(request.url).searchParams.get("prova") === "1";
}

type Campo = "file" | "slot" | "piatto" | "descrizione" | "stato";

export function validaCampi(input: {
  slot: FormDataEntryValue | null;
  piatto: FormDataEntryValue | null;
  descrizione: FormDataEntryValue | null;
  stato: FormDataEntryValue | null;
}): { ok: true; slot: string; piatto: string; descrizione: string; stato: "bozza" | "pubblicata" } | { ok: false; risposta: NextResponse } {
  const rifiuta = (messaggio: string, campo: Campo) => ({ ok: false as const, risposta: erroreApi(messaggio, campo) });
  if (typeof input.slot !== "string" || !isSlotId(input.slot)) {
    return rifiuta("Lo slot non è valido.", "slot");
  }
  if (typeof input.piatto !== "string" || input.piatto.trim().length < 1) {
    return rifiuta("Scrivi il nome del piatto.", "piatto");
  }
  if (input.piatto.trim().length > 80) {
    return rifiuta("Il nome del piatto può avere al massimo 80 caratteri.", "piatto");
  }
  if (typeof input.descrizione !== "string" || input.descrizione.trim().length < 1) {
    return rifiuta("Scrivi la descrizione: è il testo alternativo.", "descrizione");
  }
  if (input.descrizione.trim().length > 200) {
    return rifiuta("La descrizione può avere al massimo 200 caratteri.", "descrizione");
  }
  const statoGrezzo = typeof input.stato === "string" ? input.stato.trim() : "";
  if (statoGrezzo && statoGrezzo !== "bozza" && statoGrezzo !== "pubblicata") {
    return rifiuta("Lo stato può essere bozza oppure pubblicata.", "stato");
  }
  return {
    ok: true,
    slot: input.slot,
    piatto: input.piatto.trim(),
    descrizione: input.descrizione.trim(),
    stato: statoGrezzo === "pubblicata" ? "pubblicata" : "bozza",
  };
}

export function validaFile(file: FormDataEntryValue | null): { ok: true; file: File } | { ok: false; risposta: NextResponse } {
  if (!(file instanceof File) || file.size <= 0) {
    return { ok: false, risposta: erroreApi("Manca la foto.", "file") };
  }
  if (!accettaFoto(file)) {
    return { ok: false, risposta: erroreApi("Usa JPG, PNG, WebP o HEIC.", "file") };
  }
  if (file.size > LIMITE_BYTE) {
    return { ok: false, risposta: erroreApi("La foto supera i 20 MB.", "file") };
  }
  return { ok: true, file };
}

export function erroreSalvataggio(error: unknown): NextResponse {
  if (error instanceof SlotErrore) {
    if (error.message.includes("Blob")) {
      return jsonApi({ errore: "Manca il token Blob di questo ambiente." }, 503);
    }
    const campo = error.message.includes("piatto") || error.message.includes("file non valido")
      ? "piatto"
      : error.message.includes("descrizione") || error.message.includes("alternativo")
        ? "descrizione"
        : "file";
    return erroreApi(error.message, campo);
  }
  return jsonApi({ errore: "Impossibile salvare la foto." }, 500);
}

function eBozza(record: SlotRecord | undefined): record is SlotRecord {
  return Boolean(record && record.stato === "bozza" && record.url && record.pathname && record.piatto.trim() && record.descrizione.trim());
}

export async function pubblicaBozze(ids: string[]): Promise<{ pubblicati: string[]; saltati: string[] }> {
  const archivio = await leggiArchivioSlot();
  const pubblicati: string[] = [];
  const saltati: string[] = [];
  const visti = new Set<string>();
  for (const id of ids) {
    if (visti.has(id)) continue;
    visti.add(id);
    const record = archivio.items[id];
    if (!eBozza(record)) {
      saltati.push(id);
      continue;
    }
    try {
      await salvaSlot({
        slot: id,
        piatto: record.piatto,
        descrizione: record.descrizione,
        focusX: record.focusX,
        focusY: record.focusY,
        stato: "pubblicata",
      });
      pubblicati.push(id);
    } catch (error) {
      if (error instanceof SlotErrore) {
        saltati.push(id);
        continue;
      }
      throw error;
    }
  }
  if (pubblicati.length) revalidatePublic();
  return { pubblicati, saltati };
}

export function blobPronto(): boolean {
  return Boolean(readBlobToken());
}

export function validaElencoSlot(body: unknown): { ok: true; slots: string[] } | { ok: false; risposta: NextResponse } {
  const slots = body && typeof body === "object" ? (body as { slots?: unknown }).slots : undefined;
  if (!Array.isArray(slots)) {
    return { ok: false, risposta: erroreApi("Indica gli slot da pubblicare.", "slots") };
  }
  const ids: string[] = [];
  for (const id of slots) {
    if (typeof id !== "string" || !isSlotId(id)) {
      return { ok: false, risposta: erroreApi("Uno slot dell'elenco non è valido.", "slots") };
    }
    ids.push(id);
  }
  return { ok: true, slots: ids };
}
