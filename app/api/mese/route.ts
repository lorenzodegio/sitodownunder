import { NextResponse } from "next/server";
import { requestIsAdmin } from "@/lib/admin-auth";
import { loadDelMese, putBlob, revalidatePublic, saveDelMese } from "@/lib/blob-archive";
import { readBlobToken } from "@/lib/blob-token";
import { MESE_FOTO, type DelMese, type PiattoMese } from "@/lib/del-mese";
import { toWebp } from "@/lib/optimize-image";

export const runtime = "nodejs";

const FOTO_LIMIT = 4 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function testo(form: FormData, name: string, max: number): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function fotoNuova(form: FormData, field: string, pathname: string, attuale: string): Promise<string> {
  const file = form.get(field);
  if (!(file instanceof File) || file.size === 0) return attuale;
  if (!TYPES.has(file.type)) throw new Error("Usa JPG, PNG o WebP.");
  if (file.size > FOTO_LIMIT) throw new Error("La foto supera i 4 MB.");
  const optimized = await toWebp(Buffer.from(await file.arrayBuffer()));
  return putBlob(pathname, optimized, "image/webp");
}

function blocco(nome: string, descrizione: string, foto: string, mese: string): PiattoMese | null {
  if (!nome) return null;
  if (!/^\d{4}-\d{2}$/.test(mese)) throw new Error("Il mese non è valido.");
  return { nome, descrizione, foto, mese };
}

export async function POST(request: Request) {
  if (!(await requestIsAdmin(request))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  if (!readBlobToken()) {
    return NextResponse.json({ error: "Manca il token Blob di questo ambiente." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Modulo non valido." }, { status: 400 });

  try {
    const attuale = await loadDelMese();
    const panino = blocco(
      testo(form, "paninoNome", 80),
      testo(form, "paninoDescrizione", 240),
      await fotoNuova(form, "paninoFoto", MESE_FOTO.panino, attuale.panino?.foto ?? ""),
      testo(form, "paninoMese", 7),
    );
    const pizzaNome = testo(form, "pizzaNome", 80);
    const pizza = pizzaNome
      ? blocco(
          pizzaNome,
          testo(form, "pizzaDescrizione", 240),
          await fotoNuova(form, "pizzaFoto", MESE_FOTO.pizza, attuale.pizza?.foto ?? ""),
          testo(form, "pizzaMese", 7),
        )
      : null;
    const mese: DelMese = { panino, pizza };
    await saveDelMese(mese);
    revalidatePublic();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Salvataggio non riuscito.";
    if (/vercel_blob|eyJ[A-Za-z0-9_-]{8,}/.test(message)) {
      return NextResponse.json({ error: "Salvataggio non riuscito." }, { status: 500 });
    }
    return NextResponse.json({ error: message || "Salvataggio non riuscito." }, { status: 400 });
  }
}
