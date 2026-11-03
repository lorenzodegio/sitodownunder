import { NextResponse } from "next/server";
import { isSlotId } from "@/data/foto-slot";
import { requestIsAdmin } from "@/lib/admin-auth";
import { revalidatePublic } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { toWebpSlot } from "@/lib/optimize-image";
import { SlotErrore, salvaSlot } from "@/lib/slot-comandi";

export const runtime = "nodejs";

const LIMITE = 20 * 1024 * 1024;

function accetta(file: File): boolean {
  if (/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) return true;
  return ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(file.type);
}

function numero(value: FormDataEntryValue | null, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(0, Math.round(n)));
}

export async function POST(request: Request) {
  if (!(await requestIsAdmin(request))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  if (!readBlobToken()) {
    return NextResponse.json({ error: "Manca il token Blob di questo ambiente." }, { status: 503 });
  }

  const form = await request.formData();
  const slot = form.get("slot");
  const action = form.get("action");
  if (typeof slot !== "string" || !isSlotId(slot)) {
    return NextResponse.json({ error: "Slot non valido." }, { status: 400 });
  }
  if (action !== "bozza" && action !== "pubblica" && action !== "ripristina" && action !== "elimina") {
    return NextResponse.json({ error: "Azione non valida." }, { status: 400 });
  }

  const file = form.get("foto");
  let ottimizzata: { buffer: Buffer; width: number; height: number } | null = null;
  if (file instanceof File && file.size > 0) {
    if (!accetta(file)) {
      return NextResponse.json({ error: "Usa JPG, PNG, WebP o HEIC." }, { status: 400 });
    }
    if (file.size > LIMITE) {
      return NextResponse.json({ error: "La foto supera i 20 MB." }, { status: 400 });
    }
    try {
      ottimizzata = await toWebpSlot(Buffer.from(await file.arrayBuffer()));
    } catch {
      if (/\.heic$|\.heif$/i.test(file.name)) {
        return NextResponse.json(
          { error: "Questo HEIC non si legge. Esporta un JPG e ricaricalo." },
          { status: 400 },
        );
      }
      return NextResponse.json({ error: "Impossibile ottimizzare la foto." }, { status: 500 });
    }
  }

  const ripristina = form.get("versione");
  try {
    const record = await salvaSlot({
      slot,
      piatto: typeof form.get("piatto") === "string" ? String(form.get("piatto")) : "",
      descrizione: typeof form.get("descrizione") === "string" ? String(form.get("descrizione")) : "",
      focusX: numero(form.get("focusX"), 50),
      focusY: numero(form.get("focusY"), 50),
      stato: action === "pubblica" ? "pubblicata" : "bozza",
      file: ottimizzata,
      ripristina: action === "ripristina" && typeof ripristina === "string" ? Number(ripristina) : null,
      elimina: action === "elimina",
    });
    revalidatePublic();
    return NextResponse.json({ ok: true, record });
  } catch (error) {
    if (error instanceof SlotErrore) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Impossibile salvare la foto." }, { status: 500 });
  }
}
